<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-theme" :isBack="false">
			<!-- bg-gradual-green -->
			<block slot='content'>首页</block>
		</cu-custom>
		<view class="title">
			<text>每日名言</text>
		</view>

		<view class="card">
			<view class="img">
				<image src="../../static/run01.png" style="width: 100vw;height: 152px;" mode=""></image>
			</view>
			<view class="saying">
				<text
					style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">1.鲁迅说过:时间就像海绵的是水，只要愿挤总还是有的。</text>
			</view>
		</view>

		<view class="card">
			<view class="img">
				<image src="../../static/lunbotu3.png" style="width: 100vw;height: 152px;" mode=""></image>
			</view>
			<view class="saying">
				<text
					style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">2.生命在于运动。</text>
			</view>
		</view>

		<view class="card">
			<view class="img">
				<image src="../../static/lunbotu2.png" style="width: 100vw;height: 152px;" mode=""></image>
			</view>
			<view class="saying">
				<text
					style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">3.口说不如身逢，耳闻不如目见。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
	}

	.title {
		margin-left: 2px;
		color: rgba(51, 51, 51, 1);
		opacity: 1;
	}

	.card {}

	.saying {
		width: 96.5vw;
		height: 56px;
		background: #0AAC61;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
		opacity: 1;
		margin-left: 2vw;
		position: relative;
		top: -11px;
	}

	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
