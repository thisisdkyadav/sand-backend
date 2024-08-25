// Description: Global utility functions.
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET =
  "b218e3f22615945db84564fd9054ce094b42f6ee801c63d025ddbcb95b98c142d976210fd3b60f7e70de091081efc3f4b9cc7c41d079639af2d0c3a9421e9bba"

const accessTokenSecret = ACCESS_TOKEN_SECRET

export function generateAccessToken(phone) {
  return jwt.sign(phone, accessTokenSecret)
}

export function generateTempToken(item) {
  return jwt.sign(item, accessTokenSecret, { expiresIn: "10m" })
}
