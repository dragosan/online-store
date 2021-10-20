import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_ADDRESS,
} from "../actions/types"

export const cartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const item = payload

      const existedItem = state.cartItems.find(
        (x) => x.product === item.product
      )
      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existedItem.product ? item : x
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      }
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      }

    default:
      return state
  }
}
