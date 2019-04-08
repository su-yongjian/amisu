const { 
    getList ,
    getDetail,
    newBlog ,
    updateBlog,
    delBlog
} = require('../controller/blog')

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
        console.log('list=',list);
        
        return new SuccessModel(list)
    }
    //获取博客详情
    if(method==='GET' && req.path === '/api/blog/detail'){
        const id = req.query.id || '' ;
        const detail = getDetail(id) ;
        return new SuccessModel(detail)
    }
    // 新建博客
    if(method==='GET' && req.path === '/api/blog/new'){
        // const blogData = req.body ;
        const blogData = req.query ;
        let title = '标题1';
        let content = '文章内容1。。。';
        let date = new Date();
        let create_time = date.getTime();
        let author = '匿名作者' ;
        
        if(Object.keys(blogData).length==0){
            blogData.title = title ;
            blogData.content = content ;
            blogData.create_time = create_time ;
            blogData.author = author ;
        }
        return newBlog(blogData)
    }
    // 更新一篇博客
    if(method==='POST' && req.path === '/api/blog/update'){
        // 获取文章的id
        const id = req.query.id || '' ;
        const result = updateBlog(id,req.body) ;
        if(result) {
            let msg = '更新成功'
            return new SuccessModel(msg)
        }else{
            new ErrorModel('更新失败')
        }

        return {
            msg : '更新一篇博客'
        }
    }
    //删除博客
    if(method==='POST'&& req.path==='/api/blog/del'){
        const id = req.query.id ;
        const result = delBlog(id);
        if(result) {
            return new SuccessModel('删除成功')
        }else{
            return new ErrorModel('删除失败')
        }
    }
}

module.exports = handleBlogRouter