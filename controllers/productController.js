import Product from "../models/Product.js"
import asyncHandler from "express-async-handler"

//@route GET /api/products @desc get all products @access public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  return res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@route GET /api/products/top @desc get top products @access public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5)

  return res.json(products)
})

//@route GET /api/products/:id @desc get  product by id @access public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  } else {
    return res.json("Not Found")
  }
})

// @route   POST /api/products  @desc Create a product @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "",
    countInStock: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()
  // console.log(createdProduct)
  res.status(201).json(createdProduct)
})

// @route   PUT /api/products/:id  @desc Edit a product @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error("Product Not Found")
  } else {
    const { name, price, description, image, brand, category, countInStock } =
      req.body

    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  }
})

// @route   POST /api/products/:id/reviews  @desc add a review @access Private
export const createReview = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error("Product Not Found")
  } else {
    const alreadyReviewed = await product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Already reviewed by user")
    }
    const { rating, comment } = req.body

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json("Reviews Added")
  }
})

//@route DELETE /api/products/id @desc delete product @access private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (product) {
    await product.remove()
    res.json({
      message: "product deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
