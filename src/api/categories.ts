import { CategoriesSort } from '@/@types/categories'
import axiosInstance from './axiosInstance'

export interface GetCategoriesParams {
  seriesType: string
  genre?: string
  providers?: string[]
  sort: CategoriesSort
  page: number
  pageSize: number
}

export const getCategories = (params?: GetCategoriesParams) => {
  return axiosInstance.get('/categories', { params })
}
