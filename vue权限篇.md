### 前言

在一个项目中，一些功能会涉及到重要的数据管理，为了确保数据的安全，我们会在项目中加入权限来限制每个用户的操作。作为前端，我们要做的是配合后端给到的权限数据，做页面上的各种各样的限制。

### 需求

因为这是一个工作上的业务需求，所以对于我来说主要有两个地方需要进行权限控制。

第一个是侧边菜单栏，需要控制显示与隐藏。

第二个就是页面内的各个按钮，弹窗等。

### 流程

1. **如何获取用户权限？**

   后端（当前用户拥有的权限列表）-> 前端（通过后端的接口获取到，下文中我们把当前用户的权限列表叫做 permissionList）

2. **前端如何做限制？**

   通过产品的需求，在项目中进行权限点的配置，然后通过 permissionList 寻找是否有配置的权限点，有就显示，没有就不显示。

3. **然后呢？**

   没了。

当我刚开始接到这个需求的时候就是这么想的，这有什么难的，不就获取 permissionList 然后判断就可以了嘛。后来我才发现真正的需求远比我想象的复杂。

### 真正的问题

上面的需求有提到我们主要解决两个问题，侧边菜单栏的显示 & 页面内操作。

假设我们有这样一个路由的设置（以下只是一个例子）：

> ```
> import VueRouter from 'vue-router'
>
> /* 注意：以下配置仅为部分配置，并且省去了 component 的配置 */
>
> export const routes = [
>
>   {
>
>     path: '/',
>
>     name: 'Admin',
>
>     label: '首页'
>
>   },
>
>   {
>
>     path: '/user',
>
>     name: 'User',
>
>     label: '用户',
>
>     redirect: { name: 'UserList' },
>
>     children: [
>
>       {
>
>         path: 'list',
>
>         name: 'UserList',
>
>         label: '用户列表'
>
>       },
>
>       {
>
>         path: 'group',
>
>         name: 'UserGroup',
>
>         label: '用户组',
>
>         redirect: { name: 'UserGroupList' },
>
>         children: [
>
>           {
>
>             path: 'list',
>
>             name: 'UserGroupList',
>
>             label: '用户组列表'
>
>           },
>
>           {
>
>             path: 'config',
>
>             name: 'UserGroupConfig',
>
>             label: '用户组设置'
>
>           }
>
>         ]
>
>       }
>
>     ]
>
>   },
>
>   {
>
>     path: '/setting',
>
>     name: 'Setting',
>
>     label: '系统设置'
>
>   },
>
>   {
>
>     path: '/login',
>
>     name: 'Login',
>
>     label: '登录'
>
>   }
>
> ]
>
>
>
> const router = new VueRouter({
>
>   routes
>
> })
>
> export default router
> ```

其中前两级路由会显示在侧边栏中，第三级就不会显示在侧边栏中了。

页面内操作的权限设置不需要考虑很多其他东西，我们主要针对侧边栏以及路由进行问题的分析，通过分析，主要有以下几个问题：

1. 什么时候获取 permissionList，如何存储 permissionList
2. 子路由全都没权限时不应该显示本身（例：当用户列表和用户组都没有权限时，用户也不应该显示在侧边栏）
3. 默认重定向的路由没有权限时，应寻找 children 中有权限的一项重定向（例：用户路由重定向到用户列表路由，若用户列表没有权限，则应该重定向到用户组路由）
4. 当用户直接输入没有权限的 url 时需要跳转到没有权限的页面或其他操作。（路由限制）

下面我们针对以上问题一个一个解决。

什么时候获取权限，存储在哪 & 路由限制

我这里是在 router 的 beforeEach 中获取的，获取的 permissionList 是存放在 vuex 中。

原因是考虑到要做路由的限制，以及方便后面项目中对权限列表的使用，以下是实现的示例：

首先我们加入权限配置到 router 上：

> ```
> // 以下只展示部分配置
>
> {
>
>   path: '/user',
>
>   name: 'User',
>
>   label: '用户',
>
>   meta: {
>
>     permissions: ['U_1']
>
>   },
>
>   redirect: { name: 'UserList' },
>
>   children: [
>
>     {
>
>       path: 'list',
>
>       name: 'UserList',
>
>       label: '用户列表',
>
>       meta: {
>
>         permissions: ['U_1_1']
>
>       }
>
>     },
>
>     {
>
>       path: 'group',
>
>       name: 'UserGroup',
>
>       label: '用户组',
>
>       meta: {
>
>         permissions: ['U_1_2']
>
>       },
>
>       redirect: { name: 'UserGroupList' },
>
>       children: [
>
>         {
>
>           path: 'list',
>
>           name: 'UserGroupList',
>
>           label: '用户组列表',
>
>           meta: {
>
>             permissions: ['U_1_2_1']
>
>           }
>
>         },
>
>         {
>
>           path: 'config',
>
>           name: 'UserGroupConfig',
>
>           label: '用户组设置',
>
>           meta: {
>
>             permissions: ['U_1_2_2']
>
>           }
>
>         }
>
>       ]
>
>     }
>
>   ]
>
> }
> ```

可以看到我们把权限加在了 meta 上，是为了更简单的从 router.beforeEch 中进行权限判断，权限设置为一个数组，是因为一个页面可能涉及多个权限。

接下来我们设置 router.beforeEach :

> ```
> // 引入项目的 vuex
>
> import store from '@/store'
>
> // 引入判断是否拥有权限的函数
>
> import { includePermission } from '@/utils/permission'
>
>
>
> router.beforeEach(async (to, from, next) => {
>
>   // 先判断是否为登录，登录了才能获取到权限，怎么判断登录就不写了
>
>   if (!isLogin) {
>
>     try {
>
>       // 这里获取 permissionList
>
>       await store.dispatch('getPermissionList')
>
>       // 这里判断当前页面是否有权限
>
>       const { permissions } = to.meta
>
>       if (permissions) {
>
>         const hasPermission = includePermission(permissions)
>
>         if (!hasPermission) next({ name: 'NoPermission' })
>
>       }
>
>       next()
>
>     }
>
>   } else {
>
>     next({ name: 'Login' })
>
>   }
>
> })
> ```

我们可以看到我们需要一个判断权限的方法 & vuex 中的 getPermissionList 如下：

> ```
> // @/store
>
>     export default {
>
>       state: {
>
>         permissionList: []
>
>       },
>
>       mutations: {
>
>         updatePermissionList: (state, payload) => {
>
>           state.permissionList = payload
>
>         }
>
>       },
>
>       actions: {
>
>         getPermissionList: async ({ state, commit }) => {
>
>           // 这里是为了防止重复获取
>
>           if (state.permissionList.length) return
>
>           // 发送请求方法省略
>
>           const list = await api.getPermissionList()
>
>           commit('updatePermissionList', list)
>
>         }
>
>       }
>
>     }
> ```

> ```
> // @/utils/permission
>
> import store from '@/store'
>
>
>
> /**
>
>  * 判断是否拥有权限
>
>  * @param {Array<string>} permissions - 要判断的权限列表
>
>  */
>
> function includePermission (permissions = []) {
>
>   // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
>
>   if (!permissions.length) return true
>
>   const permissionList = store.state.permissionList
>
>   return !!permissions.find(permission => permissionList.includes(permission))
>
> }
> ```

### 

### **重定向问题**

以上我们解决了路由的基本配置与权限如何获取，怎么限制路由跳转，接下来我们要处理的就是重定向问题了。

这一点可能和我们项目本身架构有关，我们项目的侧边栏下还有子级，是以下图中的 tab 切换展现的，正常情况当点击药品管理后页面会重定向到入库管理的 tab 切换页面，但当入库管理没有权限时，则应该直接重定向到出库管理界面。

![img](https://mmbiz.qpic.cn/mmbiz/MpGQUHiaib4ib725SW9O35Wxey9gCmmPzcJfAjPgZhbGiaLMOb9z9ToZ0VExvQRJyBr5GWWU5ibVzszmtIemMNdRCvA/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

所以想实现以上的效果，我需要重写 router 的 redirect，做到可以动态判断（因为在我配置路由时并不知道当前用户的权限列表）

然后我查看了 vue-router 的文档，发现了 redirect 可以是一个方法，这样就可以解决重定向问题了。

vue-router 中 redirect 说明(https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E9%87%8D%E5%AE%9A%E5%90%91) ，根据说明我们可以改写 redirect 如下：

> ```
> // 我们需要引入判断权限方法
>
> import { includePermission } from '@/utils/permission'
>
>
>
> const children = [
>
>   {
>
>     path: 'list',
>
>     name: 'UserList',
>
>     label: '用户列表',
>
>     meta: {
>
>       permissions: ['U_1_1']
>
>     }
>
>   },
>
>   {
>
>     path: 'group',
>
>     name: 'UserGroup',
>
>     label: '用户组',
>
>     meta: {
>
>       permissions: ['U_1_2']
>
>     }
>
>   }
>
> ]
>
>
>
> const routeDemo = {
>
>   path: '/user',
>
>   name: 'User',
>
>   label: '用户',
>
>   redirect: (to) => {
>
>     if (includePermission(children[0].meta.permissions)) return { name: children[0].name }
>
>     if (includePermission(children[1].meta.permissions)) return { name: children[1].name }
>
>   },
>
>   children
>
> }
> ```

虽然问题解决了，但是发现这样写下去很麻烦，还要修改 router 的配置，所以我们使用一个方法生成：

> ```
> // @/utils/permission
>
> /**
>
>  * 创建重定向函数
>
>  * @param {Object} redirect - 重定向对象
>
>  * @param {string} redirect.name - 重定向的组件名称
>
>  * @param {Array<any>} children - 子列表
>
>  */
>
> function createRedirectFn (redirect = {}, children = []) {
>
>   // 避免缓存太大，只保留 children 的 name 和 permissions
>
>   const permissionChildren = children.map(({ name = '', meta: { permissions = [] } = {} }) => ({ name, permissions }))
>
>   return function (to) {
>
>     // 这里一定不能在 return 的函数外面筛选，因为权限是异步获取的
>
>     const hasPermissionChildren = permissionChildren.filter(item => includePermission(item.permissions))
>
>     // 默认填写的重定向的 name
>
>     const defaultName = redirect.name || ''
>
>     // 如果默认重定向没有权限，则从 children 中选择第一个有权限的路由做重定向
>
>     const firstPermissionName = (hasPermissionChildren[0] || { name: '' }).name
>
>     // 判断是否需要修改默认的重定向
>
>     const saveDefaultName = !!hasPermissionChildren.find(item => item.name === defaultName && defaultName)
>
>     if (saveDefaultName) return { name: defaultName }
>
>     else return firstPermissionName ? { name: firstPermissionName } : redirect
>
>   }
>
> }
> ```

然后我们就可以改写为：

> ```
> // 我们需要引入判断权限方法
>
> import { includePermission, createRedirectFn } from '@/utils/permission'
>
>
>
> const children = [
>
>   {
>
>     path: 'list',
>
>     name: 'UserList',
>
>     label: '用户列表',
>
>     meta: {
>
>       permissions: ['U_1_1']
>
>     }
>
>   },
>
>   {
>
>     path: 'group',
>
>     name: 'UserGroup',
>
>     label: '用户组',
>
>     meta: {
>
>       permissions: ['U_1_2']
>
>     }
>
>   }
>
> ]
>
>
>
> const routeDemo = {
>
>   path: '/user',
>
>   name: 'User',
>
>   label: '用户',
>
>   redirect: createRedirectFn({ name: 'UserList' }, children),
>
>   children
>
> }
> ```

这样稍微简洁一些，但我还是需要一个一个路由去修改，所以我又写了一个方法来递归 router 配置，并重写他们的 redirect：

> ```
> // @/utils/permission
>
> /**
>
>  * 创建有权限的路由配置（多级）
>
>  * @param {Object} config - 路由配置对象
>
>  * @param {Object} config.redirect - 必须是 children 中的一个，并且使用 name
>
>  */
>
> function createPermissionRouter ({ redirect, children = [], ...others }) {
>
>   const needRecursion = !!children.length
>
>   if (needRecursion) {
>
>     return {
>
>       ...others,
>
>       redirect: createRedirectFn(redirect, children),
>
>       children: children.map(item => createPermissionRouter(item))
>
>     }
>
>   } else {
>
>     return {
>
>       ...others,
>
>       redirect
>
>     }
>
>   }
>
> }
> ```

这样我们只需要在最外层的 router 配置加上这样一层函数就可以了：

> ```
> import { createPermissionRouter } from '@/utils/permission'
>
>
>
> const routesConfig = [
>
>   {
>
>     path: '/user',
>
>     name: 'User',
>
>     label: '用户',
>
>     meta: {
>
>       permissions: ['U_1']
>
>     },
>
>     redirect: { name: 'UserList' },
>
>     children: [
>
>       {
>
>         path: 'list',
>
>         name: 'UserList',
>
>         label: '用户列表',
>
>         meta: {
>
>           permissions: ['U_1_1']
>
>         }
>
>       },
>
>       {
>
>         path: 'group',
>
>         name: 'UserGroup',
>
>         label: '用户组',
>
>         meta: {
>
>           permissions: ['U_1_2']
>
>         },
>
>         redirect: { name: 'UserGroupList' },
>
>         children: [
>
>           {
>
>             path: 'list',
>
>             name: 'UserGroupList',
>
>             label: '用户组列表',
>
>             meta: {
>
>               permissions: ['U_1_2_1']
>
>             }
>
>           },
>
>           {
>
>             path: 'config',
>
>             name: 'UserGroupConfig',
>
>             label: '用户组设置',
>
>             meta: {
>
>               permissions: ['U_1_2_2']
>
>             }
>
>           }
>
>         ]
>
>       }
>
>     ]
>
>   }
>
> ]
>
>
>
> export const routes = routesConfig.map(item => createPermissionRouter(item))
>
>
>
> const router = new VueRouter({
>
>   routes
>
> })
>
>
>
> export default router
> ```

当然这样写还有一个好处，其实你并不需要设置 redirect，这样会自动重定向到 children 的第一个有权限的路由

侧边栏显示问题

我们的项目使用的是根据路由的配置来生成侧边栏的，当然会加一些其他的参数来显示显示层级等问题，这里就不写具体代码了，如何解决侧边栏 children 全都无权限不显示的问题呢。

这里我的思路是，把路由的配置也一同更新到 vuex 中，然后侧边栏配置从 vuex 中的配置来读取。

由于这个地方涉及修改的东西有点多，而且涉及业务，我就不把代码拿出来了，你可以自行实验。

### 方便团队部署权限点的方法

以上我们解决了大部分权限的问题，那么还有很多涉及到业务逻辑的权限点的部署，所以为了团队中其他人可以优雅简单的部署权限点到各个页面中，我在项目中提供了以下几种方式来部署权限：

1. 通过指令 v-permission 来直接在 template 上设置

> ```
> <div v-permission="['U_1']"></div>
> ```

1. 通过全局方法 this.$permission 判断，因为有些权限并非在模版中的

> ```
> {  
> 	hasPermission () {    
> 	// 通过方法 $permission 判断是否拥有权限    
> 	return this.$permission(['U_1_1', 'U_1_2'])  
> }}
> ```

这里要注意，为了 $permission 方法的返回值是可被监测的，判断时需要从 this.$store 中来判断，以下为实现代码：

> ```
> // @/utils/permission
>
>     /**
>
>      * 判断是否拥有权限
>
>      * @param {Array<string|number>} permissions - 要判断的权限列表
>
>      * @param {Object} permissionList - 传入 store 中的权限列表以实现数据可监测
>
>      */
>
>     function includePermissionWithStore (permissions = [], permissionList = []) {
>
>       if (!permissions.length) return true
>
>       return !!permissions.find(permission => permissionList.includes(permission))
>
>     }
> ```

> ```
> import { includePermissionWithStore } from '@/utils/permission'
>
> export default {
>
>   install (Vue, options) {
>
>     Vue.prototype.$permission = function (permissions) {
>
>       const permissionList = this.$store.state.permissionList
>
>       return includePermissionWithStore(permissions, permissionList)
>
>     }
>
>   }
>
> }
> ```

以下为指令的实现代码（为了不与 v-if 冲突，这里控制显示隐藏通过添加/移除 className 的方式）：

> ```
> // @/directive/permission
>
> import { includePermission } from '@/utils/permission'
>
> const permissionHandle = (el, binding) => {
>
>   const permissions = binding.value
>
>   if (!includePermission(permissions)) {
>
>     el.classList.add('hide')
>
>   } else {
>
>     el.classList.remove('hide')
>
>   }
>
> }
>
> export default {
>
>   inserted: permissionHandle,
>
>   update: permissionHandle
>
> }
> ```

### 总结

**针对之前的问题，有以下的总结：**

1. 什么时候获取 permissionList，如何存储 permissionList

   router.beforeEach 获取，存储在 vuex。

2. 子路由全都没权限时不应该显示本身（例：当用户列表和用户设置都没有权限时，用户也不应该显示在侧边栏）

   通过存储路由配置到 vuex 中，生成侧边栏设置，获取权限后修改 vuex 中的配置控制显示 & 隐藏。

3. 默认重定向的路由没有权限时，应寻找 children 中有权限的一项重定向（例：用户路由重定向到用户列表路由，若用户列表没有权限，则应该重定向到用户组路由）

   通过 vue-router 中 redirect 设置为 Function 来实现

4. 当用户直接输入没有权限的 url 时需要跳转到没有权限的页面或其他操作。（路由限制）

   在 meta 中设置权限， router.beforeEach 中判断权限。