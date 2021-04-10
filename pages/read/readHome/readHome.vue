<template>
	<view>
		<!-- 导航栏 -->
		<searchNav @search="searchTheme"></searchNav>
		<!-- 模态框 -->
		<u-modal v-model="checkModel.show" :content="checkModel.content"></u-modal>
		<!-- 列表渲染阅读主题 -->
		<u-empty :show="!readThemes.length" text="暂时没有阅读主题" mode="list" margin-top="200"></u-empty>
		<view class="card" v-for="(item,index) in readThemes" :key="index">
			<view class="card-header">
				<view class="mark">
					<u-icon name="bookmark" size="60"></u-icon>
				</view>
				<view class="theme">
					{{item.theme}}
				</view>
				<view class="button" :data-readid="item.readId" @click="checkScan">
					<u-icon name="scan" margin-left="50" margin-right="10"></u-icon>
					<view>签到</view>
				</view>
			</view>
			<view class="card-body">
				<view class="card-body-item">
					<view class="mark"></view>
					时间:{{item.readTime}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					地点:{{item.readSite}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					日期:{{item.readDate}}
				</view>
				<view class="card-body-item">
					<view class="mark"></view>
					负责人:{{item.people}}
				</view>
			</view>
		</view>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "123",
				msg: [],
				checkout: false,
				readThemes: [],
				tempReadThemes: [],
				currentIndex: 0,
				checkModel: {
					show: false,
					content: ''
				}
			}
		},
		onShow() {
			this.getReadTheme()
		},
		methods: {
			getReadTheme() {
				this.$u.api.readpage().then(res => {
					console.log(res)
					this.readThemes= res.data
				})
			},
			searchTheme(e) {
				console.log('e:', e)
				if(e === ''){
					this.getReadTheme()
					return
				}
				this.readThemes = this.readThemes.filter(item => item.theme === e)
			},
			checkScan(e) {
				//开始修改
				// 第一步:获取签到开始时间,结束时间
				//第二步:获取签到日期
				//第三步:判断开始时间,四位数字。结束时间相同
				//第四步:判断签到日期
				uni.scanCode({
					onlyFromCamera: true,
					scanType: ['qrCode'],
					success:(res)=>{
						console.log("res:", res)
						const result = JSON.parse(res.result)
						this.handleCheck(result, e.currentTarget.dataset.readid)
					},
					fail: (err) => {
						console.log("err:", err)
					}
				})
			},
			handleCheck(result, readId) {
				if(result.readId !== readId){
					this.checkModel = {
						show: true,
						content: "签到码与当前主题不符合"
					}
					return
				}
				const str = `${result.readTime} + ${result.readSite} + ${result.theme} + ${result.people} + ${result.readDate}`
				const key = this.checkKey(str)
				this.$u.api.readcheck({
					readTime: result.readTime ,
					readSite: result.readSite ,
					theme: result.theme ,
					peopleId: result.people ,
					readDate: result.readDate ,
					key: key,
				}).then(res => {
					this.checkModel = {
						show: true,
						content: "签到成功"
					}
				}).catch(e => {
					this.checkModel = {
						show: true,
						content: e.msg
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.card {
		margin: 10upx 20upx;
		color: #FFFFFF;

		.card-header {
			background-image: linear-gradient(45deg, #6d448e, #efb8dd);
			border-radius: 20upx;
			display: flex;
			box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.12);
			height: 100upx;
			position: relative;
			top: 10upx;
			align-items: center;
			text-align: center;
			padding: 10upx 20upx;

			.mark {
				flex: 1;
			}

			.theme {
				flex: 3;
			}

			.button {
				flex: 2;
				display: flex;
				justify-content: center;
			}

		}

		.card-body {
			background-color: #f7f0fe;
			height: 200upx;
			border-radius: 0 0 20upx 20upx;
			box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.12);
			padding: 30upx 20upx 20upx 20upx;
			overflow: hidden;

			.card-body-item {
				display: inline-block;
				color: #6d448e;
				width: 50%;
				height: 50%;
				overflow: hidden;

				.mark {
					width: 10upx;
					height: 20upx;
					background-image: linear-gradient(45deg, #6d448e, #efb8dd);
					display: inline-block;
					margin-right: 10upx;
					border-radius: 20upx;
				}
			}
		}
	}
</style>
