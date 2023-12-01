// Load the SDK for JavaScript
const AWS = require('aws-sdk');

// Set the Region 
AWS.config.update({ region: 'ap-northeast-2' });

// Create S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const path = require('path');

module.exports = function FileInformation(bucket, acl, contentType) {
    this.s3 = s3
    this.bucket = bucket;
    this.key = (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        cb(null, `${file.fieldname}/${basename} - ${Date.now()}${extension}`);
    };
    this.contentType = contentType;
    this.acl = acl;
    this.serverSideEncryption = 'AES256';
}

/* s3.listObjectsV2({ Bucket: 'foot-bucket' }, (err, data) => {
    if (err) {
        throw err;
    } else {
        let arr = [];
        let contents = data.Contents;
        contents.forEach(content => arr.push(content.Key));
        console.log({ dataList: arr });
    }
}); */