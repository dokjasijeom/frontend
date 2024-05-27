import { Series, SeriesType } from './series'

export interface User {
  hashId: string
  email: string
  Roles: string | null
  likeSeries: Series[]
  likeSeriesCount: number
  recordSeries: Series[]
}

export interface LikeSeries {
  hashId: string
  isComplete: boolean
  likeCount: number
  seriesType: SeriesType
  thumbnail: string
  title: string
  totalEpisode: number
}
