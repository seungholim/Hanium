exports.getBasket = async(user_idx) => {
    let sql = `
    SELECT * FROM tb_basket WHERE user_idx=${user_idx}
    `;
    return sql;
}

exports.postBasketToRefrigerator = async(user_idx, buyDate, shopping_list) => {
    let sql = ``;
    for (var i = 0; i < shopping_list.length; i++){
        sql +=
        `
        SELECT name, DATE_ADD('${buyDate}', INTERVAL expiration DAY) INTO @var1, @var2
            FROM tb_ingredients
            WHERE idx=${shopping_list[i].ingredients_idx};
    
        INSERT INTO tb_refrigerator (user_idx, ingredients_idx, ingredients_name, buyDate, expirationDate, expiration)
            VALUES (${user_idx}, ${shopping_list[i].ingredients_idx}, @var1, '${buyDate}', @var2, DATEDIFF(@var2, '${buyDate}'));
        `;
    }
    return sql;
}