+ 前言：学koa2纯属是为了打发时间，比较作为一个前端狗，还是要懂一点后端相关的东西，每天写着重复的代码也是特喵的无聊，万一懂一点node相关的知识对以后跳槽有优势呢。

### 开撸

+ #####初始化项目

```
npm init -y
```

+ ##### 安装一波乱七八糟的依赖插件先（需要具备一定的koa2知识，至于mongoDB自行百度安装教程）,模板引擎我使用的是art-template（据说是性能最好的，而且是因为JQ时代的产物，念旧）

```
npm i koa koa-router koa-bodyparser koa-static koa-views art-template koa-art-template mongoose  -S
```

+ #####安装nodemon实时监听

```
npm i nodemon -D
```

+ ##### 新建app.js入口文件，撸一把基础代码

```javascript
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')

const bodyParser = require('koa-bodyparser')
// const Router = require('koa-router')
const path = require('path')
// const router = new Router()

const {connect} = require('./dbs/init.js')  //导入mongodb数据库
const {createUser} = require('./controller/users.js')

// 模板引擎
const render = require('koa-art-template');
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//自执行函数，链接数据库
;(async ()=>{
  await connect()
})()

const userRouter = require('./controller/users.js')
app.use(userRouter.routes(),userRouter.allowedMethods())
// app.use(router.routes(),router.allowedMethods())

app
  .use(bodyParser({enableTypes:['json', 'form', 'text']}))
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(__dirname + '/views', {
    extension: 'html'
  }))

app.listen(4000,()=>{
  console.log('listen at port localhost:4000 ');
})
```

+ ##### 新建dbs文件夹，在下面统一管理数据库相关，新建init.js数据库初始化

```javascript
const mongoose = require('mongoose')
const db = 'mongodb://localhost/mongo_test'; //link
// const glob = require('glob')
// const {resolve} = require('path')

// exports.initSchemas = ()=>{
//   // glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
// }


// 连接数据库，URL以mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。（默认端口27017）
// 连接mongodb数据库的链接解析器会在未来移除，要使用新的解析器，通过配置{ useNewUrlParser:true }来连接 ；其他警告参考：https://mongoosejs.com/docs/deprecations.html

/**
 * mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告：
 * (node:24864) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * (node:24841) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 * 可以如下设置
 */
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
let dbc = mongoose.connection
exports.connect = ()=> {
  // 链接数据库
  mongoose.connect(db)
  let  maxConnectTimes = 0
  
  return new Promise((resolve,reject)=>{

    // 增加数据库监听事件:断开链接
    dbc.on('disconnected',()=>{
      console.log('***********数据库断开***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db)
      }
      else {
        reject()
        throw new Error('数据库出现问题，请人为修理.....')
      }
    })
  
    dbc.on('error',err=>{
      console.log('***********数据库出错***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db)
      }
      else {
        reject()
        throw new Error('数据库出现问题，请人为修理.....')
      }
      
    })
  
    dbc.once('open',()=>{
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
  
}
```

+ ##### 在dbs文件夹下新建schema文件夹用于创建各种schema表，新建Users.js

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema({
  UserId : {type:ObjectId},
  userName:{unique:true,type:String},
  password:String,
  gender:Number,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
},{collection:'users'})

const model = {
  Users:mongoose.model('Users',userSchema)
}
// 发布模型
module.exports = model
```

+ #####  新建controller文件夹，主要是用来处理一些业务逻辑，新建users.js文件

````
const Users = require('../dbs/schema/Users.js').Users  //导入schema表

const Router = require('koa-router') ;

let router = new Router()
router.prefix('/user')

router.get('/addUser',async (ctx)=>{
  let code = 0 // 状态码
  let msg = '' // 返回内容
  // 模拟插入数据,实际冲ctx上下文中获取
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
````

+ #### 运行代码：配置package.json，scripts新增"dev": "nodemon node ./app.js"

+ 运行：npm run dev

+ 在浏览器上输入loacahost:4000/user/addUser就会看到输出结果