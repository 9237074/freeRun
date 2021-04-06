<template>
	<view>
		<u-navbar :custom-back="customBack" back-text="返回" back-icon-color="#fff" :back-text-style="{color: '#fff'}"
			title="运动完成" title-color="#fff" :background="background"></u-navbar>
		<map :latitude="latitude" :longitude="longitude" style="height: 65vh;width: 750rpx;"
			:polyline="postData.polyline"></map>
		<view class="info-card">
			<view class="card-distance">
				<u-col text-align="center">
					<text>{{(postData.distance/1000).toFixed(2)}}km</text>
				</u-col>
			</view>
			<u-row gutter="12" justify="center" class="card-body">
				<u-col span="4" text-align="center">
					<view>{{postData.speed}}</view>
					<view>平均配速</view>
				</u-col>
				<u-col span="4" text-align="center">
					<view>
						{{parseInt(postData.time/3600)}}:{{parseInt(postData.time%3600/60)}}:{{parseInt(postData.time%3600%60)}}
					</view>
					<view>用时</view>
				</u-col>
				<u-col span="4" text-align="center">
					<view>{{(postData.distance*0.06).toFixed(2)}}</view>
					<view>热量(千卡)</view>
				</u-col>
			</u-row>
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
				postData: {
					distance: 0,
					speed: 0,
					time: 0,
					polyline: [{
						points: [],
						arrowLine: true,
						color: "#0AAC61",
						borderColor: "#0AAC61",
						width: 10
					}]
				},
				latitude: 26.00394,
				longitude: 119.448084,
				// markers:[{
				// 	"id":"1",
				// 	"latitude":"26.00394",
				// 	"longitude":"119.448084",
				// 	"iconPath":"../../static/position.png"
				// }]
			}
		},
		onLoad(e) {
			if (process.env.NODE_ENV === 'development') {
				plus.navigator.closeSplashscreen();
			}
			console.log('postData', JSON.parse(e.data))
			const postData = JSON.parse(e.data)
			if (postData.id === undefined) {
				this.postData = postData
			} else {
				//服务器数据传值
			}
		},
		methods: {
			customBack() {
				this.$u.route({
					url: 'pages/run/runHome/runHome',
					type: 'switchTab'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-card {
		background-color: #F1F1F1;
		width: 90%;
		border-radius: 20rpx;
		margin: 20upx auto 20upx;
		padding: 30upx;
		
		.card-distance{
			border-bottom: 2upx solid #5f5f5f;
			padding-bottom: 20upx;
		}
		
		.card-body{
			padding-top: 20upx;
		}
	}
</style>
