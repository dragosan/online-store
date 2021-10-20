import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../../actions/cartActions"
import CheckoutSteps from "../layout/CheckoutSteps"
import FormContainer from "../layout/FormContainer"

const PaymentMethod = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [pay, setPay] = useState("cash")

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(pay))
    history.push("/placeorder")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Cash on Receive"
              id="Cash"
              name="paymentMethod"
              value="cash"
              checked
              onChange={(e) => setPay(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPay(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethod
