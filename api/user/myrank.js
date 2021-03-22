import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function myrank(data){
	return new Request({
		url: '/moble/user/myrank',
		method: 'post',
		header: {},
		data: data
	})
}