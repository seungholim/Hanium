//module dependencies
const express = require('express');
const router = express.Router();
const rating = require('./rating.js');

router.post('/postRating', rating.postRating);

router.get('/getRating', rating.getRating);

module.exports = router;