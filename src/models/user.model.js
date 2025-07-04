import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ["admin", "author", "reader"], // Diperbaiki
    default: "reader" // "buyer" diubah ke "reader"
  },
  avatar: {
    type: String,
    default: null
  },
  status: {
    type: Boolean,
    default: true
  },
  refreshToken: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.index({email: 1, name: 1})
export default mongoose.model("user", userSchema)
