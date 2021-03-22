import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function readrecord(data){
	return new Request({
		url: '/moble/read/readrecord',
		method: 'post',
		header: {},
		data: data
	})
}