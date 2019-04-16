const { SuccessModel , ErrorModel} = require('../model/resModel');
const {loginCheck} = require('../controller/user')
const {registUser} = require('../controller/tb_users')

const handleUserRouter = (req,res) =>{
    const method = req.method ;

    // 登录
    if( method==='GET' && req.path==='/api/user/login' ) {
        
        // const {username,password} = req.body ;//
        const {username,password} = req.query ;//
        const result = loginCheck(username,password);
        if(result) {
            return new SuccessModel('登录成功')
        }else{
            return new ErrorModel('密码或者账号错误')
        }
    }

    if( method==='GET' && req.path==='/api/user/registor' ) {
        
        // const {username,password} = req.query ;//
        let res = '' ;
        let username = 'amusi' ,password=123;
    }
}

module.exports = handleUserRouter