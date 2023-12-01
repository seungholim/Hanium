const express = require('express');
const router = express.Router();
const user = require('./users.js');

router.get('/getsigninlist', user.getsigninlist);

module.exports = router;