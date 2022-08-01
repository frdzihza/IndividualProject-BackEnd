const express = require("express");
const router = express.Router();
const Post = require("../../models/post")
const { auth } = require("../../helpers/auth");
const { uploadImg } = require("../../lib/multer");

const userPostController = async (req, res, next) => {
  try {
  const { caption, imagePostPath } = req.body;
  const newPost = new Post({
    caption,
    imagePost: imagePostPath,
    postId: req.user.userId,
  });
    const postSaved = await newPost.save();
    res.send({
      status: "Success",
      message: "Succes Create a post",
      data: postSaved,
    });
  } catch (error) {
    next(error);
  }
};

const postImageController = async(req, res, next) =>{
  try {
    const { caption } = req.body;
    const newPost = new Post({
      caption,
      imagePost: req.file.filename,
      postUserId: req.user.userId,
    });
    const postSaved = await newPost.save();
    res.send({
      status: "Success",
      message: "Succes Create a post",
      data: postSaved,
    });
  } catch (error) {
    next(error)
  }
}


const likedPost = async (req, res, next) => {
}


router.post("/", auth, userPostController)
router.post(
  "/uploadImage",
  auth,
  uploadImg.single("imagePost"),
  userPostController
);

module.exports = router;