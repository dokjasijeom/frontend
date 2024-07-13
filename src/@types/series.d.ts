import { WEBTOON, WEBNOVEL } from '../constants/Series'

export type SeriesType = WEBNOVEL | WEBTOON

export type GenreType = 'webnovel' | 'common'

export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export type DisplayDay = '월' | '화' | '수' | '목' | '금' | '토' | '일'

export type ProviderNameType = 'series' | 'kakao-page' | 'ridi' | 'lezhin'

export interface Series {
  hashId: string
  authors: Author[]
  title: string
  description: string
  displayTags: string
  ecn: string
  isComplete: boolean
  isbn: string
  providers: Provider[]
  seriesType: SeriesType
  thumbnail: string
  totalEpisode: number
  episodes: Episode[]
  genres: Genre[]
  publishDays: PublishDay[]
  publishers: Publisher[]
  likeCount: number
}

export interface Author {
  id: number
  hashId: string
  name: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
}

export interface Episode {
  id: number
  episodeNumber: number
}

export interface Genre {
  hashId: string
  genreType: GenreType
  name: string
}

export interface PublishDay {
  id: number
  day: Day
  displayDay: DisplayDay
  displayOrder: number
}

export interface Publisher {
  id?: number
  hashId: string
  name: string
  description: string
  series: null | string
  homepageUrl: string
}

export interface Provider {
  id: number
  hashId: string
  description: string
  displayName: string
  homepageUrl: string
  link: string
  name: ProviderNameType
}

export interface ProviderItem {
  hashId: string
  displayName: string
  name: ProviderNameType
}
