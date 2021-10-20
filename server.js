import path from "path"
import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

import connectDB from "./config/db.js"
import user from "./routes/user.js"
import product from "./routes/product.js"
import order from "./routes/order.js"
import upload from "./routes/upload.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js"

dotenv.config({ path: "./config/config.env" })
const app = express()
app.use(express.json())

connectDB()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//routes
app.use("/api/users", user)
app.use("/api/products", product)
app.use("/api/orders", order)
app.use("/api/upload", upload)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("Api is running")
  })
}

//error handle
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`)
)
