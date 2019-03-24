const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
    const method = req.method ;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1])

    // 设置返回字符串格式为JSON:
    res.setHeader('Content-type','application/json')
    // 返回数据
    const resdata = {
        method,
        url,
        path,
        query
    }
    if(method==='GET'){
        res.end(JSON.stringify(resdata))//为什么还要设置返回字符串：上面设置的意思是字符串类型是json，返回永远是字符串的，字符串是json格式的
    }

    if(method==='POST'){
        let postdata = '' ;
        req.on('data',chumn=>{
            postdata+=chumn.toString()
        })
        req.on('end',()=>{
            res.end(postdata)
        })
    }
   
})

server.listen(8000)
console.log('server is success on 8000');
