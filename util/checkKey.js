const crypto = require('crypto');
const appKey = require('../appKey.js');
var fn_checkKey = async(data)=>{
    return crypto.createHmac('sha256',appKey.appkey).update(data).digest('hex')
}

module.exports = fn_checkKey