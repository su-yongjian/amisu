const {sign} = require('jsonwebtoken')
const secret = 'demo' ;
const jwt = require('koa-jwt')({secret}) ;

