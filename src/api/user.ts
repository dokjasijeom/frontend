// import { getFormData } from '@/utils/dataFormatting'
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

interface RecordSeriesEpisodeParams {
  userRecordSeriesId: number
  providerName: string
  from: number
  to: number
}
interface DeleteRecordEpisodeParams {
  userRecordSeriesId: number
  recordIds: number[]
}

interface UpdateUserProviderParams {
  providers: string[]
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

export const recordSeriesEpisode = (params: RecordSeriesEpisodeParams) => {
  return axiosInstance.post('/user/series/record', params)
}

export const deleteRecordEpisode = (params: DeleteRecordEpisodeParams) => {
  return axiosInstance.delete('/user/series/record', {
    data: params,
  })
}

export const updateUser = (params: FormData) => {
  return axiosInstance.patch('/user', params, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const updateUserProvider = (params: UpdateUserProviderParams) => {
  return axiosInstance.patch('/user/provider', params)
}

export const deleteUserAvatar = () => {
  return axiosInstance.delete('/user/avatar')
}
