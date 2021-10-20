import bcrypt from "bcryptjs"

const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Alaa Abdo",
    email: "alaa@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Salah Mohsen",
    email: "salah@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
