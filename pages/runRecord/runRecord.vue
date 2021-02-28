<template>
	<view style="background:rgba(255,255,255,1);width: 100vw;height: 100vh;">
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot='content'>跑步记录</block>
		</cu-custom>
		<view class="" :style="{background:(index%2 != 0)?'rgba(241,241,241,1)':'rgba(255,255,255,1)'}" v-for=" (item ,index) in recordDate" :key='item.id' :id='JSON.stringify(item)'>
			<text style="width: 67px;margin-left: 20px;position: relative;top: -25px;">{{index+1}}.</text>
			<view class="inline-b" style="width: 211px;height: 72px;margin-left: 33px;">
				<view style="margin-top: 14px;height:22px;font-size:16px;font-family:PingFang SC;font-weight:400;line-height:22px;color:rgba(20,20,20,1);opacity:1;">时长：{{parseInt(item.spendTime/60)}}分钟{{item.spendTime%60}}秒</view>
				<view class="inline-b" style="margin-top: 8px;">
					<text style="height:17px;font-size:12px;font-family:PingFang SC;font-weight:400;line-height:17px;color:rgba(153,153,153,1);opacity:1;">距离:{{item.mileage}}米</text>
				</view>
			</view>
			<view class="inline-b" style="position: relative;top: -20px;">
				<text style="height:20px;font-size:14px;font-family:PingFang SC;font-weight:400;line-height:20px;color:rgba(153,153,153,1);opacity:1;">{{item.createdAt.slice(0,10)}}</text> 
			</view>
		</view>
		<!-- <button type="primary" @click="update">更新</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				recordDate:[],
				offset:0
			}
		},
		onLoad:function(){
			this.reqData();
		},
		onPullDownRefresh:function(){
			console.log('下拉刷新');
			this.update();
		},
		methods: {
			reqData(a){
				var that = this;
				// 设备登陆检查
				that.checkToken();
				uni.request({
					url:that.globalData.server+'/runrecord',
					data:{
						token: that.globalData.token,
						offset: that.offset
					},
					method:'POST',
					complete() {
						uni.stopPullDownRefresh();
					},
					success(res) {
						if(res.data.msg == '参数正常'){
							console.log(res.data.data.length)
							if(res.data.data.length == 0){
								uni.showToast({
									title:'没有更多记录啦',
									duration: 2000
								})
							}else{
								let a = that.recordDate.concat(res.data.data)
								that.recordDate = a
								console.log(a)
							}
						}
					},
					fail() {
						uni.showToast({
							title:'网络超时',
							duration:2000
						})
					}
				})
			},
			update(){
				this.offset = this.offset + 1;
				this.reqData()
			},
			btn(e){
				console.log(JSON.parse(e.currentTarget.id))
				uni.navigateTo({
					url:'../runed/runed'+'?data='+e.currentTarget.id,

				})
			}
		}
	}
</script>

<style>
	.inline-b{
		display: inline-block;
	}
</style>
