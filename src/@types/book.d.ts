import { Platform } from './platform'

export type BookType = 'webNovel' | 'webToon'

export interface Book {
  id: string
  type: BookType
  genre: string
  image: string
  title: string
  author: string
  score: number
  platforms: Platform[]
  total: number
  status: BookStatus
  publisher: string
  tags: string[]
  synopsis: string
}

export interface MyBook {
  id: string
  title: string
  image: string
  author: string
  genre: string
  platforms: Platform[]
  total: number
  current: number
  score: number
  status: BookStatus
  episodes: Episode[]
  isDirect: boolean
}

export type BookStatusType = 'in series' | 'complete'

export interface BookStatus {
  label: string
  value: BookStatusType
}

export interface Episode {
  ep: number
  platform: Platform
}
