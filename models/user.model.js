import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
)
export const User = mongoose.model("User", userSchema)
