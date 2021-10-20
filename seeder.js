import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/User.js"
import Product from "./models/Product.js"
import Order from "./models/Order.js"
import connectDB from "./config/db.js"

dotenv.config({ path: "./config/config.env" })
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const admin = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: admin }
    })
    await Product.insertMany(sampleProducts)
    console.log("Data Imported Successfully!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed Successfully!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
