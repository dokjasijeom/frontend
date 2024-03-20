import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// axiosInstance.defaults.headers.common.Authorization = ''

export default axiosInstance
