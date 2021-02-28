<template>
	<view class="page">
		<!-- 头部log区 -->
		<view class="circle" style="text-align: center;width: 100vw;">
			<view class="title">
				<view>
					<image src="../../static/logo.png" style="width: 80px;height: 80px;"></image>
				</view>
				<view>
					<text>悦读乐跑</text>
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
	const crypto = require('crypto');
	const appkey = require("appkey.js");
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
				let that = this;
				//更新请求
				//#ifdef APP-PLUS
				let req = { //升级检测数据  
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				};
				uni.request({
					url: that.globalData.server + "/update", //检查更新地址
					data: req,
					success: (res) => {
						if (res.data.status === 1 || res.data.update === "true") {
							console.log('升级请求返回的数据', res);
							that.globalData.update = "false";
							that.globalData.updateUrl = res.data.url;
							console.log('that.globalData.update', that.globalData.update);
							uni.reLaunch({
								url: '../update/update',
								success(e) {
									console.log('success', e);
								},
								fail(e) {
									console.log('fail', e);
								}
							});
							console.log('test');
						} else {
							// 去获取 token 缓存
							uni.getStorage({
								key: 'token',
								success: function(res) {
									console.log('获取缓存成功');
									if (res.data.token != '') {
										that.globalData.token = res.data.token;
										that.globalData.name = res.data.name;
										that.globalData.studentId = res.data.studentId;
										that.globalData.gender = res.data.gender;
										that.globalData.Department = res.data.Department;
										that.globalData.profession = res.data.profession;
										that.globalData.grade = res.data.grade;
										that.globalData.fraction = res.data.fraction;
										that.globalData.status = res.data.status;
										that.globalData.timestamp = res.data.timestamp;
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								},
								fail() {
									console.log('缓存获取失败')
								}
							});
						}
					}
				});
				//#endif 
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
				var that = this;
				// 先检测需不需要升级
				// plus.runtime.openWeb('http://m3w.cn/ydlp')
				if (that.globalData.update === false) {
					uni.showModal({ //提醒用户更新
						title: "版本更新",
						content: '请打开http://m3w.cn/ydlp进行更新',
						showCancel: false,
						complete: (confirm) => {
							console.log('confirm', confirm);
						}
					})
					// plus.runtime.openWeb('http://m3w.cn/ydlp')
				} else {
					if (this.id != '' || this.pw != '') {
						// console.log(appkey.appkey)
						// 密码进行加密
						var pass = crypto.createHmac('sha256', appkey.appkey).update(this.pw).digest('hex')
						// console.log(pass);
						// 开始请求登录接口
						uni.request({
							url: that.globalData.server + '/login',
							data: {
								id: this.id,
								password: pass,
								token: crypto.createHmac('sha256', appkey.appkey).update(this.id + pass).digest('hex')
							},
							method: 'POST',
							success(res) {
								// console.log(res.data);
								if (res.data.code == 0) {
									// console.log('更新token：',res.data.data.token);
									// 设置赋值全局变量
									that.globalData.token = res.data.data.token,
										that.globalData.name = res.data.data.name,
										that.globalData.studentId = res.data.data.studentId,
										that.globalData.gender = res.data.data.gender,
										that.globalData.Department = res.data.data.Department,
										that.globalData.profession = res.data.data.profession,
										that.globalData.grade = res.data.data.grade,
										that.globalData.fraction = res.data.data.fraction,
										that.globalData.status = res.data.data.status,
										that.globalData.timestamp = res.data.data.timestamp;

									// 设置缓存
									uni.setStorage({
										key: 'token',
										data: {
											token: res.data.data.token,
											name: res.data.data.name,
											studentId: res.data.data.studentId,
											gender: res.data.data.gender,
											Department: res.data.data.Department,
											profession: res.data.data.profession,
											grade: res.data.data.grade,
											fraction: res.data.data.fraction,
											status: res.data.data.status,
											timestamp: res.data.data.timestamp
										}
									})
									// 跳转tab页面的index
									uni.switchTab({
										url: '../index/index'
									})
								} else {
									// code不等于0
									uni.showToast({
										title: res.data.msg,
										duration: 2000,
										icon: 'none'
									});
								}
							},
							fail() {
								uni.showToast({
									title: '网络连接超时',
									duration: 2000,
									icon: 'loading'
								})
							}
						})
					} else {
						uni.showToast({
							title: '账号或密码不能为空',
							duration: 2000,
							icon: 'none'
						})
					}
				}
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
		background: #0AAC61;
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
