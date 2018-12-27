import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Layout from '@/view/layout'
import Home from '@/view/home'
import error from '@/view/error'
import p404 from '@/view/404'
import p505 from '@/view/505'
import Login from '@/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta:{
            requireLogin:true
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/error',
      name: 'error',
      component: error,
      children:[
        {
          path: '404',
          name: '404',
          component: p404,
        },
        {
          path: '505',
          name: '505',
          component: p505,
        }
        
      ]
    }
  ]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem("username")) {
      next();
    } else {
      // 没登录则跳转到登录界面
      console.log("to login");
      
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});
export default router;