const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()


function generateAccessToken(data) {
    return jwt.sign({login: data.login,id: data.id_users,email: data.email}, process.env.TOKEN_SECRET, { expiresIn: '30m' });
}


function isAuth(data,callback){
    connection.get('SELECT * FROM users WHERE login=?', [data.login], function (err, row) {
        if (err) {
            throw err;
        }
        if(row !== undefined){
            if(row.password === data.password){
                callback(row);
            }else{
                callback(false);
            }
        }else {
            callback(false);
        }
    });
    console.log(callback);
}

module.exports = {generateAccessToken,isAuth};