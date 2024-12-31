exports.generatedErrorBySystem = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

     if (err.name === 'MongoServerError' && err.message.includes("E11000 duplicate key error")) {
       err.message ='User With This Email Is Already Available In DataBase!';
     }

  const message = err.message || 'Internal Server Error';
  const errorName = err.name;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorName,
  });
};