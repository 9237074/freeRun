<template>
	<view class="content">
		<u-navbar :is-back="false" title="首页" title-color="#fff" :background="themeColorObj"></u-navbar>
		<view class="title">
			<text>每日名言</text>
		</view>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			if(this.userInfo){
				plus.navigator.closeSplashscreen();
			}
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
</style>
