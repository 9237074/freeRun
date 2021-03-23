<template>
	<view>
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot='content'>跑步规则</block>
		</cu-custom>
		
		
		<view v-if="man.dayRule.length == woman.dayRule.length" class="" style="border-radius: 20%;width: 90vw;">
			<view class="title" style="margin-top: 20rpx;">
				<text>跑步日期</text>
			</view>
			<view class="content1">
				<text>{{man.ruleTime}}</text>
			</view>
			<view class="title">
				<text>跑步次数</text>
			</view>
			<view class="content1">
				<text>{{man.runTimes}}次</text>
			</view>
			<view class="title">
				<text>最小里程</text>
			</view>
			<view class="content1">
				<text>{{man.minMileage}}km</text>
			</view>
			<view class="title">
				<text>最大里程</text>
			</view>
			<view class="content1">
				<text>{{man.maxMileage}}km</text>
			</view>
			<view class="title">
				<text>跑步规则</text>
			</view>
			<view class="content1">
				<text>{{man.dayRule}}</text>
			</view>
			<view style="height: 20rpx;width: 100vw;">
				
			</view>
		</view>
		<view v-else>
			<view class="title" style="margin-top: 20rpx;">
				<text>男生规则</text>
			</view>
			<view class="title" style="margin-top: 20rpx;">
				<text>跑步日期</text>
			</view>
			<view class="content1">
				<text>{{man.ruleTime}}</text>
			</view>
			<view class="title">
				<text>跑步次数</text>
			</view>
			<view class="content1">
				<text>{{man.runTimes}}次</text>
			</view>
			<view class="title">
				<text>最小里程</text>
			</view>
			<view class="content1">
				<text>{{man.minMileage}}</text>
			</view>
			<view class="title">
				<text>最大里程</text>
			</view>
			<view class="content1">
				<text>{{man.maxMileage}}</text>
			</view>
			<view class="title">
				<text>跑步规则</text>
			</view>
			<view class="content1">
				<text>{{man.dayRule}}</text>
			</view>
			<view class="title" style="margin-top: 20rpx;">
				<text>女生规则</text>
			</view>
			<view class="title">
				<text>跑步日期</text>
			</view>
			<view class="content1">
				<text>{{woman.ruleTime}}</text>
			</view>
			<view class="title">
				<text>跑步次数</text>
			</view>
			<view class="content1">
				<text>{{woman.runTimes}}次</text>
			</view>
			<view class="title">
				<text>最小里程</text>
			</view>
			<view class="content1">
				<text>{{woman.minMileage}}</text>
			</view>
			<view class="title">
				<text>最大里程</text>
			</view>
			<view class="content1">
				<text>{{woman.maxMileage}}</text>
			</view>
			<view class="title">
				<text>跑步规则</text>
			</view>
			<view class="content1">
				<text>{{woman.dayRule}}</text>
			</view>
			<view style="height: 20rpx;width: 100vw;">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				man:{
					dayRule: []
				},
				woman:{
					dayRule: []
				}
			}
		},
		methods: {
			onLoad:function(){
				var that = this;
				// 设备登陆检查
				that.checkToken();
				uni.request({
					url:that.globalData.server+'/adminRunRule',
					data:{
						token:that.globalData.token,
						type:'student'
					},
					success(res) {
						console.log(res.data)
						that.man = res.data.msg[0][0];
						that.woman = res.data.msg[1][0];
					}
				})
			}
		}
	}
</script>

<style>
	.title{
		border-radius: 25px;
		background-color: #0AAC61;
		color: #FFFFFF;
		width: 150rpx;
		text-align: center;
		margin-left: 50rpx;
	}
	.content1{
		width: 85vw;
		margin-left: 70rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
