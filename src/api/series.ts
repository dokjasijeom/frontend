import axiosInstance from './axiosInstance'

interface GetSeriesParams {
  publishDay?: string
  seriesType?: string
}

export const getSeriesList = (params?: GetSeriesParams) => {
  return axiosInstance.get(`/series`, { params })
}

export const getSeries = (id: string) => {
  return axiosInstance.get(`/series/${id}`)
}
