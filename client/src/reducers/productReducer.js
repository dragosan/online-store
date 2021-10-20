import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
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
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../actions/types"

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
      }
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productTopListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case GET_TOP_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
      }
    case GET_TOP_PRODUCTS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productReducer = (
  state = { product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case GET_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case GET_PRODUCT_SUCCESS:
      return { loading: false, product: payload }
    case GET_PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const createProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, createdProduct: payload }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case CREATE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const createReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true }
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: payload }
    case CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const updateProductReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: payload }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case UPDATE_PRODUCT_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const deleteProductReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
