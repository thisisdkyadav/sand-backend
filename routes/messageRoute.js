import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { deleteMessage, sendMessage } from "../controllers/messageController.js"

const router = express.Router()

router.route("/send").post(isAuthenticated, sendMessage)
router.route("/delete").delete(isAuthenticated, deleteMessage)

export default router
