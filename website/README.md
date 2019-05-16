全局安装 npm install koa-generator -g
koa2 test
cd test
由于默认会安装的的pug模板引擎，因此最好干掉换art-tempalte模板引擎
npm install

运行：npm start

npm install --save koa-art-template art-template
在app.js引入
const render = requirer('koa-art-template')
const path = requirer('path')
配置：

//配置art template
render(app, {
    root: path.join(__dirname, '/views'),  // 模板位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试
})

渲染:

router.get('/', async ctx=>{
    let title = 'hollew word';
    let listArr = [{a:110},123,123,123,123];
 
    await ctx.render('index',{
        title:title , // 渲染数据
        list:listArr ,
        htmlH:'<h3>这是一个h3</h3>',
        num:12
    })
)};