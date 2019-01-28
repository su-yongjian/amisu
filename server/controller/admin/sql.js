const {query} = require('../../libs/koa-better-mysql');
// 注册用户
exports.insertGoods = ( value ) => {
  let _sql = "insert into tb_goodslist set goods_name=?,shop_price=?,goods_desc=?,goods_stock=?,update_time=?;"
  return query( _sql, value)
}

// 删除商品
exports.deleteGoods = ( goods_id ) => {
  let _sql = `delete from tb_goodslist where goods_id="${goods_id}";`
  return query( _sql )
}

// 查询所有商品
exports.findGoodsList = ( ) => {
  let _sql = `select * from tb_goodslist;`
  return query( _sql )
}

// 根据商品id查询商品
exports.findOneUser = ( id ) => {
  let _sql = `select * from tb_goodslist where goods_id="${id}";`
  return query( _sql )
}

// 通过名称查找某条记录是否已存在
exports.findByName = ( goods_name ) => {
  let _sql = `select count(*) as count from tb_goodslist where goods_name="${goods_name}";`
  return query( _sql )
}

// 查找表记录总条数
exports.findCount = ( table ) => {
  let _sql = `select count(*) as count from ${table} ;`
  return query( _sql )
}
// 傳送進來的value一定要跟字段一一對應
exports.upDateGoods = ( goods_id , value ) => {
  let _sql = `update tb_goodslist set goods_name=?,shop_price=?,goods_desc=?,goods_stock=?,update_time=? where goods_id='${goods_id}';`
  return query( _sql, value)
}