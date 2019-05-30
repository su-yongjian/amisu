const Users = require('../dbs/schema/Users.js').Users

const Router = require('koa-router') ;

let router = new Router()
router.prefix('/user')

router.get('/addUser',async (ctx)=>{
  let code = 0 // 状态码
  let msg = '' // 返回内容
  // 模拟插入数据
  let doc = {
    userName:'王五3',
    password:'123456',
    gender:1
  }
  try {
    let ret = await Users.create(doc)
    code = 0
    msg = '保存成功, ' + ret
  } catch (error) {
    code = -1
    msg = '保存失败, ' + error
    console.log(error)
  }

  ctx.body = {
    code,
    msg
  }
  return msg
})


module.exports = router