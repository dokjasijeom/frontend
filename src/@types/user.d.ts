import { SeriesType } from './series'

export interface User {
  hashId: string
  email: string
  Roles: string | null
  likeSeries: LikeSeries[]
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
