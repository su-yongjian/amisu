
// 获取博客列表的controller函数
/**
 * 
 * @param {作者} author 
 * @param {关键字} keyword 
 */
const getList = (author,keyword) =>{
    return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:'1553419096666',
            author:'zhangsan'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:'1553419137369',
            author:'LISI'
        }
    ]
}
/**
 * 
 * @param {*} id :博客列表id
 */
const getDetail = ( id ) =>{
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