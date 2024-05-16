import { TabItem } from '@/components/common/Tab/Tab'

export const SERIES_TYPE_TAB_LIST = [
  { label: '웹소설', value: 'webnovel' },
  { label: '웹툰', value: 'webtoon' },
] as TabItem[]

export const PROVIDER_TAB_LIST = [
  { label: '네이버시리즈', value: 'series' },
  { label: '카카오페이지', value: 'kakao-page' },
  { label: '리디북스', value: 'ridi' },
] as TabItem[]

export const WEEK_TAB_LIST = [
  { label: '월', value: 'MON' },
  { label: '화', value: 'TUE' },
  { label: '수', value: 'WED' },
  { label: '목', value: 'THU' },
  { label: '금', value: 'FRI' },
  { label: '토', value: 'SAT' },
  { label: '일', value: 'SUN' },
] as TabItem[]

export const SORT_TAB_LIST = [
  { label: '인기순', value: 'popular' },
  { label: '찜 많은 순', value: 'heart' },
  { label: '독자픽 순', value: 'dokjapick' },
]
