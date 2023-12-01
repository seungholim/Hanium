//module dependencies
const sql = require('./pushSql.js');
const db = require('../routes/config/dbConnection.js');

exports.expirationCounter = async() => {
    let sqlStr = await sql.expirationCounter();
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.refrigeratorUser = async() => {
    let sqlStr = await sql.refrigeratorUser();
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.refrigeratorIngredients = async(user_idx) => {
    let sqlStr = await sql.refrigeratorIngredients(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}