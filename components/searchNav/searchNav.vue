<template>
	<view>
		<view class="searchNav" :style="{'padding-top': paddingTop + 'px'}">
			<view>
				<input type="text" v-model="searchValue" @input="handleSearch" placeholder="I want to find ..." />
				<u-icon  name="search" color="#ffffff" size="44" @click="search"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "searchNav",
		data() {
			return {
				paddingTop: 48,
				searchValue: ''
			};
		},
		methods:{
			handleSearch(e){
				this.$emit('search', this.searchValue)
			},
			search(e){
				this.$emit('search', this.searchValue)
			}
		}
	}
</script>

<style scoped lang="scss">
	.searchNav {
		background-image: linear-gradient(45deg, #6d448e, #efb8dd);
		view{
			margin: 0 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 10upx;
			input{
				background-color: #FFFFFF;
				border-radius: 50upx;
				text-align: center;
				width: 80%;
				height: 60upx;
				padding: 10upx 30upx;
			}
		}
	}
</style>
