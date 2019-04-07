const mysql = require('mysql');

const config = {
  port:3306,
  sql_host:'localhost',
  sql_user:'root',
  sql_password:'Amysu888.',
  sql_database:'blog'
}
// 创建链接对象:单例
const con =mysql.createConnection({
  host    :config.sql_host,
  port    :config.port,
  user    :config.sql_user,
  password:config.sql_password,
  database:config.sql_database,
})
con.connect()
// 查询用户
// let sql = `select * from tb_users;`
// 更新
// let sql = `update tb_users set avator='1234' where user_id=41;`
con.query(sql,(err,result)=>{
  if(err){
    console.log(err);
    console.log(err);
    
  }else{
    console.log(result);
  }
})
// 关闭链接
con.end()
