import axios from "axios"

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_PROFILE,
  PROFILE_REQUEST,
  PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  PROFILE_RESET,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_PRODUCT_REQUEST,
  GET_USERS_RESET,
} from "./types"

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  })
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = { name, email, password }
    const { data } = await axios.post("/api/users", body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    })
    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: GET_PROFILE,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    })
    const {
      auth: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: PROFILE_RESET,
  })
  dispatch({
    type: LOGOUT,
  })
}

//admin actions
export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USERS_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  })

  const {
    auth: { userInfo },
  } = getState()

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: DELETE_USER_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
