const Router = require('koa-router')
const {query} = require('../../libs/koa-better-mysql.js')
const common = require('../../libs/common')
const {
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} = require('../../utils/sql.js')
const user_router = require('./user')

let router = new Router({prefix:'/admin'})

router.get('/',async (ctx,next)=>{
  ctx.body = {
    code:0,
    msg:'succ',
    method:'get'
  }
})

router.get('/addGood',async(ctx,next)=>{

  console.log(ctx);

  let password = '123456';
  let username = 'amysu_'+ Math.floor(Math.random()*100);
  let id = common.uuid()
  password = common.md5(password)
  let sql =  `insert into tb_user (ID,username,password) values('${id}','${username}','${password}')`;
  let dbdata = await query(sql)

  console.log(dbdata);

})
// 二级路由
// router.use(user_router.routes()).use(user_router.allowedMethods())
module.exports = router
