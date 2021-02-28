<template>
	<view>
		<image class="img" @click="update" src="../../static/update.png" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			update:function(){
				plus.runtime.openURL('https://m3w.cn/ydlp',function(res){
					console.log(res);
				})
			}
		}
	}
</script>

<style>
	.img{
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
