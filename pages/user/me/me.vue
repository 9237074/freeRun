<template>
	<view>
		<view class="userInfo" :style="{'padding-top': paddingTop + 'px'}">
			<view class="userInfo-top">
				<view class="avatar">
					<u-avatar :src="src"></u-avatar>
					<!-- <u-image :src="src" ></u-image> -->
				</view>
				<view class="userName">
					<view>
						{{vuex_userInfo.user}}
					</view>
					<view>
						{{vuex_userInfo.profession}}
					</view>
				</view>
				<view class="setting">
					<u-icon name="setting" size="36"></u-icon>
				</view>
			</view>
			<view class="userInfo-bottom">
				Hi, My name is Starlly, I'm a creative geek from Changsha, China, I love shopping...
				Hi, My name is Starlly, I'm a creative geek from Changsha, China, I love shopping...
				Hi, My name is Starlly, I'm a creative geek from Changsha, China, I love shopping...
			</view>
		</view>
		<view class="clip-line">

		</view>
		<view class="menu">
			<view>
				<u-icon name="hourglass"></u-icon>
				我的排行
			</view>
			<view>
				<u-icon name="hourglass"></u-icon>
				个人资料
			</view>
			<view>
				<u-icon name="hourglass"></u-icon>
				签到码
			</view>
		</view>
		<view class="card run-card">
			<view class="title">运动成绩</view>
			<u-line color="#84599c" />
			<view class="card-body">
				<view class="progress">
					<u-circle-progress active-color="#84599c" :percent="run.fraction/100">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<view class='u-progress-info'>
								<u-icon name="hourglass"></u-icon>
								{{run.fraction}}分
							</view>
						</view>
					</u-circle-progress>
				</view>
				<view class="grade">
					<view class="grade-item">
						<view class="mark"></view>
						<view class="grade-item-content">运动次数 {{run.runTimes}}次</view>
					</view>
					<view class="grade-item">
						<view class="mark"></view>
						<view class="grade-item-content">运动里程 {{run.mileage}} km</view>
					</view>
					<view class="grade-item">
						<view class="mark"></view>
						<view class="grade-item-content">运动时常 {{run.duration}} min</view>
					</view>
				</view>
			</view>
		</view>
		<view class="card read-card">
			<view class="title">阅读成绩</view>
			<u-line color="#84599c" />
			<view class="card-body">
				<view class="progress">
					<u-circle-progress active-color="#84599c" :percent="read.fraction/100">
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<view class='u-progress-info'>
								<u-icon name="hourglass"></u-icon>
								{{read.fraction}}分
							</view>
						</view>
					</u-circle-progress>
				</view>
				<view class="grade">
					<view class="grade-item">
						<view class="mark"></view>
						<view class="grade-item-content">阅读次数 {{read.morningTimes}} 次</view>
					</view>
					<view class="grade-item">
						<view class="mark"></view>
						<view class="grade-item-content">阅读时常 {{read.duration}} min</view>
					</view>
				</view>
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
				paddingTop: 44,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				read:{
					morningTimes: 0,
					duration: 0,
					fraction: 0
				},
				run:{
					runTimes: 0,
					mileage: 0,
					duration: 0,
					fraction: 0
				}
			}
		},
		onLoad() {
			const platform = uni.getSystemInfoSync().platform
			if (platform === 'ios') {
				this.paddingTop = 44
			} else {
				this.paddingTop = 48
			}
			this.$u.api.readgrade().then(res => {
				console.log({res})
				this.read = res
			})
			this.$u.api.rungrade().then(res => {
				console.log({res})
				this.run = res
			})
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
		color: #FFFFFF;
		overflow: hidden;

		.userInfo-top {
			display: flex;
			align-items: center;

			.avatar {
				flex: 1;
			}

			.userName {
				flex: 2
			}

			.setting {
				flex: 1;
				text-align: right;
			}
		}

		.userInfo-bottom {
			margin-top: 20upx;
			height: 160upx;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.menu {

		&>view {
			display: inline-block;
			width: 30%;
		}
	}

	.card {
		background-color: #FFFFFF;
		margin: 20upx;
		padding: 10upx;
		border-radius: 20upx;
		height: 300upx;
		box-shadow:0px 3px 6px rgba(0,0,0,0.12);
		.title{
			margin: 10upx 20upx;
		}
		.card-body{
			display: flex;
			margin-top: 20upx;
		}
		.progress{
			flex: 1;
			display: flex;
			justify-content: center;
		}
		.grade{
			margin-left: 20upx;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: between;
			justify-content: center;
			.grade-item{
				display: flex;
				align-items: center;
				.mark{
					width: 15upx;
					height: 15upx;
					margin: 10upx;
					background-color: green;
				}
				.grade-item-content{
					overflow: hidden;
				}
			}
			
		}
	}
	.run-card {
		
	}
	
	.read-card {
		
	}
	
</style>
