exports.expirationCounter = async() => {
    let sql = `
    UPDATE tb_refrigerator SET expiration=expiration-1
        WHERE expiration IS NOT NULL;
		DELETE FROM tb_refrigerator WHERE expiration=0;
    `;
    return sql;
};

exports.refrigeratorUser = async() => {
    let sql = `
    SELECT DISTINCT user_idx, token FROM tb_refrigerator LEFT JOIN tb_user ON user_idx=idx WHERE expiration=1
    `;
    return sql;
};

exports.refrigeratorIngredients = async(user_idx) => {
    let sql = `
    SELECT GROUP_CONCAT(ingredients_name) AS ingredients_name FROM tb_refrigerator WHERE user_idx=${user_idx}
    `;
    return sql;
};

