const express = require("express");
const router = express.Router();
const Comment = require("../../models/comment")
const Post = require("../../models/post");
const { auth } = require("../../helpers/auth");


const commentPostController = async (req, res, next) => {
  try {
    const {comments} = req.body;
    const newComment = new Comment({
      comments,
      createdBy: req.user.userId,
    });
    const commentSaved = await newComment.save();

    const post = await Post.findById(req.body.postId);
    await post.updateOne({ $push: { comment: commentSaved } }, { new: true });
    res.send({
      status: "Success",
      message: "Succes Create a post",
      data: commentSaved,
    });
  } catch (error) {
    next(error);
  }
};

const getCommentController = async (req, res, next) =>{
  try{
  const comments = await Comment.find({ postId: req.params.id })
      .populate("createdBy", "_id username profilePicture")
    res.send({
      status: "Success",
      message: "Success get a comment",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

router.post("/commentPost", auth, commentPostController)
router.get("/:id", auth, getCommentController);


module.exports = router