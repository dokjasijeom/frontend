export type BookType = 'webNovel' | 'webToon'

export type PlatformType = 'naver' | 'kakao' | 'ridi'

export interface Book {
  id: string
  type: BookType
  genre: string
  image: string
  title: string
  author: string
  score: number
  platforms: PlatformType[]
}

export interface MyBook {
  id: string
  title: string
  image: string
  author: string
  genre: string
  platforms: PlatformType[]
  total: number
  current: number
  score: number
  episodes: Episode[]
  isDirect: boolean
}

export interface Episode {
  ep: number
  platform: string
}
