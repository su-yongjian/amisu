const mysql = require('mysql');
const config = require('./sql_config.js');
let pool = mysql.createPool({
  user    :config.sql_user,
  password:config.sql_password,
  database:config.sql_database,
  host    :config.sql_host,
  port    :config.port,
})

// sql链接池
let query = ( sql, values ) => {
  return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {

          if (err) {
              reject( err )
          } else {
              connection.query(sql, values, ( err, fields) => {
                  if ( err )   {
                    reject( err )
                  } else  {
                    resolve( fields )
                    connection.release();
                  }
              })
          }
      })
  })
}

// 创建表
let createTable = (sql) =>{
  return query( sql ,[])
}

// 建用户表
let tb_users = `
  create table if not exists tb_users(
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  avator VARCHAR(100) DEFAULT NULL COMMENT '头像',
  create_time VARCHAR(100) NOT NULL COMMENT '注册时间',
  login_status VARCHAR(100) NOT NULL DEFAULT 0 COMMENT '登录状态',
  user_rule VARCHAR(100) NOT NULL  DEFAULT 0 COMMENT '用户角色',
  PRIMARY KEY ( user_id )
  );
`
createTable(tb_users)

// // 建用户表
// let tb_blog = `
//   create table if not exists tb_blog(
//   id INT NOT NULL AUTO_INCREMENT,
//   title VARCHAR(100) NOT NULL COMMENT '博客标题',
//   content TEXT(0) NOT NULL COMMENT '博客内容',
//   create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
//   author VARCHAR(100) NOT NULL COMMENT '作者',
//   PRIMARY KEY ( id )
//   );
// `
// createTable(tb_blog)

module.exports = {
  query
}
