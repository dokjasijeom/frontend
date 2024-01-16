import React, { KeyboardEvent, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { isEmpty } from 'lodash'
import Button from '../common/Button/Button'
import Icons from '../common/Icons/Icons'
import Input from '../common/Input/Input'

const RecordEpisodesContainer = styled.div`
  width: 100%;
`

const RecordEpisodeCountWrapper = styled.div`
  display: flex;
  height: 46px;
  gap: 8px;
  align-items: center;
`

const RecordEpisodeWrapper = styled.div`
  display: flex;
  height: 46px;
  gap: 12px;
  align-items: center;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.gray[800]};
`

const CountInputWrapper = styled.div`
  flex: 1;
  input {
    text-align: center;
  }
`
export interface Episodes {
  start: string
  end: string
}

interface RecordEpisodesProps {
  isMulti: boolean
  setEpisodes: (episodes: Episodes) => void
}

function RecordEpisodes(props: RecordEpisodesProps) {
  const { isMulti, setEpisodes } = props
  const theme = useTheme()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [isBackSpace, setIsBackSpace] = useState(false)

  const addComma = (number: string) => {
    const returnString = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return returnString
  }

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    const str = onlyNumber.replaceAll(',', '')

    if (isBackSpace) {
      const temp = value.replace('화', '').slice(0, -1)

      if (isEmpty(temp)) {
        setStart(temp)
      } else {
        setStart(`${temp}화`)
      }
    } else {
      setStart(`${str}화`)
    }
  }

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    const str = onlyNumber.replaceAll(',', '')

    if (isBackSpace) {
      const temp = value.replace('화', '').slice(0, -1)

      if (isEmpty(temp)) {
        setEnd(temp)
      } else {
        setEnd(`${temp}화`)
      }
    } else {
      setEnd(`${str}화`)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 8) {
      setIsBackSpace(true)
    } else {
      setIsBackSpace(false)
    }
  }

  useEffect(() => {
    setEpisodes({ start: start.replace('화', ''), end: end.replace('화', '') })
  }, [start, end, setEpisodes])

  const handleMinus = () => {
    const temp = end.replace('화', '')
    const countNumber = Number(temp)
    if (countNumber === 0) return
    setEnd(`${(countNumber - 1).toString()}화`)
  }

  const handlePlus = () => {
    const temp = end.replace('화', '')
    const countNumber = Number(temp)
    setEnd(`${(countNumber + 1).toString()}화`)
  }
  return (
    <RecordEpisodesContainer>
      {isMulti ? (
        <RecordEpisodeWrapper>
          <CountInputWrapper>
            <Input
              value={`${addComma(start)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeStart(e)}
              onKeyDown={handleKeyDown}
            />
          </CountInputWrapper>
          부터
          <CountInputWrapper>
            <Input
              value={`${addComma(end)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeEnd(e)}
              onKeyDown={handleKeyDown}
            />
          </CountInputWrapper>
        </RecordEpisodeWrapper>
      ) : (
        <RecordEpisodeCountWrapper>
          <Button type="icon" onClick={handleMinus}>
            <Icons name="Minus" color={theme.color.main[600]} />
          </Button>
          <CountInputWrapper>
            <Input
              value={`${addComma(end)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeEnd(e)}
              onKeyDown={handleKeyDown}
            />
          </CountInputWrapper>
          <Button type="icon" onClick={handlePlus}>
            <Icons name="Plus" color={theme.color.main[600]} />
          </Button>
        </RecordEpisodeCountWrapper>
      )}
    </RecordEpisodesContainer>
  )
}

export default RecordEpisodes
