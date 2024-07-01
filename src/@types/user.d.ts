import { PlatformType } from './platform'
import { ProviderItem, ProviderNameType, Series, SeriesType } from './series'

export interface User {
  hashId: string
  email: string
  profile: Profile
  likeSeries: Series[]
  likeSeriesCount: number
  recordSeries: RecordSeries[]
  recordSeriesCount: number
  subscribeProvider: ProviderItem[]
}

export interface Profile {
  username: string
  avatar: string
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
  readCompleted: boolean
  recordEpisodeCount: number
  recordEpisodes: RecordEpisode[]
  seriesType: SeriesType
  recordProviders: PlatformType[]
}

export interface RecordEpisode {
  id: number
  episodeNumber: number
  watched: boolean
  providerName: ProviderNameType
}
