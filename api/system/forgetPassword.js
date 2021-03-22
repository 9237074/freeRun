import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function forgetPassword(data){
	return new Request({
		url: '/moble/system/forgetPassword',
		method: 'post',
		header: {},
		data: data
	})
}