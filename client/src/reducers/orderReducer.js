import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_RESET,
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
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
} from "../actions/types"

export const createOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: payload }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const getOrderReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case GET_ORDER_REQUEST:
      return { ...state, loading: true }
    case GET_ORDER_SUCCESS:
      return { loading: false, order: payload }
    case GET_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const getMyOrdersReducer = (
  state = { orders: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true }
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: payload }
    case GET_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const getOrdersReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case GET_ORDERS_REQUEST:
      return { loading: true }
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: payload }
    case GET_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const payOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PAY_ORDER_REQUEST:
      return { loading: true }
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true }
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case PAY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

export const deliverOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELIVER_ORDER_REQUEST:
      return { loading: true }
    case DELIVER_ORDER_SUCCESS:
      return { loading: false, success: true }
    case DELIVER_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case DELIVER_ORDER_RESET:
      return {}
    default:
      return state
  }
}
