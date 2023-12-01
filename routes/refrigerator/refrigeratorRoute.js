//module dependencies
const express = require('express');
const router = express.Router();
const recipe = require('./refrigerator.js');

router.get('/getRefrigerator', recipe.getRefrigerator);

router.get('/getExpiratedIngredients', recipe.getExpiratedIngredients);

module.exports = router;