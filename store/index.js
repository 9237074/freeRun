  
import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system'
import run from './modules/run'
import read from './modules/read'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system,
    user,
	run,
	read
  }
})