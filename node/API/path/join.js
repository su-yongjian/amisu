const {join} = require('path')
// 拼接
console.log(join('usr','local','host'));//usr\local\host
console.log(join('usr','local','../host'));//usr\host
