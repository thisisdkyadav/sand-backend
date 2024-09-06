// import { Server } from "socket.io"
// import express from "express"
// import http from "http"

// const app = express()

// const server = http.createServer(app)

// const io = new Server(server)

// let userSocketMap = {}

// export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]

// io.on("connection", (socket) => {
//   console.log("socket io connected")

//   const userPhone = socket.handshake.query.phone
//   if (userPhone) {
//     userSocketMap[userPhone] = socket.id
//   }

//   // io.emit("")

//   io.emit("getOnlineUsers", userSocketMap)

//   socket.on("disconnect", () => {
//     if (userId) {
//       delete userSocketMap[userId]
//     }
//     io.emit("getOnlineUsers", userSocketMap)

//     // io.emit("getOnlineUsers", Object.keys(userSocketMap))
//   })
// })

// export { app, server, io }
