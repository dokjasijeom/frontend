import { ProviderNameType, Series, SeriesType } from './series'

export interface User {
  hashId: string
  email: string
  Roles: string | null
  likeSeries: Series[]
  likeSeriesCount: number
  recordSeries: RecordSeries[]
  profile: Profile
}

export interface Profile {
  username: string
  avatar: File
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

export interface RecordSeries {
  id: number
  title?: string
  author?: string
  genre?: string
  series?: Series
  totalEpisode: number
  recordEpisodeCount: number
  recordEpisodes: RecordEpisode[]
  seriesType: SeriesType
}

export interface RecordEpisode {
  id: number
  episodeNumber: number
  watched: boolean
  providerName: ProviderNameType
}
