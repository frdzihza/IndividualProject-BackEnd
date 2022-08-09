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
    createdBy: req.user.userId,
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

const getPost = async (req, res, next) => {
  try {
  const posted = await Post.findById(req.params.id)
    .populate({ path: "comment" })
    .populate("createdBy", "_id username profilePicture fullName");
  res.send({
    status: "success",
    message: "Success get a post",
    data: {
      posted,
    }
  });
} catch(error){
  next(error)
}
}

const likePost = async (req, res, next) =>{
  try {
    const post = await Post.findById(req.params.id)
    if(!post.likers.includes(req.body.userId)) {
      await post.updateOne ({$push: {likers: req.body.userId}})
      res.send({
        status: "success",
        message: "Like Success"
      })
    } else {
      await post.updateOne({ $pull: { likers: req.body.userId } });
      res.send({
        status: "success",
        message: "Dislike Success",
      });
    }

  } catch (error) {
  next(error)    
  }
}

const postPatchController = async (req, res, next) => {
  try {
    const postPatch = await Post.findById(req.params.id);
    if (postPatch.createdBy.toString() === req.user.userId) {
      await postPatch.updateOne({ $set: req.body });
      res.send({
        status: "success",
        message: "Success updating post",
      });
    } else {
      throw {
        code: 404,
        message: `Can not found the post`,
      };
    }
  } catch (error) {
    next(error);
  }
};


const deletePostController = async (req, res, next) => {
  try {
    const postDelete = await Post.findById(req.params.id);
    if (postDelete.createdBy.toString() === req.user.userId) {
      await postDelete.deleteOne({ _id: req.params.id });
      res.send({
        status: "success",
        message: "Success delete a post",
      });
    } else {
      throw {
        code: 404,
        message: `Can not found the post`,
      };
    }
  } catch (error) {
    next(error);
  }
};
const getAllPost = async (req, res, next) =>{
  try {
   let {paginate, paginatePost} = req.query
   const limit = paginatePost
   const offset = (paginate - 1) * paginatePost
   const postLength = await Post.find()
   const posted = await Post.find()
     .populate("createdBy", "_id username profilePicture fullName")
     .sort({ createdAt: -1 })
     .limit(limit)
     .skip(offset);


    if (!posted){
      throw{
        message: "Post not found"
      }
    } else {
      res.send({
      status: "Success",
      message: "Success get all post",
      data: posted,
      length: postLength.length
    })
  }
 } catch (error) {
    next(error)
  }
}

router.post("/", auth, userPostController)
router.post(
  "/uploadImage",
  auth,
  uploadImg.single("imagePost"),
  userPostController
);
router.patch("/:id", auth, postPatchController);
router.delete("/:id", auth, deletePostController);
router.put("/like/:id", auth, likePost )
router.get("/:id", getPost)
router.get("/timeline/all", getAllPost);
module.exports = router;