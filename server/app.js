const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')

const bodyparser = require('koa-bodyparser')
const bodyParsers = require('koa-better-body')

// 跨域处理
const cors = require('koa2-cors');

const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const render = require('koa-art-template')
const config = require('./config')

// 后台渲染路由配置
const routes = require('./routes')

// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))



// 前台渲染调用API
const common = require('./libs/common')  //uuid公共函数，md5函数
// 管理系统接口导入
const admin_router = require('./controller/admin/index')



const port = process.env.PORT || config.port

// error handler
onerror(app)

render(app,{
  root:path.join(__dirname,'views'),
  extname:'.html',
  debug:process.env.NODE_ENV !== 'production'
})
// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  // .use(views(path.join(__dirname, '/views'), {
  //   options: {settings: {views: path.join(__dirname, 'views')}},
  //   map: {'njk': 'nunjucks'},
  //   extension: 'njk'
  // }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(admin_router.routes())
  .use(admin_router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})


routes(router)


app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
