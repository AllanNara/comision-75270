import mongoose from "mongoose";

const userCollections = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: Number
  // .......
})

const userModel = mongoose.model(userCollections, userSchema);

export default userModel
