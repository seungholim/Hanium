exports.getTempHumi = async(user_idx) => {
    let sql = `
    SELECT temperature, humidity FROM tb_tempHumi WHERE user_idx = ${user_idx};
    `;
    return sql;
};

exports.getRefrigeratorImage = async(user_idx) => {
    let sql = `
    SELECT images FROM tb_refrigeratorImage WHERE user_idx = ${user_idx};
    `;
    return sql;
};