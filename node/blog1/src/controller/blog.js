
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

module.exports = {
    getList,
    getDetail
}