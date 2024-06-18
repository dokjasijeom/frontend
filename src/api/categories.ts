import axiosInstance from './axiosInstance'

export interface GetCategoriesParams {
  seriesType?: string
  genre?: string
  providers?: string
  page: number
  pageSize: number
}

export const getCategories = (params?: GetCategoriesParams) => {
  return axiosInstance.get('/categories', { params })
}
