import request from "@/axios/index.js"
import {config} from "@/config"
export function tableList(query){
    return request({
        url: config.baseUrl + '/admin/goodsList',
        method: 'get',
        params: query
    })
}

export function addGood(query){
  return request({
      url: config.baseUrl + '/admin/addGoods',
      method: 'post',
      data: query
  })
}

export function deleteGoods(query){
    return request({
        url: config.baseUrl + '/admin/deleteGoods',
        method: 'post',
        data: query
    })
  }