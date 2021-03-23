<template>
	<view id="main">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-gradual-theme" :isBack="false">
			<block slot='content'>晨读</block>
		</cu-custom>
		<!-- content -->
		<!-- 列表渲染阅读主题 -->
		<view class="card" v-for="(item,index) in msg" :key="item.id">
			<!-- theme,readTime,readDate,readSite,people -->
			<!-- 左侧图 -->
			<view class="card-left">
				<!-- <image src="../../static/logo.png" style="width: 70px;height: 70px;"></image> -->
			</view>
			<!-- 右侧主内容 -->
			<view class="card-body">
				<view style="font-size:16px;font-weight:800;font-family:Microsoft YaHei Light;">
					主题:{{item.theme}}
				</view>
				<view style="font-size:13px;color:#AAA;line-height:30px;">
					时间:{{item.readDate}}
				</view>
				<view style="font-size:12px;color:#AAA;margin: 0;">
					<view style="display:inline-block;">
						<!-- <view class="iicon" style="background-image: url(../../static/clock.png);vertical-align:middle;" /> -->
							<text style="vertical-align:middle;">{{item.readTime}}</text>
						</view>
						<view style="display:inline-block;margin-left:10px;color:#F7A442;">
							<!-- <view class="iicon" style="background-image: url(../../static/loca.png);vertical-align:middle;" /> -->
								<text style="vertical-align:middle;">{{item.readSite}}</text>
							</view>
						</view>
						<view style="font-size:11px;line-height:30px;color:#AAA;margin-top:10px">
							<!-- <view class="iicon" style="background-image: url(../../static/person.png);vertical-align:middle;" /> -->
								<text style="vertical-align:middle;">负责人:{{item.people}}</text>
							</view>
						</view>
						<view class="card-right">
							<view style="display:flex;align-items: center;height:100%;">
								<view class="button" v-if="item.check == false" @click="btn" :id="item.readTime+','+item.readDate+','+index">签到</view>
								<view class="button" v-else @click="btn1" :id="item.readTime+','+item.readDate+','+index">签退</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"123",
				msg:[],
				checkout:false
			}
		},
		methods: {
			btn:function(e){
				//开始修改
				// 第一步:获取签到开始时间,结束时间
				//第二步:获取签到日期
				//第三步:判断开始时间,四位数字。结束时间相同
				//第四步:判断签到日期
				
				//[{"theme":"国学","readTime":"14:19","readDate":"周二、周四","readSite":"工B302","people":"172720158"},{"theme":"英语","readTime":"9:30","readDate":"周一、周三","readSite":"东区大操场","people":"172720158"},{"theme":"国学","readTime":"7:20","readDate":"周一、周二、周三、周四、周五","readSite":"东区大操场","people":"182713137"},{"theme":"英语","readTime":"7:20","readDate":"周一、周二、周三、周四、周五","readSite":"图书馆读书园","people":"180922135"}]
				
				let that = this;
				let index = e.target.id.split(',')[2]
				
				console.log()
				console.log("id:",e.target.id);
				var readTime = e.target.id.split(',')[0]
				var readDate = e.target.id.split(',')[1]
				var startTime = readTime.split('-')[0].split(":")
				var endTime = readTime.split('-')[1].split(":")
				console.log("startTime",startTime,"endTime",endTime);
				var D = new Date() 
				
				// 设备登陆检查
				// that.checkToken();
				console.log(startTime[0],endTime[1].substring(0,2),D.getHours(),D.getMinutes());
				if((startTime[0] == D.getHours() && startTime[1] <= D.getMinutes() ) && D.getMinutes() <= Number(startTime[1])+10){
					console.log('签到时间');
					uni.scanCode({
						onlyFromCamera:true,
						success(res) {
							console.log("qr:",res.result);
							let a = JSON.parse(res.result);
							console.log("a:",a);
							let 
								theme = a.theme,
								time = a.readTime,
								date = a.readDate,
								site = a.readSite,
								status = '签到',
								people = a.people;
							if(theme != '' || time != '' ||date != '' ||site != '' ||people != '' ){
								that.msg[index].check = true
								uni.showToast({
									title:"签到成功",
									duration:1000
								})
								uni.setStorage({
									key:'readTheme',
									data:that.msg,
									fail() {
										uni.showToast({
											title:'更新缓存失败',
											duration:1000
										})
									}
								})
							}else{
								uni.showToast({
									title:"签到失败",
									duration:1000
								})
							}
						}
					})
				}else{
					console.log('非签到时间');
					uni.showToast({
						title:"非签到时间",
						duration:1000,
						icon:'loading'
					})
				}
				
			},
			btn1:function(e){
				let that = this;
				let index = e.target.id.split(',')[2]
				console.log("id:",e.target.id);
				var readTime = e.target.id.split(',')[0]
				var readDate = e.target.id.split(',')[1]
				var startTime = readTime.split('-')[0].split(":")
				var endTime = readTime.split('-')[1].split(":")
				console.log("startTime",startTime,"endTime",endTime);
				var D = new Date() 
				
				// 设备登陆检查
				// that.checkToken();
				console.log(startTime[0],endTime[1].substring(0,2),D.getHours(),D.getMinutes());
				if((endTime[0] == D.getHours() && endTime[1] <= D.getMinutes() ) && D.getMinutes() <= Number(endTime[1])+5){
					console.log('签退时间');
					uni.scanCode({
						onlyFromCamera:true,
						success(res) {
							console.log("qr:",res.result);
							let a = JSON.parse(res.result);
							console.log("a:",a);
							let 
								theme = a.theme,
								time = a.readTime,
								date = a.readDate,
								site = a.readSite,
								status = '签退',
								people = a.people;
							if(theme != '' || time != '' ||date != '' ||site != '' ||people != '' ){
								let key = that.checkKey(time+date+site+theme+people+that.globalData.token)
								console.log('key:',key)
								uni.request({
									url:that.globalData.server+'/readcheck',
									data:{
										token:that.globalData.token,
										theme:theme,
										time:time,
										date:date,
										site:site,
										people:people,
										key:key,
										status:status
									},
									success(res){
										console.log("res...",res)
										if(res.data.msg == "签到成功"){
											uni.showToast({
												title:"签退成功",
												duration:1500
											})
											that.msg[index].check = false
											uni.setStorage({
												key:'readTheme',
												data:null,
												fail() {
													uni.showToast({
														title:'清空缓存失败',
														duration:1000
													})
												}
											})
										}else{
											console.log(res.data.msg);
											that.msg[index].check = false
											uni.showToast({
												title:'重复签退',
												icon:'none',
												duration:2000
											})
										}
									}
								})
							}
						}
					})
				}else{
					that.msg[index].check = false
					console.log('签退时间');
					uni.showToast({
						title:"签退超时",
						duration:1000,
						icon:'loading'
					});
					uni.setStorage({
						key:'readTheme',
						data:null,
						fail() {
							uni.showToast({
								title:'清空缓存失败',
								duration:1000
							})
						}
					})
				}
				
			}
		}
	}
</script>

<style>
.button{
	width:65px;
	height:30px;
	line-height:30px;
	text-align:center;
	margin:0 auto;
	background-color:#0AAC61;
	border-radius:15px;
	font-size:12px;
	color:#FFF;
	
}
.button:active{
	background-color:#27723E;
}
.iicon{
	width:12px;
	height:12px;
	background-size:100% 100%;
	display:inline-block;
}
#main{
	background:#FFF;
	min-height:100vh;
	font-family:"PingFang SC";
	font-size:14px;
	font-weight:400;
	color:#333;
}
.card{
	margin: 0 auto;
	border: 0.5rpx solid rgb(244,244,244);
	width: 95%;
	border-radius:6px;
	box-shadow:0px 3px 6px rgba(0,0,0,0.12);
	background:#FFF;
	padding:15px 0 8px 0;
	height:21vh;
	margin-bottom: 20px;
	margin-top: 15rpx;
	overflow:hidden;
	
}
.card-left{
	display: inline-block;
	width: 25%;
	vertical-align:top;
}
.card-left image{
	margin:0 auto;
	display:block !important;
	border-style:dashed;
	border-width:1px;
	border-color:#888;
}
.card-body{
	display: inline-block;
	width: 50%;
}
.card-right{
	display: inline-block;
	width: 25%;
	vertical-align:top;
	height:100%;
}
</style>
