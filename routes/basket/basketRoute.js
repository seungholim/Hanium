//module dependencies
const express = require('express');
const router = express.Router();
const basket = require('./basket.js');

router.get('/getBasket', basket.getBasket);

router.post('/postBasketToRefrigerator', basket.postBasketToRefrigerator);

module.exports = router;