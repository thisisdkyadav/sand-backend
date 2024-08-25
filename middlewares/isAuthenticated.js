import jwt from "jsonwebtoken"
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      })
    }
    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decode) {
      return res.status(401).json({
        message: "Invalid",
        success: false,
      })
    }
    req.phone = decode
    next()
  } catch (error) {
    console.log(error)
  }
}
export default isAuthenticated
