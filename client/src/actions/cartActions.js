import axios from "axios"
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "./types"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  })

  localStorage.removeItem("cartItems")
}

export const saveShippingAddress = (address) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: address,
  })

  localStorage.setItem("shippingAddress", JSON.stringify(address))
}

export const savePaymentMethod =
  (paymentMethod) => async (dispatch, getState) => {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    })
    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(getState().paymentMethod)
    )
  }
