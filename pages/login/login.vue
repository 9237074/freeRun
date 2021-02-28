<template>
	<view style="background-color: #FFFFFF;height: 100vh;">
		<cu-custom bgColor="bg-gradual-theme" :isBack="false">
			<block slot='content'>个人中心</block>
		</cu-custom>
		<view style="background-color: #0AAC61;height: 50vh;width: 100vw;position: fixed;text-align: center;">
			<view style="height: 30vw;width: 30vw;text-align: center;color: #FFFFFF;">
				<image @click="gotoDebug" src="../../static/userLogo.svg" style="height: 30vw;width: 30vw;border-radius: 50%;margin-left: 35vw;margin-top: 20px;"></image>
			</view>
			<view style="position: relative;top: 50upx;color: #FFFFFF;font-size:16px;font-family:PingFang SC;font-weight:bold;line-height:22px;">{{name}}</view>
		</view> 
		
		<view class="" style="width:100vw;height:55.5vh;background-color: #FFFFFF;border-radius: 18px 18px 0 0;position: absolute;top: 550upx;">
			<view class="flex justify-center" style="margin-top: 50upx;">
				<view @click="rank" class="flex-sub">
					<image src="../../static/myrank.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font" style="text-align: center;">我的排行</view>
				</view>
				<view @click="runRecord" class="flex-sub" >
					<image src="../../static/mrun.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font">跑步记录</view>
				</view>
				<view @click="readRecord" class="flex-sub" >
					<image src="../../static/mread.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font">晨读记录</view>
				</view>
			</view>
			<view class="flex justify-center" style="margin-top: 50upx;">
				<view @tap="showModal" data-target="Modal" class="flex-sub">
					<image src="../../static/login.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font">个人资料</view>
				</view>
				<view @click="qrcode"  data-target="Image" class="flex-sub">
					<image src="../../static/qrcode.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font">签到码</view>
				</view>
				<view @tap="showModal1" data-target="Modal1" class="flex-sub">
					<image src="../../static/about.svg" style="width: 56px;height: 56px;"></image>
					<view class="c_font">关于我们</view>
				</view>
			</view>
			<!-- 个人资料模态框 -->
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">个人资料</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view>姓名:{{name}}</view>
						<view>性别:{{gender}}</view>
						<view>学号:{{studentId}}</view>
						<view>年级:{{grade}}</view>
						<view>院系:{{Department}}</view>
						<view>专业:{{profession}}</view>
					</view>
				</view>
			</view>
			
			<!-- 关于我们模态框 -->
			<view class="cu-modal" :class="modalName=='Modal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">关于我们</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view>联系邮箱:i@xysbs.cn</view>
						<view>Underdog工作室</view>
						<view>阳光学院软件技术研发中心</view>
						<view>{{version}}</view>
					</view>
				</view>
			</view>
			
			<!-- 图片模态框 -->
			<view class="cu-modal" :class="modalName=='Image'?'show':''">
				<view class="cu-dialog">
					<view class="bg-img" :style="'background-image: url('+src+');height:350px;'">
						<view class="cu-bar justify-end text-white">
							<view class="action" @click="hideModal">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @click="hideModal">我知道了</view>
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
				src:'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
				modalName: null,
				"name":this.globalData.name,
				"gender":this.globalData.gender,
				"studentId":this.globalData.studentId,
				"Department":this.globalData.Department,
				"profession":this.globalData.profession,
				"grade":this.globalData.grade,
				debugCount: 0,
				version: plus.runtime.version
			}
		},
		methods: {
			gotoDebug(){
				if(this.debugCount >= 10){
					uni.navigateTo({
						url: '../debug/debug'
					})
					this.debugCount = 0
				}else{
					this.debugCount++
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showModal1(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			rank:function () {
				uni.switchTab({
					url:'/pages/rank/rank'
				})
			},
			runRecord:function(e){
				uni.navigateTo({
					url:'../runRecord/runRecord'
				})
			},
			readRecord:function(e){
				uni.navigateTo({
					url:'../readRecord/readRecord'
				})
			},
			qrcode:function(e){
				var that = this
				// 设备登陆检查
				that.checkToken();
				uni.request({
					url:that.globalData.server+'/qrcode',
					data:{
						token:that.globalData.token
					},
					method:'POST',
					success(res){
						console.log(res.data.data)
						if(res.data.data == '没有权限'){
							uni.showToast({
								title:'您不是负责人',
								duration:2000
							})
						}else{
							that.src = res.data.data
							that.modalName = e.currentTarget.dataset.target
							// uni.navigateTo({
							// 	url:'../qr2/qr2'+'?url='+res.data.data
							// })
						}
					}
				})
			}
		}
	}
</script>

<style>
	.c_font{
		height:22px;
		font-size:16px;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:22px;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.flex-sub{
		text-align: center;
	}
</style>
