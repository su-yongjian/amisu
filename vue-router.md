vue路由：

### 1：动态路由配置

```
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Layout from '@/view/layout'
import Home from '@/view/home'
import error from '@/view/error'
import p404 from '@/view/404'
import p505 from '@/view/505'
import Login from '@/login'
import AddGood from '@/view/table/addGoods'

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
        },
        {
          path: 'add',
          name: 'AddGood',
          component: AddGood,
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

```

### 2：响应路由参数的变化：

```
例如从/user/foo导航到/user/bar,原来的组件会被复用，
这种方式获取url上的参数可以watch来监视$route对象来获取
```

### 3：嵌套路由：要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

路由可以层层嵌套；**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

当你访问一个没有匹配的路由的时候，如果要渲染点什么东西，可以提供一个空的子路由

```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```



 ### 4:编程式导航：`router.push(location, onComplete?, onAbort?)`

```
除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如
// 字符串：router.push('home')
// 对象：router.push({ path: 'home' })

// 命名的路由：router.push({ name: 'user', params: { userId: '123' }})
这里的命名是指在route.JS里面定义动态路由配置name，参考第一点

带查询参数：变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
注意：如果提供了path,则params会被忽略，因此不能这样写：
this.$router.push({ path: 'register', params: { plan: 'private' }})这样是不能解析参数出来的。
正确的写法应该是这样：
this.$router.push({path:`user/${userID}`})  ===> /user/123,
this.router.push({path:'user',params:{userID}}) ====> /user,不能解析出userID
注意跟命名路由的区别:
this.$router.push({name:'user',params:{userId: 123}})===> /user/123
```

用于记住导航链接：在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

**注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 [`beforeRouteUpdate`](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)。

```
router.go(n)：this.$router.go(-1)后退1步 this.$router.go(1)前进1步 .....等价于window.history.go(n)。
```

### 5.命名路由：

```
命名路由即在routes配置里面增加一个name属性来作为路由名称
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

链接的时候router-link 的 to 属性传一个对象：
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
或者在js里面：router.push({ name: 'user', params: { userId: 123 }})
```

### 命名视图

```
改功能很少用到：一般用于不同用户不同视图的情况（可以用来做PC端和移动端的切换）
如有三个同级视图
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 重定向：

```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
或命名路由
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})

或者方法
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

### 别名

```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
访问/a时url时/a,访问/b时，url为/a
“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
```





### 关于路由参数的传递：

```
url解耦
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

通过props解耦
 props: ['id']（和data平级）
 
对象模式：（很少用）
如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})

函数模式（很少用）创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

高级应用：

路由守卫:

```
可以使用 router.beforeEach 注册一个全局前置守卫：
const router = new VueRouter({ 
	routes:[
      .....
	]
})

router.beforeEach((to, from, next) => {
  // ...
})
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

确保要调用 next 方法，否则钩子就不会被 resolved。


2.5.0+ 新增
全局解析守卫
	在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

全局后置钩子:
	也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach((to, from) => {
  // ...
})

路由独享的守卫:
你可以在路由配置上直接定义 beforeEnter 守卫：
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。



### 路由元信息

```
定义路由的时候可以配置 meta 字段：
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
那么如何访问这个 meta 字段呢？需要遍历 $route.matched 来检查路由记录中的 meta 字段。
全局导航守卫中检查元字段：
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 过渡效果：详情参考https://cn.vuejs.org/v2/guide/transitions.html

`<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果：

## 单个路由的过渡:在各路由组件内使用 `<transition>` 并设置不同的 name。

```
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```

## 基于路由的动态过渡

```
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>

// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

导航完成后获取数据：一般在created钩子发送请求

```
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
```

在导航完成前获取数据：

```
beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。
beforeRouteEnter (to, from, next) {
	getPost(to.params.id, (err, post) => {
		next(vm => vm.setData(err, post))
	})
},

// 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
```



### 路由懒加载

```
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

