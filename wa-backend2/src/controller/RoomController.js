const RoomRep = require('../repository/RoomRepository');
const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');
const jwt = require('jsonwebtoken');

/*
exports.getById = async (req,res) => {
    let {id} = req.params;
    let rooms = await RoomRep.getById(Number(id));
    console.log(rooms);
    if(rooms !== false){
        res.json(rooms);
    }else{
        res.status(404).send("Not found");
    }

}
*/

exports.getById = (req,res) => {
    connection.get('SELECT * FROM rooms WHERE id_rooms=?', [req.params.id], function (err, row) {
        if (err) {
            throw err;
        }
        if(row !== false && row !== undefined){
            res.send(row);
        }else{
            res.status(404).send("Not found");
        }
        });
}

exports.getRooms = (req,res) => {
    connection.all('SELECT * FROM rooms LEFT JOIN users ON(id_users_owner=users.id_users)', function (err, rows) {
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

exports.updateRoom = (req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    if(id !== null && title !== null){
        connection.get('SELECT * FROM rooms WHERE id_rooms=?', [req.params.id], function (err, row) {
            if (err) {
                throw err;
            }
        if(row !== undefined && row !== null){
        connection.run('UPDATE rooms SET title=? WHERE id_rooms=?', [req.body.title,req.params.id], function (err) {
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

exports.updateRoomOwner = (req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    if(id !== null && title !== null){
        connection.get('SELECT * FROM rooms WHERE id_rooms=?', [req.params.id], function (err, row) {
            if (err) {
                throw err;
            }
            if(row !== undefined && row !== null){
                connection.run('UPDATE rooms SET id_users_owner=? WHERE id_rooms=?', [req.body.id_users_owner,req.params.id], function (err) {
                    if (err) {
                        throw err;
                    }
                });
                res.status(200).send("Updated owner");
            }else{
                res.status(404).send("Not found");
            }
        });
    }else{
        res.status(400).send("Bad Input");
    }
}


exports.remRoom = (req,res) => {
    const id = req.params.id;
    if(id !== null) {
        connection.get('SELECT id_rooms,title FROM rooms WHERE id_rooms=?', [id], function (err, row) {
            if (err) {
                throw err;
            }
            if (row !== undefined && row !== null) {
                connection.run('DELETE FROM rooms WHERE id_rooms=?', [id], function (err) {
                    if (err) {
                        throw err;
                    }
                    res.status(204).send("Deleted");
                });
            }else{
                res.status(400).send("Bad Input");
            }
        });
    }
}

exports.crtRoom = (req,res) => {
    let tkn = req.header('Authorization');
    const parts = tkn.split(" ");
    let token = jwt.decode(parts[1]);
  if(req.body.title !== undefined && token !== null && req.body.title.trim().length > 0) {
      connection.run('INSERT INTO rooms (created, title, id_users_owner) VALUES (?,?,?)', [Date.now(), req.body.title, Number(token.id)], (err) => {
          if (err) throw err;
          res.status(201).send("Created");
      });
  }else{
      res.status(400).send("Bad Input");
  }
};

exports.lckRoom = (req,res) => {
    connection.get('SELECT * FROM rooms WHERE id_rooms=?', [req.params.id], function (err, row) {
        if (err) {
            throw err;
        }
        if(row !== undefined && row !== null){
            var x;
            if(row.lock === "true"){
                x="false";
            }else{
                x="true";
            }
            console.log(x);
            connection.run('UPDATE rooms SET lock=? WHERE id_rooms=?', [x,req.params.id], function (err) {
                if (err) {
                    throw err;
                }
            });
            res.status(200).send("Updated");
        }else{
            res.status(404).send("Not found");
        }
    });
}


exports.crtRoomKick = (req,res) => {
    let tkn = req.header('Authorization');
    const parts = tkn.split(" ");
    let token = jwt.decode(parts[1]);
    if(token !== null) {
        connection.all('SELECT * FROM room_kick WHERE id_rooms=? AND id_users=?', [Number(req.body.id_rooms),Number(req.body.id_users)], function (err, row) {
            if (err) {
                throw err;
            }
            if(row !== null && row !== undefined && row !== "") {
                connection.run('INSERT INTO room_kick (id_users, id_rooms, created) VALUES (?,?,?)', [Number(req.body.id_users), Number(req.body.id_rooms), Date.now()], (err) => {
                    if (err) throw err;
                    res.status(201).send("Created");
                });
            }else{
                res.status(400).send("Exists :(");
            }
        });
    }else{
        res.status(400).send("Bad Input");
    }
};

exports.getRoomKick = (req,res) => {
    let tkn = req.header('Authorization');
    const parts = tkn.split(" ");
    let token = jwt.decode(parts[1]);
    if (token !== null) {
        connection.get('SELECT * FROM room_kick WHERE id_rooms=? AND id_users=?', [Number(req.query.id_rooms), Number(req.query.id_users)], function (err, row) {
            if (err) {
                throw err;
            }
            res.status(201).send(row);
        });
    } else {
        res.status(400).send("Bad input");
    }
}

exports.delRoomKick = (req,res) => {
    let tkn = req.header('Authorization');
    const parts = tkn.split(" ");
    let token = jwt.decode(parts[1]);
    if(token !== null) {
        connection.all('SELECT * FROM room_kick WHERE id_rooms=? AND id_users=?', [Number(req.query.id_rooms),Number(req.query.id_users)], function (err, row) {
            if (err) {
                throw err;
            }
            if(row !== null && row !== undefined && row !== "") {
                connection.run('DELETE FROM room_kick WHERE id_users=? AND id_rooms=?', [Number(req.query.id_users), Number(req.query.id_rooms)], (err) => {
                    if (err) throw err;
                    res.status(201).send("Deleted");
                });
            }else{
                res.status(400).send("Not found");
            }
        });
    }else{
        res.status(400).send("Bad Input");
    }
};







