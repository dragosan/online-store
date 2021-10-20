import express from "express"
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js"
import { auth, admin } from "../middleware/auth.js"

const router = express.Router()

router.route("/").get(getUsers).post(register)
router.route("/login").post(authUser)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)

router
  .route("/:id")
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser)

export default router
