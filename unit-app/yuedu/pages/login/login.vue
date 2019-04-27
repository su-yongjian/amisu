<template>
	<view>
		<button type="primary" @click="toIndex">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad:function(e){
			console.log(e)
			uni.login({
				success:(res)=> {
					console.log(res)
					uni.getUserInfo({
						success: (info) => {
							console.log(info)
						}
					})
				},
				fail: () => {
					uni.showToast({
						title:"微信登录授权失败"
					})
				}
			})
		},
		methods:{
// 			backpage, backtype 2个参数分别代表：
// 			backpage : 登录后返回的页面
// 			backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
			toIndex(){
				console.log('index')
			}
		}
	}
</script>

<style lang="scss">

</style>
