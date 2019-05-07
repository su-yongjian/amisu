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

全局处理post请求:
```
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !=='application/json'){
            resolve({})
            return
        }

        let postData = '' ;
        // 存数据
        req.on('data',chunk=>{
            postData+=chunk.toString()
        })
        // 监听数据结束
        req.on('end',()=>{
           
            if(!postData){
                resolve({})
                return
            }else{
                resolve(
                    JSON.parse(postData)
                )
            }
        })
    })
    return promise
}

```

开发过程是一个循序渐进的过程，先返回假数据调通数据接口，然后再做链接数据库的处理
路由 router 和业务处理controller分开模块,便于维护

补充，路由和API
API：前端和后端，不同子系统之间的对接的术语
url （路由）·api/blog/list· get ,输入，输出


路由：API的一部分
后端系统内部的一个定义模块


使用cookie实现验证登录面临的问题：
1：暴露用户信息，如用户名，手机号等敏感信息；
2：容量有限
如何解决该问题？
1：使用userid标识来识别，谁也不知道是什么意思。
2：cookie中村userid，server端对应username


#### global 全局变量
+ 通俗的理解就是将当前文件下的变量暴露为全局变量：
+ 如;a.js文件下定义变量暴露出去:  global.test = 200;那么在其他文件如b.js下导入文件a.js直接就可以使用test的值

#### process 进程

- 常用的	const { argv ,argv0 ,execArgv , execPath} = process ;

  + argv : 是一个数组，包含一个nodejs的安装路径以及当前执行文件的路径
  + execPath 调用的脚本路径，即nodejs的安装路径

  const {dev} = process : dev

  

  setImmediate(()=>{}) ：同步的执行完之后就会执行和process.nextTick(()=>{})类似，当时比setImmediate执行得早

#### Debug

+ inspector   node  --inspector-brk  文件名：在chrome上打开 <chrome://inspect/#devices> 点击inspect就会进入chrome熟悉的调试环境

#### path

const path = require('path')

const mod = require('./_names.js')

console.log('__dirname',__dirname);//e:\amisu\node\API\path

console.log('process.cwd()',process.cwd());//e:\amisu\node\API\path

console.log('./',path.resolve('./'));//e:\amisu\node\API\path

区别：

__dirname 、总是返回文件的绝对路径

 process.cwd() 总是返回执行node命令所在文件夹路径

path.resolve()  

#### Buffer

处理二进制数据流，实例类似整数数组，大小固定，被创建时就已经确定了，无法调整大小

````javascript
const buf1 = Buffer.alloc(10)//创建一个长度为10，且用0填充的Buffer
console.log(buf1)//<Buffer 00 00 00 00 00 00 00 00 00 00>
const buf2 = Buffer.alloc(5,1)//创建一个长度为5，且用1填充的Buffer
console.log(buf1)//<Buffer 01 01 01 01 01>
Buffer.from([1,2,3])//<Buffer 01 02 03>
Buffer.from('test')//<Buffer 74 64 73 74>
Buffer.from('test','base64')//<Buffer b5 eb 2d>
Buffer.byteLength('test')//4
Buffer.byteLength('中文')//6
Buffer.isBuffer({})//false
Buffer.isBuffer(Buffer.from('test'))//true
Buffer.concat()拼接
const buf1 = Buffer.alloc(5)
const buf2 = Buffer.alloc(3)
const buf = Buffer.concat([buf1,buf2])//
buf.copy()复制
buf.equals(buf)比较两个buf内容是否相等
buf.indexOf('ws')找buf是否包含有buf是否包含ws,找到就会返回第一个，否则返回-1
````



#### Event

````javascript
const EventEmitter = require('events')
class CunstomEvent extends EventEmitter {}
const ce = new CunstomEvent() ;
// 错误触发
ce.on('error',  err => {
  console.log(err);
  
})
ce.on('event',()=>{
    console.log('event')
})
// 表示只触发一次
ce.once('once',  once => {
  console.log(once);
})

setInterval(()=>{
  ce.emit('once',"once")
},1000 )

ce.emit('error', new Error('oops'))

/// 移除所有的test事件
ce.removeAllListeners('test',()=>{})
````

#### fs

````javascript
fs.unlink('/tpl/hello',(err)=>{
    if(err) throw err;
    console.log('成功移除/tpl/hello')
})
// 读文件---------------------------------------------------
const fs = require('fs')
// 异步
fs.readFile('../event/event.js','utf8',(err,data)=>{
  if(err) throw err
  console.log(data);//是一个buffer数据流
  
})
// 同步,有返回
let data = fs.readFileSync('../path/_names.js','utf8')
console.log('data',data);
// 读取相对于当前层的文件和文件夹名称
fs.readdir('../',(err,data)=>{
  if(err) throw err
  console.log('readdir',data);//readdir [ 'event', 'fs', 'path' ]
  
})
// 创建文件夹
fs.mkdir('text',(err)=>{
  if(err) throw err
  console.log('mkdir');
})
// 删除文件夹
fs.rmdir('text',(err)=>{
  if(err) throw err
  console.log('rmdir');
})

// 写文件-----------------------------------------------------
// 覆盖写
fs.writeFile('./test.txt','this is a test',{encoding:'utf8'},(err)=>{
  if(err) throw err
  console.log('done !');
  
})
// 可用于判断文件是否存在
fs.stat('./test1.txt',(err,data)=>{
  if(err) throw('文件不存在')
  
  console.log(data.isFile());
  console.log(data.isDirectory());
  console.log(data);
})
// 重命名
fs.rename('./test.txt','test1.txt',(err)=>{
  if(err) throw(err)
  console.log('重命名成功');
})
// 删除文件
fs.unlink('./test1.txt',(err)=>{
  if(err) throw(err)
  console.log('删除成功');
})

// 监听文件变化  ：监听当前文件目录下的文件变化
fs.watch('./',{recursive:true},(eventType,filename)=>{
  console.log(eventType,filename);
})

// readstream：读取流
const fs = require('fs')
const rs = fs.createReadStream('./fs.js')
rs.pipe(process.stdout)

// 写流
const fs = require('fs')
const ws = fs.createWriteStream('./test.txt')
let tid =setInterval(()=>{
  const num =parseInt(Math.random()*10) 
  if(num<5){
    ws.write(num+'')
  }
  else{
    clearInterval(tid)
    ws.end()
  }
},200 )
ws.on('finish',()=>{
  console.log('finish');
  
})

// promisify  转为promise
const fs = require('fs')
const promisify= require('util').promisify;

const read = promisify(fs.readFile);

read('./fs.js').then(res=>{
  console.log(res.toString());
  
}).catch(ex=>{
  console.log(ex);
  
})

// async await
async function test(){
  try {
    const content =await read('./fs.js')
    console.log('----------------------content---------------',content.toString());
  } catch (error) {
    console.log(error);
    
  }
}
````

