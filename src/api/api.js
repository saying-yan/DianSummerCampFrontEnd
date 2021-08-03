import axios from "../plugins/axios.js"

export const loginAPI = ({username, password}) => axios.request({
	url: '/auth/login',
	method: 'POST',
	data: {username, password}
})

export const registerAPI = ({ username, phone, password }) => axios.request({
  url: '/auth/register',
  method: 'POST',
  data: { username, phone, password }
})

export const getProductListInfoAPI = () => axios.request({
	url: '/order/getProductListInfo',
	method: 'GET'
})