let http = require('http')
let fs = require('fs')
let server = http.createServer();
server.on('request',function(req,res){
  fs.readFile('./message.html','utf8',function(err,data){
    if(err) res.end('404 not found')
    res.setHeader('Content-Type','text/html;chartset=utf-8');
    res.write(data);
    res.end()
  })
})
server.listen(8080,function(){
  console.log('启动成功8080端口');
  
})