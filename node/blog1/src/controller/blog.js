const {query} = require('../../config/node-sql.js')

const {exec} = require('../db/mysql')
// 获取博客列表的controller函数
/**
 * 
 * @param {作者} author 
 * @param {关键字} keyword 
 */
const getList = (author,keyword) =>{
    let _sql = `select * from tb_blogs where 1=1 `
    if(author) {
        _sql+= `and author='${author}' `
    }
    if(keyword) {
        _sql =`and title like '%${keyword}%' `
    }
    _sql+=`order by create_time desc;`;
    console.log('sql=',_sql);
    
    return exec(_sql)
}
/**
 * 
 * @param {*} id :博客列表id
 */
const getDetail = ( id ) =>{
    let sql = `select * from tb_blogs where 1=1 and id=${id} order by createTime;` ;

    return  {
        id:2,
        title:'标题B',
        content:'内容B',
        createTime:'1553419137369',
        author:'LISI'
    }
    
}

const newBlog = (blogData={}) =>{
    // blogData 是一个博客对象，包含，title，content属性
    console.log('blogData....',blogData);
    
    return {
        id:3//表示每次新建一个就插入到数据表里面

    }
}

const updateBlog = (id,blogData={}) =>{
    // blogData 是一个博客对象，包含，title，content属性
    console.log('update....',id,blogData);
    
    return true
}

const delBlog = (id) =>{
    console.log('删除博客id=',id);
    
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}