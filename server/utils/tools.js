let getToken = require('jsonwebtoken')
exports.verToken = function(token){
    return new Promise((resolve,reject) => {
        let info = getToken.verify(token.split(' ')[1],'token')
        resolve(info)
    })
}