import crypto from 'crypto'
import {appkey} from '../config'
const checkKey = data => {
	return crypto.createHmac('sha256', appkey).update(String(data)).digest('hex')
}

export default checkKey
