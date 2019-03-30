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
    user_id VARCHAR(32) NOT NULL COMMENT '用户ID',
    username VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avator VARCHAR(100) NOT NULL COMMENT '头像',
    create_time VARCHAR(100) NOT NULL COMMENT '注册时间',
    login_status VARCHAR(100) NOT NULL COMMENT '登录状态',
    user_rule VARCHAR(100) NOT NULL COMMENT '用户角色',
    PRIMARY KEY ( user_id )
  );`
// 建用户表
createTable(tb_users)

let tb_goodslist =
  `create table if not exists tb_goodslist(
    goods_id INT NOT NULL AUTO_INCREMENT,
    is_delete BIT NOT NULL Default 1 COMMENT '是否删除',
    goods_name VARCHAR(255) NOT NULL COMMENT '商品名称',
    shop_price VARCHAR(100) NOT NULL COMMENT '商品价格',
    goods_desc VARCHAR(100) NOT NULL COMMENT '商品描述',
    goods_stock VARCHAR(100) NOT NULL COMMENT '商品库存',
    update_time VARCHAR(100) NOT NULL COMMENT '上传时间',
    PRIMARY KEY ( goods_id )
  );`
// 建商品表
createTable(tb_goodslist)
module.exports = {query}
