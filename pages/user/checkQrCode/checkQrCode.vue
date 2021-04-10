<template>
	<view id="page">
		<u-navbar back-text="返回" back-icon-color="#fff" :back-text-style="{color: '#fff'}"
			title="我的签到码" title-color="#fff" :background="background"></u-navbar>
		<view class="code-card">
			<view class="card-title">
				<u-icon name="scan"></u-icon>
				<text>签到码</text>
			</view>
			<u-line color="#6d448e" margin="10upx 0"></u-line>
			<view class="card-body">
				<text>可提供其他用户进行签到</text>
				<u-image width="300upx" height="300upx" :src="src" :lazy-load="true">
					<u-loading slot="loading"></u-loading>
				</u-image>
				<text>距离10CM扫描成功率更高</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, #6d448e, #efb8dd)',
					color: '#fff'
				},
				src: ''
			}
		},
		onShow(e) {
			this.$u.api.qrcode().then(res => {
				this.src = res
				// console.log(res)
			}).catch(e => {
				console.log(e)
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	#page{
		background-color: #efb8dd;
		height: 100vh;
	}
	.code-card{
		background-color: #FFFFFF;
		margin: 30upx 20upx 0 20upx;
		border-radius: 20upx;
		.card-title{
			margin: 0 10upx;
			padding: 20upx;
			font-size: 40upx;
			& text{
				margin: 0 15upx;
			}
		}
		.card-body{
			margin: 30upx 0;
			padding: 30upx 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #909396;
		}
	}
</style>
