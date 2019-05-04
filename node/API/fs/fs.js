
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
fs.mkdir('text',(err,data)=>{
  if(err) throw err
  console.log('mkdir',data);
  
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

