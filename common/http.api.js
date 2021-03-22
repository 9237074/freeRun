
let system = '/moble/system',
	user = '/moble/user',
	read = '/moble/read',
	run = '/moble/run'
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
	// 	id: 2
	// });
	
	// 此处使用了传入的params参数，一切自定义即可
	// let getInfo = (params = {}) => vm.$u.post(indexUrl, params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {getSearch, getInfo};
	// system
	let sign = (params = {}) => vm.$u.post(system + '/sign', params)
	let login = (params = {}) => vm.$u.post(system + '/login', params)
	let forgetPassword = (params = {}) => vm.$u.post(system + '/forgetPassword', params)
	// user
	let myrank = (params = {}) => vm.$u.post(user + '/myrank', params)
	let qrcode = (params = {}) => vm.$u.post(user + '/qrcode', params)
	let ranking = (params = {}) => vm.$u.post(user + '/ranking', params)
	// read
	let readcheck = (params = {}) => vm.$u.post(read + '/readcheck', params)
	let readrank = (params = {}) => vm.$u.post(read + '/readrank', params)
	let readrecord = (params = {}) => vm.$u.post(read + '/readrecord', params)
	// run
	let runcheck = (params = {}) => vm.$u.post(run + '/runcheck', params)
	let runrank = (params = {}) => vm.$u.post(run + '/runrank', params)
	let runrecord = (params = {}) => vm.$u.post(run + '/runrecord', params)
	vm.$u.api = {
		// system
		login,
		sign,
		forgetPassword,
		// user
		myrank,
		qrcode,
		ranking,
		// read
		readcheck,
		readrank,
		readrecord,
		// run
		runcheck,
		runrank,
		runrecord
	}
}

export default {
	install
}