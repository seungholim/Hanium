//module dependencies
const sql = require('./userSql.js');
const db = require('../config/dbConnection.js');
const md5 = require('md5');

exports.chkId = async(id) => {
    let sqlStr = await sql.chkId(id);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(error);
            else{
                if(rows.length ==0) resolve(1);
                else resolve(0);
            }
        });
    });
};

exports.chkNickName = async(nickName) => {
    let sqlStr = await sql.chkNickName(nickName);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(error);
            else{
                if(rows.length == 0) resolve(1);
                else resolve(0);
            }
        });
    });
};

exports.signup = async(id, pw, nickName, userName, memNum) => {
    let sqlStr = await sql.signup(id, pw, nickName, userName, memNum);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(error);
            else resolve(1);
        });
    });
};

exports.getUser = async function(id){
    let sqlStr = await sql.getUser(id);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else {
                resolve(rows);
            }
        });
    });
}

exports.signin = async(id, pw) => {
    let pwSalt = 'sangsoonlee';
    pw = md5(pw + pwSalt);
    let sqlStr = await sql.signin(id, pw);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.updateToken = async(id, token) => {
    let sqlStr = await sql.updateToken(id, token);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(0);
            else resolve(1);
        });
    });
}