// 导入schama
const Users = require('../dbs/schema/Users.js').Users
/* 查所有用户 */
exports.findAllUsers = async (params) => {
  let keyword = params.keyword ||''
  let _filter = {
    userStatus:1
  }
  let count = 0
  count = await Users.countDocuments(_filter)

  let ret = await Users.find(_filter).limit(20)

  return {
    count,
    list:ret
  }

};

/* 新增用户 */
exports.addUser = async (userParams) => {
  console.log('add=');
  console.log(userParams);
  return await userParams.save();
};

/**
 * 编辑
 */
exports.updateUser = async (userParams)=>{
  console.log('edit=');
  console.log(userParams);
  
  return await Users.updateOne({_id:userParams.id},{
    $set:{
      userName:userParams.userName,
      password:userParams.password,
      gender:userParams.gender
    }
  })
}


/**
 * 硬删除
 */
exports.removeUser = async (userParams)=>{
  return await Users.findOneAndRemove({_id:userParams.id})
}
/**
 * 软删除
 */
exports.delUser = async (userParams)=>{
  return await Users.findOneAndUpdate({_id:userParams.id},{userStatus:0})
}
