const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const contentSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },

    imagePost: {
      type: String,
    },

    comment: [{
      type: ObjectId,
      ref: "Comment"
    }
  ],
    likers: {
      type: Array,
      default: [],
    },

    createdBy: {
      type: ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;