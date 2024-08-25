// Description: This file contains the logic for user related operations.
import { User } from "../models/user.model.js"
import { getAccount, sendOtp, verify } from "../utils/appwrite.js"
import { generateAccessToken } from "../utils/global.js"

export const register = async (req, res) => {
  console.log("sdsdsd")

  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      })
    }

    const user = await User.findOne({ phone })
    if (!user) {
      await User.create({ phone })
    }
    await sendOtp(phone)

    // const tempToken = generateTempToken(phone)

    return res.status(200).json({
      message: "OTP sent",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in sending otp",
      error: error.message,
    })
  }
}

export const login = async (req, res) => {
  const { otp, phone } = req.body

  const userId = phone.replace("+", "")
  const otpCorrect = await verify(userId, otp)

  if (!otpCorrect) {
    return res.status(400).json({
      message: "Invalid OTP",
    })
  }

  const accessToken = generateAccessToken(phone)

  return res.status(200).json({
    message: "User login - POST req",
    accessToken,
  })
}

// export const logout = async (req, res) => {
//   const session = await signOut()
//   return res.status(200).json({
//     message: "User logout - GET req",
//     session,
//   })
// }

export const getProfile = async (req, res) => {
  try {
    const phone = req.phone
    // query user without messages and chats
    const user = User.findOne({ phone }).select("-messages -chats")

    return res.status(200).json({
      message: "User profile - GET req",
      user,
    })
  } catch {
    return res.status(500).json({
      message: "Error in getProfile",
      error: error.message,
    })
  }
}

export const getRegisteredContacts = async (req, res) => {
  try {
    const { numbers } = req.body

    if (!numbers) {
      return res.status(400).json({
        message: "User contacts are required",
      })
    }

    const users = await User.find({ phone: { $in: numbers } }).select("phone")

    // registered Contacts as a list of numbers

    const registeredContacts = users.map((user) => user.phone)

    return res.status(200).json({
      message: "User contacts - GET req",
      registeredContacts,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in getRegisteredContacts",
      error: error.message,
    })
  }
}
