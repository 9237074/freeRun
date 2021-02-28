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
				<text style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">1.鲁迅说过:时间就像海绵的是水，只要愿挤总还是有的。</text>
			</view>
		</view>

		<view class="card">
			<view class="img">
				<image src="../../static/lunbotu3.png" style="width: 100vw;height: 152px;" mode=""></image>
			</view>
			<view class="saying">
				<text style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">2.生命在于运动。</text>
			</view>
		</view>

		<view class="card">
			<view class="img">
				<image src="../../static/lunbotu2.png" style="width: 100vw;height: 152px;" mode=""></image>
			</view>
			<view class="saying">
				<text style="color: #FFFFFF;width:352px;height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;">3.口说不如身逢，耳闻不如目见。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// // 地图中心经纬度
				// latitude: null,
				// longitude: null,
				// // gps日志
				// gps: [],
				// // 监听成功回调函数次数
				// count: 0,
				// // 监听失败回调函数代码
				// code: null,
				// // 地图覆盖物 id为1对象是当前位置
				// markers: [{
				// 	id: 1,
				// 	latitude: null,
				// 	longitude: null //,
				// 	// iconPath: '../static/local.png'
				// }],
				// // 轨迹图
				// polyline: [{
				// 	points: [],
				// 	arrowLine: true
				// }],
				// // π
				// PI: 3.14159265358979324,
				// x_pi: 52.35987755982988, //3.14159265358979324 * 3000.0 / 180.0,
				// // 监听失败回调函数错误信息
				// message: null,
				// // 里程 单位m
				// distance: null,
				// latA: null,
				// lonA: null,
				// // 单次变化距离  单位m
				// temporaryDistance: null,
				// // 单次时间
				// singleTime: 0,
				// // 定时器时间
				// time: 0,
				// speed: 0,
				// // 中介变量
				// bridge: null
			}
		},
		onLoad() {

		},
		onShow() {

		},
		 methods: {
		// 	// 设置定时器
		// 	setInter: function() {
		// 		let that = this;
		// 		this.Time = setInterval(() => {
		// 			that.time++;
		// 		}, 1000)
		// 	},
		// 	// 停止定位
		// 	stoplocation: function() {
		// 		plus.geolocation.clearWatch(this.location);
		// 		clearInterval(this.Time)
		// 	},
		// 	// 转换lat
		// 	transformLat: function(x, y) {
		// 		let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		// 		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		// 		ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
		// 		ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
		// 		return ret;
		// 	},
		// 	// 转换lon
		// 	transformLon: function(x, y) {
		// 		let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		// 		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		// 		ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
		// 		ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
		// 		return ret;
		// 	},
		// 	outOfChina: function(lat, lon) {
		// 		if (lon < 72.004 || lon > 137.8347)
		// 			return true;
		// 		if (lat < 0.8293 || lat > 55.8271)
		// 			return true;
		// 		return false;
		// 	},
		// 	delta: function(lat, lon) {
		// 		// Krasovsky 1940
		// 		//
		// 		// a = 6378245.0, 1/f = 298.3
		// 		// b = a * (1 - f)
		// 		// ee = (a^2 - b^2) / a^2;
		// 		let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
		// 		let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
		// 		let dLat = this.transformLat(lon - 105.0, lat - 35.0);
		// 		let dLon = this.transformLon(lon - 105.0, lat - 35.0);
		// 		let radLat = lat / 180.0 * this.PI;
		// 		let magic = Math.sin(radLat);
		// 		magic = 1 - ee * magic * magic;
		// 		let sqrtMagic = Math.sqrt(magic);
		// 		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
		// 		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
		// 		return {
		// 			'latitude': dLat,
		// 			'longitude': dLon
		// 		};
		// 	},
		// 	// two point's distance
		// 	Distance: function(latA, lonA, latB, lonB) {
		// 		var earthR = 6371000.;
		// 		var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
		// 		var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
		// 		var s = x + y;
		// 		if (s > 1) s = 1;
		// 		if (s < -1) s = -1;
		// 		var alpha = Math.acos(s);
		// 		var distance = alpha * earthR;
		// 		console.log(
		// 			`
		// 			本次计算的
		// 			latA =${latA},
		// 			lonA=${lonA},
		// 			latB =${latB},
		// 			lonB=${lonB},
		// 			distance=${distance}
		// 		`
		// 		)
		// 		return distance;
		// 	},
		// 	//WGS-84 to GCJ-02
		// 	gcj_encrypt: function(wgsLat, wgsLon) {
		// 		if (this.outOfChina(wgsLat, wgsLon))
		// 			return {
		// 				'latitude': wgsLat,
		// 				'longitude': wgsLon
		// 			};

		// 		let d = this.delta(wgsLat, wgsLon);
		// 		return {
		// 			'latitude': wgsLat + d.latitude,
		// 			'longitude': wgsLon + d.longitude
		// 		};
		// 	},
		// 	getLocation: function() {
		// 		let that = this
		// 		//设置时间定时器
		// 		this.setInter();
		// 		//监听位置信息
		// 		this.location = plus.geolocation.watchPosition(
		// 			// 成功函数
		// 			function(p) {
		// 				// 单次坐标转换 wsg84 -> gcj-02
		// 				let gcj = {}
		// 				gcj = that.gcj_encrypt(p.coords.latitude, p.coords.longitude);
		// 				console.log(gcj);

		// 				// 中心点markets[0]
		// 				that.markers[0].latitude = gcj.latitude;
		// 				that.markers[0].longitude = gcj.longitude;

		// 				// 更改成功回调函数的经纬度
		// 				p.coords.latitude = gcj.latitude;
		// 				p.coords.longitude = gcj.longitude;

		// 				if (that.bridge == null) {
		// 					that.temporaryDistance = 0;
		// 					// 中介桥bridge
		// 					that.bridge = p.coords
		// 				} else {
		// 					// 单次距离
		// 					that.temporaryDistance = that.Distance(that.bridge.latitude, that.bridge.longitude, gcj.latitude, gcj.longitude);
		// 					if (that.temporaryDistance <= 30) {
		// 						// 赋值距离
		// 						that.distance = that.distance + that.temporaryDistance;
		// 						// gps轨迹图 临时变量a 为了方便赋值
		// 						p.coords.count = that.count + 1;
		// 						p.coords.timestamp = p.timestamp;
		// 						p.coords.coordsType = p.coordsType
		// 						that.gps.unshift(p.coords);

		// 						// 配速计算
		// 						if (that.singleTime == 0) {
		// 							that.singleTime = that.time;
		// 						} else {
		// 							// 时间 that.time - that.singleTime
		// 							// 路程 that.temporaryDistance
		// 							// 速度 that.temporaryDistance/(that.time - that.singleTime)
		// 							//配速花费时间 1000/that.temporaryDistance/(that.time - that.singleTime)
		// 							let timeSec = 1000 / (that.temporaryDistance / (that.time - that.singleTime))
		// 							//配速 -> 分 秒 ->00'00"
		// 							let min = parseInt(timeSec / 60);
		// 							let sec = parseInt(timeSec % 60);
		// 							that.speed = `${min}'${sec}"`
		// 							that.singleTime = that.time;
		// 						}

		// 						// if (that.time != 0 && that.singleTime != 0) {
		// 						// 	// 配速 00‘00“ 单位m/s
		// 						// 	// 平均速度
		// 						// 	let speed = that.distance / that.time;

		// 						// }

		// 						// 监听回调成功函数次数 count
		// 						that.count++;

		// 						// gps轨迹图 单点 points
		// 						let points = {
		// 							latitude: gcj.latitude,
		// 							longitude: gcj.longitude
		// 						}
		// 						that.polyline[0].points.push(points);
		// 					}
		// 				}
		// 			},
		// 			// 失败函数
		// 			function(e) {
		// 				console.log('获取定位失败', e.code, e.message);
		// 				that.message = e.message
		// 				that.code = e.code
		// 				switch (e.code) {
		// 					case 1:
		// 						uni.showToast({
		// 							title: '访问权限被拒绝',
		// 							icon: 'loading',
		// 							duration: 2000
		// 						})
		// 						break;
		// 					case 2:
		// 						uni.showToast({
		// 							title: '位置信息不可用',
		// 							icon: 'loading',
		// 							duration: 2000
		// 						})
		// 						break;
		// 					case 3:
		// 						uni.showToast({
		// 							title: '获取位置超时',
		// 							icon: 'loading',
		// 							duration: 2000
		// 						})
		// 						break;
		// 					default:
		// 						uni.showToast({
		// 							title: '未知错误',
		// 							icon: 'loading',
		// 							duration: 2000
		// 						})
		// 						break;
		// 				}
		// 			}, {
		// 				// timeout: 5000,
		// 				enableHighAccuracy: true,
		// 				maximumAge: 0,
		// 				geocode: false,
		// 				provider: "system",
		// 				coordsType: "wgs84"
		// 			}
		// 		)
		// 	}
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
