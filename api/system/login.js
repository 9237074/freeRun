import Request from '@/util/request'
import checkKey from '@/util/checkKey'

export default function login(data){
	data.pdToken = checkKey(data.studentId + data.password)
	delete data.password
	return new Request({
		url: '/moble/system/login',
		method: 'post',
		header: {},
		data: data
	})
}