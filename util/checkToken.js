module.exports = function checkToken(){
	uni.request({
		url:`${getApp().globalData.server}/logincheck?token=${getApp().globalData.token}&timestamp=${getApp().globalData.timestamp}`,
		success(res){
			// console.log('timestamp:',getApp().globalData.timestamp);
			if(res.data.msg == '正常'){
				console.log(res.data.msg);
				getApp().globalData.checkTokenCode = 200;
			}else{
				clearInterval(that.check1)
				console.log('定时器被清除了')
				getApp().globalData.checkTokenCode = 502;
				uni.showModal({
					title:'提示',
					content:res.data.msg,
					showCancel:false,
					complete() {
						getApp().globalData.token = '';
						// 设置缓存
						uni.setStorage({
							key:'token',
							data:{
								token : ''
							}
						})
						uni.reLaunch({
							url:'../denglu/denglu',
						})
					}
				});
			}
		},
		fail() {
			uni.showToast({
				title:'网络超时',
				duration:2000,
				icon:'none'
			});
		}
	});
}