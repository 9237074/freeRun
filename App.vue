//wx0d924d10e89a476b
<script>
	import Vue from 'vue'
	import permision from 'js_sdk/wa-permission/permission.js'
	export default {
		onLaunch: function() {
			let that = this;
			//获取系统信息
			uni.getSystemInfo({ 
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			Vue.prototype.checkLocation = async() =>{
				// 判断当前gps是否开启
				if(!await permision.checkSystemEnableLocation()){
					uni.showModal({
						title: "提示",
						content: "请打开gps服务,否则无法记录成绩。",
						confirmText: "确定",
						showCancel: false						
					})
					return false
				}else{
					await uni.getLocation({
						success: (res) => {
							// console.log('location:', res)
						}
					})
					let location
					let platform = uni.getSystemInfoSync().platform
					if(platform === 'ios'){
						location = permision.judgeIosPermission("location")
					}else{
						let locationNum = await permision.requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION")
						console.log('locationNum:', locationNum)
						if(locationNum === 1){
							location = true
						}else{
							location = false
						}
					}
					console.log("当前应用权限：", location)
					if(location){
						console.log('当前应用有权限')
						return true
					}else{
						uni.showModal({
							title: "提示",
							content: "请授予位置权限,否则无法记录成绩。",
							confirmText: "去打开",
							success: (res) => {
								if(res.confirm){
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				}
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@font-face {
		/* 声明"custom-icon"字体 */
		font-family: "custom-icon";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,xxxxxxxx') format('woff2');
	}
	
	.custom-icon {
		/* 引用上面声明的"custom-icon"字体 */
		font-family: "custom-icon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	/* 字体图标的前缀为"custom-icon-" */
	.custom-icon-copy:before {
	  content: "\e641";
	}
</style>
