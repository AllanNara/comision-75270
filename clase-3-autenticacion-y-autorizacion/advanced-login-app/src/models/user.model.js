import { model, Schema } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: String,
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true
  },
  avatar: String
})

const userModel = model("users", userSchema);

export default userModel


