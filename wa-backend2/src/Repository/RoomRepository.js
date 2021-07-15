const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');

exports.getById = async function (id) {
    await connection.get(`SELECT id_rooms,title FROM rooms WHERE id_rooms=?`, [id], function (err, row) {
        if (err) {
            throw err;
        }
         console.log(id);
         console.log(row);
        return row;
    });
};

/*
exports.getById = async function (id) {
    return await connection.all(`SELECT id_rooms,title FROM rooms`,[], (err, rows) => {
        if (err) {
            console.log(rows);
            return rows;
        }
        console.log(rows);
        return rows;
    });
};
*/