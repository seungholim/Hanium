//module dependencies
const express = require('express');
const router = express.Router();
const chatbot = require('./chatbot.js');

router.get('/getChatbot', chatbot.getChatbot);

module.exports = router;