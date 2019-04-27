const express = require('express');
const fs = require('fs')
const router = express.Router()
let stuModel = require('../models/stu')


router.get('/', function (req, res) {
  stuModel.find((err,list)=>{
    if(err) return res.status(500).send(err)
    return res.render('index.html', {
      list: list
    })
  })

  // fs.readFile("./db/index.json", 'utf8', (err, data) => {
  //   let list = JSON.parse(data).list;
  //   console.log(list);

  //   if (err) res.send(err)
  //   // 加载视图
  //   res.render('index.html', {
  //     list: list
  //   })
  // })

})

router.get('/add', function (req, res) {
  res.render('add.html')
})
router.post('/add', function (req, res) {
  let stu = req.body;
  stuModel.add(stu,(err)=>{
    console.log(Boolean(err) );
    // null :false
    if(err) return res.status(500).send(err)
    res.redirect('/stu')
  })

  // fs.readFile("./db/index.json", 'utf8', (err, data) => {
  //   console.log(data);

  //   let list = JSON.parse(data).list;
  //   console.log('list');
  //   console.log(list);
  //   let stu = req.body;
  //   stu.id = list.length + 1;
  //   list.push(stu);
  //   let str = JSON.stringify({ list: list })
  //   fs.writeFile('./db/index.json', str, (err) => {
  //     if (err) res.send(err)
  //     res.redirect('/stu')
  //   })
  // })
})
router.post('/del', function (req, res) {
  fs.readFile("./db/index.json", 'utf8', (err, data) => {
    console.log(data);

    let list = JSON.parse(data).list;

    console.log('list');
    console.log(list);
    let stu = req.body;
    stu.id = list.length + 1;
    list.push(stu);
    // let str =JSON.stringify({list:list})
    // fs.writeFile('./db/index.json',str,(err)=>{
    //   if(err) res.send(err)
    //   res.redirect('/stu')
    // })
  })
})


module.exports = router