/**
 * 获取环境
 */

const env = process.env.NODE_ENV ;

let MYSQL_CONF

if(env === 'dev'){
  MYSQL_CONF = {
    port:3306,
    host:'localhost',
    user:'root',
    password:'Amysu888.',
    database:'blog'
  }
}
if(env === 'production'){
  MYSQL_CONF = {
    port:3306,
    host:'localhost',
    user:'root',
    password:'Amysu888.',
    database:'blog'
  }
}

module.exports = {
  MYSQL_CONF
}