const handleUserRouter = (req,res) =>{
    const method = req.method ;
    if( method==='POST' && path==='/api/user/login' ) {
        return {
            msg:'这是登录接口'
        }
    }
}

module.exports = handleUserRouter