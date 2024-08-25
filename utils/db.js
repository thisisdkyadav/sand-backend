import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://inrowmail:dkyadav458@instaclone.9o8nb.mongodb.net/?retryWrites=true&w=majority&appName=instaclone"
    )
    console.log("mongodb connected successfully.")
  } catch (error) {
    console.log(error)
  }
}
export default connectDB
