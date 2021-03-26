<template>
	<view>
		<view class="userInfo">
			<view class="userInfo-top">
				<view>
					<u-avatar :src="src" ></u-avatar>
				</view>
				<view>
					{{vuex_userInfo.user}}
				</view>
				<view></view>
			</view>
			<view class="">

			</view>
		</view>
		<!-- 我的排行 跑步记录 晨读记录 个人资料 签到码 关于我们 -->
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list='tabbar' :mid-button="true"></u-tabbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		},
		onLoad() {
			console.log(this.vuex_version)
		},
		methods: {
			gotoDebug() {

			},
			rank() {
				this.$u.route('pages/user/rankHome/rankHome')
			},
			runRecord(e) {
				uni.navigateTo({
					url: '../runRecord/runRecord'
				})
			},
			readRecord(e) {
				uni.navigateTo({
					url: '../readRecord/readRecord'
				})
			},
			qrcode(e) {
				var that = this
				// 设备登陆检查
				uni.request({
					url: that.globalData.server + '/qrcode',
					data: {
						token: that.globalData.token
					},
					method: 'POST',
					success(res) {
						console.log(res.data.data)
						if (res.data.data == '没有权限') {
							uni.showToast({
								title: '您不是负责人',
								duration: 2000
							})
						} else {
							that.src = res.data.data
							that.modalName = e.currentTarget.dataset.target
							// uni.navigateTo({
							// 	url:'../qr2/qr2'+'?url='+res.data.data
							// })
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.userInfo {
		background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		height: 400upx;
		padding: 0 50upx;
		.userInfo-top {
			display: flex;
		}
	}
</style>
