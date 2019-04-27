let express = require('express');
let fs = require('fs')
let app = express()
let routes = require('./routes/stu')
const bodyParser = require('body-parser')
// 配置框架
app.engine('html',require('express-art-template'))
app.use('/public',express.static('public'))
app.use(bodyParser.json())//解析JSON格式数据（application/json），解析后放在req.body中
app.use(bodyParser.urlencoded({extended:false}))//解析文本格式数据
// routes(app,fs)

app.use("/stu",routes)


app.listen(8080,()=>{
  console.log('启动成功at localhost:8080');
  
})