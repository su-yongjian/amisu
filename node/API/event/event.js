const EventEmitter = require('events')
class CunstomEvent extends EventEmitter {}
const ce = new CunstomEvent() ;
// 错误触发
ce.on('error',  err => {
  console.log(err);
  
})
// 表示只触发一次
ce.once('once',  once => {
  console.log(once);
})

setInterval(()=>{
  ce.emit('once',"once")
},1000 )

ce.emit('error', new Error('oops'))