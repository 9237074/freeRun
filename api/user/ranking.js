import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function ranking(data){
	return new Request({
		url: '/moble/user/ranking',
		method: 'post',
		header: {},
		data: data
	})
}