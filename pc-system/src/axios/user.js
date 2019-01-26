import request from "@/axios/index.js"
import {config} from "@/config"

export function login(query) {
    console.log(config);
    return request({
        url: config.baseUrl + '/user/login',
        method: 'post',
        data: query
    })
}
// 注册用户
export function registor(query) {
    console.log(config);
    return request({
        url: config.baseUrl + '/user/registor',
        method: 'post',
        data: query
    })
}