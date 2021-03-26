<template>
	<view class="content">
		<u-toast ref="uToast" />
		<u-navbar :is-back="false" title="首页" title-color="#fff" :background="themeColorObj"></u-navbar>
		<u-card v-for="item in quotes" :title="item.author" subTitle="作者" padding="30" :show-foot="true">
			<view class="" slot="body">
				<view class="u-body-item-title u-line-2">{{item.content}}</view>
			</view>
		</u-card>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '名人名言',
				typeId: 6,
				isLoading: false,
				quotes: []
			}
		},
		onPullDownRefresh() {
			this.getContent()
		},
		onLoad() {
			// #ifdef APP-PLUS
			if (this.vuex_userInfo.token) {
				plus.navigator.closeSplashscreen();
			}
			// #endif
			this.getContent()
		},
		onShow() {

		},
		onHide() {
			uni.stopPullDownRefresh()
		},
		methods: {
			getContent() {
				this.$u.http.setConfig({
					showLoading: false
				})
				this.$u.post('https://v1.alapi.cn/api/mingyan', {
					type: this.typeId,
				}).then(res => {
					console.log(res)
					this.quotes.push(res)
					uni.stopPullDownRefresh()
				}).catch(err => {
					console.log(err)
					uni.stopPullDownRefresh()
					this.$refs.uToast.show({
						title: '加载资源失败，请稍后再试～',
						type: 'error',
						position: 'top'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
</style>
