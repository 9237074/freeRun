import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function runcheck(data){
	return new Request({
		url: '/moble/run/runcheck',
		method: 'post',
		header: {},
		data: data
	})
}