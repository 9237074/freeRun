import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function sign(data){
	return new Request({
		url: '/moble/system/sign',
		method: 'post',
		header: {},
		data: data
	})
}