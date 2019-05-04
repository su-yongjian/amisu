const { normalize} = require('path')

console.log(normalize('/usr//localhost/bin'));//\usr\localhost\bin
console.log(normalize('/usr/localhost/../bin'));//\usr\bin
