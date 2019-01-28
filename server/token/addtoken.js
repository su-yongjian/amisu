const jsonwebtoken = require('jsonwebtoken');

module.exports = (userinfo) => {
    const rule = {
        username:userinfo.username,
        id:'123456',
        secret:'my_token'
    }
    const secret = "my_token";
    const time = 3600 ;

    const token = jsonwebtoken.sign(rule,secret,{expiresIn:time})
    return token
}