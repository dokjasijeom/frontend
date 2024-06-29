import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import { TERMS_OF_USE_TEXT_LIST } from '@/constants/TermsOfUse'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const TermsOfUseContainer = styled.div`
  padding-top: 56px;
`

const TermsOfUseWrapper = styled.div`
  padding: 16px 20px;
  ${({ theme }) => theme.color.gray[950]};

  .title {
    ${({ theme }) => theme.typography.head1};
  }
  .sub_title {
    ${({ theme }) => theme.typography.head2};
    margin-top: 12px;
  }

  .body {
    color: ${({ theme }) => theme.color.gray[800]};
    ${({ theme }) => theme.typography.body3};
    margin-top: 12px;
  }

  .text_list {
    &.sub {
      padding-left: 20px;
    }

    .dot_text {
      text-align: left;
      position: relative;
      .dot {
        display: inline-block;
        vertical-align: text-top;
        position: absolute;
        top: 8px;
        left: 6px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.color.gray[800]};
      }
      .text {
        padding-left: 16px;
        display: inline-block;
        color: ${({ theme }) => theme.color.gray[800]};
      }
    }
  }
`

function TermsOfUse() {
  return (
    <TermsOfUseContainer>
      <TitleHeader title="이용약관" />
      <TermsOfUseWrapper>
        <div className="title">이용약관</div>
        {TERMS_OF_USE_TEXT_LIST.map((text) => (
          <>
            <div className="sub_title">{text.title}</div>
            <div className="body">
              {text.list.map((li) => (
                <>
                  <div>{li.title}</div>
                  {li.body.map((listBody, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="text_list" key={index}>
                      <div className="dot_text">
                        {li.body.length > 1 && <div className="dot" />}
                        <div
                          className="text"
                          style={{
                            paddingLeft: li.body.length > 1 ? '16px' : 0,
                          }}
                        >
                          {listBody.desc}
                        </div>
                        {listBody.sub &&
                          listBody.sub.map((listSub, listSubIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div className="text_list sub" key={listSubIndex}>
                              <div className="dot_text">
                                <div className="dot" />
                                <div className="text">{listSub}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </>
        ))}
        <div className="body">
          부 칙 <br />
          수정일 : 이 약관은 2024년 6월 3일 수정되었습니다. <br />
          시행일 : 수정사항은 2024년 6월 3일부터 시행합니다.
        </div>
      </TermsOfUseWrapper>
    </TermsOfUseContainer>
  )
}

TermsOfUse.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default TermsOfUse
