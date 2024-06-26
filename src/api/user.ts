// import { getFormData } from '@/utils/dataFormatting'
import { SeriesType } from '@/@types/series'
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

interface ForgetUserParams {
  email: string
}

interface UpdateReadCompleteParams {
  id: string
  readCompleted: boolean
}

interface UpdateNonExistRecordSeries {
  id: number
  title: string
  author: string
  genre: string
  seriesType: SeriesType
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

export const forgotUser = (params: ForgetUserParams) => {
  return axiosInstance.post('/user/forgot', params)
}

export const updateReadCompleted = (params: UpdateReadCompleteParams) => {
  const { id, readCompleted } = params
  return axiosInstance.patch(`/user/series/record/${id}`, {
    readCompleted,
  })
}

export const updateNonExistRecordSeries = (
  params: UpdateNonExistRecordSeries,
) => {
  const { id, title, author, genre, seriesType } = params
  return axiosInstance.patch(`/user/series/record/${id}`, {
    title,
    author,
    genre,
    seriesType,
  })
}

export const deleteUser = () => {
  return axiosInstance.delete('/user')
}
