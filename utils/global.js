// Description: Global utility functions.
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export async function generateAccessToken(payload) {
  return jwt.sign(payload, accessTokenSecret)
}

export async function generateTempToken(payload) {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: "10m" })
}

export async function extractMetadata(headers) {
  const contentType = headers["content-type"]
  const fileType = contentType.split("/")[1]
  const contentDisposition = headers["content-disposition"] || ""
  const matches = /filename="([^"]+)"/i.exec(contentDisposition)
  const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`
  return fileName
}
