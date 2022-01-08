const mysql = require('mysql');
const config = require('../config/config');
const conn = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});
conn.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("MariaDb connected ...");
})

function query(sql, params) {
    return new Promise(function(resolve, reject) {
        conn.query(sql, params, function(err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    query
}