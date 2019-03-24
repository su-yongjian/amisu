const fs = require('fs')
function readFilePromise(path){
    return  new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{ 
            if(err) reject(err)
            else resolve(data)
        })

    })
}

readFilePromise('./package.json').then(res=>{
    res = JSON.parse(res)

    console.log(res.name);
   
}).catch(err=>{
    console.log(err);
    
})