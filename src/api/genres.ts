import axiosInstance from './axiosInstance'

interface GetGenresParams {
  seriesType: string
}

export const getGenres = (params: GetGenresParams) => {
  return axiosInstance.get('/genres', { params })
}
