//module dependencies
const sql = require('./chatbotSql.js');

exports.getChatbot = async(keyword) => {
    return new Promise((resolve, reject) => {
        result = sql.getChatbot(keyword);
        console.log(result);
        resolve(result);
    });
}

/* exports.getChatbot = async(keyword) => {
    return new Promise((resolve, reject) => {
        sql.getChatbot(keyword, (error, result) => {
            console.log(error);
            console.log(result);
            if(error) reject(0);
            else {
                console.log(typeof(result));
                console.log(result);
                resolve(result);
            }
        });
    });
} */