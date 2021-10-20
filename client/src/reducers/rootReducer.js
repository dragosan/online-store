import { combineReducers } from "redux"
import { cartReducer } from "./cartReducer"
import {
  createOrderReducer,
  deliverOrderReducer,
  getMyOrdersReducer,
  getOrderReducer,
  getOrdersReducer,
  payOrderReducer,
} from "./orderReducer"
import { paymentMethodReducer } from "./paymentMethodReducer"

import {
  createProductReducer,
  createReviewReducer,
  deleteProductReducer,
  productListReducer,
  productReducer,
  productTopListReducer,
  updateProductReducer,
} from "./productReducer"
import {
  authReducer,
  deleteUsersReducer,
  getUserReducer,
  getUsersReducer,
  profileReducer,
  updateUserReducer,
} from "./userReducer"

const rootReducer = combineReducers({
  productList: productListReducer,
  productGet: productReducer,
  productTopGet: productTopListReducer,
  productCreate: createProductReducer,
  reviewCreate: createReviewReducer,
  productUpdate: updateProductReducer,
  productDelete: deleteProductReducer,
  auth: authReducer,
  profile: profileReducer,
  usersList: getUsersReducer,
  usersGet: getUsersReducer,
  userDelete: deleteUsersReducer,
  userGet: getUserReducer,
  userUpdate: updateUserReducer,
  cart: cartReducer,
  paymentMethod: paymentMethodReducer,
  orderCreate: createOrderReducer,
  myOrders: getMyOrdersReducer,
  ordersList: getOrdersReducer,
  orderGet: getOrderReducer,
  orderPay: payOrderReducer,
  orderDeliver: deliverOrderReducer,
})

export default rootReducer
