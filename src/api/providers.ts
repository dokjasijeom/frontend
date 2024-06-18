import axiosInstance from './axiosInstance'

export const getProviders = () => {
  return axiosInstance.get('/providers')
}
