import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function readcheck(data){
	return new Request({
		url: '/moble/read/readcheck',
		method: 'post',
		header: {},
		data: data
	})
}