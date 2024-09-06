// Description: Global utility functions.
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export function generateAccessToken(payload) {
  return jwt.sign(payload, accessTokenSecret)
}

export function generateTempToken(payload) {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "10m" })
}
