import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.checkLogin = function(backpage,backtype){//backpage:返回的页面,backtype:返回的类型,redirectTo,navigateto,swi...
	var SUID  = uni.getStorageSync('SUID');//uid
	var SRAND = uni.getStorageSync('SRAND');//随机码
	var SNAME = uni.getStorageSync('SNAME');//用户头像
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SFACE == ''){
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	// 如果登陆成功
	return [SUID, SRAND, SNAME, SFACE];
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
