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

const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const render = require('koa-art-template')
const config = require('./config')

// 后台渲染路由配置
const routes = require('./routes')

// 前台渲染调用API

const common = require('./libs/common')

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
