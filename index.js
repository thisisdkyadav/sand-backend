import express from "express"
import userRoute from "./routes/userRoute.js"
import appWrite from "node-appwrite"
import { app, server } from "./socket/socket.js"
import connectDB from "./utils/db.js"
import dotenv from "dotenv"

const port = process.env.PORT || 3000

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/user", userRoute)

const client = new appWrite.Client()

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66bce4a3001c2245957e")
  .setKey(
    "31470bd8443897f51f7b64efcbc51937bd669a329d50995a69278c545610205f3e6d23a32023fc83f0b9399be7ecdbed1e9f9e3569e5542d9c9a88c7369628b35e9985b74ee26d06f9677fc25d85908f34061f5272020909305769c0ba46e18401aedb975ef0a5cba4b1a40b790b44a1a774c05b53bdca959292c4ac85464a0b"
  )

app.get("/", (req, res) => {
  res.send("Hello World!")
})

server.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})
