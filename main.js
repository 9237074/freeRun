import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
const crypto = require('crypto');
const appKey = require('./appkey.js');

Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

// 全局变量
Vue.prototype.globalData = {
	"server": "https://ydlp.xysbs.cn",
	// "server":"http://10.255.32.132:4001",
	"token": '',
	"studentId": "",
	"name": "",
	"gender": "",
	"Department": "",
	"profession": "",
	"grade": "",
	"fraction": "",
	"status": "",
	"timestamp": "",
	"update": null,
	"updateUrl": null,
	"todayRun": null,
	"checkTokenCode": null,
	"runTime": null,
	"platform": uni.getSystemInfoSync().platform
}
//checkKey
Vue.prototype.checkKey = function(data) {
	return crypto.createHmac('sha256', appKey.appkey).update(data).digest('hex')
}
// checkToken
Vue.prototype.checkToken = function(res) {
	uni.request({
		url: `${Vue.prototype.globalData.server}/logincheck?token=${Vue.prototype.globalData.token}&timestamp=${Vue.prototype.globalData.timestamp}`,
		success(res) {
			console.log(res)
			if (res.data.msg == '正常') {
				console.log('登陆状态正常');
			} else {
				uni.showModal({
					title: '提示',
					content: "登录状态异常",
					confirmText: "重新登录",
					showCancel: false,
					complete() {
						Vue.prototype.globalData.token = '';
						// 设置缓存
						uni.setStorage({
							key: 'token',
							data: {
								token: ''
							}
						})
						uni.reLaunch({
							url: '../denglu/denglu',
						})
					}
				});
			}
		},
		fail() {
			uni.showToast({
				title: '网络超时',
				duration: 2000,
				icon: 'none'
			});
		}
	})
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
