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
let createTable = ( sql ) => {
  return query( sql ,[])
}
let tb_users =
  `create table if not exists tb_users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(100) NOT NULL COMMENT '头像',
    moment VARCHAR(100) NOT NULL COMMENT '注册时间',
    PRIMARY KEY ( id )
  );`

// 建用户表
createTable(tb_users)

module.exports = {query}
