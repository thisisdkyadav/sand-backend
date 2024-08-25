import express from "express"
import {
  getProfile,
  getRegisteredContacts,
  login,
  register,
} from "../controllers/userController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.route("/send-otp").post(register)
router.route("/verify").post(login)
router.route("/profile").get(isAuthenticated, getProfile)
router.route("/check-contacts").post(isAuthenticated, getRegisteredContacts)

export default router
