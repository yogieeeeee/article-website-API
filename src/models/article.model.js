import mongoose from "mongoose"
const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: {
      type: String,
      default: "/default-article.jpg"
    },
    categories: {
      type: [String],
      enum: ["Technology", "Business", "Travel", "Food", "Other"],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    views: {
      type: Number,
      default: 0
    }
  },
  {timestamps: true}
)

export default mongoose.model("article", articleSchema)
