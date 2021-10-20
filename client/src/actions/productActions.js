import axios from "axios"

import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./types"

export const getProducts =
  (keyword = "", pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTS_REQUEST,
      })

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOP_PRODUCTS_REQUEST,
    })

    const { data } = await axios.get(`/api/products/top`)
    dispatch({
      type: GET_TOP_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    })

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// admin actions
export const createProduct = () => async (dispatch, getState) => {
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
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

    const { data } = await axios.post(`/api/products`, {}, config)
    console.log(data)
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const createReview = (id, review) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/products/${id}/reviews`, review, config)

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_PRODUCT_REQUEST,
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

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
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

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
