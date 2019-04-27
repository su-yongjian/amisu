let fs = require('fs')
let dbBase = './db/stu.json'

// 获取列表
exports.find = (cb)=>{
  fs.readFile(dbBase,'utf8',(err,data)=>{
    if(err) {
      return cb(err)
    }
    cb(null,JSON.parse(data.toString()).list)
  })
  
}

/**
 * 根据id获取信息
 * id
 */

 exports.findById = (id,cb)=>{
   fs.readFile(dbBase,'utf8',(err,data)=>{
    if(err) {
      return cb(err)
    }
    // 获取旧数据
    let oldlist = JSON.parse(data.toString()).list
    // 通过id获取数据
    let stu = oldlist.find(function(item){
      return item.id == id
    })
    cb(null,stu)
   })
 }
/**
 * 添加一个学生对象
 */
 exports.add = (stu,cb)=>{
   fs.readFile(dbBase,'utf8',(err,data)=>{
      if(err) return cb(err)
      let oldlist = JSON.parse(data.toString()).list;
      stu.id = oldlist.length + 1;
      oldlist.push(stu)
      let str = JSON.stringify({list:oldlist});
      fs.writeFile(dbBase, str, (err) => {
        if (err) cb(err)
        cb(null)
      })
   })
 }