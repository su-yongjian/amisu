import request from "@/axios/index.js"
import {config} from "@/config"
export function tableList(query){
    return request({
        url: config.baseUrl + '/admin/goodsList',
        method: 'get',
        params: query
    })
}

export function addGoods(query){
    console.log(query);
    
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

export function goodsDetail(query){
    return request({
        url: config.baseUrl + '/admin/goodsDetail',
        method: 'post',
        data: query
    })
}