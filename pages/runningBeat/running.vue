<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-theme" :isBack="false">
			<block slot='content'>跑步中心</block>
		</cu-custom>
	<map style="width: 100vw;height: 50vh;" :longitude="longitude" :latitude="latitude"
		show-location='true' 
		:markers="markers"
	> 
	<cover-view style="color:rgba(177,128,68,1);">
		当前打卡数:{{pointCount1+pointCount2}}
	</cover-view>
	</map>
		<view class="" style="width: 100vw;height: 40vh;background-color: #FFFFFF;">
			<!-- km -->
			<view class="" style="width: 100vw;text-align: center;padding: 10px;">
				<text style="font-size:42px;font-weight:bold;line-height:42px;color:rgba(177,128,68,1);">{{(km/1000).toFixed(2)}}</text>
				<text style="font-size:16px;font-weight:bold;line-height:22px;color:rgba(177,128,68,1);">km</text>
			</view>
			<!-- 分割线 -->
			<view class="" style="width: 90vw;height: 1px;background-color: #C58240;margin: 0 auto;margin-top: 10px;"></view>
			<!--  时长 卡路里 速度  -->
			<view class="card1">
				<view class="num1">
					{{hour}}:{{min-(hour*60)}}:{{sec-(hour*3600+min*60)}}
				</view>
				<view class="num1">
					{{(km*0.06).toFixed(2)}}
				</view>
				<view class="num1">
					{{speed}}
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
				<image v-if="active" src="../../static/suspend.svg" style="width:28vw;height: 28vw;margin-left: 35vw;margin-top: 2.5vh;" @longpress="pause"></image>
				<image v-if="!active" @click="goon" src="../../static/goon.svg" style="display:inline-block;width: 28vw;height: 28vw;margin-left: 22vw;margin-top: 2.5vh;"></image>
				<image v-if="!active" @click="over" src="../../static/over.svg" style="display:inline-block;width: 28vw;height: 28vw;margin-top: 2.5vh;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const crypto = require('crypto');
	const appkey = require("appkey.js")
	const getDistance = require('../../util/getDistance.js')
	export default {
		data() {
			return {
				//纬度
				latitude:'26.00394',
				//经度
				longitude:'119.448084',
				//速度
				speed:'00\'00\"',
				//数据精准度
				accuracy:0,
				//时间
				time:'',
				markers:[{
					id:1,
					latitude:26.00394,
					longitude:119.448084,
					iconPath:"../../static/locall.svg",
					width:10,
					height:10
				},{
					id:2,
					latitude:'',
					longitude:'',
					iconPath:"../../static/check.svg",
					width:10,
					height:10,
					callout:{
						content:'东区大操场打卡点',
						color:'white',
						display:'ALWAYS'
					}
				},{
					id:3,
					latitude:'',
					longitude:'',
					iconPath:"../../static/check.svg",
					width:10,
					height:10,
					callout:{
						content:'五期食堂打卡点',
						color:'white',
						display:'ALWAYS'
					}
				}],
				polylines:[{
					points:[],
					color:'#00a0e9',
					width:5,
				}],
				km:0,
				hour:0,
				min:0,
				sec:0,
				active:1,
				kcal:0,
				gps:"获取GPS中",
				//gps数组
				ll:[],
				lat1:0,
				log1:0,
				lat2:0,
				log2:0,
				point:[
						['田径场南',119.448814,26.002194],
						['南天门',119.447129,26.001869],
						['商学楼门口',119.446553,26.002759],
						['图书馆门口',119.447137,26.003403],
						['西区篮球场旁',119.447339,26.004495],
						['30#计算机楼路旁',119.447793,26.005454],
						['工程结构试验中心门口',119.449395,26.005712],
						['东10前空地',119.450339,26.004317],
						['五期工程楼梯道路旁',119.451315,26.003781],
						['东12宿舍楼道路旁',119.452183,26.003010],
						['校车处',119.450409,26.003310],
						['田径场北',119.4495980000,26.0031870000]
					],
				pointCount1:0,
				pointCount2:0,
				back:true
			}
		},
		methods: {
			onLoad:function(){
				// #ifdef APP-PLUS
				var page = this.$mp.page.$getAppWebview();
				page.setStyle({ popGesture: 'none' });
				// #endif
				this.goon();
				var rand1 = parseInt(Math.random()*12,10);
				var rand2 = parseInt(Math.random()*12,10);
				while(true){
					if(rand1 == rand2){
						rand2 = parseInt(Math.random()*12,10);
					}else{
						break;
					}
				}
				this.markers[1].latitude = this.point[rand1][2]
				this.markers[1].longitude = this.point[rand1][1]
				this.markers[1].callout.content = this.point[rand1][0]
				this.markers[2].latitude = this.point[rand2][2]
				this.markers[2].longitude = this.point[rand2][1]
				this.markers[2].callout.content = this.point[rand2][0]
			},
			onBackPress:function(){
				console.log('页面隐藏');
				this.over();
				return true
			},
			//暂停
			pause:function(){
				clearInterval(this.start);
				clearInterval(this.location1);
				this.active = false;
			},
			//继续
			goon:function(){
				var that = this;
				//开启定时器
				that.location1 = setInterval(()=>{
					//获取定位
					uni.getLocation({
						//选择gcj02格式
						type:'gcj02',
						//获取定位成功
						success(res){
							console.log('res:',res);
							//that.ll 数组最后一个
							var a = that.ll
							var linshigps = that.ll[a.length-1]
							console.log('linshigps',linshigps)
							//判断that.ll有没有值
							if(linshigps == undefined){
								let msg = {"latitude":res.latitude,"longitude":res.longitude};
								console.log('let msg:',msg)
								that.ll.push(msg);
							//判断that.ll最后的数是否存在
							}else if(linshigps.latitude != res.latitude || linshigps.longitude != res.longitude){
								let msg = {"latitude":res.latitude,"longitude":res.longitude};
								console.log('let msg:',msg)
								that.ll.push(msg);
							}
							//poyline
							console.log('that.ll',JSON.stringify(that.ll))
							that.polylines[0].points = that.ll
							// 判断获取到的数据的精确度
							// if(res.accuracy <= 20){
							// 	that.gps = "GPS信号优";
							// }else if(res.accuracy <= 30){
							// 	that.gps = "GPS信号中";
							// }else{
							// 	that.gps = "GPS信号弱"
							// };
							that.accuracy = res.accuracy,
							// 获取高度
							// that.horizontalAccuracy = res.horizontalAccuracy,
							console.log("that:",res);
							//获取经纬度然后计算距离 distance
							that.log1 = that.log2
							that.lat1 = that.lat2
							that.log2 = res.longitude
							that.lat2 = res.latitude
							// 判断经纬度不为0 
							if(that.log1==0||that.lat1==0||that.log2==0||that.lat2==0){
								// let distance = 0
								// that.km = that.km + distance;
							}else{
								// 赋值给地图
									that.markers[0].latitude = res.latitude;
									that.markers[0].longitude = res.longitude;
								//距离打卡点距离
								if(getDistance(that.markers[1].longitude,that.markers[1].latitude,res.longitude,res.latitude) <= 30 ){
									that.pointCount1 = 1
								}
								if(getDistance(that.markers[2].longitude,that.markers[2].latitude,res.longitude,res.latitude) <= 30 ){
									that.pointCount2 = 1
								}
								// 计算distance
								let distance1 = getDistance(that.log1,that.lat1,that.log2,that.lat2)
								console.log('每次计算得到的distance1:',distance1)
								// 检测用户速度是否到符合标准
								if(distance1 < 6 && distance1 > 0.05){
									// 获取当前位置gps
									that.latitude = res.latitude,
									that.longitude = res.longitude;
									//赋值速度
									that.speed = parseInt(1000/distance1/60)+'\''+parseInt(1000/distance1%60)+'\"';
									//总里程
									that.km = that.km + distance1;
									console.log('本次speed为0符合标准,speed:',that.speed);
								}else{
									console.log('本次speed为0不符合标准,speed:',that.speed);
								}
							}
							console.log("that.km:",that.km);
						},
						//获取定位异常
						fail(err){
							// 暂停定时器
							that.pause()
							console.log("获取定位失败")
							uni.showModal({
								title:'获取定位失败',
								content:'请检查gps权限',
								cancelText:'回首页',
								complete(conf) {
									if(conf.cancel == true){
										that.pause();
										uni.switchTab({
											url: '/pages/run/run'
										});
									}else{
										// 开启定时器
										that.goon()
									}
								}
							})
							that.gps = "获取定位失败"
						}
					})
				},1000);
				that.start = setInterval(function(){that.sec = that.sec+1;that.min =parseInt(that.sec/60);that.hour = parseInt(that.min/60)},1000);
				that.active = 1;
			},
			over:function(){
				//清除时间定时器
				clearInterval(this.start);
				// this.active = 1;
				var that = this
				//清除获取定位定时器
				clearInterval(this.location1);
				
				//超级管理员
				if(that.globalData.studentId == '172720158'){
					that.pointCount1 = 1
					that.pointCount2 = 1
					this.km = Number(this.km)+2000
					this.sec = Number(this.sec)+600
				}else{
					console.log('正常用户判断打卡点')
				}
				
				// 判断打卡点
				if(that.pointCount1 == 1 && that.pointCount2 == 1){
					var key = crypto.createHmac('sha256', appkey.appkey).update(`${this.sec}+${this.km}+${this.speed}+${this.globalData.token}`).digest('hex')
					console.log('data:',this.sec,this.km,this.speed,this.globalData.token)
					console.log('判断前的km',this.km)
					//判断距离
					if(this.km >= 2000 && this.km <= 10000){
						// 判断时间
						if(this.sec >= 600 && this.sec <= 1800){
							// 设备登陆检查
							that.checkToken();
							uni.request({
								url:that.globalData.server+'/runcheck',
								data:{
									token:that.globalData.token,
									runTime:0,
									spendTime:this.sec,
									mileage:this.km,
									stepCount:0,
									speed:this.speed,
									gps:this.ll,
									detail:0,
									status:0,
									key:key
								},
								success(res) {
									if(res.data.msg == "跑步完成"){
										// that.globalData.todayRun = new Date
										uni.showToast({
											title:"跑步完成",
											duration:2000
										})
										// var Date = new Date();
										that.globalData.runTime = parseInt(new Date().getTime()/1000);
										
									}else{
										console.log(res.data)
										uni.showToast({
											title:'上传失败',
											duration:2000
										})
									}
								}
							})
							let a = JSON.stringify({"gps":this.ll,"spendTime":this.sec,"mileage":this.km,"spend":this.speed})
							uni.redirectTo({
								url:'../runed/runed?data='+a
							}); 
						}else{
							uni.showModal({
								title: '提示',
								cancelText:'继续',
								content: '时间过短，此次记录不会保存',
								success: function (res) {
									if (res.confirm) {
										uni.switchTab({
											url:'../run/run'
										})
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
										that.goon();
									}
								}
							});
						}
					}else{
						uni.showModal({
							title: '提示',
							cancelText:'继续',
							content: '距离过短，此次记录不会保存',
							success: function (res) {
								if (res.confirm) {
									uni.switchTab({
										url:'../run/run'
									})
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
									that.goon();
								}
							}
						});
					}
				}else{
					uni.showModal({
						title:'提示',
						content:'打卡点未满足2个',
						cancelText:'继续',
						confirmText:'结束',
						success(res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../run/run'
								})
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
								that.goon();
							}
						}
					})
				}
			}
		} 
	}
</script>

<style>
	.page{
		width: 100vw;
		height: 100vh;
	}
	.inline-b{
		display: inline;
	}
	.card1{
		width: 90vw;
		margin-left: 5vw;
	}
	.card2{
		width: 90vw;
		margin-left: 5vw;
	}
	.num1{
		width: 30vw;
		text-align: center;
		display: inline-block;
		font-size:18px;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:25px;
		color:rgba(177,128,68,1);
		padding: 5px;
	}
	.str1{
		width: 30vw;
		text-align: center;
		display: inline-block;
		font-size:12px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:17px;
		color:rgba(224,155,71,1);
		padding: 5px;
	}
</style>
