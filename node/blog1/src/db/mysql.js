const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/dbConfig')
// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 执行统一sql的函数
function exec(sql) {
  let promise = new Promise((resolve,reject) =>{
    con.query(sql,(err,result)=>{
      if(err){
        reject(err);
        return
      }else{
        resolve(result)
      }
    })
  })
  return promise
}

// 之所以不能关闭是为了保持链接状态，不能让他关闭,单例模式，重复引用
// con.end()

// 建blogs表
let tb_blogs = `
  create table if not exists tb_blogs(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL COMMENT '博客标题',
  content TEXT(0) NOT NULL COMMENT '博客内容',
  create_time VARCHAR(100) NOT NULL COMMENT '创建时间',
  author VARCHAR(100) NOT NULL COMMENT '作者',
  PRIMARY KEY (id)
  );
`
// 建表
exec(tb_blogs)

module.exports = {
  exec
}