import { IParams } from '@/@types/interface'
import { Series } from '@/@types/series'
import { getSeries } from '@/api/series'
import Button from '@/components/common/Button/Button'
import Icons from '@/components/common/Icons/Icons'
import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { webnovelText, webtoonText } from '@/constants/Series'
import { isEmpty } from 'lodash'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'

const SeriesDetailContainer = styled.div`
  padding-top: 56px;
`

const SeriesDetailWrapper = styled.div``

const SeriesInfoWrapper = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  .series_image {
    border-radius: 12px;
    margin-right: 20px;
  }
  .series_info_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 200px;

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
      display: flex;
      gap: 8px;
      .button_body {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: 4px;
      }
    }
  }
`

const RequestButton = styled.button`
  position: absolute;
  right: 20px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.gray[600]};
  text-decoration: underline;
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
`

function SeriesDetail({
  series,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const theme = useTheme()

  const tags = useMemo(() => {
    const result = []

    if (!isEmpty(series.seriesType)) {
      if (series.seriesType === 'webnovel') {
        result.push(webnovelText)
      } else {
        result.push(webtoonText)
      }
    }

    series.genres.map((genre) => result.push(genre.name))

    return result
  }, [series])

  return (
    <SeriesDetailContainer>
      <TitleHeader title="" onClickBack={() => router.back()} isSearch />
      {series && (
        <SeriesDetailWrapper>
          <SeriesInfoWrapper>
            {!isEmpty(series.thumbnail) && (
              <Image
                unoptimized
                className="series_image"
                src={series.thumbnail}
                width={140}
                height={200}
                alt=""
              />
            )}
            <div className="series_info_wrapper">
              <div className="series_info">
                <div className="title">{series.title}</div>
                {!isEmpty(series.authors) && (
                  <div className="sub">
                    {series.authors[0].name} <span className="caption">저</span>
                  </div>
                )}
                {!isEmpty(series.publisher) && (
                  <div className="sub">
                    {series.publisher.name}{' '}
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
                <div className="tags">
                  {tags.map((tag) => (
                    <div key={tag}>#{tag}</div>
                  ))}
                  {series.displayTags}
                </div>
              </div>
              <div className="action_button_wrapper">
                <Button type="secondary" width="auto">
                  <div className="button_body">
                    <Icons
                      name="HeartDefault"
                      width="20px"
                      height="20px"
                      color={theme.color.main[600]}
                    />
                    {series.likeCount.toLocaleString()}
                  </div>
                </Button>
                <Button type="secondary" width="auto">
                  <div className="button_body">
                    <Icons
                      name="Plus"
                      width="20px"
                      height="20px"
                      color={theme.color.main[600]}
                    />
                    내 서재에 추가하기
                  </div>
                </Button>
              </div>
            </div>
            <RequestButton>정보 수정 요청</RequestButton>
          </SeriesInfoWrapper>
          <SeriesDetailBodyWrapper>
            <SectionTitle>줄거리</SectionTitle>
            <SynopsisWrapper>{series.description}</SynopsisWrapper>
            <SectionTitle>보러가기</SectionTitle>
            <PlarformWrapper>
              {!isEmpty(series.providers) &&
                series.providers.map((provider: any) => (
                  <PlatformItem key={provider.value}>
                    <Image
                      key={provider.value}
                      src={`/images/${provider.value}.png`}
                      alt={provider.value}
                      width={20}
                      height={20}
                    />
                    {provider.label}
                  </PlatformItem>
                ))}
            </PlarformWrapper>
          </SeriesDetailBodyWrapper>
        </SeriesDetailWrapper>
      )}
    </SeriesDetailContainer>
  )
}

SeriesDetail.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export const getServerSideProps: GetServerSideProps<{
  series: Series
}> = async (context) => {
  const { id } = context.params as IParams

  let series = null

  if (id) {
    try {
      series = (await getSeries(id)).data.data
    } catch (e) {
      console.error(e)
    }
  }

  return {
    props: {
      series,
    },
  }
}

export default SeriesDetail
