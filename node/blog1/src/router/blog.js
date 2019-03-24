const { getList , getDetail } = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')
/**
 * author:amisu
 * @param {*} req 
 * @param {*} res 
 */

const handleBlogRouter = ( req , res) =>{
    const method = req.method ;
    // 获取博客列表
    if(method=='GET'&& req.path ==='/api/blog/list') {
        const author = req.query.author || '' ;
        const keyword = req.query.keyword || '' ;
        const list = getList(author,keyword) ;
        return new SuccessModel(list)
    }
    //获取博客详情
    if(method==='GET' && req.path === '/api/blog/detail'){
        const id = req.query.id || '' ;
        const detail = getDetail(id) ;
        return new SuccessModel(detail)
    }
    // 新建博客
    if(method==='POST' && req.path === '/api/blog/new'){
        return {
            msg : '新建一篇博客'
        }
    }
    // 更新一篇博客
    if(method==='POST' && req.path === '/api/blog/update'){
        return {
            msg : '更新一篇博客'
        }
    }
    //删除博客
    if(method==='POST'&& req.path==='/api/blog/del'){
        return {
            msg : '删除博客'
        }
    }

}

module.exports = handleBlogRouter