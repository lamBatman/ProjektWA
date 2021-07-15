const sqlite3 = require('sqlite3').verbose();
const connection = new sqlite3.Database('./Database/database.sqlite');

module.exports = connection;