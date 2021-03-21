import Vue from 'vue'
import App from './App'
import store from './store'
import cuCustom from './colorui/components/cu-custom.vue'
const crypto = require('crypto');

Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

//checkKey
Vue.prototype.checkKey = function(data) {
	return crypto.createHmac('sha256', appKey.appkey).update(data).digest('hex')
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
