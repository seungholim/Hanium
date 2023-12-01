const db = require('../config/dbConnection');
const sql = require('./usersSql');


exports.getsigninlist = async() => {
    let sqlStr = await sql.getsigninlist();
    return new Promise((resolve, reject) => {
        db.query(sqlStr, (error, rows) => {
            if(error) reject(0);
            else resolve(rows);
        });
    });
}