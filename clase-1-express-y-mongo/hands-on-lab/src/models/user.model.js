import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String
  },
  last_name: {
    required: true,
    type: String
  },
  email: {
    type: String,
    unique: true,
    index: true
  }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel
