import express from "express"

import {
  getProductById,
  getProducts,
  getTopProducts,
  createProduct,
  createReview,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js"
import { admin, auth } from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getProducts).post(auth, admin, createProduct)
router.route("/top").get(getTopProducts)

router
  .route("/:id")
  .get(getProductById)
  .put(auth, admin, updateProduct)
  .delete(auth, admin, deleteProduct)

router.route("/:id/reviews").post(auth, createReview)

export default router
