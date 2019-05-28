const Router = require('koa-router')
const router = new Router({prefix:'/index'})

router.pr

router.get('/',async (ctx,next)=>{
  await ctx.render('index')
})
router.post('/list',async (ctx,next)=>{
  await ctx.render('index')
})
// 增
router.get('/add',async (ctx,next)=>{
  await ctx.render('add')
})
router.post('/detail/:id',async (ctx,next)=>{
  ctx.body = 'detail'
})
module.exports = router