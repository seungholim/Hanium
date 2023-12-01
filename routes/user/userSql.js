exports.chkId = async(id) => {
    let sql =
    `
    SELECT id FROM tb_user WHERE id = '${id}'
    `;

    return sql;
};

exports.chkNickName = async(nickName) => {
    let sql =
    `
    SELECT nickName FROM tb_user WHERE nickName = '${nickName}'
    `;

    return sql;
};

exports.signup = async(id, pw, nickName, userName, memNum) => {
    let sql =
    `
    INSERT INTO tb_user (id, pw, nickName, userName, memNum)
    VALUES ('${id}', '${pw}', '${nickName}', '${userName}', ${memNum})
    `;
    return sql;
};

exports.getUser = async(id) => {
    let sql =
    `
    SELECT 

    ifnull(idx,'') AS idx,
    ifnull(id,'') AS id,
    ifnull(nickName,'') AS nickName,
    ifnull(userName,'') AS userName,
    ifnull(memNum,'') AS memNum,
    ifnull(token,'') AS token,
    ifnull(fstLoginDatetime,'') AS fstLoginDatetime,
    ifnull(lstLoginDatetime,'') AS lstLoginDatetime

    FROM tb_user WHERE id = '${id}'
    `;
    return sql;
}

exports.signin = async(id, pw) => {
    let sql =
    `
    SELECT id, pw FROM tb_user
    WHERE id = '${id}' AND pw = '${pw}'
    `;
    return sql;
}

exports.updateToken = async(id, token) => {
    let sql =
    `
    UPDATE tb_user 
    SET fstLoginDatetime = if(fstLoginDatetime = '0000-00-00 00:00:00', NOW(), fstLoginDatetime),
    lstLoginDatetime = NOW(),
    token = '${token}'
    WHERE id = '${id}'
    `;
    return sql;
}