const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    name: {
      type: String,
      minlength: 3, // Minimum length of 5 characters
      required: true,
    },
    username: {
      type: String,
      unique: true,
      minlength: 5, // Minimum length of 5 characters
      maxlength: 30,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
      select: false,
      //   match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,'special/number/capital'],
      minlength: 5, // Minimum password length (adjust as needed)
    },

    resetPasswordKey: {
      type: String,
      default: '0',
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    profilepic: {
      type: Object,
      default: {
        fileId: "",
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbNlDeOEF9mbaBzWL9K2QHPPkofVOU-FLDwj_7bPMGgcd8JIhIJhoppJy4WwVXFd3BH8&usqp=CAU',
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
