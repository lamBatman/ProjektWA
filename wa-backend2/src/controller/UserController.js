const auth = require('./../Repository/Auth');
const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

exports.register = async (req,res) => {
    connection.run('INSERT INTO users (login, email, password, name, surname, gender, registered) VALUES (?,?,?,?,?,?,?)', [req.body.login,req.body.email,req.body.password,req.body.name,req.body.surname,req.body.gender,Date.now()], function (err, row) {
        if(err && err.message.includes("SQLITE_CONSTRAINT")){
            res.status(409).send("User with login " + req.body.login + " or email " + req.body.email + " already exists");
        }else if(err) throw err;
        else {
            res.status(201).send("1Created user with login: " + req.body.login);
        }
    });
};

exports.login = async (req,res) => {
    if(req.body.login.trim().length < 1 || req.body.password.trim().length < 1){
        res.status(400).send("Bad Input");
    }else {
        let vysl;
        await auth.isAuth(req.body, (result) => {
            vysl = result;
            if (vysl) {
                let token = auth.generateAccessToken(vysl);

                res.status(200).send({token: token});
            } else {
                res.status(401).send("Unathorized");
            }
        });
    }
};

exports.getUserById = (req,res) => {
    connection.get('SELECT * FROM users WHERE id_users=?', [Number(req.params.id)], (err, row) => {
        if (err) {
            throw err;
        }
        if(row !== false && row !== undefined){
            res.status(201).send(row);
        }else{
            res.status(404).send("Not found");
        }
    });
}

exports.getUserByLogin = (req,res) => {
    connection.get('SELECT * FROM users WHERE login=?', [req.params.login], (err, row) => {
        if (err) {
            throw err;
        }
        if(row !== false && row !== undefined){
            res.status(201).send(row);
        }else{
            res.status(404).send("Not found");
        }
    });
}

exports.updUserById = (req,res) => {
    const id = req.params.id;
    if(id !== null){
        connection.get('SELECT * FROM users WHERE id_users=?', [req.params.id], function (err, row) {
            if (err) {
                throw err;
            }
            if(row !== undefined && row !== null){
                connection.run('UPDATE users SET name=?,surname=?,gender=? WHERE id_users=?', [req.body.name,req.body.surname,req.body.gender,req.params.id], function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).send("Updated");
            }else{
                res.status(404).send("Not found");
            }
        });
    }else{
        res.status(400).send("Bad Input");
    }
}

