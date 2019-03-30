const SESSION_DATA={}

// 解析
let userId = req.cookie.userid;
if(userId){
  if(SESSION_DATA[userId]){
    req.session = SESSION_DATA[userId]
  }else{
    SESSION_DATA[userId] = {} ;
    req.session = SESSION_DATA[userId]
  }
}else{
  userId = `${Date.now()}_${Math.random()}`
}
req.session = SESSION_DATA[userId]
