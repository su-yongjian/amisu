let {addUser,updateUser,delUser,findAllUsers} = require('./tools.js')
const common = require("../libs/common");
const Users = require('../dbs/schema/Users.js').Users
const Router = require('koa-router') ;

let router = new Router()
router.prefix('/user')
// 查找列表
router.get('/list',async (ctx)=>{
  let code = 0 // 状态码
  let msg = '' // 返回内容
  let ret = await findAllUsers(ctx.request.body)
  console.log(ret);

  ctx.body = {
    code:0,
    list:ret
  }
})

router.post('/addUser',async (ctx)=>{
  let code = 0 // 状态码
  let msg = '' // 返回内容

  let {userName,password,gender,type,id} = ctx.request.body ;
  
  if(type=='edit'){
    if(id){
      let ret = await updateUser(ctx.request.body)
      if(ret.ok==1){
        code = 0
        msg = '修改成功' 
      }
      else {
        code = -1
        msg = '修改失败,' 
      }
    }
    else{
      code = -1
      msg = '参数错误,' 
    }
  }
  // 删除
  else {
    // let id = common.uuid();
    let user = new Users({
      userName,
      password,
      gender,
      userStatus:1
    })
    try {
      let ret = await addUser(user)
      console.log(ret);
      
      code = 0
      msg = '添加成功' 
    } catch (error) {
      code = -1
      msg = '新建失败' 
    }
  }
  ctx.body = {
    code,
    msg
  }
})

router.post('/del',async (ctx)=>{
  let code = 0 // 状态码
  let msg = '' // 返回内容
  let ret = await delUser(ctx.request.body)
  console.log(ret);
  
  if(ret){
    ctx.body = {
      code,
      msg:'删除成功'
    }
  }
  else {
    ctx.body = {
      code:-1,
      msg:'参数错误'
    }
  }
})
module.exports = router