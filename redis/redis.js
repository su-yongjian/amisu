const redis = require('redis');
const { redis_config } = require('./redis_config');
// 创建客户端
const redisClient = redis.createClient(redis_config.PORT,redis_config.HOST)
redisClient.on('error',err=>{
  console.log(err);
})

function set(key,val){
  if(typeof val ==='object'){
    val = val.stringify(val)
  }

  redisClient.set(key,val,redis.print)
}

function get(key) {
  const promise = new Promise((resolve,reject)=>{
    redisClient.get(key,(err,val)=>{
      if(err){
        reject(err);
        return
      } 
      if(val==null){
        resolve(null)
        return
      }
      // 如果是字符串我们尝试把他们变成json格式的，如果成功则返回json格式的val否则直接返回
      try {
        resolve(
          JSON.parse(val)
        )
      }catch(ex){
        resolve(val)
      }
    })
  })

  return promise
}
function del(key){
  const promise = new Promise((resolve,reject)=>{
    redisClient.del(key,(err,val)=>{
      if(err){
        reject(err);
        return
      }
      resolve(val)
    })
  })
  return promise
}
module.exports = {
  set,
  get,
  del
}