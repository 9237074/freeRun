<template>
	<view>
		<u-tabs class="tabs" :style="{'padding-top': paddingTop + 'px'}" bg-color="#a865cc" active-color="#623684" inactive-color="#ffffff" :list="list" :is-scroll="false"
			:current="swiperIndex" @change="changeType"></u-tabs>
		<swiper :current="swiperIndex" @change="changeType" :duration="0" class="swiper">
			<swiper-item class="swiper-item">
				<u-empty :show="!rundata.length" text="暂时没有运动排行记录" mode="list" margin-top="150" font-size="28"></u-empty>
				<view v-for="(item,index) in rundata" :key='item.uid + index' class="swiper-item-view">
					<u-row gutter="10" justify="between">
						<u-col span="3" text-align="center">
							<u-image width="100upx" height="100upx" src="@/static/logo.png" shape="circle"></u-image>
						</u-col>
						<u-col span="4">
							<text>{{item.studentId}}\n</text>
							<text>已跑步:{{ item.mileage/1000 }}公里</text>
						</u-col>
						<u-col span="3">
							<view v-if="index == 0">
								<u-image width="50upx" height="50upx" src="@/static/no1.svg"></u-image>
							</view>
							<view v-else-if="index == 1">
								<u-image width="50upx" height="50upx" src="@/static/no2.svg"></u-image>
							</view>
							<view v-else-if="index == 2">
								<u-image width="50upx" height="50upx" src="@/static/no3.svg"></u-image>
							</view>
							<view v-else>
								<view>第{{index+1}}名</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</swiper-item>
			<swiper-item  class="swiper-item">
				<u-empty :show="!readdata.length" text="暂时没有阅读排行记录" mode="list" margin-top="150" font-size="28"></u-empty>
				<view v-for="(item,index) in readdata" :key='item.uid' class="swiper-item-view">
					<u-row gutter="10" justify="between">
						<u-col span="3">
							<u-image width="100upx" height="100upx" src="@/static/logo.png" shape="circle"></u-image>
						</u-col>
						<u-col span="4">
							<text>{{item.studentId}}\n</text>
							<text>已晨读:{{item.morningTimes}}</text>
						</u-col>
						<u-col span="3">
							<view v-if="index == 0">
								<u-image width="50upx" height="50upx" src="@/static/no1.svg"></u-image>
							</view>
							<view v-else-if="index == 1">
								<u-image width="50upx" height="50upx" src="@/static/no2.svg"></u-image>
							</view>
							<view v-else-if="index == 2">
								<u-image width="50upx" height="50upx" src="@/static/no3.svg"></u-image>
							</view>
							<view v-else>
								<view>第{{index+1}}名</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</swiper-item>
		</swiper>
		<u-tabbar :list='tabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paddingTop: 48,
				list: [{
					name: '运动'
				}, {
					name: '阅读'
				}],
				swiperIndex: 0,
				rundata: [],
				readdata: []
			}
		},
		onShow() {
			this.$u.api.readrank().then(res => {
				console.log(res)
				this.readdata = res.data
			}).catch(e => {
				console.log(e)
			})
			this.$u.api.runrank().then(res => {
				console.log(res)
				this.rundata = res.data
			})
		},
		methods: {
			changeType(e) {
				console.log(typeof e)
				if (typeof e === 'number') {
					this.swiperIndex = e
				} else {
					this.swiperIndex = e.detail.current
				}
			},
			onclick0() {
				this.status0 = 'status0',
					this.status1 = 'status1'
			},
			onclick1() {
				this.status1 = 'status0',
					this.status0 = 'status1'
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.header {
		color: #FFFFFF;
		background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		position: fixed;
		top: 0;
		.header-item {
			width: 50%;
		}
	}
	.tabs{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 9;
	}
	
	.swiper {
		margin-top: 190upx;
		height: 75vh;
		.swiper-item{
			.swiper-item-view {
				background-color: #f5ecff;
				color: #6d448e;
				margin: 10upx;
				padding: 20upx;
				border-radius: 10upx;
				box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
				.u-col {
					display: flex;
					justify-content: center;
					flex-direction: column;
				}
			}
		}
	}
</style>
