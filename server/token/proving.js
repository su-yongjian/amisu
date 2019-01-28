const jsonwebtoken = require('jsonwebtoken') ;
const serect = 'token' ;
module.exports = (tokens) => {
    if(tokens) {
        let token = tokens.split(' ')[1];
        // 解析
        let decoded = jsonwebtoken.decode(token,serect)
        return decoded
    }
}