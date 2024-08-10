import React, { useMemo, useState } from 'react'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import styled from 'styled-components'
import useModal from '@/hooks/useModal'
import { RecordSeries } from '@/@types/user'
import { isEmpty } from 'lodash'
import { deleteNonExistRecordSeries, deleteRecordSeries } from '@/api/series'
import { useQueryClient } from '@tanstack/react-query'
import TabTitleHeader from '../common/TabTitleHeader/TabTitleHeader'
import RecordSeriesListItem from './RecordSeriesListItem'
import RecordModalBody from './RecordModalBody'
import { TabItem } from '../common/Tab/Tab'
import Button from '../common/Button/Button'
import Empty from '../common/Empty/Empty'

const MyRecordSeriesListContainerWrapper = styled.div`
  padding-bottom: 160px;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`

interface MyRecordSeriesListContainerProps {
  recordSeriesList: RecordSeries[]
}

function MyRecordSeriesListContainer(props: MyRecordSeriesListContainerProps) {
  const { recordSeriesList } = props
  const queryClient = useQueryClient()
  const { showModal, closeModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const [selectedSeriesTypeTab, setSelectedSeriesTypeTab] = useState(
    SERIES_TYPE_TAB_LIST[0],
  )

  const filterRecordSeriesList = useMemo(() => {
    return recordSeriesList.filter(
      (list) => list.seriesType === selectedSeriesTypeTab.name,
    )
  }, [recordSeriesList, selectedSeriesTypeTab.name])

  const handleDeleteRecordSeries = (recordSeries: RecordSeries) => {
    showModal({
      title: '기록한 작품 삭제',
      body: (
        <>
          삭제된 기록은 되돌릴 수 없어요.
          <br />
          정말 삭제할까요?
        </>
      ),
      positiveText: '삭제',
      onPositiveClick: async () => {
        if (!isEmpty(recordSeries.series)) {
          await deleteRecordSeries(recordSeries.series.hashId).then(
            async () => {
              await queryClient.invalidateQueries({ queryKey: ['user'] })
              setIsEdit(false)
            },
          )
        } else {
          await deleteNonExistRecordSeries(recordSeries.id).then(async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            setIsEdit(false)
          })
        }
      },
    })
  }

  const handleRecordSeries = (series: RecordSeries) => {
    showModal({
      type: 'self',
      title: '기록하기',
      body: <RecordModalBody recordSeries={series} onCloseModal={closeModal} />,
    })
  }
  return (
    <MyRecordSeriesListContainerWrapper>
      <TabTitleHeader
        iconName="OpenedBook"
        title="읽고 있는 작품"
        tabList={SERIES_TYPE_TAB_LIST}
        moreButton={
          !isEmpty(recordSeriesList) ? (
            <Button type="text" width="auto" height="26px">
              {isEdit ? '완료' : '편집 모드'}
            </Button>
          ) : (
            <></>
          )
        }
        onClickMore={() => setIsEdit(!isEdit)}
        selectedTab={selectedSeriesTypeTab}
        onChangeTab={(tab: TabItem) => setSelectedSeriesTypeTab(tab)}
      />

      <ListWrapper>
        {!isEmpty(filterRecordSeriesList) ? (
          filterRecordSeriesList.map((recordSeries) => (
            <RecordSeriesListItem
              recordSeries={recordSeries}
              key={recordSeries.id}
              isEdit={isEdit}
              onEdit={() => handleDeleteRecordSeries(recordSeries)}
              onRecord={() => handleRecordSeries(recordSeries)}
            />
          ))
        ) : (
          <Empty
            description={
              <>
                읽고 있는 작품을 추가하고
                <br />
                기록해보세요!
              </>
            }
          />
        )}
      </ListWrapper>
    </MyRecordSeriesListContainerWrapper>
  )
}

export default MyRecordSeriesListContainer
