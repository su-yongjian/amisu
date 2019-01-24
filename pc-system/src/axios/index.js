import Axios from "axios";
import qs from "qs";
import router from "@/router/router.js";
// import { Message } from "element-ui";

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
Service.interceptors.request.use(

    config=> {
      console.log(config);
      // 在发送请求之前做某件事
      if (config.method === "post") {
        // 序列化
        // config.data = qs.stringify(config.data);
        // config.data = JSON.stringify(config.data);
        // 温馨提示,若是公司的提交能直接接受json 格式,可以不用 qs 来序列化的
      }

      // 若是有做鉴权token , 就给头部带上token
      // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
      // if (localStorage.token) {
      //   config.headers.Authorization = localStorage.token;
      // }
      return config;
    },
    error => {
      // error 的回调信息,看公司的定义
      Message({
        showClose: true,
        message: error,
        type: "warning"
      });
      return Promise.reject(error);
    }
)

// 响应拦截  http 请求回来的一些状态码，包括我们自己的服务器返回的错误码进行一个逻辑处理。
Service.interceptors.response.use(res => {
  //对响应数据做些事
  // if (res.data && !res.data.success) {
  //     Message({
  //         //  饿了么的消息弹窗组件,类似toast
  //         showClose: true,
  //         message: res.data.error.message.message ?
  //         res.data.error.message.message :
  //         res.data.error.message,
  //         type: "error"
  //     });
  //     return Promise.reject(res.data.error.message);
  // }
  if(res.data.code==4004){
    router.push({path: "/login"});
    return
  }
  return res;
}, (error) => {
  console.log(error);

  // 错误处理方式1：
//   if (error.data) {
//     switch (error.data.code) {
//       case 401:
//         // 返回 401 清除token信息并跳转到登录页面
//         // store.commit("del_token");
//         router.push({
//           path: "/login",
//           //   记录原来的页面路径用于登录后调回原页面
//           query: {
//             redirect: router.currentRoute.fullPath
//           }
//         });
//         break;
//     }
//   }


  // 错误处理方式2：
  // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
  // 直接丢localStorage或者sessionStorage
  if (!window.localStorage.getItem("username")) {
    // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    router.push({
      path: "/login"
    });
  } else {

      // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
      if (error.response.status === 403) {
        router.push({
          path: "/error/403"
        });
      }
      if (error.response.status === 500) {
        router.push({
          path: "/error/500"
        });
      }
      if (error.response.status === 502) {
        router.push({
          path: "/error/502"
        });
      }
      if (error.response.status === 404) {
        router.push({
          path: "/error/404"
        });
      }

  }
  // 返回 response 里的错误信息
  let errorInfo = error.data.error ? error.data.error.message : error.data;
  return Promise.reject(errorInfo);

})

export default Service;
