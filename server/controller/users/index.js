const Router = require("koa-router");
const { query } = require("../../libs/koa-better-mysql.js");
const common = require("../../libs/common");
const userModel = require('./tb_users')
const user_router = require("./user");
const moment = require('moment');

let router = new Router({ prefix:"/user"})

router.get('/',async (ctx)=>{
  ctx.response.redirect('/home');
})

router.get('/registor',async (ctx)=>{

  let password = '123456'
  let username = "amisu";
  password = common.md5(password);
  let user_id = common.uuid() ;
  let create_time = moment().format('YYYY-MM-DD HH:mm:ss');
  let avator = "头像"
  let flag = true ;
  await userModel.findByName(username).then(res=>{
    if(res[0].count>0){
      flag = false
      ctx.body = {
        code:1,
        message:'用户已存在'
      }
    }
  })
  if(flag){
    let count=0 ;
    await userModel.findCount('tb_users').then(res=>{
      count = res[0].count ;
      console.log(count);

    })

    await userModel.insertUser([user_id,username,password,avator,create_time]).then(res => {
      console.log('注册成功',res);
      ctx.body = {
        code:0,
        count:count,
        message:'注册成功'
      }
    })
  }
})

module.exports = router
