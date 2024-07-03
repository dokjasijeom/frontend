import { IParams } from '@/@types/interface'
import { Provider, Series } from '@/@types/series'
import { User } from '@/@types/user'
import {
  deleteLikeSeries,
  getSeries,
  recordSeries,
  setLikeSeries,
} from '@/api/series'
import { getUser } from '@/api/user'
import Button from '@/components/common/Button/Button'
import Icons from '@/components/common/Icons/Icons'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import useModal from '@/hooks/useModal'
import useToast from '@/hooks/useToast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'

const SeriesDetailContainer = styled.div`
  padding-top: 56px;
`

const SkeletonWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-shrink: 0;
  .skeleton_thumbnail_wrapper {
    width: 140px;
    height: 200px;
    flex-shrink: 0;

    @media (max-width: 400px) {
      width: 116px;
      height: 166px;
    }
  }
  .skeleton_item_wrapper {
    width: 100%;
  }
`
const SeriesDetailWrapper = styled.div``

const SeriesInfoWrapper = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  gap: 18px;
  @media (max-width: 400px) {
    padding: 20px 20px 78px;
    gap: 12px;
  }

  .thumbnail_wrapper {
    display: flex;
    flex-shrink: 0;
    width: 140px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    img {
      border-radius: 12px;
      width: 100%;
      height: auto !important;
      position: relative !important;
      object-fit: cover;
    }

    @media (max-width: 400px) {
      width: 116px;
      height: 166px;
    }
  }

  .series_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .series_info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .title {
        ${({ theme }) => theme.typography.head1};
        color: ${({ theme }) => theme.color.gray[950]};
        margin-bottom: 8px;
      }
      .sub {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};

        .divider {
          width: 1px;
          height: 12px;
          background: ${({ theme }) => theme.color.gray[600]};
          margin-left: 8px;
        }

        .caption {
          margin-left: 8px;
          ${({ theme }) => theme.typography.body3};
          color: ${({ theme }) => theme.color.gray[950]};
        }
      }
      .tags {
        display: flex;
        align-items: center;
        ${({ theme }) => theme.typography.body1};
        color: ${({ theme }) => theme.color.gray[950]};
        gap: 8px;
      }
      .score {
        display: flex;
        align-items: center;
        gap: 4px;
        ${({ theme }) => theme.typography.body2};
        color: ${({ theme }) => theme.color.main[600]};
      }
    }

    .action_button_wrapper {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;

      @media (max-width: 400px) {
        width: calc(100% - 40px);
        position: absolute;
        bottom: 20px;
        left: 20px;
      }

      .like_button {
        min-width: 77px;
      }
      .button_body {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: 4px;
      }
    }
  }
`

const SeriesDetailBodyWrapper = styled.div``

const SectionTitle = styled.div`
  padding: 16px 20px 12px;
  ${({ theme }) => theme.typography.head2};
  color: ${({ theme }) => theme.color.gray[950]};
`

const SynopsisWrapper = styled.div`
  padding: 14px 20px;
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
  margin: 4px 20px 32px 20px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
  white-space: pre-wrap;
`

const PlarformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 20px 32px 20px;
`

const PlatformItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 20px;
  background: ${({ theme }) => theme.color.gray[50]};
  border-radius: 12px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[950]};
  cursor: pointer;
`

function SeriesDetail({
  hashId,
  isLogin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const theme = useTheme()

  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { showModal } = useModal()

  const { data: series } = useQuery<Series>({
    queryKey: ['seriesDetail'],
    queryFn: async () => {
      const res = await getSeries(hashId)
      return res.data.data
    },
  })

  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser()
      return res.data.data
    },
    enabled: isLogin,
  })

  const isUserLikeSeries = useMemo(() => {
    if (isEmpty(user)) return false
    return user.likeSeries.find((item) => item.hashId === hashId)
  }, [hashId, user])

  const seriesLikeMutation = useMutation({
    mutationFn: () => {
      if (isUserLikeSeries) {
        return deleteLikeSeries(hashId)
      }
      return setLikeSeries(hashId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seriesDetail'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleLikeSeries = async () => {
    if (isLogin) {
      seriesLikeMutation.mutate()
    } else {
      showModal({
        type: 'confirm',
        title: '회원가입',
        body: '회원가입하고 내 서재에 기록해 보세요!',
        negativeText: '다음에 하기',
        positiveText: '회원가입 하기',
        onPositiveClick: () => router.push('/auth/login'),
      })
    }
  }

  const isUserRecordSeries = useMemo(() => {
    if (!isEmpty(user) && !isEmpty(series)) {
      return user?.recordSeries.find(
        (item) => item.series?.hashId === series.hashId,
      )
    }
    return false
  }, [series, user])

  const handleAddMyLibrary = async () => {
    if (isLogin && !isEmpty(series)) {
      if (isUserRecordSeries) {
        router.push(`/my/library/${isUserRecordSeries.id}`)
      } else {
        await recordSeries(series.hashId).then(() => {
          showToast({ message: '기록장에 추가했어요!' })
          queryClient.invalidateQueries({ queryKey: ['seriesDetail'] })
          queryClient.invalidateQueries({ queryKey: ['user'] })
        })
      }
    }

    if (!isLogin) {
      showModal({
        type: 'confirm',
        title: '회원가입',
        body: '회원가입하고 내 서재에 기록해 보세요!',
        negativeText: '다음에 하기',
        positiveText: '회원가입 하기',
        onPositiveClick: () => router.push('/auth/login'),
      })
    }
  }

  return (
    <SeriesDetailContainer>
      <TitleHeader title="" onClickBack={() => router.back()} isSearch />
      {series ? (
        <SeriesDetailWrapper>
          <SeriesInfoWrapper>
            {!isEmpty(series.thumbnail) && (
              <div className="thumbnail_wrapper">
                <Image unoptimized src={series.thumbnail} fill alt="" />
              </div>
            )}
            <div className="series_info_wrapper">
              <div className="series_info">
                <div className="title">{series.title}</div>
                {!isEmpty(series.authors) && (
                  <div className="sub">
                    {series.authors.map((value) => value.name).join('/')}{' '}
                    <span className="caption">저</span>
                  </div>
                )}
                {!isEmpty(series.publishers) && (
                  <div className="sub">
                    {series.publishers.map((value) => value.name).join('/')}{' '}
                    <span className="caption">출판</span>
                  </div>
                )}
                <div className="sub">
                  총 {series.totalEpisode}화
                  {series.isComplete && (
                    <>
                      <div className="divider" />
                      <span className="caption">완결</span>
                    </>
                  )}
                </div>
                <div className="tags">{series.displayTags}</div>
              </div>
              <div className="action_button_wrapper">
                <Button
                  className="like_button"
                  type={isUserLikeSeries ? 'primary' : 'secondary'}
                  width="auto"
                  onClick={handleLikeSeries}
                >
                  <div className="button_body">
                    <Icons
                      name={isUserLikeSeries ? 'HeartActive' : 'HeartDefault'}
                      width="20px"
                      height="20px"
                      color={
                        isUserLikeSeries
                          ? theme.color.system.w
                          : theme.color.main[600]
                      }
                    />
                    {series.likeCount ? series.likeCount.toLocaleString() : 0}
                  </div>
                </Button>
                <Button
                  width="auto"
                  type={isUserRecordSeries ? 'primary' : 'secondary'}
                  onClick={handleAddMyLibrary}
                >
                  <div className="button_body">
                    <Icons
                      width="20px"
                      height="20px"
                      name={isUserRecordSeries ? 'OpenedBook' : 'Plus'}
                      color={
                        isUserRecordSeries
                          ? theme.color.system.w
                          : theme.color.main[600]
                      }
                    />
                    {isUserRecordSeries
                      ? '읽고 있는 작품'
                      : '내 서재에 추가하기'}
                  </div>
                </Button>
              </div>
            </div>
          </SeriesInfoWrapper>
          <SeriesDetailBodyWrapper>
            <SectionTitle>줄거리</SectionTitle>
            <SynopsisWrapper>{series.description}</SynopsisWrapper>
            <SectionTitle>보러가기</SectionTitle>
            <PlarformWrapper>
              {!isEmpty(series.providers) &&
                series.providers.map((provider: Provider) => (
                  <PlatformItem
                    key={provider.hashId}
                    onClick={() => window.open(provider.link)}
                  >
                    <Image
                      key={provider.hashId}
                      src={`/images/${provider.name}.png`}
                      alt={provider.displayName}
                      width={20}
                      height={20}
                    />
                    {provider.displayName}
                  </PlatformItem>
                ))}
            </PlarformWrapper>
          </SeriesDetailBodyWrapper>
        </SeriesDetailWrapper>
      ) : (
        <SkeletonWrapper>
          <div className="skeleton_thumbnail_wrapper">
            <Skeleton width="100%" height="100%" style={{ flexShrink: 0 }} />
          </div>
          <div className="skeleton_item_wrapper">
            <Skeleton width="120px" height="24px" />
            <Skeleton
              width="100px"
              height="14px"
              style={{ marginTop: '10px' }}
            />
            <Skeleton width="80px" height="14px" />
            <Skeleton width="50px" height="14px" />
            <Skeleton width="70px" height="14px" />
          </div>
        </SkeletonWrapper>
      )}
    </SeriesDetailContainer>
  )
}

SeriesDetail.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export const getServerSideProps: GetServerSideProps<{
  hashId: string
  isLogin: boolean
}> = async (context) => {
  const { id } = context.params as IParams
  const cookiesString = context.req.headers.cookie as string
  const cookies = {} as any

  cookiesString?.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=').map((c) => c.trim())
    cookies[key] = value
  })

  const isLogin = !!cookies.DS_AUT

  return {
    props: {
      hashId: id,
      isLogin,
    },
  }
}

export default SeriesDetail
