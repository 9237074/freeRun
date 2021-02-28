<template>
	<view class="view">
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot='content'>debug</block>
		</cu-custom>
		<view class="content" v-for="item in logStorage" :key="item.timestamp">
			{{`${new Date(item.timestamp).getHours()}:${new Date(item.timestamp).getMinutes()}:${new Date(item.timestamp).getSeconds()} ${item.latitude}-${item.longitude}-${item.distance}`}}
		</view>
		<button type="default" @click="clearStorage">清空缓存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logStorage: [],
				systemInfo: {}
			}
		},
		onLoad() {
			const logStorage = uni.getStorageSync("logStorage")
			// console.log(logStorage)
			this.logStorage = logStorage
		},
		methods: {
			clearStorage(){
				uni.clearStorageSync('logStorage')
				this.logStorage = []
			}
		}
	}
</script>

<style scoped lang="scss">
	.view{
		height: 100vh;
		display: flex;
		flex-direction: column;
		.content{
			felx:1;
		}
		button{
			position: fixed;
			bottom: 50px;
		}
	}
</style>
