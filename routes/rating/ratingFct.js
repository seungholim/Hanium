const db = require('../config/dbConnection');
const sql = require('./ratingSql');

exports.postRating = async(user_idx, recipe_idx, rating) => {
    let sqlStr = await sql.postRating(user_idx, recipe_idx, rating);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(0);
            else resolve(1);
        });
    });
}

exports.getRating = async(user_idx, recipe_idx) => {
    let sqlStr = await sql.getRating(user_idx, recipe_idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}