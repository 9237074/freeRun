<template>
	<view id="page">
		<view class="header" :style="{'padding-top': paddingTop + 'px'}">
			<u-icon name="question-circle" color="#fff"></u-icon>
		</view>
		<view class="progress">
			<u-circle-progress width="500" border-width="30" bg-color="rgba(255,255,255,0)" inactive-color="#dfc7f8"
				active-color="#b674ed" :percent="33">
			</u-circle-progress>
			<view class="u-progress-content">
				<view>已打卡次数</view>
				<view>10</view>
				<view class="button-start"  @click="startRun">start</view>
			</view>
		</view>
		<view class="target">
			<u-row gutter="12" justify-content="between">
				<u-col span="3" text-align='center'>
					<view class="target-item">
						<view>5</view>
						<view>KM</view>
					</view>
				</u-col>
				<u-col span="6" text-align='center'>
					<view class="target-item">
						<view>00:30:00</view>
						<view>TIME</view>
					</view>
				</u-col>
				<u-col span="3" text-align='center'>
					<view class="target-item">
						<view>8</view>
						<view>KA</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paddingTop: 48,
				times: 0,
				aims: 60
			}
		},
		onShow() {

		},
		methods: {
			startRun(e) {
				console.log('e')
				this.$u.route('/pages/run/running/running')
			},
			rule() {
				uni.navigateTo({
					url: '../runRule/runRule'
				})
			},
			question() {
				uni.navigateTo({
					url: '../runQuestion/runQuestion'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	#page {
		background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		width: 100%;
		height: 100vh;
	}
	.header{
		margin: 30upx;
		display: flex;
		justify-content: flex-end;
	}
	.progress {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 35upx;
	}
	.u-progress-content {
		position: absolute;
		text-align: center;
	
		& :first-child {}
	
		& :nth-child(2) {
			font-size: 50upx;
			margin: 15upx;
		}
	}
	.button-start{
		background-color: #FFFFFF;
		color: #b87cb9;
		padding: 15upx;
		margin-top: 35upx;
		border-radius: 50upx;
	}
	.target{
		color: #ffffff;
		margin-top: 50upx;
		.target-item{
			margin: 10upx;
		}
	}
</style>
