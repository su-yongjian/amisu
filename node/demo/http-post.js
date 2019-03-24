const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.method === 'POST'){
        // 数据格式:获取客户端发送过来的请求头信息
        console.log('content-type',req.headers['content-type']);
        let postData = '' ;//接收数据，数据流方式

        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        // 数据触发完成后悔触发end
        req.on('end',()=>{
            console.log(postData);
            res.end('hello word')
            
        })
    }
})

server.listen(3002)