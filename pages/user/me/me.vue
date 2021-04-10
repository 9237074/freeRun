<template>
	<view>
		<u-modal v-model="isShowLogout" :content="logoutContent" :show-cancel-button="true" @confirm="logout"></u-modal>
		<u-popup v-model="showInfo" mode="bottom" border-radius="14" height="50%">
			<view class="info-card-title">个人资料</view>
			<view class="info-card">
				<view class="info-card-item">昵称：{{vuex_userInfo.user}}</view>
				<view class="info-card-item">账号：{{vuex_userInfo.studentId}}</view>
				<view class="info-card-item">姓名：{{vuex_userInfo.name}}</view>
				<view class="info-card-item">学院：{{vuex_userInfo.department}}</view>
				<view class="info-card-item">专业：{{vuex_userInfo.profession}}</view>
				<view class="info-card-item">年级：{{vuex_userInfo.grade}}</view>
				<view class="info-card-item">积分：{{vuex_userInfo.fraction}}</view>
			</view>
		</u-popup>
		<view class="userInfo" :style="{'padding-top': paddingTop + 'px'}">
			<view class="userInfo-top">
				<view class="avatar">
					<!-- <u-avatar :src="src"></u-avatar> -->
					<u-image shape="circle" width="100upx" height="100upx" :src="src"></u-image>
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
					<u-icon name="setting" size="36" @click="isShowLogout = true"></u-icon>
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
			<u-row gutter="12" justify="center">
				<u-col span="4" text-align='center' @click="myrank">
					<u-icon name="hourglass"></u-icon>
					我的排行
				</u-col>
				<u-col span="4" text-align='center' @click="showInfo = true">
					<u-icon name="hourglass"></u-icon>
					个人资料
				</u-col>
				<u-col span="4" text-align='center'>
					<view @click="checkQr">
						<u-icon name="hourglass"></u-icon>
						签到码
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="card run-card">
			<view class="title">运动成绩</view>
			<u-line color="#84599c" />
			<view class="card-body">
				<view class="progress">
					<u-circle-progress active-color="#84599c" :percent="run.fraction">
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
					<u-circle-progress active-color="#84599c" :percent="read.fraction">
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
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				paddingTop: 44,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				read: {
					morningTimes: 0,
					duration: 0,
					fraction: 0
				},
				run: {
					runTimes: 0,
					mileage: 0,
					duration: 0,
					fraction: 0
				},
				isShowLogout: false,
				logoutContent: '确定退出登录吗？',
				showInfo: false
			}
		},
		onShow() {
			const platform = uni.getSystemInfoSync().platform
			if (platform === 'ios') {
				this.paddingTop = 44
			} else {
				this.paddingTop = 48
			}
			this.$u.api.readgrade().then(res => {
				console.log({
					res
				})
				res ? this.read = res : ''
			}).catch(e => {
				console.log(e)
			})
			this.$u.api.rungrade().then(res => {
				console.log({
					res
				})
				res ? this.run = res : ''
			})
		},
		methods: {
			logout() {
				this.$u.vuex('vuex_userInfo', null)
				this.$u.route({
					url: 'pages/system/login/login',
					type: 'reLaunch'
				})
				this.isShowLogout = false
			},
			myrank() {
				this.$u.route({
					url: 'pages/user/rankHome/rankHome',
					type: 'tab'
				})
			},
			checkQr(e) {
				console.log('e')
				this.$u.route("/pages/user/checkQrCode/checkQrCode")
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-card-title{
		margin: 20upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
	}
	.info-card{
		margin: 20upx;
		padding: 10upx;
		border-radius: 25upx;
		background-color: #ffffff;
		box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.12);
		.info-card-item{
			margin: 20upx;
			padding: 10upx;
			border-bottom: 2upx solid #84599c;
		}
	}
	.userInfo {
		// background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		// background-image: url('@/static/images/meBg.png');
		background-image: url(../../../static/images/meBg.png);
		background-size: 100% 100%;
		// background-image: url(../../../static/images/login.png);
		height: 500upx;
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
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.menu {
		margin-bottom: 40upx;
	}

	.card {
		background-color: #FFFFFF;
		margin: 20upx;
		padding: 10upx;
		border-radius: 20upx;
		height: 300upx;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);

		.title {
			margin: 10upx 20upx;
		}

		.card-body {
			display: flex;
			margin-top: 20upx;
		}

		.progress {
			flex: 1;
			display: flex;
			justify-content: center;
		}

		.grade {
			margin-left: 20upx;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: between;
			justify-content: center;

			.grade-item {
				display: flex;
				align-items: center;

				.mark {
					width: 15upx;
					height: 15upx;
					margin: 10upx;
					background-color: green;
				}

				.grade-item-content {
					overflow: hidden;
				}
			}

		}
	}

	.run-card {}

	.read-card {}
</style>
