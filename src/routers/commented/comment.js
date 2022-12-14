const express = require("express");
const router = express.Router();
const Comment = require("../../models/comment")
const Post = require("../../models/post");
const { auth } = require("../../helpers/auth");


const commentPostController = async (req, res, next) => {
  try {
    const {comments, post_id} = req.body;
    const newComment = new Comment({
      comments,
      post_id,
      createdBy: req.user.userId,
    });
    const commentSaved = await newComment.save();

    const post = await Post.findById(post_id);
    await post.updateOne({ $push: { comment: commentSaved } }, { new: true })
    res.send({
      status: "Success",
      message: "Succes Create a comment",
      data: commentSaved,
    });
  } catch (error) {
    next(error);
  }
};

const getCommentController = async (req, res, next) =>{
  try{
    let { paginate, paginatePost } = req.query;
    const limit = paginatePost;
    const offset = (paginate - 1) * paginatePost;
    const commentLength = await Post.find();
  const commented = await Comment.find({ post_id: req.params.id })
  .populate(
    "createdBy",
    "_id username profilePicture fullName"
    )
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(offset);
    res.send({
      status: "Success",
      message: "Success get a comment",
      data: commented,
      length: commentLength.length
    });
  } catch (error) {
    next(error);
  }
};

router.post("/", auth, commentPostController)
router.get("/:id", auth, getCommentController);


module.exports = router