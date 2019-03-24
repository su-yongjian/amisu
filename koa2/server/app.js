const Koa = require('koa');
const app = new Koa() ;
app.use(async (ctx, next)=>{
    ctx.body = 'hello world'
})

app.listen(3000,()=>{
    console.log('listenning at port 3000 succss');
})