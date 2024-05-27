import React from 'react'
import styled from 'styled-components'
import Input from '../common/Input/Input'

const AddSeriesFormWrapper = styled.div`
  width: 396px;
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
  title: string
}

function AddSeriesForm(props: AddSeriesFormProps) {
  const { title } = props
  return (
    <AddSeriesFormWrapper>
      <form className="add_book_form_wrapper">
        <div className="form_item">
          <div className="label">제목</div>
          <Input
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={() => {}}
          />
        </div>
        <div className="form_item">
          <div className="label">저자</div>
          <Input
            value=""
            placeholder="저자를 입력해주세요."
            onChange={() => {}}
          />
        </div>
        <div className="form_item">
          <div className="label">장르</div>
          <Input
            value=""
            placeholder="장르를 입력해주세요."
            onChange={() => {}}
          />
        </div>
        <div className="form_item">
          <div className="label">전체 회차</div>
          <Input
            value=""
            placeholder="총 몇 화인지 숫자만 입력해주세요."
            onChange={() => {}}
          />
        </div>
      </form>
    </AddSeriesFormWrapper>
  )
}

export default AddSeriesForm
