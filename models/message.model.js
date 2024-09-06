import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  localId: {
    type: String,
    required: false,
  },
})
export const Message = mongoose.model("Message", messageSchema)
