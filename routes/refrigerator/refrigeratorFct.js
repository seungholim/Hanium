//module dependencies
const sql = require('./refrigeratorSql.js');
const db = require('../config/dbConnection.js');

exports.getRefrigerator = async(user_idx) => {
    let sqlStr = await sql.getRefrigerator(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.getExpiratedIngredients = async(user_idx) => {
    let sqlStr = await sql.getExpiratedIngredients(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}