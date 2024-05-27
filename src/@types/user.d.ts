import { ProviderNameType, Series, SeriesType } from './series'

export interface User {
  hashId: string
  email: string
  Roles: string | null
  likeSeries: Series[]
  likeSeriesCount: number
  recordSeries: RecordSeries[]
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
  series: Series
  totalEpisode: number
  recordEpisodeCount: number
  recordEpisodes: RecordEmpisode[]
}

export interface RecordEmpisode {
  id: number
  episodeNumber: number
  watched: boolean
  providerName: ProviderNameType
}
