import Vue from 'vue'
import uView from "uview-ui";
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'

const crypto = require('crypto');

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
Vue.use(uView);
import store from '@/store'
import config from '@/config'

Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

//checkKey
Vue.prototype.checkKey = function(data) {
	return crypto.createHmac('sha256', config.appkey).update(data).digest('hex')
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)
app.$mount()
