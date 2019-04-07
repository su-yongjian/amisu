const {query} = require('../../config/node-sql.js');
function insertUser(value){
  let _sql = 'insert into tb_users set username=?,password=?,avator=?,create_time=?;'
  return query(_sql,value)
}

const registUser = async (username,password,avator='') =>{
    let date = new Date()
    let create_time = date.getTime();
    let userValue = [username,password,avator,create_time];
    return await insertUser(userValue)
}

module.exports = {
  registUser
}