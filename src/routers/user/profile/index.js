const express = require("express");
const { auth } = require("../../../helpers/auth");
const router = express.Router();
const User = require("../../../models/user.js");
const { uploadAvatar } = require("../../../lib/multer");

const getUserProfileController = async (req, res, next) =>{
    try{

        const userProfile = await User.findById(req.user.userId);


        if (!userProfile) {
          throw {
            code: 404,
            message: `Can not found this Profile`,
          };
        }
        res.send({
          status: "Success",
          message: "Get Profile Success",
          data: {
            result: 
            userProfile
          },
        });
    }catch (error){
        next(error)
    }
}

const userPatchProfileController = async (req, res, next) =>{
  try {
  const userPatch = await User.findById({ $ne: req.user.userId }); 
        if (userPatch.username == req.body.username) {
          throw {
            message: "Username is already exists",
          };
        }
        await User.findByIdAndUpdate(
          req.user.userId,
          {
            $set: req.body,
          },
        );
        console.log(userPatch)

        res.send({
          status: "success",
          message: "Success updating user",
        });
    } catch (error) {
      next(error);
    }
  }


const userPatchAvatarProfileController = async (req, res, next) =>{
 try {
      const { filename } = req.file;
      const avatarFileName = `/public/avatar/${filename}`;
      await User.findByIdAndUpdate(
        req.user.userId,
        {
          profilePicture: avatarFileName,
        },
      );
      res.send({
        status: "success",
        message: "Success updating avatar",
      });
    } catch (error) {
      next(error);
    }
  }

router.get("/profile", auth, getUserProfileController);
router.patch("/profileUpdate", auth, userPatchProfileController)
router.patch(
  "/avatar",
  auth,
  uploadAvatar.single("avatar"),
  userPatchAvatarProfileController
);

module.exports = router;