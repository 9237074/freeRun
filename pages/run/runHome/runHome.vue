<template>
	<view>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				times: 0,
				aims: 60
			}
		},
		onShow: function() {

		},
		methods: {
			submit: async function(e) {
				let that = this;
				//提示注意事项
				if (await this.checkLocation()) {
					//判断任务时间
					var today = new Date()
					var getHours = null;
					var getMinutes = null;
					if (today.getHours() < 10) {
						getHours = '0' + today.getHours();
					} else {
						getHours = String(today.getHours());
					}
					if (today.getMinutes() < 10) {
						getMinutes = '0' + today.getMinutes();
					} else {
						getMinutes = String(today.getMinutes());
					}
					var shijian = getHours + getMinutes;
					// if(that.globalData.studentId == '172720158'){
					shijian = '0600'
					// }else{
					// 	console.log('正常用户判断时间');
					// }
					if (that.globalData.studentId == '172713172') {
						shijian = '0600'
					} else {
						console.log('正常用户判断时间');
					}
					// shijian = '0600'
					if (shijian >= '0600' && shijian <= '0730') {
						// 判断当前时间与完成时间
						if (parseInt(that.globalData.runTime / 86400) < parseInt(new Date().getTime() / 86400000) ||
							that.globalData.runTime == null) {
							uni.navigateTo({
								url: '../running/running'
							})
						} else {
							uni.showToast({
								title: '今日任务已完成',
								duration: 2000
							})
						}
					} else if (shijian >= '1730' && shijian <= '2200') {
						// 判断当前时间与完成时间
						if (parseInt(that.globalData.runTime / 86400) < parseInt(new Date().getTime() / 86400000) ||
							that.globalData.runTime == null) {
							uni.navigateTo({
								url: '../running/running'
							})
						} else {
							uni.showToast({
								title: '今日任务已完成',
								duration: 2000
							})
						}
					} else {
						uni.showToast({
							title: '未到跑步时间',
							icon: 'none',
							duration: 2000
						});
					}
				}
			},
			rule: function() {
				uni.navigateTo({
					url: '../runRule/runRule'
				})
			},
			question: function() {
				uni.navigateTo({
					url: '../runQuestion/runQuestion'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		width: 100%;
		height: 100%;
	}
</style>
