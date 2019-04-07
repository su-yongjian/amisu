const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog') ;
const handleUserRouter = require('./src/router/user') ;

// 用于处理post请求
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
const serverHandle = (req,res) => {
    // 设置返回格式
    res.setHeader('Content-type','application/json');
    const url = req.url ;
    req.path = url.split('?')[0];

    // 解析query
    req.query = queryString.parse(url.split('?')[1]);
    getPostData(req).then(postData=>{
        req.body = postData;
        // //处理blog路由
        const blogData = handleBlogRouter(req,res)
        if(blogData){
            res.end(JSON.stringify(blogData))
            return
        }
        // 处理user路由
        const userData = handleUserRouter(req,res) ;
   
        if(userData){
            res.end(JSON.stringify(userData))
            return
        }


        // 未命名路由，返回404
        res.writeHead(404,{"Content-type":'text/plain'});
        res.write('404 Not Found\n')
        res.end()
    })
        

}

module.exports = {
    serverHandle
}
// env:process.env.NODE_ENV//node提供的变量，拿到运行环境是什么