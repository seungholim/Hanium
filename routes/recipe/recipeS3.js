const multer = require('multer');
const multerS3 = require('multer-s3');

const FileInformation = require('../config/s3.js');

exports.uploadImage = multer({ storage: multerS3(new FileInformation('foot-bucket', 'public-read-write')) });