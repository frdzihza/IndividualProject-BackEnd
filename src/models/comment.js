const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
