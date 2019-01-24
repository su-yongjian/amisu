const Router = require("koa-router");
// const { query } = require("../../libs/koa-better-mysql.js");
const common = require("../../libs/common");
const userModel = require('./tb_users')
// const user_router = require("./user");
const moment = require('moment');

let router = new Router({ prefix:"/user"})

router.get('/',async (ctx)=>{
  ctx.response.redirect('/home');
})
// 注册
router.get('/registor',async (ctx)=>{
  let username = "amisu10";
  let password = '1'
  password = common.md5(password);

  let user_id = common.uuid() ;
  let create_time = moment().format('YYYY-MM-DD HH:mm:ss');
  let avator = "头像";
  let login_status = "0";
  let user_rule = "1";
  let flag = true ;
  await userModel.findByName(username).then(res=>{
    console.log(res);
    
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
    let _del_id = 0 ;
    if(count>50) {
      await userModel.findUsers('tb_users').then(res=>{
        console.log(res);
        let _res = [] ;
        res.map(v=>{
          if(v.user_id!=1){
            _res.push(v)
          }
        })
        _del_id = _res[_res.length-1].user_id ;
      })
    }
    if(_del_id!=0){
      await userModel.deleteUser(_del_id).then(res=>{
        console.log(res);
      })
    }


    await userModel.insertUser([user_id,username,password,avator,create_time,login_status,user_rule]).then(res => {
      console.log('注册成功',res);
      ctx.body = {
        code:0,
        count:count,
        message:'注册成功'
      }
    })
  }
})
// 登录
router.post('/login',async (ctx,next)=>{
  let {username,password} = ctx.request.body ;
  await userModel.findOneUser(username).then(res=>{
    
    if(res.length==0){
      ctx.body = {
        code:1,
        msg:'用户不存在',
        result:[]
      }
    }else if(res.length && username === res[0].username && common.md5(password)===res[0].password){
      ctx.session['username'] = username;      
      ctx.body = {
          code:0,
          msg:'succ',
          result:[]
      }
    }else{
      ctx.body = {
        code:1,
        msg:'用户或密码错误',
        result:[]
      }
    }
  })
})
module.exports = router
