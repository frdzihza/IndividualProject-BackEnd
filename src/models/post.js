const mongoose = require("mongoose");


const contentSchema = new mongoose.Schema(
{
    caption:{
        type: String,

    },

    imagePost:{
        type: String,
    },

    comment:{
        type: String,
    },

    like:{
        type: Array,
        default: []
    },

    postId:{
        type: String,
    },
},
    {
    timestamps: true,
    }
)

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;