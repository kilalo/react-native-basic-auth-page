import { API_URL } from 'react-native-dotenv'
const axios = require('axios');

export function register (data) {
    const url = API_URL + '/register'
	return axios.post(url, data)
}

export function login (data) {
	const url = API_URL + '/login'
	return axios.post(url, data)
}