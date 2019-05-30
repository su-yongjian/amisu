const mongoose = require('mongoose')
const db = 'mongodb://localhost/mongo_test'
// const glob = require('glob')
// const {resolve} = require('path')

// exports.initSchemas = ()=>{
//   // glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
// }


// 连接数据库，URL以mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。（默认端口27017）
// 连接mongodb数据库的链接解析器会在未来移除，要使用新的解析器，通过配置{ useNewUrlParser:true }来连接 ；其他警告参考：https://mongoosejs.com/docs/deprecations.html

/**
 * mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告：
 * (node:24864) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * (node:24841) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
 * 可以如下设置
 */
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
let dbc = mongoose.connection
exports.connect = ()=> {
  // 链接数据库
  mongoose.connect(db)
  let  maxConnectTimes = 0
  
  return new Promise((resolve,reject)=>{

    // 增加数据库监听事件:断开链接
    dbc.on('disconnected',()=>{
      console.log('***********数据库断开***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db)
      }
      else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
    })
  
    dbc.on('error',err=>{
      console.log('***********数据库出错***********')
      if(maxConnectTimes<=3){
        maxConnectTimes++
        mongoose.connect(db)
      }
      else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
      }
      
    })
  
    dbc.once('open',()=>{
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
  
}