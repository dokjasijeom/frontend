import axiosInstance from './axiosInstance'

interface SetUserParams {
  email: string
  password: string
  compare_password: string
}

interface LoginParams {
  email: string
  password: string
}

export const setUser = (params: SetUserParams) => {
  return axiosInstance.post('/users', params)
}

export const login = (params: LoginParams) => {
  return axiosInstance.post('/user/auth', params)
}

export const getUser = () => {
  return axiosInstance.get('/user')
}

export const getMySeries = (id: string) => {
  return axiosInstance.get(`/user/series/${id}`)
}
