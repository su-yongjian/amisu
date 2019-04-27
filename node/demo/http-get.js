
const http = require('http');
const querystring = require('querystring')
const server = http.createServer((req,res)=>{
    let url = req.url//获取完整的url
    req.query = querystring.parse(url.split('?')[1])//切片，? 后面的数据放在req.querystring里面
    console.log(req.query);
    
    res.end(JSON.stringify(req.query))//将querystring转为字符串返回
})
server.listen(3001);
// http://localhost:30001/?sd=1    ==> {"sd":"1"}