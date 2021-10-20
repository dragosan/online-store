import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_PROFILE,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_RESET,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PROFILE_ERROR,
  PROFILE_REQUEST,
  PROFILE_RESET,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
} from "../actions/types"

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { loading: false, error: payload }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const getUsersReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return { loading: true }
    case GET_USERS_SUCCESS:
      return { loading: false, users: payload }
    case GET_USERS_FAIL:
      return { loading: false, error: payload }
    case GET_USERS_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const profileReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case PROFILE_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case GET_PROFILE:
      return { loading: false, success: false, user: payload }
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: payload }
    case PROFILE_ERROR:
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload }
    case PROFILE_RESET:
    case UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const getUserReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case GET_USER_REQUEST:
      return { loading: true }
    case GET_USER_SUCCESS:
      return { loading: false, user: payload }
    case GET_USER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const updateUserReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_REQUEST:
      return { loading: true }
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true }
    case UPDATE_USER_FAIL:
      return { loading: false, error: payload }
    case UPDATE_USER_RESET:
      return {}
    default:
      return state
  }
}

export const deleteUsersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_USER_REQUEST:
      return { loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    case DELETE_USER_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
