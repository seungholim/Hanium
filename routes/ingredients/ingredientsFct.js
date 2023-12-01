//module dependencies
const db = require('../config/dbConnection');
const sql = require('./ingredientsSql');

exports.getIngredients = async(idx) => {
    let sqlStr = await sql.getIngredients(idx);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.searchIngredients = async(keyword) => {
    let sqlStr = await sql.searchIngredients(keyword);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}

exports.insertRefrigerator = async(user_idx, ingredients_idx, buyDate) => {
    let sqlStr = await sql.insertRefrigerator(user_idx, ingredients_idx, buyDate);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(0);
            else resolve(1);
        });
    });
}

exports.postIngredientsToBasket = async(user_idx, ingredients_idx, ingredients_name) => {
    let sqlStr = await sql.postIngredientsToBasket(user_idx, ingredients_idx, ingredients_name);
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error) => {
            if(error) reject(0);
            else resolve(1);
        });
    });
}


