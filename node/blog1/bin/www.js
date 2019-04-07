const http = require('http')
const serverConfig = require('../config/server_config.js')
const {serverHandle} = require('../app')
const server = http.createServer(serverHandle)



server.listen(serverConfig.PORT);
console.log(`server running success on ${serverConfig.PORT}`);

