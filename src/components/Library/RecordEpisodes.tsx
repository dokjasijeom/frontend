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
  from: string
  to: string
}

interface RecordEpisodesProps {
  isMulti: boolean
  setEpisodes: (episodes: Episodes) => void
}

function RecordEpisodes(props: RecordEpisodesProps) {
  const { isMulti, setEpisodes } = props
  const theme = useTheme()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [isBackSpace, setIsBackSpace] = useState(false)

  const addComma = (number: string) => {
    const returnString = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return returnString
  }

  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    const str = onlyNumber.replaceAll(',', '')

    if (isBackSpace) {
      const temp = value.replace('화', '').slice(0, -1)

      if (isEmpty(temp)) {
        setFrom(temp)
      } else {
        setFrom(`${temp}화`)
      }
    } else {
      setFrom(`${str}화`)
    }
  }

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    const str = onlyNumber.replaceAll(',', '')

    if (isBackSpace) {
      const temp = value.replace('화', '').slice(0, -1)

      if (isEmpty(temp)) {
        setTo(temp)
      } else {
        setTo(`${temp}화`)
      }
    } else {
      setTo(`${str}화`)
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
    setEpisodes({ from: from.replace('화', ''), to: to.replace('화', '') })
  }, [from, to, setEpisodes])

  const handleMinus = () => {
    const temp = to.replace('화', '')
    const countNumber = Number(temp)
    if (countNumber === 0) return
    setTo(`${(countNumber - 1).toString()}화`)
  }

  const handlePlus = () => {
    const temp = to.replace('화', '')
    const countNumber = Number(temp)
    setTo(`${(countNumber + 1).toString()}화`)
  }
  return (
    <RecordEpisodesContainer>
      {isMulti ? (
        <RecordEpisodeWrapper>
          <CountInputWrapper>
            <Input
              value={`${addComma(from)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeFrom(e)}
              onKeyDown={handleKeyDown}
            />
          </CountInputWrapper>
          부터
          <CountInputWrapper>
            <Input
              value={`${addComma(to)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeTo(e)}
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
              value={`${addComma(to)}`}
              placeholder="직접 입력 가능(숫자만)"
              onChange={(e) => handleChangeTo(e)}
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
