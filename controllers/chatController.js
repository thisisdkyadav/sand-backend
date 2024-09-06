import { Chat } from "../models/chat.model.js"
import { User } from "../models/user.model.js"

export const getChats = async (req, res) => {
  try {
    // Logic to get chats
    const phone = req.phone

    const user = await User.findOne({ phone }).populate("chats")

    return res.status(200).json({
      message: "Chats fetched successfully",
      chats: user.chats,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting chats",
      error: error.message,
    })
  }
}

export const getChat = async (req, res) => {
  try {
    const { chatId } = req.body
    const phone = req.phone

    const chat = await Chat.findById(chatId)

    if (!chat) {
      return res.status(400).json({
        message: "Chat not found",
      })
    }

    if (!chat.participants.includes(phone)) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    return res.status(200).json({
      message: "Chat fetched successfully",
      chat,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting chat",
      error: error.message,
    })
  }
}

export const createChat = async (req, res) => {
  try {
    const { otherUsers } = req.body
    const phone = req.phone

    const participants = [phone, ...otherUsers]

    const user = await User.findOne({ phone }).populate("chats")

    const chat = user.chats.find((chat) => {
      const chatParticipants = chat.participants.map((participant) => participant.phone)
      return participants.every((participant) => chatParticipants.includes(participant))
    })

    if (chat) {
      return res.status(200).json({
        message: "Chat already exists",
        chat,
      })
    }

    const newChat = await Chat.create({ participants })
    let users = await User.find({ phone: { $in: participants } })

    users.map((user) => {
      user.chats.push(newChat._id)
    })

    await Promise.all(users.map((user) => user.save()))

    return res.status(200).json({
      message: "Chat created successfully",
      chat: newChat,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating chat",
      error: error.message,
    })
  }
}

export const updateSeenStatus = async (req, res) => {
  try {
    const phone = req.phone
    const { chatId, time } = req.body

    const chat = await Chat.findById(chatId)

    if (!chat) {
      return res.status(400).json({
        message: "Chat not found",
      })
    }

    if (!chat.participants.includes(phone)) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    if (!chat.seenStatus) {
      chat.seenStatus = new Map()
    }

    chat.seenStatus.set(phone, time)

    await chat.save()

    return res.status(200).json({
      message: "Seen status updated successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating seen status",
      error: error.message,
    })
  }
}
