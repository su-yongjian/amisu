const Users = require('../dbs/schema/Users.js').Users

const Router = require('koa-router') ;

let router = new Router()
router.prefix('/user')

router.get('/addUser',async (ctx)=>{
  
  let doc = await Users.create({
    userName:'王五2',
    password:'123456',
    gender:1
  })
  console.log('新增成功');
  
})


module.exports = router