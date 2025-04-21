import mongoose from "mongoose"
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 500
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null // Null = komentar utama, non-null = reply
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {timestamps: true}
)

export default mongoose.model("comment", commentSchema)