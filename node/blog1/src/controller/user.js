const loginCheck = (username,password) =>{
    console.log(username,password);
    
    if(username&&username==="zhangsan"&&password==='123'){
        return true 
    }
}

module.exports = {
    loginCheck
}