import axios, { InternalAxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    const token = getCookie('DS_AUT')

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error): any => {
    return Promise.reject(error)
  },
)

export default axiosInstance
