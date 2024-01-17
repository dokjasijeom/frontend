import { MyBook } from '@/@types/book'

export const MockBook = {
  webToon: [],
  webNovel: [
    {
      id: '0',
      title: '전지적 독자 시점',
      image: '/images/profile.png',
      author: '싱숑',
      genre: '판타지',
      platforms: ['naver', 'kakao', 'ridi'],
      total: 790,
      current: 519,
      score: 9872,
    },
    {
      id: '1',
      title: '나 혼자만 레벨업',
      image: '/images/test.png',
      author: '추공',
      genre: '판타지',
      platforms: ['naver', 'kakao', 'ridi'],
      total: 271,
      current: 200,
      score: 4504,
    },
    {
      id: '2',
      title: '피오니-살인귀 대공과의 미래를 보았다',
      image: '/images/profile.png',
      author: '은려원',
      genre: '로판',
      platforms: ['kakao'],
      total: 223,
      current: 98,
      score: 3092,
    },
  ] as MyBook[],
}
