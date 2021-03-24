const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		// baseUrl: 'http://localhost:4000',
		baseUrl: 'http://192.168.2.108:4000',
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		header: {
			// 'authorization': vm.$u
		}
		// ......
	});
	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// ......
		config.header.authorization = vm.userInfo.token;
		if(config.url == '/moble/system/sign') config.header.noToken = true;
		if(config.url == '/moble/system/login') config.header.noToken = true;
		if(config.url == '/moble/system/forgetPassword') config.header.noToken = true;
		return config;
	};
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log(res)
		const code = res.code || res.errorCode
		console.log({code})
		switch(code){
			case 200:
				return res.data
				break;
			case 20001:
				return false
				break;
			case 40002:
				return false
				break;
			case 50001:
				return res.data.msg;
				break;
			default:
				return res.data
		}
		// if (res.code == 200) {
		// 	// res为服务端返回值，可能有code，result等字段
		// 	// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
		// 	// 如果配置了originalData为true，请留意这里的返回值
		// 	return res.data;
		// } else if (res.code == 201) {
		// 	// 假设201为token失效，这里跳转登录
		// 	// vm.$u.toast('验证失败，请重新登录');
		// 	// setTimeout(() => {
		// 	// 	// 此为uView的方法，详见路由相关文档
		// 	// 	vm.$u.route('/pages/user/login')
		// 	// }, 1500)
		// 	// return false;
		// } else if (code){
			
		// }else {
		// 	// 如果返回false，则会调用Promise的reject回调，
		// 	// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
		// 	return false;
		// }
	}
}

export default {
	install
}
