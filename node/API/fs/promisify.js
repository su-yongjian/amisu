const fs = require('fs')
const promisify= require('util').promisify;

const read = promisify(fs.readFile);

read('./fs.js').then(res=>{
  console.log(res.toString());
  
}).catch(ex=>{
  console.log(ex);
  
})

async function test(){
  try {
    const content =await read('./fs.js')
    console.log('----------------------content---------------',content.toString());
  } catch (error) {
    console.log(error);
    
  }
}
test()