<template>
	<view class="page">
		<view class="navBack">
			<u-icon name="arrow-left" color="#fff" size="28"></u-icon> 返回
		</view>
		<view class="container">
			<view class="header">
				创建一个账号
			</view>
			<view class="card">
				<u-form :model="form" ref="uForm">
					<u-form-item label="昵称" prop="user">
						<u-input v-model="form.user" />
					</u-form-item>
					<u-form-item label="姓名" prop="name">
						<u-input v-model="form.name" />
					</u-form-item>
					<u-form-item label="学号" type="number" prop="studentId">
						<u-input v-model="form.studenId" />
					</u-form-item>
					<u-form-item label="年级">
						<u-input v-model="form.grade" :disabled="true" @click="show=true" />
					</u-form-item>
					<u-form-item label="学院">
						<u-input v-model="form.department" :disabled="true" @click="show=true" />
					</u-form-item>
					<u-form-item label="专业">
						<u-input v-model="form.profession" :disabled="true" @click="show=true" />
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input v-model="form.password" type="password" :password-icon="true" />
					</u-form-item>

					<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirmForm"></u-select>
				</u-form>
				<u-button shape="circle" :ripple="true" ripple-bg-color="#8765e1" @click="sign"
					:custom-style="customStyle">
					注册</u-button>
			</view>
			<view class="footer">
				通过创建一个账号同意我们团队的服务和隐私政策
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					user: '',
					name: '',
					studenId: '',
					grade: '',
					department: '',
					profession: '',
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
				// 自定义样式
				customStyle: {
					color: "#fff",
					// backgroundColor: "#8765e1",
					backgroundImage: "linear-gradient(45deg, #8765e1, #b171e6)",
					marginTop: "60upx"
				},
				show: false,
				list: [{
					value: '2020',
					label: '2020',
					children: [{
						value: "人文与传播学院",
						label: "人文与传播学院",
						//['行政管理', '应用心理学', '广播电视编导', '文化产业管理'],
						children: [{
							value: "行政管理",
							label: "行政管理"
						}, {
							value: "应用心理学",
							label: "应用心理学"
						}, {
							value: "广播电视编导",
							label: "广播电视编导"
						}, {
							value: "文化产业管理",
							label: "文化产业管理"
						}]
					}, {
						value: "艺术系",
						label: "艺术系",
						// ['音乐学', '舞蹈学'],
						children: [{
							value: "音乐学",
							label: "音乐学"
						}, {
							value: "舞蹈学",
							label: "舞蹈学"
						}]
					}, {
						value: "商学院",
						label: "商学院",
						// ['金融学', '国际经济与贸易', '会计学', '财务管理', '工商管理', '酒店管理', '电子商务', '市场营销', '物业管理'],
						children: [{
							value: "金融学",
							label: "金融学"
						}, {
							value: "国际经济与贸易",
							label: "国际经济与贸易"
						}, {
							value: "会计学",
							label: "会计学"
						}, {
							value: "财务管理",
							label: "财务管理"
						}, {
							value: "工商管理",
							label: "工商管理"
						}, {
							value: "酒店管理",
							label: "酒店管理"
						}, {
							value: "电子商务",
							label: "电子商务"
						}, {
							value: "市场营销",
							label: "市场营销"
						}, {
							value: "物业管理",
							label: "物业管理"
						}]
					}, {
						value: "土木工程学院",
						label: "土木工程学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "法律系",
						label: "法律系",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "人工智能学院",
						label: "人工智能学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "外国语与海外教育学院",
						label: "外国语与海外教育学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "设计学院",
						label: "设计学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}],
				}, {
					value: '2021',
					label: '2021',
					children: [{
						value: "人文与传播学院",
						label: "人文与传播学院",
						//['行政管理', '应用心理学', '广播电视编导', '文化产业管理'],
						children: [{
							value: "行政管理",
							label: "行政管理"
						}, {
							value: "应用心理学",
							label: "应用心理学"
						}, {
							value: "广播电视编导",
							label: "广播电视编导"
						}, {
							value: "文化产业管理",
							label: "文化产业管理"
						}]
					}, {
						value: "艺术系",
						label: "艺术系",
						// ['音乐学', '舞蹈学'],
						children: [{
							value: "音乐学",
							label: "音乐学"
						}, {
							value: "舞蹈学",
							label: "舞蹈学"
						}]
					}, {
						value: "商学院",
						label: "商学院",
						// ['金融学', '国际经济与贸易', '会计学', '财务管理', '工商管理', '酒店管理', '电子商务', '市场营销', '物业管理'],
						children: [{
							value: "金融学",
							label: "金融学"
						}, {
							value: "国际经济与贸易",
							label: "国际经济与贸易"
						}, {
							value: "会计学",
							label: "会计学"
						}, {
							value: "财务管理",
							label: "财务管理"
						}, {
							value: "工商管理",
							label: "工商管理"
						}, {
							value: "酒店管理",
							label: "酒店管理"
						}, {
							value: "电子商务",
							label: "电子商务"
						}, {
							value: "市场营销",
							label: "市场营销"
						}, {
							value: "物业管理",
							label: "物业管理"
						}]
					}, {
						value: "土木工程学院",
						label: "土木工程学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "法律系",
						label: "法律系",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "人工智能学院",
						label: "人工智能学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "外国语与海外教育学院",
						label: "外国语与海外教育学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}, {
						value: "设计学院",
						label: "设计学院",
						children: [{
							value: "行政管理",
							label: "行政管理"
						}]
					}],
				}],
				radio: '',
				switchVal: false,
			}
		},
		methods: {
			sign() {

			},
			confirmForm(e) {
				console.log(e[0].value, e[1].value, e[2].value)
				this.form.grade = e[0].value
				this.form.department = e[1].value
				this.form.profession = e[2].value
			},
			navBack() {
				this.$u.route({
					type: "back"
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-image: linear-gradient(45deg, #8765e1, #b171e6);
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-family: "Arial";

		.navBack {
			position: fixed;
			top: 50upx;
			left: 10upx;
		}

		.container {
			width: 100%;
			height: 90%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.header {
				margin-top: 10upx;
				margin-bottom: 50upx;
				font-size: 45upx;
			}

			.card {
				width: 80%;
				height: 90%;
				// background-color: rgb(198, 179, 246);
				background-color: #FFFFFF;
				border-radius: 50upx;
				padding: 0 30upx;
			}

			.footer {
				margin: 10upx 120upx;
				text-align: center;
				letter-spacing: 15upx;
				font-size: 26upx;
			}
		}
	}
</style>
