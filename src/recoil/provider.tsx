import { ProviderItem } from '@/@types/series'
import { atom } from 'recoil'

export const providerState = atom<ProviderItem[]>({
  key: 'providers',
  default: [],
})
