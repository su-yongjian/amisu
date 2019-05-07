const fs = require('fs')
const rs = fs.createReadStream('./fs.js')
rs.pipe(process.stdout)

const ws = fs.createWriteStream('./test.txt')
let tid =setInterval(()=>{
  const num =parseInt(Math.random()*10) 
  if(num<5){
    ws.write(num+'')
  }
  else{
    clearInterval(tid)
    ws.end()
  }
},200 )
ws.on('finish',()=>{
  console.log('finish');
  
})