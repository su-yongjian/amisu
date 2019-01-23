import request from "@/axios/index.js"

export function login(query) {
    console.log(query);
    
    return request({
        url: 'http://localhost:3000/user/login',
        method: 'post',
        data: query
    })
}