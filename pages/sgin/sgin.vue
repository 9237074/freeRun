<template>
	<view>
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot='backText'>返回</block>
			<block slot='content'>注册</block>
		</cu-custom>
		<!-- 提示prompt -->
		<view class="prompt">温馨提示:请按学生卡上信息填写</view>
		<view class="shuru">
			<!-- 表单 -->
			<form @submit="formSubmit">
				<view class="cu-form-group ">
					<view class="title">学号</view>
					<input type="number" placeholder="请输入学号" v-model="rid"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入密码" v-model="rpw"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input placeholder="请输入姓名" v-model="rname"></input>
				</view>
				<view class="cu-form-group" @click="default1" id='index0'>
					<view class="title">入学年份</view>
					<picker @change="PickerChange0" :value="index0" :range="rgrade">
						<view class="picker">
							{{index0 !== -1?rgrade[index0]:'点击选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" @click="default1" id='index'>
					<view class="title">院系选择</view>
					<picker v-if="index0 !== -1 " @change="PickerChange" :value="index" :range="Department[index0]">
						<view class="picker">
							{{index !== -1 ?Department[index0][index]:'点击选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" @click="default1" id='index1'>
					<view class="title">专业选择</view>
					<picker v-if="index0 !== -1 && index !== -1" @change="PickerChange1" :value="index1" :range="Profession[index0][index]">
						<view class="picker">
							{{index1 !== -1 ? Profession[index0][index][index1]:'点击选择'}}
						</view>
					</picker>
				</view>
				<view class="btn-area" style="text-align: center;margin-top: 20rpx;">
					<button formType="submit" class="cu-btn round lines-olive margin-top" style="width: 80%;">注册</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rid: '',
				rpw: '',
				rtype: '',
				rname: '',
				// rgender:'女',
				rDepartment: '',
				rprofession: '',
				index0: -1,
				index: -1,
				index1: -1,
				rgrade: [2017, 2018, 2019],
				Department: [
					['人文与传播学院', '艺术系', '商学院', '土木工程学院', '法律系', '人工智能学院', '外国语与海外教育学院', '设计学院'],
					['人文与传播学院', '艺术系', '商学院', '土木工程学院', '法律系', '人工智能学院', '外国语与海外教育学院', '设计学院'],
					['设计学院', '商学院', '外国语与海外教育学院', '学前教育学院', '艺术系', '法律系', '人文与传播学院', '土木工程学院', '人工智能学院', '继续教育学院']
				],
				Profession: [
					[
						['行政管理', '应用心理学', '广播电视编导', '文化产业管理'],
						['音乐学', '舞蹈学'],
						['金融学', '国际经济与贸易', '会计学', '财务管理', '工商管理', '酒店管理', '电子商务', '市场营销'],
						['工程管理', '道路桥梁与渡河工程', '土木工程', '建筑电气与智能化'],
						['法学'],
						['电子信息工程', '通信工程', '物联网工程', '教改试点班', '软件工程', '网络工程', '计算机科学与技术'],
						['商务英语', '日语'],
						['广告学', '美术学', '数字媒体技术']
					],
					[
						['行政管理', '应用心理学', '广播电视编导', '文化产业管理'],
						['音乐学', '舞蹈学'],
						['金融学', '国际经济与贸易', '会计学', '财务管理', '工商管理', '酒店管理', '电子商务', '市场营销', '物业管理'],
						['工程管理', '道路桥梁与渡河工程', '土木工程', '建筑电气与智能化'],
						['法学'],
						['数据科学与大数据技术', '电子信息工程', '通信工程', '物联网工程', '软件工程', '网络工程', '计算机科学与技术', '（试点班）电子信息工程', '（试点班）通信工程', '（试点班）物联网工程'],
						['商务英语', '日语'],
						['广告学', '美术学', '数字媒体技术']
					],
					[
						['广告学', '美术学', '数字媒体技术', '广告学（专升本）'],
						['电子商务', '酒店管理', '金融学类（含金融学、国际经济与贸易）', '工商管理类（含财务管理、会计学）', '工商管理类（含工商管理、市场营销、物业管理）'],
						['商务英语', '日语'],
						['学前教育'],
						['音乐学', '舞蹈学'],
						['法学'],
						['行政管理', '应用心理学', '文化产业管理', '广播电视编导'],
						['工程管理', '建筑电气与智能化', '土木类（含土木工程、道路桥梁与渡河工程）', '土木工程（专升本）', ],
						['数据科学与大数据技术', '电子信息类', '计算机科学与技术', '通信工程', '软件工程', '计算机类', '机器人工程'],
						['软件工程（自考）', '电子商务（自考）', '工程管理（自考）', '广告学（自考）', '金融学（自考）']
					]
				]
			}
		},
		methods: {
			default1(e) {
				console.log(e.currentTarget.id);
				let id = e.currentTarget.id;
				if (id == 'index0' && this.index0 == -1) {
					this.index0 = 0;
				} else if (id == 'index' && this.index == -1) {
					this.index = 0;
				} else if (id == 'index1' && this.index1 == -1) {
					this.index1 = 0;
				}
			},
			PickerChange0(e) {
				this.index0 = e.detail.value;
				this.index = -1;
				this.index1 = -1;
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.index1 = -1;
			},
			PickerChange1(e) {
				this.index1 = e.detail.value;
			},
			formSubmit: function(e) {
				let that = this;
				if (this.rid != '' || this.rpw != '' || this.rname != '' || this.index0 != -1 || this.index != -1 || this.index1 !=
					-1 || this.rpw.length >= 8) {
					uni.request({
						url: that.globalData.server + '/sign',
						data: {
							rid: this.rid,
							rpw: this.rpw,
							rname: this.rname,
							// rgender:this.rgender,
							rDepartment: this.Department[this.index0][this.index],
							rprofession: this.Profession[this.index0][this.index][this.index1],
							rgrade: this.rgrade[this.index0]
						},
						success(res) {
							console.log(res.data)
							if (res.data.msg == "注册成功") {
								uni.showToast({
									title: '注册成功',
									icon: 'success',
									duration: 1500
								})
								uni.redirectTo({
									url: '../denglu/denglu'
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'loading',
									duration: 2000
								})
							}
						},
						fail() {
							uni.showToast({
								title: '网络超时',
								icon: 'loading',
								duration: 2000
							})
						}
					})
				} else {
					uni.showToast({
						title: '账号或密码不能为空',
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style>
	.inp {
		box-shadow: 0 0 20rpx #C8C7CC;
		margin: 0 auto;
		width: 80%;
		height: 80rpx;
		border-radius: 50rpx;
		margin-top: 30rpx;
		border: 1rpx #C8C7CC solid;
		color: #FFFFFF;
	}

	.sigin {
		text-align: center;
		margin-top: 20%;
		font-size: 30rpx;
	}

	.inpt {
		margin-left: 40rpx;
		margin-top: 15rpx;
		font-size: 35rpx;
		color: #333333;
	}

	.prompt {
		text-align: center;
		height: 50upx;
		line-height: 50upx;
		color: white;
		background-color: #E6A23C;
	}
</style>
