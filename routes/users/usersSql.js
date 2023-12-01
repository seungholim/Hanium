exports.getsigninlist = async() => {
    let sql = 
    `
    SELECT idx, id, nickName, userName FROM tb_user
    `
    return sql;
}