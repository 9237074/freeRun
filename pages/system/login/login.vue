<template>
	<view class="content">
		<u-toast ref="uToast" />
		<view class="container">
			<view class="header">
				欢迎加入FreeRun
			</view>
			<!-- 表单输入区 -->
			<view class="from">
				<u-form :model="form" ref="uForm" :error-type="errorType">
					<u-form-item label="" prop="studentId" left-icon="account-fill" :left-icon-style="leftIconStyle">
						<u-input v-model="form.studentId" type="number" required />
					</u-form-item>
					<u-form-item label="" prop="password" left-icon="lock-fill" :left-icon-style="leftIconStyle">
						<u-input v-model="form.password" type="password" required />
					</u-form-item>
				</u-form>
				<u-button shape="circle" :ripple="true" ripple-bg-color="#8765e1" @click="submit" size="medium"
					:custom-style="customStyle" :hair-line="false">
					登录
				</u-button>
			</view>

			<!-- 注册 忘记密码 -->
			<view class="footer">
				<view @click="sign">
					注册
				</view>
				<view @click="forget">
					忘记密码?
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					studentId: '',
					password: ''
				},
				rules: {
					studentId: [{
						min: 5,
						message: '学号不能少于5位',
						trigger: ['blur', 'change']
					}, {
						required: true,
						message: '请填写学号',
						trigger: ['blur', 'change']
					}],
					password: [{
						min: 8,
						message: '密码不能少于8位',
						trigger: ['blur', 'change']
					}, {
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					}]
				},
				errorType: ["border-bottom", "toast"],
				// 自定义样式
				customStyle: {
					color: "#fff",
					backgroundColor: "#ef2375",
					// backgroundImage: "linear-gradient(45deg, #8765e1, #b171e6)",
					marginTop: "60upx",
					border: "none"
				},
				leftIconStyle: {
					color: "#fff",
					fontSize: "35upx"
				}
			}
		},
		onLoad() {
			console.log(JSON.stringify(this.vuex_userInfo))
			if(this.vuex_userInfo.token){
				this.$u.route({
					type: 'tab',
					url: 'pages/system/index/index'
				})
			}else{
				// #ifdef APP-PLUS
					plus.navigator.closeSplashscreen();
				// #endif
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.$u.api.login({
							studentId: this.form.studentId,
							password: this.form.password
						}).then(res => {
							console.log(res)
							this.$refs.uToast.show({
								title: '登录成功,即将跳转',
								type: 'success',
								url: 'pages/system/index/index',
								isTab: true
							})
							this.$u.vuex('vuex_userInfo', res)
							console.log(this.vuex_userInfo)
						}).catch(e => {
							console.log('catch', e)
							this.$refs.uToast.show({
								title: e.data.msg,
								type: 'warning',
							})
						})
					}
				});
			},
			//注册
			sign() {
				this.$u.route({
					url: 'pages/system/sign/sign',
				})
			},
			//忘记密码
			forget() {
				this.$u.route({
					url: 'pages/system/forgetPassword/forgetPassword'
				})
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// background-image: linear-gradient(45deg, #8765e1, #b171e6);
		background-image: url(../../../static/images/login.png);
		background-size: 100% 100%;
		height: 100vh;
		width: 100vw;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 90%;
		height: 80%;
	}

	.header {
		text-align: center;
		font-size: 50upx;
		padding-top: 80upx;
	}

	.from {
		padding: 0 80upx;
		text-align: center;
	}

	.footer {
		display: flex;
		justify-content: center;
		margin-top: 50upx;

		view {
			margin: 10upx;
		}
	}
</style>
