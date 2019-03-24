const util = require('util');
const fs = require('fs');
// 包装cb
util.promisify(fs.readFile)('./package.json').then(JSON.parse).then(data=>{
    console.log(data.name);
    
}).catch(err=>{
    console.log(err);
    
})