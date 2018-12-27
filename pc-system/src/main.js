// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios';
Vue.prototype.$axios=axios; //在其他vue组件中就可以this.$axios调用使用

// import iView from 'iview';
import {
  Icon,
   Button, 
   Table ,
   Form ,
   FormItem,
   Input, 
   Message ,
   Alert,
   Notice,
   Modal,
   Layout,
   Header,
   Menu,
   MenuItem,
   Breadcrumb,
   BreadcrumbItem,
   Content,
   Sider,
   Submenu,
   Option,
   Tag,
   Avatar,
   Dropdown,
   DropdownMenu,
   DropdownItem
} from 'iview';
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Table', Table);
Vue.component('Layout', Layout);
Vue.component('Header', Header);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Content', Content);
Vue.component('Sider', Sider);
Vue.component('Submenu', Submenu);
Vue.component('Option', Option);
Vue.component('Tag', Tag);
Vue.component('Avatar', Avatar);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.prototype.$Message = Message;
Vue.prototype.$Alert = Alert;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Modal = Modal;
import "./css/init.css"
import "./css/normalize8.0.css"
import 'iview/dist/styles/iview.css';

import {store} from './vuex/store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
