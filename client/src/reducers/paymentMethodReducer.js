import { SAVE_PAYMENT_METHOD, RESET_PAYMENT_METHOD } from "../actions/types"

export const paymentMethodReducer = (
  state = { payment: "cash" },
  { type, payload }
) => {
  switch (type) {
    case SAVE_PAYMENT_METHOD:
      return {
        payment: payload,
      }
    case RESET_PAYMENT_METHOD:
      return {}
    default:
      return state
  }
}
