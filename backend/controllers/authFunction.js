const User = require('../model/userModel.js');
const bcryptjs = require('bcryptjs');
const  errorHandler  = require('../utils/errorHandler.js');
const { catchAsyncError } = require('../middleware/catchAsyncError.js');
const { sendTokenJwt } = require('../utils/sendTokenJwt.js');
const { sendForgotLinkOnMail } = require('../middleware/nodeMailer.js');

exports.signup = catchAsyncError(async (req, res, next) => {
  let salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
  const newUser = await new User({
    email: req.body.email,
    name: req.body.name,
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    password: hashedPassword,
  });

  await newUser.save();

  sendTokenJwt(newUser, 201, res);

  res.json('User Created Successfully')
});

exports.signin = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
    .select('+password')
    .exec();

  if (!user) {
    return next(new errorHandler('User with this email is not available', 404));
  }

  const comparePassResult = user.comparePassword(req.body.password);

  // res.json(comparePassResult)

  if (!comparePassResult) {
    return next(new errorHandler('Password is not correct.', 401));
  }

  //    res.status(200).json('user login successfully');

  sendTokenJwt(user, 200, res);
});

exports.signout = catchAsyncError(async (req, res, next) => {
  res.clearCookie('token');

  res.json('User is logout or Sign Out!');
});

exports.sendForgotMail = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler('User with this email is not available', 404));
  }

  const url = `${req.protocol}://${req.get(
    'host'
  )}/backend/auth/user/forgotLinkOfEmail/${user._id}`;

  sendForgotLinkOnMail(req, res, next, url);

  user.resetPasswordKey = '1';
  await user.save();
    res.json({user,url});
});

exports.forgotLinkOfEmail = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({_id:req.params.id});
//   res.json(user);
   if (!user) {
     return next(
       new errorHandler('User with this email is not available', 404)
     );
   }
   if(user.resetPasswordKey === '1'){
 let salt = bcryptjs.genSaltSync(10);
 const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
 user.password = hashedPassword;
 user.resetPasswordKey = '0';
 await user.save();
   }
   else{
   return( next(new errorHandler('Reset Password Link is Expired.', 500)));
   }
});

