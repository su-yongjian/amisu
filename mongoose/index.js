const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')

const bodyParser = require('koa-bodyparser')
// const Router = require('koa-router')
const path = require('path')
// const router = new Router()

const {connect} = require('./dbs/init.js')
const {createUser} = require('./controller/users.js')

// 模板引擎
const render = require('koa-art-template');
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

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