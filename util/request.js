import config from "../config"
import store from '../store'
class Request {
	constructor({
		url,
		method,
		header,
		data
	}) {
		console.log(url)
		this.url = config.base_url + url
		this.method = method
		this.header = header
		this.data = data
		this.beforeRequest()
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				method: this.method,
				data: this.data,
				success: (res) => {
					this.afterRequest(res, resolve, reject)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
	success(res) {
		return res
	}
	fail(err) {

	}
	beforeRequest() {
		console.log(store.state.system.token)
		this.header = Object.assign({
			authorization: store.state.system.token
		})
	}
	afterRequest(res, resolve, reject) {
		const statusCode = res.data.statusCode || res.data.errorCode
		switch (statusCode) {
			case 200:
				return res.data;
				break;
			case 50001:
				uni.showModal({
					title: '服务器异常',
					content: res.data.msg,
					showCancel: false,
					success() {
						reject(res.data.msg)
					}
				})
				break;
			default:
				return res.data
		}

	}
}

export default Request
