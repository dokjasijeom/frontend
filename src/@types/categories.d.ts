import { Series } from './series'

export type CategoriesSort = 'popular' | 'like' | 'pick'

export interface Categories {
  pagination: Pagination
  series: Series[]
}

export interface Pagination {
  currentPage: number
  hasNext: boolean
  pageSize: number
  totalCount: number
  totalPage: number
}
