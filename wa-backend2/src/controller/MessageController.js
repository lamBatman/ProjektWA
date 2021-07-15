const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');
const jwt = require('jsonwebtoken');

exports.getMsg = (req,res) => {
    connection.all('SELECT * FROM messages LEFT JOIN users ON(id_users_from=users.id_users) WHERE id_rooms=?', [req.params.id], function (err, rows) {
        if (err) {
            throw err;
        }
        if(rows !== false && rows !== undefined){
            res.send(rows);
        }else{
            res.status(404).send("Not found");
        }
    });
}

exports.getMyMsg = (req,res) => {
    connection.all('SELECT * FROM messages LEFT JOIN users ON(id_users_from=users.id_users) WHERE id_users_to=?', [req.params.id], function (err, rows) {
        if (err) {
            throw err;
        }
        if(rows !== false && rows !== undefined){
            res.send(rows);
        }else{
            res.status(404).send("Not found");
        }
    });
}

exports.crtMsg = (req,res) => {
    let tkn = req.header('Authorization');
    const parts = tkn.split(" ");
    let token = jwt.decode(parts[1]);
    if(req.body.message !== undefined && token !== null && req.body.message.trim().length > 0) {
        connection.run('INSERT INTO messages (id_rooms, id_users_from,id_users_to, created,message) VALUES (?,?,?,?,?)', [req.body.id_rooms, req.body.id_users_from,req.body.id_users_to, Date.now(),req.body.message], (err) => {
            if (err) throw err;
            res.status(201).send("Message created");
        });
    }else{
        res.status(400).send("Bad Input");
    }
};


exports.getInRoom = (req,res) => {
    connection.get('SELECT * FROM in_room WHERE id_rooms=? AND id_users=?', [req.params.id,req.query.id_users], function (err, row) {
        if (err) {
            throw err;
        }
            res.send(row);
    });
}

exports.geAllInRoom = (req,res) => {
    connection.get('SELECT count(*) as c FROM in_room WHERE id_rooms=?', [req.params.id], function (err, row) {
        if (err) {
            throw err;
        }
        res.send(row);
    });
}

exports.getAllInRoom = (req,res) => {
    connection.all('SELECT * FROM in_room JOIN users USING(id_users) WHERE id_rooms=?', [req.params.id], function (err, rows) {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}

exports.crtInRoom = (req,res) => {
    connection.run('INSERT INTO in_room (id_users, id_rooms, last_message, entered) VALUES (?,?,?,?)', [req.body.id_users,req.params.id,req.body.last_message,Date.now()], function (err) {
        if (err) {
            throw err;
        }
        res.status(201).send("In_room created");
    });
}

exports.updInRoom = (req,res) => {
    connection.run('UPDATE in_room SET last_message=? WHERE id_users=? AND id_rooms=?', [Date.now(),req.body.id_users,req.params.id], function (err) {
        if (err) {
            throw err;
        }
        res.status(204).send("In_room updated");
    });
}

exports.delInRoom = (req,res) => {
    connection.run('DELETE FROM in_room WHERE id_users=? AND id_rooms=?', [req.query.id_users,req.params.id], function (err) {
        if (err) {
            throw err;
        }
        res.status(204).send("In_room deleted");
    });
}
