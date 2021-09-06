import User from "../models/User.js"

//@route GET /api/users @desc get all users @access private/admin
export const getUsers = async (req, res) => {
  const users = await User.find({})
  return res.json(users)
}
