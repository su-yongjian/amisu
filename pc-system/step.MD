导入安装iview   npm install iview --save

全局引入，在main.js里面
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import 'iview/dist/styles/iview.css';

按需引入：在main.js里面
先安装：npm install babel-plugin-import --save-dev
然后在.babelrc文件下配置：注意：只有按需引入才配置，全局引入不能配置，否则出错
```  "plugins": ["transform-vue-jsx",
      "transform-runtime",
      ["import", {
      "libraryName": "iview",
      "libraryDirectory": "src/components"
    }]
  ],
```
然后在main.js里面按需导入：
import { Button, Table } from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
按需导入的情况下导入提示框像通过$Message这种调用的组件，不能用component注册，需要把属性绑到Vue实例上，即在main.js里面 import以后，Vue.prototype.$Message = Message 这样注册
关于配置axios:详见axios/index.js文件
关于如何使用配置后的axios:单独定义一个api.js文件。里面专门写请求接口函数：
如在api文件夹里面新建一个文件xxx.js
文件内容为
```
import request from '@/Axios/index.js'

export function fetchList(query) {
  return request({
    url: '/xxxxx',
    method: 'get',
    params: query
  })
}
```

然后在需要使用的组件里面 按需 引入：
import { fetchList } from '@/api/xxx.js'

在需要请求数据的地方直接使用:
fetchList(query).then(res=>{})