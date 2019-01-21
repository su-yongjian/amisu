/**
 * 常用sql语言
 */
//  查询
/**
 * table_name：表名
 * primaryKey：修改的key
 * primaryVal：修改条件key值
 *
 * QUERY_TABLE(tb_user)
*/
const QUERY_TABLE = (table_name,{key,val}) =>{
  let sql = '';
  if(key){
    sql = `SELECT * FROM ${table_name} WHERE '${key}'='${val}'`
  }else{
    sql = `SELECT * FROM ${table_name}`
  }
  return  sql
}

// 插入数据
/**
 * table_name：表名
 * primaryKey：修改的key
 * primaryVal：修改条件key值

 * INSERT_TABLE(tb_user,'username,password','lisi,123456')
*/
const INSERT_TABLE = (table_name,{key,val}) =>{
  return `INSERT INTO ${table_name} (${key}) VALUES(${val})`
}



// 更新数据
/**
 * table_name：表名
 * primaryKey：修改的key
 * primaryVal：修改条件key值
 * 如  ID = 1
 * UPDATE_TABLE(tb_user,{ID,1},{username,zhansan})
*/
const UPDATE_TABLE = (table_name,{primaryKey,primaryVal},{key,val}) =>{ return  `UPDATE ${table_name} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal});`}

// 删除数据

const DELETE_TABLE = (table_name,{primaryKey,primaryVal},{key,val}) =>{ return `DELETE FROM ${table_name} WHERE(${primaryKey}=${primaryVal});`}

module.exports = {
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE,
}
