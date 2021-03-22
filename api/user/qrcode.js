import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function qrcode(data){
	return new Request({
		url: '/moble/user/qrcode',
		method: 'post',
		header: {},
		data: data
	})
}