const mongoose = require('mongoose')
const db = 'mongodb://localhost/amisu'

exports.initSchemas = ()=>{
  
}
exports.connect = ()=> {
  // 链接数据库
  mongoose.connect(db,{ useNewUrlParser: true },(err,db)=>{})
  let  maxConnectTimes = 0
  
  return new Promise((resolve,reject)=>{

    // 增加数据库监听事件:断开链接
    mongoose.connection.on('disconnected',()=>{
      console.log('***********数据库断开***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db,{ useNewUrlParser: true },(err,db)=>{})
      }
      else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })
  
    mongoose.connection.on('error',err=>{
      console.log('***********数据库出错***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db,{ useNewUrlParser: true },(err,db)=>{})
      }
      else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
      
    })
  
    mongoose.connection.once('open',()=>{
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
  
}