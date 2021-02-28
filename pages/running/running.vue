<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-theme" :isBack="false">
			<block slot='content'>跑步中心</block>
		</cu-custom>
		<map :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers" :polyline="polyline"
		 style="width: 100vw;height: 50vh;">
			<cover-view style="color:rgba(177,128,68,1);">
				当前打卡数:{{signCount}}|{{markers[0].latitude+"-"+markers[0].longitude}}
			</cover-view>
		</map>
		<view class="" style="width: 100vw;height: 40vh;background-color: #FFFFFF;">
			<!-- distance -->
			<view class="" style="width: 100vw;text-align: center;padding: 10px;">
				<text style="font-size:42px;font-weight:bold;line-height:42px;color:rgba(177,128,68,1);">{{(distance/1000).toFixed(2)}}</text>
				<text style="font-size:16px;font-weight:bold;line-height:22px;color:rgba(177,128,68,1);">km</text>
			</view>
			<!-- 分割线 -->
			<view class="" style="width: 90vw;height: 1px;background-color: #C58240;margin: 0 auto;margin-top: 10px;"></view>
			<!--  时长 卡路里 速度  -->
			<view class="card1">
				<view class="num1">
					{{parseInt(time/3600)}}:{{parseInt(time%3600/60)}}:{{parseInt(time%3600%60)}}
				</view>
				<view class="num1">
					{{(distance*0.06).toFixed(2)}}
				</view>
				<view class="num1">
					{{speed !== 0 ? speed +'m/s' : '0'}}
				</view>
			</view>
			<!--  时长 卡路里 速度  -->
			<view class="card2">
				<view class="str1">
					<text>时长</text>
				</view>
				<view class="str1">
					<text>卡路里</text>
				</view>
				<view class="str1">
					<text>速度</text>
				</view>
			</view>
			<view class="" style="width: 100%;">
				<image v-if="active" src="../../static/suspend.svg" style="width:28vw;height: 28vw;margin-left: 35vw;margin-top: 2.5vh;"
				 @longpress="stoplocation"></image>
				<image v-if="!active" @click="active=true;getLocation()" src="../../static/goon.svg" style="display:inline-block;width: 28vw;height: 28vw;margin-left: 22vw;margin-top: 2.5vh;"></image>
				<image v-if="!active" @click="over" src="../../static/over.svg" style="display:inline-block;width: 28vw;height: 28vw;margin-top: 2.5vh;"></image>
			</view>
			<!-- <button type="default" @click="filterPoints" v-show="isFilter">过滤</button>
			<button type="default" @click="filterPoints" v-show="!isFilter">不过滤</button> -->
		</view>
	</view>
</template>

<script>
	import GpsTool from '../../util/gpsTools.js'
	const crypto = require('crypto');
	const appkey = require("appkey.js");
	const music = require('../../static/aduio/01.mp3')
	const gpsFilter = require('gps-filter')
	export default {
		data() {
			return {
				// gps日志
				// 过滤后
				gps: [],
				// 临时变量gps
				tempGps: {
					latitude: '',
					longitude: ''
				},
				// 地图覆盖物 id为1对象是当前位置
				markers: [{
					id: 1,
					latitude: 26.002194,
					longitude: 119.448814, //,
					iconPath: '../../static/locall.png',
					width: 10,
					height: 10
				}],
				// 打卡点
				point: [
					['田径场南', 119.448814, 26.002194],
					['南天门', 119.447129, 26.001869],
					['商学楼门口', 119.446553, 26.002759],
					['图书馆门口', 119.447137, 26.003403],
					['西区篮球场旁', 119.447339, 26.004495],
					['30#计算机楼路旁', 119.447793, 26.005454],
					['工程结构试验中心门口', 119.449395, 26.005712],
					['东10前空地', 119.450339, 26.004317],
					['五期工程楼梯道路旁', 119.451315, 26.003781],
					['东12宿舍楼道路旁', 119.452183, 26.003010],
					['校车处', 119.450409, 26.003310],
					['田径场北', 119.4495980000, 26.0031870000],
					['ceshi', 119.44851500780834, 26.00583145786685]
				],
				// 轨迹图
				polyline: [{
					points: [],
					arrowLine: true,
					color: "#0AAC61",
					borderColor: "#0AAC61"
				}],
				// 里程 单位m
				distance: 0,
				speed: 0,
				// 打卡点数
				signCount: 0,
				// 判断用户 开始 暂停 结束 状态
				active: 1,
				time: 0,
				timeSetInterval: null,
				timeSetIntervalGps: null
			}
		},
		onLoad() {
			this.initPoint()
			this.getLocation()
		},
		onBackPress(e) {
			// return true 表示禁止默认返回
			return true
		},
		methods: {
			// 初始化打卡点
			initPoint: function() {
				this.point.forEach(item => {
					let point = {}
					point.id = this.markers.length + 1
					point.latitude = item[2]
					point.longitude = item[1]
					point.iconPath = "../../static/check.png"
					point.width = 10
					point.height = 10
					point.callout = {
						content: item[0],
						color: 'white',
						display: 'ALWAYS'
					}
					this.markers.push(point)
				})
			},
			getLocationSync(){
				return new Promise((resolve,reject) => {
					uni.getLocation({
						type:"gcj02",
						success: (res) => {
							resolve(res)
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
			getLocation: function() {
				// 开启 时间 定时器
				this.timeSetInterval = setInterval(() => {
					// this.time = new Date().getTime() / 1000 - this.startTime
					if (this.globalData.platform !== 'ios') {
						let bgm = uni.getBackgroundAudioManager()
						bgm.src = music
						bgm.play()
					}
					this.time++
				}, 1000)
				this.timeSetIntervalGps = setInterval(async()=>{
					let gpsInfo = await this.getLocationSync()
					this.handleLocation(gpsInfo)
				},1000)
			},
			// 处理定位信息
			handleLocation(e) {
				let curTime = parseInt(new Date().getTime() / 1000)
				// 真实的gps信息
				let realGps = {
					latitude: e.latitude,
					longitude: e.longitude,
					timestamp: curTime
				}
				
				// 合并this.markers
				this.markers[0] = Object.assign(this.markers[0], realGps)
				if(!this.tempGps.latitude || !this.tempGps.longitude){
					this.tempGps = JSON.parse(JSON.stringify(realGps))
					return
				}
				// 判断当前gps跟上一个gps是否一样
				if(this.tempGps.latitude === realGps.latitude && this.tempGps.longitude === realGps.longitude){
					console.log('updateTime:', this.tempGps.timestamp, realGps.timestamp, realGps.timestamp - this.tempGps.timestamp)
					this.tempGps.timestamp = realGps.timestamp
					return
				}
				console.log('不相等。')
				let gpsTool = new GpsTool()
				let tempDistance = gpsTool.distance(this.tempGps.latitude,this.tempGps.longitude,realGps.latitude,realGps.longitude)
				let tempSpeed = tempDistance/parseInt(realGps.timestamp - this.tempGps.timestamp)
				try {
					let logStorage = uni.getStorageSync('logStorage') || []
					logStorage.push({
						timestamp: curTime,
						latitude: realGps.latitude,
						longitude: realGps.longitude,
						distance: tempDistance
					})
					uni.setStorageSync('logStorage', logStorage)
				} catch (e) {
					// error
					console.log('获取出错了:', e)
				}
				console.log()
				console.log(this.tempGps,realGps,'距离:',tempDistance,'时间:',parseInt(realGps.timestamp - this.tempGps.timestamp),'速度:',tempDistance/parseInt(realGps.timestamp - this.tempGps.timestamp))
				if(tempSpeed > 6.25)return
				this.tempGps = JSON.parse(JSON.stringify(realGps))
				this.distance+=tempDistance
				this.speed = tempSpeed.toFixed(2)
				this.polyline[0].points.push({
					latitude: realGps.latitude,
					longitude: realGps.longitude
				})
				gpsTool = null
				if (this.isSign(realGps)) this.signCount++
			},
			// 停止获取定位
			stoplocation: function() {
				clearInterval(this.timeSetInterval);
				clearInterval(this.timeSetIntervalGps)
				this.active = false;
			},
			// 提交
			over: function() {
				console.log('提交表单')
				//清除定时器
				clearInterval(this.timeSetInterval);
				clearInterval(this.timeSetIntervalGps)
				let that = this
				let status = true
				// 判断用户打卡数量
				if (!this.checkSign()) return
				// 判断时间
				if (!this.checkTime()) return
				// 判断用户里程 需大于2000m
				if (!this.checkDistance()) return
				// 设备登陆检查
				if (!this.checkToken()) return
				let key = crypto.createHmac('sha256', appkey.appkey).update(
					`${this.time}+${this.distance}+${this.speed}+${this.globalData.token}`).digest('hex');
				// 提交跑步数据
				uni.request({
					url: this.globalData.server + '/runcheck',
					method: 'POST',
					data: {
						token: this.globalData.token,
						runTime: 0,
						spendTime: this.time,
						mileage: this.distance,
						stepCount: 0,
						speed: this.speed,
						gps: this.gps,
						detail: 0,
						status: 0,
						key: key
					},
					success(res) {
						if (res.data.msg == "跑步完成") {
							that.isMove = false
							// that.globalData.todayRun = new Date
							uni.showToast({
								title: "跑步完成",
								duration: 2000
							})
							that.globalData.runTime = parseInt(new Date().getTime() / 1000);
							let a = JSON.stringify({
								"gps": this.gps,
								"spendTime": this.time,
								"mileage": this.distance,
								"spend": this.speed
							})
							uni.redirectTo({
								url: '../runed/runed?data=' + a
							})
						} else {
							console.log(res.data.msg)
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
						}
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '上传失败',
							confirmText: "重试",
							cancelText: "返回首页",
							success: (res) => {
								if (res.confirm) {
									this.over()
								} else {
									let a = JSON.stringify({
										"gps": this.gps,
										"spendTime": this.time,
										"mileage": this.distance,
										"spend": this.speed
									})
									uni.navigateBack({
										delta: -1
									})
								}
							}
						})
					}
				})
				this.polyline[0].points = []
			},
			// 检查时间 大于600秒 小于7200秒
			checkTime: function() {
				if (this.time >= 600 && this.time <= 7200) {
					return true
				} else {
					uni.showModal({
						title: '提示',
						content: '运动时间过短,记录不会保存',
						cancelText: '继续',
						confirmText: '结束',
						success: res => {
							if (res.confirm) {
								// this.stoplocation()
								uni.switchTab({
									url: '../run/run'
								})
								uni.removeStorage({
									key: 'run',
									success() {
										console.log('移除缓存成功');
									}
								})
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return false
				}
			},
			// 判断打卡
			isSign: function(realGps) {
				const gpsTool = new GpsTool()
				let signCount = this.point.filter(item => {
					let distance = gpsTool.distance(realGps.latitude, realGps.longitude, item[2], item[1])
					if (distance <= 50) {
						return true
					} else {
						return false
					}
				})
				if (signCount.length > 0) {
					let index = this.point.findIndex(item => item[0] === signCount[0][0])
					this.point.splice(index, 1)
					return true
				} else {
					return false
				}
			},
			// 检查打卡点数量 需大于2个点
			checkSign: function() {
				if (this.signCount >= 2) {
					return true
				} else {
					uni.showModal({
						title: '提示',
						content: '打卡点未满足2个',
						cancelText: '继续',
						confirmText: '结束',
						success: res => {
							if (res.confirm) {
								// this.stoplocation()
								uni.switchTab({
									url: '../run/run'
								})
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return false
				}
			},
			// 检查数量 需大于2000
			checkDistance: function() {
				if (this.distance >= 2000) {
					return true
				} else {
					uni.showModal({
						title: '提示',
						cancelText: '继续',
						content: '距离小于2km，此次记录不会保存',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '../run/run'
								})
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
								that.getLocation();
							}
						}
					})
					return false
				}
			}
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
		background: rgba(124, 181, 134, 1);
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

	.page {
		width: 100vw;
		height: 100vh;
	}

	.inline-b {
		display: inline;
	}

	.card1 {
		width: 90vw;
		margin-left: 5vw;
	}

	.card2 {
		width: 90vw;
		margin-left: 5vw;
	}

	.num1 {
		width: 30vw;
		text-align: center;
		display: inline-block;
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 25px;
		color: rgba(177, 128, 68, 1);
		padding: 5px;
	}

	.str1 {
		width: 30vw;
		text-align: center;
		display: inline-block;
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 17px;
		color: rgba(224, 155, 71, 1);
		padding: 5px;
	}
</style>
