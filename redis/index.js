const redis = require('redis');
// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err=>{
  console.log(err);
})
// 设置
redisClient.set('myname','zhangsan',redis.print);
// 取值
redisClient.get('myname',(err,val)=>{
  if(err){
    console.log(err);
    return
    
  }
  console.log(val);

})
redisClient.del('myname',(err,val)=>{
  if(err){
    console.log(err);
    return
    
  }
  console.log(val);
  
  
})
  // 退出
redisClient.quit()