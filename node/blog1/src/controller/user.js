const userModel = require('./tb_users')

const loginCheck = (username,password) =>{
    if(username&&username==="zhangsan"&&password==='123'){
        return true 
    }
}

//   user_id INT NOT NULL AUTO_INCREMENT,
//   username '用户名',
//   password '密码',
//   avator '头像',
//   create_time  '注册时间',
//   login_status '登录状态',
//   user_rule '用户角色',
const registUser = (username,password,avator='') =>{
    return new Promise((resolve,reject)=>{
        let date = new Date()
        let create_time = date.getTime();
        let userValue = [username,password,avator,create_time];
        userModel.insertUser(userValue).then(res=>{
            if(res.affectedRows){
                resolve(res)
            }else{
                reject(res)
            }
        })
    })
    
}
module.exports = {
    loginCheck,
    registUser
}