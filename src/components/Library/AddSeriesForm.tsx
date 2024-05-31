import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { nonExistRecordSeries } from '@/api/series'
import { useQueryClient } from '@tanstack/react-query'
import { SERIES_TYPE_TAB_LIST } from '@/constants/Tab'
import { isEmpty } from 'lodash'
import Input from '../common/Input/Input'
import Button from '../common/Button/Button'
import Selector, { OptionItem } from '../common/Selector/Selector'

const AddSeriesFormWrapper = styled.div`
  width: 100%;
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
  keyword: string
  onCloseModal: () => void
}

interface FormValues {
  seriesType: OptionItem | null
  title: string
  author: string
  genre: string
  totalEpisode: string
}

function AddSeriesForm(props: AddSeriesFormProps) {
  const { keyword, onCloseModal } = props
  const queryClient = useQueryClient()
  const { register, setValue, formState, watch } = useForm<FormValues>({
    defaultValues: {
      seriesType: null,
      title: keyword,
      author: '',
      genre: '',
      totalEpisode: '',
    },
  })

  const watchSeriesType = watch('seriesType')
  const watchTitle = watch('title')
  const watchAuthor = watch('author')
  const watchGenre = watch('genre')
  const watchTotalEpisode = watch('totalEpisode')

  const addComma = (number: string) => {
    const returnString = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return returnString
  }

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
    register('totalEpisode', {
      required: {
        value: true,
        message: '전체 회차를 입력해주세요.',
      },
    })
  }, [register])

  const handleAddNonExistSeries = async () => {
    const params = {
      seriesType: watchSeriesType?.value,
      title: watchTitle,
      author: watchAuthor,
      genre: watchGenre,
      totalEpisode: Number(watchTotalEpisode),
    }

    await nonExistRecordSeries(params).then(() => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      onCloseModal()
    })
  }

  return (
    <AddSeriesFormWrapper>
      <form className="add_book_form_wrapper">
        <Selector
          {...register('seriesType')}
          value={isEmpty(watchSeriesType) ? '선택' : watchSeriesType.label}
          options={SERIES_TYPE_TAB_LIST}
          onClickOption={(option: OptionItem) => {
            setValue('seriesType', option, { shouldValidate: true })
          }}
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
        <div className="form_item">
          <div className="label">전체 회차</div>
          <Input
            value={`${addComma(watchTotalEpisode)}`}
            placeholder="총 몇 화인지 숫자만 입력해주세요."
            {...register('totalEpisode')}
            error={!!formState.errors.totalEpisode}
            errorMessage={formState.errors.totalEpisode?.message}
            onChange={(e) => {
              const { value } = e.target
              const onlyNumber = value.replace(/[^0-9]/g, '')
              const str = onlyNumber.replaceAll(',', '')
              setValue('totalEpisode', str, { shouldValidate: true })
            }}
          />
        </div>
        <Button
          style={{ marginTop: '12px' }}
          disabled={!formState.isValid}
          onClick={handleAddNonExistSeries}
        >
          추가
        </Button>
      </form>
    </AddSeriesFormWrapper>
  )
}

export default AddSeriesForm
