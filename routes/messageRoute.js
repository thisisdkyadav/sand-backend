import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteMessage, getAllMessages } from "../controllers/messageController.js"

const router = express.Router()

// router.route("/send").post(isAuthenticated, sendMessage)
router.route("/delete").delete(isAuthenticated, deleteMessage)
router.route("/getall").get(isAuthenticated, getAllMessages)

export default router
