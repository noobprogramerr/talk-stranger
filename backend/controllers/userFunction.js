const { catchAsyncError } = require('../middleware/catchAsyncError.js');
const postModel = require('../model/postModel.js');
const User = require('../model/userModel.js');
const errorHandler = require('../utils/errorHandler.js');
const bcryptjs = require('bcryptjs');
const imageKit = require('../middleware/imageKit.js').applyImageKit();
const path = require('path');
// const methodOverride = require('method-override');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { sendTokenJwt } = require('../utils/sendTokenJwt.js');

exports.homepage = catchAsyncError(async (req, res, next) => {
  const loginUser = await User.findById(req.id);

  const allPost = await postModel.find().sort({ likes: -1 }).populate('userid');

  res.json(allPost);

  //   res.json({
  //     message: 'hello homepage',
  //   });
});

exports.currentuser = catchAsyncError(async (req, res, next) => {
  const userCurrent = await User.findById(req.id);

  res.json(userCurrent);
});

exports.updateUserDetail = catchAsyncError(async (req, res, next) => {
 const user = await User.findByIdAndUpdate(req.id, req.body, {
   new: true,
   useFindAndModify: false,
 });
 
//  res.json(user);
 res.status(200).json({
    success:true,
    message:"User Detail Updated!",
    user
 })
  
});


exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  res.json(user);
  let salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();
  sendTokenJwt(user, 200, res);
});

exports.updateProfilePic = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  // res.json({user,file:req.files})
  const file = req.files.file;
  const modifiedNameOfFile = Math.random() * 10000 * Date.now() + path.extname(file.name);
//   res.json(file);
  //   "mimetype": "image/png",
if(user.profilepic.fileId !== ""){
    await imageKit.deleteFile(user.profilepic.fileId);
}

  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
   const { fileId, url } = await imageKit.upload({
      file: file.data,
      fileName: modifiedNameOfFile,
      folder: process.env.FOLDERPATH_IMAGEKIT,
    });
    user.profilepic = { url, fileId };
   await user.save()
    res.status(200).json({
        success:true,
        message:"User Profile Pic Updated Successfully"
    })
    // res.json(imageInfo) yh upload function ko chala na baad milta hai { fileId, url } in ki jaga bs imageInfo likh dena.
  } else {
    return( next(new errorHandler('Image Type Is Not Supported.', 500)));
  }

//   res.json({user})
});

exports.postImage = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
//   res.json(user)
const file = req.files.file;
//  res.json({file});

const modifyNameOfPostImage = `post-${Math.random()*100000}*${Date.now()}+${path.extname(file.name)}`

const {fileId,url} = await imageKit.upload({
  file: file.data,
  fileName: modifyNameOfPostImage,
  folder: process.env.FOLDERPATH_FOR_POST_IMAGEKIT,
});

// res.json(imageDetail)

  const newPost = await new postModel({
    userid: user._id,
    image:{fileId,url}
  });
  await newPost.save()
  user.posts.push(newPost._id)
  await user.save()
  
res.status(200).json({
    success:true,
    message:"Your Post Uploaded Successfully!"
})

});

//likes :-
exports.likesImage = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.id);
  //   res.json(user)
  const postFound = await postModel
    .findOne({ _id: req.params.postid })
    .populate('userid');
  //   res.json(postFound)
  if (postFound.likes.indexOf(user._id) === -1) {
    postFound.likes.push(user._id);
  } else {
    postFound.likes.splice(user._id, 1);
  }

  await postFound.save();
  // postFound.populate('userid')
  res.json({ postFound, user });
});
