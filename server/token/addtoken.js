const jsonwebtoken = require('jsonwebtoken');



module.exports = (userinfo) => {
    const rule = {
        username:userinfo.username,
    }
    const keys = "token";
    const time = 3600 ;

    const token = jsonwebtoken.sign(rule,keys,{expiresIn:time})
    return token
}