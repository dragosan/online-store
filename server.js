import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import user from "./routes/user.js"

const config = dotenv.config({ path: "./config/config.env" })
const app = express()

connectDB()

app.use(express.json())

//routes
app.use("/users", user)

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`)
)
