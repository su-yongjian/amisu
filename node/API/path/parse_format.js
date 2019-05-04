const {parse,format} = require('path')

const filePath = '/usr/local/bin/no.text'

const ret = parse(filePath)//将一个路径解析
console.log(ret);
// { root: '/',
//   dir: '/usr/local/bin',
//   base: 'no.text',
//   ext: '.text',
//   name: 'no' }


const ret1 = format(
  {
    root: '/',
    dir: '/usr/local/bin',
    base: 'no.text',
    ext: '.text',
    name: 'no'
  }
)//format与parse相反
console.log(ret1);///usr/local/bin\no.text