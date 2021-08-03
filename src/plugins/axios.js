import axios from "axios"

//11111111111
axios.defaults.baseURL = 'http://127.0.0.1:5000'

class Axios {
	request(config) {
		const instance = axios.create({
			BaseURI: this.BaseURI
		})
		instance.interceptors.request.use((config) => {
			const token = localStorage.getItem('token')
			console.log("token")
			console.log(token)
			console.log(config)
			if (typeof(token) != "undefined" && token) {
				config.headers.Authentication = "Basic " + token
			}
			return config
		}, err => Promise.reject(err))
		console.log(instance(config))
		return instance(config)
	}
}

export default new Axios()