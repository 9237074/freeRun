<template>
	<view>
		<image :src="url" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			}
		},
		onLoad(e) {
			console.log(e.url)
			this.url = e.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
