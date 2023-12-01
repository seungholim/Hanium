exports.getIngredients = async(idx) => {
    let sql = ``;
    if(idx === undefined) {
        sql =
        `
        SELECT idx, name FROM tb_ingredients
        `    
    } else {
        sql =
        `
        SELECT * FROM tb_ingredients WHERE idx=${idx}
        `;
    }
    return sql;
};

exports.searchIngredients = async(keyword) => {
    sql = `
    SELECT idx, name FROM tb_ingredients WHERE NAME LIKE '%${keyword}%';
    `;
    return sql;
}

exports.insertRefrigerator = async(user_idx, ingredients_idx, buyDate) => {
    let sql =
    `
    SELECT name, DATE_ADD('${buyDate}', INTERVAL expiration DAY) INTO @var1, @var2 FROM tb_ingredients WHERE idx=${ingredients_idx};

    INSERT INTO tb_refrigerator (user_idx, ingredients_idx, ingredients_name, buyDate, expirationDate, expiration)
    VALUES (${user_idx}, ${ingredients_idx}, @var1, '${buyDate}', @var2, DATEDIFF(@var2, '${buyDate}'));
    `;
    return sql;
}

exports.postIngredientsToBasket = async(user_idx, ingredients_idx, ingredients_name) => {
    let sql =
    `
    INSERT INTO tb_basket (user_idx, ingredients_idx, ingredients_name)
        VALUES (${user_idx}, ${ingredients_idx}, '${ingredients_name}')
    `;
    return sql;
}