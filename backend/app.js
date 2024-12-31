const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/index.js');
const userAuthRoutes = require('./routes/auth.js')
const logger = require('morgan');
const { generatedErrorBySystem } = require('./middleware/error.js');
const { errorHandler } = require('./utils/errorHandler.js');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(logger('tiny'));
//This is for activating body parser :- 12 and 13 line.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie parser ;-
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(cookieParser());
const fileupload = require('express-fileupload');
app.use(fileupload())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected To MongoDB DataBase !');
  })
  .catch((err) => {
    console.log(err);
  });

//  Normal routes
app.use('/backend/index', userRouter);

//user login and sign up
app.use('/backend/auth', userAuthRoutes);

//error handle ;-

app.all('*', (req, res, next) => {
  next(new errorHandler(`Requested Url Is Not Found ${req.url}`, 404));
});
app.use(generatedErrorBySystem);

app.listen(8080, () => {
  console.log('Congratulation Your Server Is Runing on 8080......');
});
