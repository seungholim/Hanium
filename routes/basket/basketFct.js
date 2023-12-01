//module dependencies
const db = require('../config/dbConnection');
const sql = require('./basketSql');

exports.getBasket = async(user_idx) => {
    let sqlStr = await sql.getBasket(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.postBasketToRefrigerator = async(user_idx, buyDate, shopping_list) => {
    let sqlStr = await sql.postBasketToRefrigerator(user_idx, buyDate, shopping_list);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(0);
            else resolve(1);
        });
    });
};