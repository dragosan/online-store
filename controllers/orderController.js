import Order from "../models/Order.js"
import asyncHandler from "express-async-handler"

//@route Post /api/orders @desc add new order @access private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No Order Items")
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    console.log(createdOrder)
    res.status(201).json(createdOrder)
  }
})

//@route GET /api/orders @desc get all orders @access private/admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name")
  res.json(orders)
})

//@route GET /api/orders/myorders @desc get all user orders @access private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@route GET /api/orders/:id @desc get order by id @access private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@route PUT /api/orders/:id/pay @desc update order to paid @access private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    if (order.paymentMethod === "cash") {
      order.paymentResult = {}
    } else {
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
    }

    const updatedOrder = await order.save()
    console.log(updatedOrder)
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@route PUT /api/orders/:id/pay/cash @desc update order to paid cash @access private
export const updateOrderToPaidCash = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paymentMethod = "cash"
    order.paidAt = Date.now()
    order.paymentResult = {}

    const updatedOrder = await order.save()
    console.log(updatedOrder)
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@route PUT /api/orders/:id/deliver @desc update order to delivered @access private/admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})
