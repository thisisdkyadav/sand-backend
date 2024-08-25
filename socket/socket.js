import { Server } from "socket.io"
import express from "express"
import http from "http"

const app = express()

const server = http.createServer(app)

const io = new Server(server)

const userSocketMap = {}

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]

io.on("connection", (socket) => {
  console.log("socket io connected")

  const userPhone = socket.handshake.query.userPhone
  if (userPhone) {
    userSocketMap[userPhone] = socket.id
  }

  // io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId]
    }
    // io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

export { app, server, io }
