import { Genre } from '@/@types/series'
import { TabItem } from '@/components/common/Tab/Tab'

export const SERIES_TYPE_TAB_LIST = [
  { displayName: '웹소설', name: 'webnovel' },
  { displayName: '웹툰', name: 'webtoon' },
] as TabItem[]

export const WEEK_TAB_LIST = [
  { displayName: '월', name: 'MON' },
  { displayName: '화', name: 'TUE' },
  { displayName: '수', name: 'WED' },
  { displayName: '목', name: 'THU' },
  { displayName: '금', name: 'FRI' },
  { displayName: '토', name: 'SAT' },
  { displayName: '일', name: 'SUN' },
] as TabItem[]

export const SORT_TAB_LIST = [
  { displayName: '인기순', name: 'popular' },
  { displayName: '찜 많은 순', name: 'like' },
  { displayName: '독자픽 순', name: 'pick' },
] as TabItem[]

export const DEFAULT_GENRE_ITEM = {
  hashId: 'all',
  name: '전체',
  genreType: 'common',
} as Genre
