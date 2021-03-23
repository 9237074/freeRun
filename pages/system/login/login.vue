<template>
	<view class="page">
		<!-- 头部log区 -->
		<view class="circle" style="text-align: center;width: 100vw;">
			<view class="title">
				<view>
					<!-- <image src="../../static/logo.png" style="width: 80px;height: 80px;"></image> -->
				</view>
				<view>
					<text>freeRun</text>
				</view>
			</view>
		</view>

		<!-- 表单输入区 -->
		<view class="shuru">
			<form @submit="formSubmit">
				<view class="inp">
					<input @input="user" type="text" style="margin-left: 40rpx;margin-top: 15rpx;font-size: 35rpx;color: #black;"
					 placeholder='请输入学号' />
				</view>
				<view class="inp">
					<input @input="password" type="text" style="margin-left: 40rpx;margin-top: 15rpx;font-size: 35rpx;color: #black;"
					 password="true" placeholder="请输入密码" />
				</view>
				<view class="btn">
					<button style="border-radius: 20px;width: 271px;height: 46px;background-color: #0AAC61;color:#FFFFFF;" formType="submit">登陆</button>
				</view>
			</form>
		</view>

		<!-- 注册 忘记密码 -->
		<view class="sigin">
			<text @click="sigin" style="color: #0AAC61;margin-right: 30upx;">注册</text>
			<text>|</text>
			<text @click="forget" style="margin-left: 30upx;color: #0AAC61;">忘记密码</text>
		</view>
	</view>
</template>

<script>
	// 导入crypto加密库和appkey
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		data() {
			return {
				id: '',
				pw: '',
				time: 0
			}
		},
		methods: {
			onLoad() {
				
			},
			// 获取用户输入的账号
			user: function(e) {
				this.id = e.target.value;
			},
			// 获取用户输入的密码
			password: function(e) {
				this.pw = e.target.value;
			},
			//注册
			sigin: function() {
				uni.navigateTo({
					url: '../sgin/sgin'
				})
			},
			//忘记密码
			forget: function() {
				uni.navigateTo({
					url: '../forgetPassword/forgetPassword'
				})
			},
			// button提交表单
			formSubmit: function(e) {
				
			}
		}
	}
</script>

<style>
	.page {
		background-color: #FFFFFF;
		height: 100vh;
		width: 100vw;
		position: fixed;
	}

	.circle {
		width: 375px;
		height: 264px;
		background: #efebeb;
		border-radius: 0 0 50% 50%;
		opacity: 1;
	}

	.title {
		width: 120px;
		height: 42px;
		margin: 0 auto;
		font-size: 30px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 42px;
		color: rgba(255, 255, 255, 1);
		opacity: 1;
		position: relative;
		top: 104px;
	}

	.inp {
		margin: 0 auto;
		padding-top: 20px;
		width: 270px;
		border-bottom: 1px solid rgba(245, 245, 245, 1);
	}

	.btn {
		margin-top: 40px;
	}

	.shuru {
		margin-top: 20px;
	}

	.sigin {
		text-align: center;
		margin-top: 20%;
		font-size: 30rpx;
	}
</style>
