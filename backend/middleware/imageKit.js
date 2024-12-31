var ImageKit = require('imagekit');
const dotenv = require('dotenv');
dotenv.config()

exports.applyImageKit = () => {
    var imagekit = new ImageKit({
      publicKey: process.env.PUBLICKEY_IMAGEKIT,
      privateKey: process.env.PRIVATEKEY_IMAGEKIT,
      urlEndpoint: process.env.URLENDPOINT_IMAGEKIT,
    });
    return imagekit;
};
