const mysql = require('mysql');

const config = require('../config/sqlConfig.js')

let pool = mysql.createPool({
    user:config.mysql_user,
    password:config.mysql_password,
    database:config.mysql_database,
    host:config.mysql_host,
    port:config.port
})

let query = ( sql, values ) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {

            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, fields) => {
                    if ( err )   reject( err )
                    else  resolve( fields )
                    connection.release();
                })
            }
        })
    })
}

module.exports = {query}
