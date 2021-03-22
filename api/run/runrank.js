import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function runrank(data){
	return new Request({
		url: '/moble/run/runrank',
		method: 'post',
		header: {},
		data: data
	})
}