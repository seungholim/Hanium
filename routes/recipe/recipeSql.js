exports.getRecipeList = async() => {
    let sql = `
    SELECT idx, title, titleImage FROM tb_recipe
    `
    return sql;
}

exports.getRecipe = async(idx) => {
    let sql = `
    SELECT * FROM tb_recipe WHERE idx=${idx}
    `;
    return sql;
}

exports.getRecipeIngredients = async(idx) => {
    let sql = `
    SELECT ingredients_idx, name, quantity, ingredientCategory
    FROM tb_recipeingredients WHERE recipe_idx=${idx}
    `;
    return sql;
}

exports.getRecipeDescription = async(idx) => {
    let sql = `
    SELECT descriptionNbr, description, descriptionImage
    FROM tb_recipedescriptions WHERE recipe_idx=${idx}
    ORDER BY descriptionNbr
    `;
    return sql;
}

exports.getIngredientsInRecipe = async(idx) => {
    let sql = `
    SELECT * FROM tb_ingredients WHERE idx=${idx}
    `;
    return sql;
}

exports.getRecommendedRecipe = async(idx) => {
    let sql = `
    SELECT DISTINCT recipe_idx, title, titleImage,
	CASE
		WHEN recipe_idx
		IN (SELECT recipe_idx FROM tb_recipeingredients
			LEFT JOIN tb_refrigerator
			ON tb_recipeingredients.ingredients_idx=tb_refrigerator.ingredients_idx
			WHERE user_idx=${idx} AND expiration<4)
		THEN 1
		ELSE 2
		END AS priority
	FROM tb_recipe
	LEFT JOIN tb_recipeingredients
		ON idx=recipe_idx
	LEFT JOIN tb_refrigerator
		ON tb_recipeingredients.ingredients_idx=tb_refrigerator.ingredients_idx
	ORDER BY priority, recipe_idx
    `;
    return sql;
}

exports.postRecipe = async(recipe, ingredients, description, titleImage, descriptionImage) => {
    let sql =
    `
    INSERT INTO tb_recipe (title, titleImage, summary, cookingTime, servings, difficulty, user_idx, regDatetime, editDatetime)
    VALUES ('${recipe[0].title}', '${titleImage}', '${recipe[0].summary}', '${recipe[0].cookingTime}', '${recipe[0].servings}', '${recipe[0].difficulty}', ${recipe[0].user_idx}, NOW(), NOW());
    SET @last_idx = LAST_INSERT_ID();
    `;

    let i = 0;
    let j = 0;
    //recipeIngredients
    sql += 
    `
    INSERT INTO
    tb_recipeingredients (recipe_idx, ingredients_idx, name, quantity, ingredientCategory)
    VALUES
    `
    while (i < ingredients.length - 1) {   
        sql += 
        `
            (@last_idx, '${ingredients[i].ingredients_idx}', '${ingredients[i].name}', '${ingredients[i].quantity}', '${ingredients[i].ingredientCategory}'),
        `;
        i += 1;
    }
    sql += 
    `
    (@last_idx, '${ingredients[i].ingredients_idx}', '${ingredients[i].name}', '${ingredients[i].quantity}', '${ingredients[i].ingredientCategory}');
    `
    //recipeDescription
    sql += 
    `
    INSERT INTO
    tb_recipedescriptions (recipe_idx, descriptionNbr, description, descriptionImage)
    VALUES
    `;
    while(j < description.length - 1)
    {
        sql += 
        `
        (@last_idx, ${description[j].descriptionNbr}, '${description[j].description}', '${descriptionImage[j]}'),
        `;
        j+=1;
    }
    sql += 
    `
    (@last_idx, ${description[j].descriptionNbr}, '${description[j].description}', '${descriptionImage[j]}');
    `;
    return sql;
}

exports.searchRecipe = async(keyword) => {
    sql = `
    SELECT distinct idx, title, titleImage FROM tb_recipe
    LEFT JOIN tb_recipeingredients
    ON idx=recipe_idx
    WHERE title LIKE '%${keyword}%'
    OR NAME LIKE '%${keyword}%'
    `;
    return sql;
}

exports.postRecipeToBasket = async(user_idx, recipe_idx) => {
    sql = `
    SET @var1 = ${user_idx};
    INSERT INTO tb_basket (user_idx, ingredients_idx, ingredients_name)
        SELECT DISTINCT @var1, ingredients_idx, tb_ingredients.name FROM tb_ingredients
            LEFT JOIN tb_recipeingredients ON idx=ingredients_idx
            WHERE recipe_idx=${recipe_idx}
                    AND ingredients_idx
                        NOT IN (
                            SELECT ingredients_idx FROM tb_refrigerator
                                WHERE user_idx=${user_idx}
                        );
    `;
    return sql;
}