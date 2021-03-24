<template>
	<view id="page">
		
		<view style="background-color: #0AAC61;">
			<view @click="onclick0" style="display: inline-block;width: 50%;text-align: center;">
				<text :class="status0">跑步</text>
			</view>
			<view @click="onclick1" style="display: inline-block;width: 50%;text-align: center;">
				<text :class="status1">晨读</text>
			</view>
		</view>
		<view class="body" v-if="status0 == 'status0'">
			<view v-for="(item,index) in rundata" :key='item.uid' :style="{background:(index%2 != 0)?'rgba(241,241,241,1)':'rgba(255,255,255,1)'}" style="height: 72px;">
				<view class="inline-b" style="margin-top: 13px;margin-left: 9upx;margin-right: 12px;">
					<!-- <image src="../../static/logo.png" style="width: 46px;height: 46px;border-radius: 50%;" mode=""></image> -->
				</view>
				<view class="inline-b" style="position: relative;top: -8px;">
					<text style="width:77px;height:22px;font-size:16px;font-family:PingFang SC;font-weight:400;line-height:22px;color:rgba(20,20,20,1);opacity:1;">{{item.studentId}}\n</text>
					<text style="width:79px;height:17px;font-size:12px;font-family:PingFang SC;font-weight:400;line-height:17px;color:rgba(153,153,153,1);opacity:1;">已跑步:{{ item.mileage/1000 }}公里</text>
				</view>
				<view class="inline-b card-r">
					<view v-if="index == 0">
						<!-- <image src="../../static/no1.svg" class="rank_img"></image> -->
					</view>
					<view v-else-if="index == 1">
						<!-- <image src="../../static/no2.svg" class="rank_img"></image> -->
					</view>
					<view v-else-if="index == 2">
						<!-- <image src="../../static/no3.svg" class="rank_img"></image> -->
					</view>
					<view v-else> 
						<view class="rank_img" style="display: inline-block;width: 45px;">第{{index+1}}名</view>
					</view>
				</view>
			</view>
		</view>
		<view class="body"  v-else>
			<view v-for="(item,index) in readdata" :key='item.uid' :style="{background:(index%2 != 0)?'rgba(241,241,241,1)':'rgba(255,255,255,1)'}" style="height: 72px;">
				<view class="inline-b" style="margin-top: 13px;margin-left: 9upx;margin-right: 12px;">
					<!-- <image src="../../static/logo.png" style="width: 46px;height: 46px;border-radius: 50%;" mode=""></image> -->
				</view>
				<view class="inline-b" style="position: relative;top: -8px;">
					<text style="width:77px;height:22px;font-size:16px;font-family:PingFang SC;font-weight:400;line-height:22px;color:rgba(20,20,20,1);opacity:1;">{{item.studentId}}\n</text>
					<text style="width:79px;height:17px;font-size:12px;font-family:PingFang SC;font-weight:400;line-height:17px;color:rgba(153,153,153,1);opacity:1;">已晨读:{{item.morningTimes}}</text>
				</view>
				<view class="inline-b card-r">
					<view v-if="index == 0">
						<!-- <image src="../../static/no1.svg" class="rank_img"></image> -->
					</view>
					<view v-else-if="index == 1">
						<!-- <image src="../../static/no2.svg" class="rank_img"></image> -->
					</view>
					<view v-else-if="index == 2">
						<!-- <image src="../../static/no3.svg" class="rank_img"></image> -->
					</view>
					<view v-else>
						<view class="rank_img" style="display: inline-block;width: 45px;">第{{index+1}}名</view>
					</view>
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
				status0:'status0',
				status1:'status1',
				rundata:{},
				readdata:{}
			}
		},
		onLoad() {
			
		},
		methods: {
			onclick0(){
				this.status0 = 'status0',
				this.status1 = 'status1'
			},
			onclick1(){
				this.status1 = 'status0',
				this.status0 = 'status1'
			},
			index:function () {
				uni.navigateTo({
					url:'../index/index'
				})
			},
			read:function () {
				uni.navigateTo({
					url:'../read/read'
				})
			},
			run:function () {
				uni.navigateTo({
					url:'../run/run'
				})
			},
			rank:function () {
				uni.navigateTo({
					url:'../rank/rank'
				})
			},
			login:function () {
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	#page{
		background-color: #FFFFFF;
		height: 100vh;
	}
	.status0{
		color: #FFFFFF;
		line-height: 42px;
		padding: 5px;
		border-bottom: 2px #FFFFFF solid;
	}
	.status1{
		color: #FFFFFF;
		padding: 5px;
		line-height: 42px;
	}
	.card-r{
		float: right;
	}
	.inline-b{
		display: inline-block;
	}
	.float-r{
		float: right;
	}
	.rank_img{
		width: 22px;
		height: 22px;
		margin-top: 25px;
		margin-right: 22px;
		margin-left: 9upx;
	}
</style>
