const express = require('express');
const {
  currentuser,
  homepage,
  resetPassword,
  likesImage,
  postImage,
  updateProfilePic,
  updateUserDetail,
} = require('../controllers/userFunction.js');
const { isLoggedIn } = require('../middleware/isLoggedIn.js');

const router = express.Router();

router.get('/', isLoggedIn, homepage);

//current user :-
router.get('/currentuser', isLoggedIn, currentuser);
//user update route :- 
router.post('/user/updatedetail/:id', isLoggedIn, updateUserDetail);

// reset password when user already logged In :- 
router.post('/user/reset-password',isLoggedIn,resetPassword)

// profile pic route  :- 
router.post('/user/profilepic/:id',isLoggedIn,updateProfilePic)

//image post route :-

router.post('/user/post',isLoggedIn, postImage);

//likes route for image :-
router.post('/user/likes/:postid', isLoggedIn, likesImage);



module.exports = router;
