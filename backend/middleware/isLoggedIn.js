const errorHandler  = require('../utils/errorHandler.js');
const { catchAsyncError } = require('./catchAsyncError.js');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler('Please Login To Use The Resource!', 401));
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  req.id = id;

  // res.json(req.id)

  // res.json({id,token})

  next();
});
