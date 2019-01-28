import Axios from "axios";
import qs from "qs";
import router from "@/router/router.js";

/****** 创建axios实例 ******/
const Service = Axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 10000, // 请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
      // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // "Content-Type": "application/json;charset=utf-8"
  }
});

// 设置请求拦截器
Service.interceptors.request.use(config=> {
      // 在发送请求之前做某件事
      // if (config.method === "post") {
      //   // 序列化
      //   config.data = qs.stringify(config.data);
      //   config.data = JSON.stringify(config.data);
      //   // 提示,若是公司的提交能直接接受json 格式,可以不用 qs 来序列化的
      // }

      // 若是有做鉴权token , 就给头部带上token
      // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
      if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
      }
      return config;
  },error => {
    console.log(error);
    return Promise.reject(error);
  }
)

// 响应拦截  http 请求回来的一些状态码，包括我们自己的服务器返回的错误码进行一个逻辑处理。
Service.interceptors.response.use(res => {
  console.log(res);
  //对响应数据做些事
  if (res.data && res.data.code==401) {
      // this.$Message.error('token失效，请重新登录');
      // 清除token
      localStorage.removeItem('token')
      router.push({
        path:'/login'
      })
  }
  return res;
}, (error) => {
  console.log(error);
  
  // 错误处理方式2：
  const {status} = error.response ;

  // 直接丢localStorage或者sessionStorage
  if(status == 401) {
    this.$Message.error('token值无效，请重新登录');
    // 清除token
    localStorage.removeItem('token')
    router.push({
      path:'/login'
    })
  }else if(status==404){
    router.push({
      path: "/error/404"
    });
  }else{
    Message.error(error);
  }
  
  return Promise.reject(error);

})

export default Service;
