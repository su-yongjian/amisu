const {query} = require('../../libs/koa-better-mysql');

exports.insertUser = ( value ) => {
  let _sql = "insert into tb_users set name=?,password=?,avator=?,moment=?;"

  return query( _sql, value)
}

