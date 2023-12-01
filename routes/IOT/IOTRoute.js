//module dependencies
const express = require('express');
const router = express.Router();
const IOT = require('./IOT.js');

router.get('/getTempHumi', IOT.getTempHumi);

router.get('/getRefrigeratorImage', IOT.getRefrigeratorImage);

module.exports = router;