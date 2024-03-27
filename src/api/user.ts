import axiosInstance from './axiosInstance'

interface SetUserParams {
  email: string
  password: string
  compare_password: string
}

export const setUser = (params: SetUserParams) => {
  return axiosInstance.post('/users', params, {
    headers: { 'Content-Type': `application/json` },
  })
}
