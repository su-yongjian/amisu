const {query} = require('../../libs/koa-better-mysql');
// 注册用户
exports.insertUser = ( value ) => {
  let _sql = "insert into tb_users set user_id=?, username=?,password=?,avator=?,create_time=?;"

  return query( _sql, value)
}

// 删除用户
exports.deleteUser = (user_id ) => {
  let _sql = `delete from tb_users where user_id="${user_id}";`
  return query( _sql )
}

// 查询用户
exports.findOneUser = ( name ) => {
  let _sql = `select * from tb_users where username="${name}";`
  return query( sql )
}

// 通过名称查找某条记录是否已存在
exports.findByName = ( name ) => {
  let _sql = `select count(*) as count from tb_users where username="${name}";`
  return query( _sql )
}

// 查找表记录总条数
exports.findCount = ( table ) => {
  let _sql = `select count(*) as count from ${table} ;`
  return query( _sql )
}
