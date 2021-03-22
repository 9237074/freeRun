import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function runrecord(data){
	return new Request({
		url: '/moble/run/runrecord',
		method: 'post',
		header: {},
		data: data
	})
}