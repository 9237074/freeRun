<template>
	<view>
		<!-- 导航栏 -->
		<searchNav @search="searchTheme"></searchNav>
		<!-- 列表渲染阅读主题 -->
		<u-empty :show="!readThemes.length" text="暂时没有阅读主题" mode="list" margin-top="200"></u-empty>
		<view class="card" v-for="(item,index) in readThemes" :key="index">
			<view class="card-header">
				<view class="mark">
					<u-icon name="bookmark" size="60"></u-icon>
				</view>
				<view class="theme">
					{{item.theme}}
				</view>
				<view class="button" @click="checkScan">
					<u-icon name="scan" margin-left="50" margin-right="10"></u-icon>
					<view>签到</view>
				</view>
			</view>
			<view class="card-body">
				<view class="card-body-item">
					<view class="mark"></view>
					时间:{{item.readTime}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					地点:{{item.readSite}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					日期:{{item.readDate}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					负责人:{{item.people}}
				</view>
			</view>
		</view>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "123",
				msg: [],
				checkout: false,
				readThemes: [],
				currentIndex: 0
			}
		},
		onLoad() {
			this.getReadTheme()
		},
		methods: {
			getReadTheme() {
				this.$u.api.readpage().then(res => {
					console.log(JSON.stringify(res.data))
					this.readThemes.push(...res.data)
					console.log(this.readThemes)
				})
			},
			searchTheme(e) {
				console.log('e:', e)
			},
			checkScan() {
				//开始修改
				// 第一步:获取签到开始时间,结束时间
				//第二步:获取签到日期
				//第三步:判断开始时间,四位数字。结束时间相同
				//第四步:判断签到日期
				uni.scanCode({
					onlyFromCamera: true,
					success:(res)=>{
						console.log("res:", res)
					},
					fail: (err) => {
						console.log("err:", err)
					}
				})
			},
			btn1: function(e) {
				let that = this;
				let index = e.target.id.split(',')[2]
				console.log("id:", e.target.id);
				var readTime = e.target.id.split(',')[0]
				var readDate = e.target.id.split(',')[1]
				var startTime = readTime.split('-')[0].split(":")
				var endTime = readTime.split('-')[1].split(":")
				console.log("startTime", startTime, "endTime", endTime);
				var D = new Date()

				// 设备登陆检查
				// that.checkToken();
				console.log(startTime[0], endTime[1].substring(0, 2), D.getHours(), D.getMinutes());
				if ((endTime[0] == D.getHours() && endTime[1] <= D.getMinutes()) && D.getMinutes() <= Number(endTime[
						1]) + 5) {
					console.log('签退时间');
					uni.scanCode({
						onlyFromCamera: true,
						success(res) {
							console.log("qr:", res.result);
							let a = JSON.parse(res.result);
							console.log("a:", a);
							let
								theme = a.theme,
								time = a.readTime,
								date = a.readDate,
								site = a.readSite,
								status = '签退',
								people = a.people;
							if (theme != '' || time != '' || date != '' || site != '' || people != '') {
								let key = that.checkKey(time + date + site + theme + people + that.globalData
									.token)
								console.log('key:', key)
								uni.request({
									url: that.globalData.server + '/readcheck',
									data: {
										token: that.globalData.token,
										theme: theme,
										time: time,
										date: date,
										site: site,
										people: people,
										key: key,
										status: status
									},
									success(res) {
										console.log("res...", res)
										if (res.data.msg == "签到成功") {
											uni.showToast({
												title: "签退成功",
												duration: 1500
											})
											that.msg[index].check = false
											uni.setStorage({
												key: 'readTheme',
												data: null,
												fail() {
													uni.showToast({
														title: '清空缓存失败',
														duration: 1000
													})
												}
											})
										} else {
											console.log(res.data.msg);
											that.msg[index].check = false
											uni.showToast({
												title: '重复签退',
												icon: 'none',
												duration: 2000
											})
										}
									}
								})
							}
						}
					})
				} else {
					that.msg[index].check = false
					console.log('签退时间');
					uni.showToast({
						title: "签退超时",
						duration: 1000,
						icon: 'loading'
					});
					uni.setStorage({
						key: 'readTheme',
						data: null,
						fail() {
							uni.showToast({
								title: '清空缓存失败',
								duration: 1000
							})
						}
					})
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.card {
		margin: 10upx 20upx;
		color: #FFFFFF;

		.card-header {
			background-image: linear-gradient(45deg, #6d448e, #efb8dd);
			border-radius: 20upx;
			display: flex;
			box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.12);
			height: 100upx;
			position: relative;
			top: 10upx;
			align-items: center;
			text-align: center;
			padding: 10upx 20upx;

			.mark {
				flex: 1;
			}

			.theme {
				flex: 3;
			}

			.button {
				flex: 2;
				display: flex;
				justify-content: center;
			}

		}

		.card-body {
			background-color: #f7f0fe;
			height: 200upx;
			border-radius: 0 0 20upx 20upx;
			box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.12);
			padding: 30upx 20upx 20upx 20upx;
			overflow: hidden;

			.card-body-item {
				display: inline-block;
				color: #6d448e;
				width: 50%;
				height: 50%;
				overflow: hidden;

				.mark {
					width: 10upx;
					height: 20upx;
					background-image: linear-gradient(45deg, #6d448e, #efb8dd);
					display: inline-block;
					margin-right: 10upx;
					border-radius: 20upx;
				}
			}
		}
	}
</style>
