<template>
	<view>
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot='content'>跑步记录</block>
		</cu-custom>
		<map :latitude="latitude" :longitude="longitude" style="height: 65vh;width: 750rpx;"
		:polyline="polylines"
		></map>
		<view class="" style="background-color: #F1F1F1;width: 90%;height:30vh;border-radius: 20rpx;margin: 0 auto;margin-top: 20rpx;">
			<view class="" style="border-bottom: 1rpx #C8C7CC solid;width: 90%;margin: 0 auto;">
				<text>{{(distance/1000).toFixed(2)}}公里</text>
				<text style="float: right;">{{gps}}</text>
			</view>
			<view class="" style="width: 90%;margin: 0 auto;text-align: center;">
				<text style="float: left;">{{speed}}</text>
				<text>{{parseInt(time/3600)}}:{{parseInt(time%3600/60)}}:{{parseInt(time%3600%60)}}</text>
				<text style="float: right;">{{(distance*0.06).toFixed(2)}}</text>
			</view>
			<view class="" style="width: 90%;margin: 0 auto;text-align: center;">
				<text style="float: left;">平均配速</text>
				<text>用时</text>
				<text style="float: right;">热量(千卡)</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude:'26.00394',
				longitude:'119.448084',
				speed:0,
				aspeed:[],
				accuracy:'',
				horizontalAccuracy:'',
				time:'',
				markers:[{
					"id":"1",
					"latitude":"26.00394",
					"longitude":"119.448084",
					"iconPath":"../../static/position.png"
				}],
				polylines:[{
					points:[],
					color:'#00a0e9',
					width:5,
				}],
				// distance 单位m
				distance:0,
				data:''
			}
		},
		onLoad:function(e){
			console.log('e',JSON.parse(e.data))
			if(JSON.parse(e.data).id == undefined ){
				//当前跑完页面传值
				let a = JSON.parse(e.data)
				console.log("e1",a.spendTime);
				this.polylines[0].points = a.gps
				this.latitude = a.gps[0].latitude
				this.longitude = a.gps[0].longitude
				this.time = parseInt(a.spendTime)
				this.speed = a.speed
				this.distance = a.mileage
			}else{
				//服务器数据传值
				let a = JSON.parse(e.data)
				console.log("e1",a.gps);
				this.polylines[0].points = JSON.parse(a.gps)
				this.latitude = JSON.parse(a.gps)[0].latitude
				this.longitude = JSON.parse(a.gps)[0].longitude
				this.speed = a.speed
				this.time = parseInt(a.spendTime)
				this.distance = a.mileage
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
