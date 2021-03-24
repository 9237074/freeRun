<template>
	<view class="page" style="">
		runpage
		<view style="position:fixed;">
			<view class="bg">
				<!-- <image src="../../static/run_bg.png" style="width: 100vw;height: 90vh;" mode=""></image> -->
			</view>
			<view class="cover">
			</view>
			<view class="body">
				<view class="top"> 
					<view class="cuIcon-question inline-b" style="margin-left: 10upx;margin-top: 10upx;color: #FFFFFF;width: 16px;height: 16px;"></view>
					<text @click="question" style="font-size:12px;color:#FFFFFF;">常见问题</text>
					<text @click="rule" style="float: right;margin-right: 5vw;color: #FFFFFF;">规则</text>
				</view>
				<view class="outside bg-gradual-theme">
					<view class="inside">
						<view class="text">
							<view class="class_01">有效总次数</view>
							<view v-if="times>=10" class="class_02">{{times}}</view>
							<view v-else class="class_02">0{{times}}</view>
							<view class="class_03">
								学期目标:{{aims}}
							</view>
						</view>
					</view>
				</view>
				<view class="saying">
					<!-- <image src="../../static/say_runrun.png" style="width: 200px;height: 48px;"></image> -->
				</view>
				<button @click="submit" class="btn bg-gradual-theme" style="border-radius: 20px;width: 271px;height: 46px;color:#FFFFFF;">开始跑步</button>
			</view>
		</view>	
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				times:0,
				aims:60
			}
		}, 
		onShow:function(){
			
		},
		methods: {
			submit: async function(e){
				let that = this;
				//提示注意事项
				if(await this.checkLocation()){
					//判断任务时间
					var today = new Date()
					var getHours = null;
					var getMinutes = null;
					if(today.getHours() < 10 ){
						getHours = '0'+today.getHours();
					}else{
						getHours = String(today.getHours());
					}
					if(today.getMinutes() < 10 ){
						getMinutes = '0'+today.getMinutes();
					}else{
						getMinutes = String(today.getMinutes());
					}
					var shijian = getHours+getMinutes;
					// if(that.globalData.studentId == '172720158'){
						shijian = '0600'
					// }else{
					// 	console.log('正常用户判断时间');
					// }
					if(that.globalData.studentId == '172713172'){
						shijian = '0600'
					}else{
						console.log('正常用户判断时间');
					}
					// shijian = '0600'
					if(shijian >= '0600' && shijian <= '0730'){
						// 判断当前时间与完成时间
						if( parseInt(that.globalData.runTime/86400) < parseInt(new Date().getTime()/86400000) || that.globalData.runTime == null){
							uni.navigateTo({
								url:'../running/running'
							})
						}else{
							uni.showToast({
								title:'今日任务已完成',
								duration:2000
							})
						}
					}else if(shijian >= '1730' && shijian <= '2200'){
						// 判断当前时间与完成时间
						if( parseInt(that.globalData.runTime/86400) < parseInt(new Date().getTime()/86400000) || that.globalData.runTime == null){
							uni.navigateTo({
								url:'../running/running'
							})
						}else{
							uni.showToast({
								title:'今日任务已完成',
								duration:2000
							})
						}
					}else{
						uni.showToast({
							title:'未到跑步时间',
							icon:'none',
							duration:2000
						});
					}
				}
			},
			rule:function(){
				uni.navigateTo({
					url:'../runRule/runRule'
				})
			},
			question:function(){
				uni.navigateTo({
					url:'../runQuestion/runQuestion'
				})
			}
		}
	}
</script>

<style>
	.page{
		width: 100vw;
	}
	.bg{
		position: absolute;
		width: 100vw;
		height: 90vh;
		
	}
	.cover{
		position: absolute;
		background-color: #162419;
		opacity: 0.68;
		width: 100vw;
		height: 90vh;
	}
	.body{
		position: absolute;
		width: 100vw;
		height: 90vh;
	}
	.outside{
		width:220px;
		height:220px;
		/* background:linear-gradient(180deg,rgba(124,181,134,1) 0%,rgba(120,210,154,1) 100%); */
		border-radius:50%;
		opacity:1;
		margin-left: 22.5vw;
		margin-top: 50px;
	}
	.inside{
		width:188px;
		height:188px;
		background:rgba(255,255,255,1);
		border-radius:50%;
		opacity:1;
		margin-left: 16px;
		position: relative;
		top: 16px;
	}
	.text{
		
	}
	.class_01{
		width:60px;
		height:17px;
		font-size:12px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:17px;
		color:rgba(226,153,63,1);
		opacity:1;
		margin-left: 64px;
		position: relative;
		top: 16px;
	}
	.class_02{
		width:86px;
		height:100px;
		font-size:72px;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:100px;
		color:rgba(226,153,63,1);
		opacity:1;
		margin-left: 51px;
		position: relative;
		top: 16px;
	}
	.class_03{
		width:66px;
		height:17px;
		font-size:12px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:17px;
		color:rgba(132,132,132,1);
		opacity:1;
		margin-left: 61px;
		position: relative;
		top: 16px;
	}
	.saying{
		margin-left: 88px;
		margin-top: 16px;
	}
	.btn{
		margin-top: 30px;
	}
</style>
