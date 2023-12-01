exports.postRating = async(user_idx, recipe_idx, rating) => {
    let sql =
    `
    INSERT INTO tb_rating (user_idx, recipe_idx, rating, rateDate)
    VALUES (${user_idx}, ${recipe_idx}, ${rating}, NOW());
    `;
    return sql;
}

exports.getRating = async(user_idx, recipe_idx) => {
    let sql = `
    SELECT * FROM tb_rating
        WHERE user_idx=${user_idx} AND recipe_idx=${recipe_idx}
			ORDER BY rateDate DESC LIMIT 1;
    `;
    return sql;
};