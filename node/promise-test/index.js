
const fs = require('fs') ;
const path = require('path');


// callback 方式获取文件的内容,回调地狱

function getFileContent(fileName,callback) {
    // 获取文件全名
    const fullFileName = path.resolve(__dirname,'file',fileName) ;
    // 读取文件数据
    fs.readFile(fullFileName,(err,data)=>{
        if(err) {
            console.log(err);
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })
}

getFileContent('a.json',data => {
    if(data.next){
        getFileContent(data.next,bdata=>{
            console.log(data);
            if(bdata.next){
                getFileContent(bdata.next,cdata=>{
                    console.log(cdata);
                    if(cdata.next){
                        getFileContent(cdata.next,ddata=>{
                            console.log(ddata);
                        })
                    }
                })
            }
        })
    }
})

// promist 方式

function getFileNmaePromist( fileName ) {

    return new Promise((resolve,reject)=>{
        // 获取文件全名
        const fullFileName = path.resolve(__dirname,'file',fileName);
        // 读取文件内容
        fs.readFile(fullFileName,(err,data)=>{
            if(err) {
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
}
getFileNmaePromist('a.json').then(res=>{
    console.log('a',res);
    if(res.next){
       return getFileNmaePromist(res.next)
    }else{
        console.log('a:finish');
    }
}).then(res1=>{
    console.log('b',res1);
    
    if(res1.next){
        return getFileNmaePromist(res1.next)
     }else{
         console.log('b:finish');
         
     }
}).then(res2=>{
    console.log('c',res2);
    if(res2.next){
        return getFileNmaePromist(res2.next)
     }else{
         console.log('c:finish');
         
     }
})

// async await
// koa2