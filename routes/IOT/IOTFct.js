const db = require('../config/dbConnection');
const sql = require('./IOTSql');

exports.getTempHumi = async(user_idx) => {
    let sqlStr = await sql.getTempHumi(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.getRefrigeratorImage = async(user_idx) => {
    let sqlStr = await sql.getRefrigeratorImage(user_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}