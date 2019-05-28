const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const path = require('path')
const router = new Router()

const index = require('./routes/index')

// const static = require('koa-static')
// 模板引擎
const render = require('koa-art-template');

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// app.use(static(path.join(__dirname,'/statics'))) //加载静态资源

// router.get('/',async (ctx,next)=>{
//   // ctx.body = 'hello word'
//   await ctx.render('index')
// })

app
  .use(bodyParser({enableTypes:['json', 'form', 'text']}))
  // .use(router.routes())
  // .use(router.allowedMethods())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(__dirname + '/views', {
    extension: 'html'
  }))

router.all('/*',async (ctx,next)=>{
  ctx.set('Access-Control-Allow-Origin','https://www.cctalk.com');
  await next();
})

app.use(index.routes(),index.allowedMethods())


app.listen(4000,()=>{
  console.log('listen at port localhost:4000 ');
  
})