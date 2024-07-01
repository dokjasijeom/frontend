import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { nonExistRecordSeries } from '@/api/series'
import { useQueryClient } from '@tanstack/react-query'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import { updateNonExistRecordSeries } from '@/api/user'
import { RecordSeries } from '@/@types/user'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'
import Tab, { TabItem } from '../common/Tab/Tab'

const AddSeriesFormWrapper = styled.div`
  width: 100%;

  .series_type_tab_wrapper {
    .button_tab_wrapper {
      height: 44px;
      div {
        ${({ theme }) => theme.typography.body4};
      }
    }
  }
  .add_book_form_wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 32px;

    .form_item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .label {
        ${({ theme }) => theme.typography.head2};
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
  }
`
interface AddSeriesFormProps {
  mySeries?: RecordSeries
  isEdit?: boolean
  keyword: string
  onCloseModal: () => void
}

interface FormValues {
  seriesType: TabItem
  title: string
  author: string
  genre: string
}

function AddSeriesForm(props: AddSeriesFormProps) {
  const { keyword, onCloseModal, isEdit = false, mySeries } = props
  const queryClient = useQueryClient()
  const { register, setValue, formState, watch } = useForm<FormValues>({
    defaultValues: {
      seriesType: isEdit
        ? SERIES_TYPE_TAB_LIST.find(
            (item) => item.name === mySeries?.seriesType,
          )
        : SERIES_TYPE_TAB_LIST[0],
      title: isEdit ? mySeries?.title : keyword,
      author: isEdit ? mySeries?.author : '',
      genre: isEdit ? mySeries?.genre : '',
    },
  })

  const watchSeriesType = watch('seriesType')
  const watchTitle = watch('title')
  const watchAuthor = watch('author')
  const watchGenre = watch('genre')

  useEffect(() => {
    register('seriesType', {
      required: {
        value: true,
        message: '시리즈 타입을 선택해주세요.',
      },
    })
    register('title', {
      required: {
        value: true,
        message: '제목을 입력해주세요.',
      },
    })
    register('author', {
      required: {
        value: true,
        message: '저자를 입력해주세요.',
      },
    })
    register('genre', {
      required: {
        value: true,
        message: '장르를 입력해주세요.',
      },
    })
  }, [register])

  const handleAddNonExistSeries = async () => {
    const params = {
      title: watchTitle,
      author: watchAuthor,
      genre: watchGenre,
      seriesType: watchSeriesType?.name,
    }

    if (isEdit && mySeries) {
      await updateNonExistRecordSeries({ id: mySeries.id, ...params }).then(
        () => {
          queryClient.invalidateQueries({ queryKey: ['mySeriesDetail'] })
          onCloseModal()
        },
      )
    } else {
      await nonExistRecordSeries(params).then(() => {
        queryClient.invalidateQueries({ queryKey: ['user'] })
        onCloseModal()
      })
    }
  }

  return (
    <AddSeriesFormWrapper>
      <form className="add_book_form_wrapper">
        <Tab
          className="series_type_tab_wrapper"
          type="button"
          tabList={SERIES_TYPE_TAB_LIST}
          onChange={(tab: TabItem) => {
            setValue('seriesType', tab, { shouldValidate: true })
          }}
          selectedTab={watchSeriesType}
        />
        <div className="form_item">
          <div className="label">제목</div>
          <Input
            value={watchTitle}
            placeholder="제목을 입력해주세요."
            {...register('title')}
            error={!!formState.errors.title}
            errorMessage={formState.errors.title?.message}
            onChange={(e) => {
              setValue('title', e.target.value, { shouldValidate: true })
            }}
          />
        </div>
        <div className="form_item">
          <div className="label">저자</div>
          <Input
            value={watchAuthor}
            placeholder="저자를 입력해주세요."
            {...register('author')}
            error={!!formState.errors.author}
            errorMessage={formState.errors.author?.message}
            onChange={(e) => {
              setValue('author', e.target.value, { shouldValidate: true })
            }}
          />
        </div>
        <div className="form_item">
          <div className="label">장르</div>
          <Input
            value={watchGenre}
            placeholder="장르를 입력해주세요."
            {...register('genre')}
            error={!!formState.errors.genre}
            errorMessage={formState.errors.genre?.message}
            onChange={(e) => {
              setValue('genre', e.target.value, { shouldValidate: true })
            }}
          />
        </div>

        <Button
          style={{ marginTop: '12px' }}
          disabled={!formState.isValid}
          onClick={handleAddNonExistSeries}
        >
          {isEdit ? '완료' : '추가'}
        </Button>
      </form>
    </AddSeriesFormWrapper>
  )
}

export default AddSeriesForm
