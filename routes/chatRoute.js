import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createChat, getChats } from "../controllers/chatController.js"

const router = express.Router()

router.route("/getall").post(isAuthenticated, getChats)
router.route("/create").post(isAuthenticated, createChat)

export default router
