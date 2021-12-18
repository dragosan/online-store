import axios from "axios"
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "./types"

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
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

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getMyOrders = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_ORDERS_REQUEST,
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

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: GET_MY_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getOrders = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ORDERS_REQUEST,
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

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const getOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_ORDER_REQUEST,
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

    const { data } = await axios.get(`/api/orders/${id}`, config)
    console.log(data)

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: PAY_ORDER_REQUEST,
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
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const payOrderCash = (id) => async (dispatch, getState) => {
  dispatch({
    type: PAY_ORDER_REQUEST,
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
    const { data } = await axios.put(`/api/orders/${id}/pay/cash`, {}, config)
    console.log(data)
    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELIVER_ORDER_REQUEST,
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
    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config)

    dispatch({
      type: DELIVER_ORDER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: DELIVER_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
