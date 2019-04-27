let express = require('express');

let app = express()

app.get('/',function(req,res){
  res.send('sadjhklasf')
})

app.listen(8080,()=>{
  console.log('启动成功at 8080');
  
})