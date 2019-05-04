const {basename,dirname,extname} = require('path')
const filePath = '/usr/local/bin/no.text'
console.log(basename(filePath));//no.text 文件名
console.log(dirname(filePath));//usr/local/bin 路径
console.log(extname(filePath));//.text  拓展名
