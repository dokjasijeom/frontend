export interface Book {
  genre: string
  image: string
  title: string
  author: string
  score: number
  platforms: string[]
}

export interface MyBook {
  id: string
  title: string
  image: string
  author: string
  genre: string
  platforms: string[]
  total: number
  current: number
  score: number
  episodes: Episode[]
}

export interface Episode {
  ep: number
  platform: string
}
