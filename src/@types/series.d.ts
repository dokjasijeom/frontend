export type SeriesType = 'webnovel' | 'webtoon'

export type GenreType = 'webnovel'

export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export type DisplayDay = '월' | '화' | '수' | '목' | '금' | '토' | '일'

export interface Series {
  hashId: string
  authors: Author[]
  title: string
  description: string
  displayTags: string
  ecn: string
  isComplete: boolean
  isbn: string
  providers: Array
  publisherId: number
  seriesType: SeriesType
  thumbnail: string
  totalEpisode: number
  episodes: Episode[]
  genres: Genre[]
  publishDays: PublishDay[]
  publisher: Publisher
}

export interface Author {
  id: number
  hashId: string
  name: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
}

export interface Episode {
  id: number
  episodeNumber: number
}

export interface Genre {
  id: number
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
  hashId: string
  name: string
  description: string
  series: null | string
  homepageUrl: string
}
