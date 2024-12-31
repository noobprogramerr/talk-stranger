const express = require('express');
const {isLoggedIn} = require('../middleware/isLoggedIn.js')
const router = express.Router();
const {
  signup,
  signin,
  signout,
  sendForgotMail,
  forgotLinkOfEmail,
} = require('../controllers/authFunction.js');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout',isLoggedIn,signout);

// Send mail for forgot Password :- 
router.post('/sendForgotMail', sendForgotMail);

router.get('/user/forgotLinkOfEmail/:id', forgotLinkOfEmail);


module.exports = router;
