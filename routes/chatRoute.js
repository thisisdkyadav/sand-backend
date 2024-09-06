import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createChat, getChat, getChats, updateSeenStatus } from "../controllers/chatController.js"

const router = express.Router()

router.route("/getall").get(isAuthenticated, getChats)
router.route("/create").post(isAuthenticated, createChat)
router.route("/get").post(isAuthenticated, getChat)
router.route("/update-seen-status").post(isAuthenticated, updateSeenStatus)

export default router
