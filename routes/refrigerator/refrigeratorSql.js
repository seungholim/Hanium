exports.getRefrigerator = async(user_idx) => {
    let sql = `
    SELECT * FROM tb_refrigerator WHERE user_idx=${user_idx}
    `;
    return sql;
};

exports.getExpiratedIngredients = async(user_idx) => {
    let sql = `
    SELECT * FROM tb_refrigerator WHERE user_idx=${user_idx} AND expiration<5;
    `;
    return sql;
};