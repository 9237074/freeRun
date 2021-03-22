import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function readrank(data){
	return new Request({
		url: '/moble/read/readrank',
		method: 'post',
		header: {},
		data: data
	})
}