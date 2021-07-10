require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET
}
