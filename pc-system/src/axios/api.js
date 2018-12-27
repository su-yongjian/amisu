import request from "@/axios/index.js"

export function tableList(query){
    return request({
        url: 'http://yapi.demo.qunar.com/mock/27844/apitest/list',
        method: 'get',
        params: query
    })
}