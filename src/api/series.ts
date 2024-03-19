import axiosInstance from './axiosInstance'

interface GetSeriesParams {
  publishDay?: string
  seriesType?: string
}

export const getSeries = (params?: GetSeriesParams) => {
  return axiosInstance.get(`/series`, { params })
}
