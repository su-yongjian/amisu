### 一：表设计

用户表
+ uid username password realname
博客表
+ id title content createtime author

+ 接口设计

/api/blog/*

list  (mothod:get ,params:author,keyword) 

detail  (mothod:get,params:id)

new (mothod:post,params:{}) 

update (mothod:post ,params:id)

del (mothod:post,params:id)

login   (mothod:post ,params:{} )

###二:开发接口

+ 原生实现：
- server 端http请求：
从输入url到请求回来数据经历了什么？
1：DNS解析（域名解析，匹配服务器ip），建立tcp（三次握手：客户端询问是否可用，服务器响应是否可用，客户端响应知道了）链接，发送http请求
2：server接收到http请求，处理，返回


3：客户端接收到返回的数据，处理数据


- nodejs如何处理http请求:
 + get请求和querystring
 + post请求和postdata
 + 路由
简单实例：
const http = require('http');
const server = http.createServer((req,res)=>{
    res.send('hello word');
});

server.listen(3000)
访问http://127.0.0.1:3000

get请求，即客户端要向server请求数据

const http = require('http');
const querystring = require('querystrng')
const server = http.createServer((req,res)=>{
    let url = req.url//获取完整的url
    req.query = querystring.parse(url.split('?')[1])//切片，? 后面的数据放在req.querystring里面
    res.end(JSON.stringify(req.query))//将querystring返回
})
server.listen(30001)

post请求:客户端向服务端发送数据
```
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
```

node路由：


