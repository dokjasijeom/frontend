import axiosInstance from './axiosInstance'

interface GetSeriesParams {
  publishDay?: string
  seriesType?: string
}

interface GetNewSeriesParams {
  provider?: string
  seriesType?: string
}

export const getSeriesList = (params?: GetSeriesParams) => {
  return axiosInstance.get(`/series`, { params })
}

export const getNewSeriesList = (params?: GetNewSeriesParams) => {
  return axiosInstance.get(`/series/new`, { params })
}

export const getSeries = (hashId: string) => {
  return axiosInstance.get(`/series/${hashId}`)
}

export const setLikeSeries = (hashId: string) => {
  return axiosInstance.post(`/series/${hashId}/like`)
}

export const deleteLikeSeries = (hashId: string) => {
  return axiosInstance.delete(`/series/${hashId}/like`)
}

export const recordSeries = (hashId: string) => {
  return axiosInstance.post(`/series/${hashId}/record`)
}

export const deleteRecordSeries = (hashId: string) => {
  return axiosInstance.delete(`/series/${hashId}/record`)
}
