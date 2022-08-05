const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    comments: String,
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    post_id: {
      type: ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
