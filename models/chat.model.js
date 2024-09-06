import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
    },
  ],
  //default value of seenStatus is {}
  seenStatus: {
    type: Map,
    of: Date,
  },
})
export const Chat = mongoose.model("Chat", chatSchema)
