<template>
	<view class="content">
		<view>
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<view>
			<image src="../../static/say_runrun.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.checkUpdate()
			let that = this
			// 设置缓存
			// 去获取 token 缓存
			uni.getStorage({
				key: 'token',
				success: (res) => {
					that.globalData.update = 'true';
					if (res.data.token != '') {
						Vue.prototype.globalData = Object.assign(Vue.prototype.globalData, { ...res.data
						})
						uni.request({
							url: `${Vue.prototype.globalData.server}/logincheck?token=${Vue.prototype.globalData.token}&timestamp=${Vue.prototype.globalData.timestamp}`,
							success(res) {
								if (res.data.msg == '正常') {
									console.log('登陆状态正常');
									uni.switchTab({
										url: '../index/index'
									})
								} else {
									uni.redirectTo({
										url: '../denglu/denglu'
									})
								}
							},
							fail: () => {
								uni.redirectTo({
									url: '../denglu/denglu'
								})
							}
						})
					} else {
						uni.redirectTo({
							url: '../denglu/denglu'
						})
					}
				},
				fail() {
					console.log('缓存获取失败')
					uni.redirectTo({
						url: '../denglu/denglu'
					})
				}
			})
		},
		methods: {
			checkUpdate:function(){
				// //更新请求
				//#ifdef APP-PLUS
				    // let server = Vue.prototype.globalData.server+"/update"; //检查更新地址  
				    // let req = { //升级检测数据  
				    //     "appid": plus.runtime.appid,  
				    //     "version": plus.runtime.version  
				    // };
				    // uni.request({
				    //     url: server,
				    // 	data: req,
				    //     success: (res) => {  
				    //         if (res.data.status != 1 || res.data.update != "true") {
				    // 			console.log('升级请求返回的数据',res);
				    // 			Vue.prototype.globalData.update = "false";
				    // 			Vue.prototype.globalData.updateUrl = res.data.url;
				    // 			console.log('Vue.prototype.globalData.update',Vue.prototype.globalData.update);
				    // 			uni.reLaunch({
				    // 				url:'../update/update',
				    // 				success(e) {
				    // 					console.log('success',e);
				    // 				},
				    // 				fail(e) {
				    // 					console.log('fail',e);
				    // 				}
				    // 			});
				    // 			console.log('test');
				    //         } else{
				    // 			console.log('版本正常');
				    // 		} 
				    //     }
				    // });
				//#endif 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		background-color: #0AAC61;
		
		view{
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 10%;
		}
		
		view:first-child{
			image{
				height: 260upx;
				width: 260upx;
			}
		}
		view:last-child{
			image{
				height: 144upx;
			}
		}
	}
</style>
