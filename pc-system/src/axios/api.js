import request from "@/axios/index.js"

export function tableList(query){
    return request({
        url: 'http://localhost:3000/admin/goodsList',
        method: 'get',
        params: query
    })
}

export function addGood(query){
  return request({
      url: 'http://localhost:3000/admin/addGood',
      method: 'post',
      data: query
  })
}
