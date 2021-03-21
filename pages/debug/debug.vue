<template>
	<view class="view">
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<!-- <block slot="backText">返回</block> -->
			<block slot='content'>debug</block>
		</cu-custom>
		<view class="content" v-for="(item,index) in logStorage" :key="item.timestamp">
			{{index+1}}
			{{item.latitude}}
			{{item.longitude}}
			{{new Date(item.time).toGMTString()}}
		</view>
	</view>
</template>

<script>
	import login from '../../api/system/login.js'
	export default {
		data() {
			return {
				logStorage: [],
				option: {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 1000,
					provider: 'system',
					coordsType: 'wgs84',
					geocode: false
				}
			}
		},
		onLoad() {
			login().then(res => {
				console.log(res)
			}).catch(e => {
				console.log("err:", e)
			})
			console.log("token:", this.$store.state.system.token)
			// login().then(res => {
			// 	console.log(res)
			// })
		},
		methods: {
			startGeolation() {
				// #ifdef APP-PLUS
				const platform = uni.getSystemInfoSync().platform
				if (platform === 'android') {
					const fUN_AmapLocation = uni.requireNativePlugin('FUN-AmapLocation');
					//可提前申请权限。也可用uni.getLocation来提前申请。防止第一次可能定位失败。[start接口也有权限判断申请]
					uni.getLocation({})
					//开启定位
					fUN_AmapLocation.start({
							intervalTime: 5000,
							reportInterval: 5,
							isReport: true,
							url: 'http://192.168.0.66/fun/open/test_json.do',
							params: {
								a: 1,
								B: '测试',
								c: true
							},
							headers: {
								a: '123',
								B: 'abcd'
							}
						},
						result => {
							//见下方定位返回示例
							console.log('====fUN_AmapLocation定位====', JSON.stringify(result));
							_this.msg = JSON.stringify(result);
						}
					);
				})
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.view {
		height: 100vh;
		display: flex;
		flex-direction: column;

		button {
			position: fixed;
			bottom: 50px;
		}
	}
</style>
