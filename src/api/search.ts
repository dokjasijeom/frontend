import axiosInstance from './axiosInstance'

export const getSearchAutoComplete = (query: string) => {
  return axiosInstance.get(`/search/autocomplete?query=${query}`)
}

export const getSearchList = (query: string) => {
  return axiosInstance.get(`/search?query=${query}`)
}
