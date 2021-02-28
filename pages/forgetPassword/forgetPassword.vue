<template>
	<view>
		<cu-custom bgColor="bg-gradual-theme" :isBack="true"> <!-- bg-gradual-green -->
			<block slot="backText"></block>
			<block slot='content'>忘记密码</block> 
		</cu-custom>
		<form @submit="submit" @reset="">
			<view class="cu-form-group margin-top">
				<button class="cu-btn sm bg-olive lab">学号</button>
				<input class="input" v-on:input="inputId" placeholder="请输入学号"  maxlength="20" v-model="stuId"></input>
			</view>
			<view class="cu-form-group">
				<button class="cu-btn sm bg-olive lab">教务系统密码</button>
				<input class="input" v-on:input="inputOsPassword" placeholder="请输入教务系统密码" maxlength="20" v-model="osPassword"></input>
			</view>
			<view class="cu-form-group">
				<button class="cu-btn sm bg-olive lab">新密码</button>
				<input class="input" v-on:input="inputPassword" placeholder="请输入新密码" maxlength="20" v-model="npassword"></input>
			</view>
			<view style="margin-top: 10upx;height: 20upx;text-align: center;color: rgb(255,0,0)">
				{{waring}}
			</view>
			<view class="padding-xl">
				<button form-type="submit" class="round cu-btn block bg-gradual-theme margin-tb-sm lg" style="color: #FFFFFF;">
					<text :class="status?'cuIcon-loading2':''" class="cuIconfont-spin"></text>
					go
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuId:'',
				osPassword:'',
				npassword:'',
				status:false,
				waring:''
			}
		},
		methods: {
			inputId:function(e){
				if(e.detail.value.length < 6){
					this.waring = '学号长度不得小于6'
				}else{
					this.waring = ''
				}
			},
			inputOsPassword:function(e){
				if(e.detail.value.length < 6){
					this.waring = '教务系统长度长度不得小于6'
				}else{
					this.waring = ''
				}
			},
			inputPassword:function(e){
				if(e.detail.value.length < 6){
					this.waring = '新密码长度不得小于6'
				}else{
					this.waring = ''
				}
			},
			submit:function(){
				var that = this;
				this.status = true
				console.log(this.stuId,this.osPassword,this.npassword,this.status);
				if(this.stuId == '' || this.osPassword == '' || this.npassword == '' ){
					uni.showToast({
						title:'表单不允许为空',
						icon:'none',
						duration:1500
					});
					that.status = false
				}else if(this.stuId.length < 6 || this.osPassword.length < 6 || this.npassword.length < 6 ){
					uni.showToast({
						title:'表单长度需要大于6',
						icon:'none',
						duration:1500
					});
					that.status = false
				}else{
					uni.request({
						url:that.globalData.server+'/forgetpassword',
						data:{
							xh:that.stuId,
							password:that.osPassword,
							npassword:that.npassword,
							token:that.checkKey(that.stuId+that.osPassword)
						},
						success(res) {
							console.log(res);
							console.log(that.checkKey(that.stuId+that.osPassword))
							if(res.data.status === 'success' && res.data.msg === '密码更改成功'){
								uni.showToast({
									title:'密码更改成功',
									icon:'success',
									duration:1500,
									success() {
										that.status = false
										setTimeout(()=>{
											uni.reLaunch({
												url:'../denglu/denglu'
											})
										},1500)
									}
								});
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none',
									duration:2000
								})
								that.status = false
							}
						},
						fail() {
							that.status = false
							uni.showToast({
								title:'服务器开了小差',
								duration:1500
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.input{
		margin-left: 2vw;
	}
	.lab{
		width: 25vw;
	}
</style>
