const { SuccessModel , ErrorModel} = require('../model/resModel');
const {loginCheck} = require('../controller/user')

const handleUserRouter = (req,res) =>{
    const method = req.method ;
    // 登录
    if( method==='POST' && req.path==='/api/user/login' ) {
        
        const {username,password} = req.body ;//之所以能直接拿是因为之前已经在post请求里面将所有的数据存到body里面去了
        const result = loginCheck(username,password)
        if(result) {
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('密码或者账号错误')
        }
    }
}

module.exports = handleUserRouter