<template>
	<view>
		<cu-custom bgColor="bg-gradual-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot='content'>常见问题</block>
		</cu-custom>
		
		<view class="title" style="width: 500upx;margin-top: 50upx;text-align: center;font-size: 50upx;">
			<text>
				务必开启以下权限
			</text>
		</view>
		<view class="conten1" style="width: 500upx;margin-top: 25upx;margin-left: 70upx;">
			<text>
				有问题联系邮箱 : <text style="color: #F43F3B;">i@xysbs.cn</text>
			</text>
		</view>
		<view class="" style="border-radius: 20%;width: 90vw;">
			<view class="title" style="margin-top: 20upx;">
				环境要求
			</view>
			<view class="content1">
				<text style="color: #666;">
					请务必在露天场地使用
				</text>
			</view>
			<view class="title" style="margin-top: 20upx;">
				安卓系统特别注意
			</view>
			<view class="content1">
				<text style="color: #666;">
					请将应用加入白名单或者允许应用后台运行，否则将导致成绩无效。
				</text>
				<image src="../../static/huawei1.png"></image>
			</view>
			<view class="title" style="margin-top: 20upx;">
				网络权限
			</view>
			<view class="content1">
				<text style="color: #666;">
					请选择使用App时允许，选择其他选项，会导致无法获取位置信息导致成绩无效
				</text>
				<image src="../../static/gps1.png"></image>
			</view>
			<view class="title" style="margin-top: 20upx;">
				位置信息权限
			</view>
			<view class="content1">
				<text style="color: #666;">
					请选择使用App时允许，选择其他选项，会导致无法获取位置信息导致成绩无效
				</text>
				<image src="../../static/gps1.png"></image>
				<text style="color: #666;">
					请选择使用App时允许，选择其他选项，会导致无法获取位置信息导致成绩无效
				</text>
				<image src="../../static/gps2.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				man:{},
				woman:{}
			}
		},
		methods: {
			onLoad:function(){
				
			}
		}
	}
</script>

<style>
	.title{
		border-radius: 25px;
		background-color: #0AAC61;
		color: #FFFFFF;
		width: 300upx;
		text-align: center;
		margin-left: 50upx;
	}
	.content1{
		width: 85vw;
		margin-left: 70upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
</style>
