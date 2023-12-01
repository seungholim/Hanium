//module dependencies
const express = require('express');
const router = express.Router();

//ingredients
const ingredientsRoute = require('./ingredients/ingredientsRoute.js');
router.use('/ingredients', ingredientsRoute);

//users
const userRoute = require('./user/userRoute.js');
router.use('/user', userRoute);

//recipe
const recipeRoute = require('./recipe/recipeRoute.js');
router.use('/recipe', recipeRoute);

//refrigerator
const refrigeratorRoute = require('./refrigerator/refrigeratorRoute.js');
router.use('/refrigerator', refrigeratorRoute);

//rating
const ratingRoute = require('./rating/ratingRoute.js');
router.use('/rating', ratingRoute);

//basket
const basketRoute = require('./basket/basketRoute.js');
router.use('/basket', basketRoute);

//IOT
const IOTRoute = require('./IOT/IOTRoute.js');
router.use('/IOT', IOTRoute);

//chatbot
const chatbotRoute = require('./chatbot/chatbotRoute.js');
router.use('/chatbot', chatbotRoute);

//exports
module.exports = router;