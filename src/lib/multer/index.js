const multer = require("multer");
const path = require("path"); 
const appRoot = require("app-root-path");

const avatarPath = path.join(appRoot.path, "public", "avatar");
const postPath = path.join(appRoot.path, "public", "post");

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarPath);
  },
  filename: function (req, file, cb) {
    const { username } = req.user;
    cb(null,`${username}-avatar.png`);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 10485760,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error("Please upload image file (jpg, jpeg, png)");
      return cb(error);
    }

    cb(null, true);
  },
});

const storageImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, postPath);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const uploadImg = multer({
  storage: storageImg,
  limits: {
    fileSize: 15485760,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error("Please upload image file (jpg, jpeg, png)");
      return cb(error);
    }

    cb(null, true);
  },
});


module.exports = { uploadAvatar, uploadImg };