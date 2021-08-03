import Vue from 'vue'
import Vuex from 'vuex'
import { loginAPI, registerAPI, getProductListInfoAPI } from '../api/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        username:'' // 当前的登录状态：当前登录的用户名
    },
	mutations: {
		setUser(state, username) {
			console.log(username)
			state.username = username
		}
	},
	actions: {
		async login({commit}, user) {
			const { data } = await loginAPI(user)
			console.log(data)
			if (data.status === 'error') {
				return Promise.reject(data)
			} else {
				commit('setUser', data.username)
				return Promise.resolve(data.jwt)
			}
		},

		async register({ commit }, user){
			var _user = JSON.parse(JSON.stringify(user))
			console.log(_user)
			var username = _user.username
			var phone = _user.phone
			var password = _user.password
			const { data } = await registerAPI({ username, phone, password })
			if (data.status === 'error') {
				return Promise.reject(data.msg)
			} else { // 注册成功
				return Promise.resolve(true)
			}
		},
		
		async getProductListInfo({ commit }) {
			const { data } = await getProductListInfoAPI()
			if (data.status === 'error') {
				return Promise.reject(data.msg)
			} else { // 注册成功
				return Promise.resolve(data.data)
			}
		}
	}
})

export default store