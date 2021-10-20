import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../layout/Message"
import Loader from "../layout/Loader"
import {
  deliverOrder,
  getOrder,
  payOrder,
  payOrderCash,
} from "../../actions/orderActions"
import { DELIVER_ORDER_RESET, PAY_ORDER_RESET } from "../../actions/types"
import { LinkContainer } from "react-router-bootstrap"
import { savePaymentMethod } from "../../actions/cartActions"

const Order = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  // const paymentMethod = useSelector((state) => state.paymentMethod)
  // const { payment } = paymentMethod

  const orderGet = useSelector((state) => state.orderGet)
  const { order: _order, loading, error } = orderGet

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading) {
    _order.itemsPrice = addDecimals(
      _order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push("/login")
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      console.log(clientId)
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&buyer-country=EG&currency=EG&components=buttons`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!_order || successPay || successDeliver || _order._id !== orderId) {
      dispatch({ type: PAY_ORDER_RESET })
      dispatch({ type: DELIVER_ORDER_RESET })
      dispatch(getOrder(orderId))
    } else if (!_order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, _order])

  const successPaymentHandler = (paymentResult) => {
    if (!paymentResult) {
      dispatch(payOrderCash(orderId))
    } else {
      dispatch(payOrder(orderId, paymentResult))
    }
  }

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: "0.01",
  //         },
  //       },
  //     ],
  //   })
  // }

  // const onApprove = (data, actions) => {
  //   return actions.order.capture()
  // }

  const deliverHandler = () => {
    dispatch(deliverOrder(_order._id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {_order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {_order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${_order.user.email}`}>{_order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {_order.shippingAddress.address}, {_order.shippingAddress.city}{" "}
                {_order.shippingAddress.postalCode},{" "}
                {_order.shippingAddress.country}
              </p>
              {_order.isDelivered ? (
                <Message variant="success">
                  Delivered on {_order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {_order.paymentMethod}
              </p>
              {_order.isPaid ? (
                <Message variant="success">Paid on {_order.paidAt}</Message>
              ) : (
                <>
                  <Message variant="danger">Not Paid</Message>

                  {!_order.isPaid && _order.paymentMethod !== "cash" && (
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={dispatch(savePaymentMethod("cash"))}
                    >
                      Change to Cash
                    </Button>
                  )}

                  {!_order.isPaid && _order.paymentMethod !== "paypal" && (
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={dispatch(savePaymentMethod("paypal"))}
                    >
                      Change to Paypal
                    </Button>
                  )}
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {_order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {_order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${_order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${_order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${_order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${_order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo.isAdmin ? (
                ""
              ) : _order.paymentMethod === "cash" ? (
                <Button disabled>Pay On Receive</Button>
              ) : (
                !_order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}

                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={_order.totalPrice}
                        currency="USD"
                        onSuccess={successPaymentHandler}
                        onError={() => console.log(error)}
                      />
                    )}
                  </ListGroup.Item>
                )
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !_order.isPaid &&
                _order.paymentMethod === "cash" && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={successPaymentHandler({})}
                    >
                      Mark As Paid
                    </Button>
                  </ListGroup.Item>
                )}
              {userInfo &&
                userInfo.isAdmin &&
                _order.isPaid &&
                !_order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Order
