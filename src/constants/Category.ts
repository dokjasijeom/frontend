export interface CategoryItem {
  id: number
  label: string
}

export const CATEGORY = {
  webnovel: [
    { id: 0, label: '전체' },
    { id: 1, label: '로맨스' },
    { id: 2, label: '로맨스 판타지' },
    { id: 3, label: '판타지' },
    { id: 4, label: '현대 판타지' },
    { id: 5, label: '무협' },
    { id: 6, label: '드라마' },
    { id: 7, label: '라이트노벨' },
    { id: 8, label: 'BL' },
    { id: 9, label: '19+ 성인' },
  ],
  webtoon: [
    { id: 10, label: '전체' },
    { id: 11, label: '로맨스' },
    { id: 12, label: '로맨스 판타지' },
    { id: 13, label: '드라마' },
    { id: 14, label: '판타지' },
    { id: 15, label: '액션/무협' },
    { id: 16, label: '공포/추리' },
    { id: 17, label: '스포츠/학원' },
    { id: 18, label: 'BL' },
    { id: 19, label: '19+ 성인' },
  ],
} as { [key: string]: CategoryItem[] }
