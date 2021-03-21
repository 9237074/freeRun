import Request from '../../util/request'
import checkKey from '../../util/checkKey'

export default function login(data){
	return new Request({
		url: '/moble/system/login',
		method: 'post',
		header: {},
		data: data
	})
}