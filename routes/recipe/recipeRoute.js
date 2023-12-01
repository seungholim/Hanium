//module dependencies
const express = require('express');
const router = express.Router();
const recipe = require('./recipe.js');
const recipeS3 = require('./recipeS3.js');

router.get('/getRecipe', recipe.getRecipe);

router.get('/getIngredientsInRecipe', recipe.getIngredientsInRecipe);

router.get('/getRecommendedRecipe', recipe.getRecommendedRecipe);

router.post('/postRecipe',
recipeS3.uploadImage.fields([{ name: 'titleImage', maxCount: 1 }, { name: 'descriptionImage' }]),
recipe.postRecipe);

router.get('/searchRecipe', recipe.searchRecipe);

router.post('/postRecipeToBasket', recipe.postRecipeToBasket);

module.exports = router;