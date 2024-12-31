const nodemailer = require('nodemailer');
const errorHandler = require('../utils/errorHandler.js');

exports.sendForgotLinkOnMail = (req, res, next, url) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.MAIL_ADMIN,
      pass: process.env.MAIL_ADMIN_PASSWORD,
    },
  });

  const mailOption = {
    from: 'Yadav Private Limited',
    to: req.body.email,
    subject: 'Password Reset Link 🔐',
    html: `<h1>You have requested to reset your password
</h1>
<a href="${url}">Click To Reset Password</a>
    `,
  };

  transport.sendMail(mailOption, (err, info) => {
    if (err) {
      return next(new errorHandler('Internal Server Error', 500));
    }

    console.log(info);

    return (res.status(200).json({
      message: 'Mail Send SuccessFully For Forgot Password.',
      urlToSetPassword: url,
    }));
  });
};