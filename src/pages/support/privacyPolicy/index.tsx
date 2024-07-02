import TitleHeader from '@/components/common/TitleHeader/TitleHeader'
import OnlyFooterLayout from '@/components/layout/OnlyFooterLayout'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const PrivacyPolicyContainer = styled.div`
  padding-top: 56px;
`

const PrivacyPolicyWrapper = styled.div`
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
    white-space: pre-wrap;
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

function PrivacyPolicy() {
  return (
    <PrivacyPolicyContainer>
      <TitleHeader title="개인정보처리방침" />
      <PrivacyPolicyWrapper>
        <div className="title">개인정보처리방침</div>

        <div className="body">
          독자시점은 개인정보처리방침을 준수합니다. <br />
          <br />
          {`독자시점('https://www.doksi.kr'이하 '독자시점')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.\n\n독자시점은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.\n\n○ 본방침은부터 2024년 6월 27일부터 시행됩니다.`}
        </div>
        <div className="sub_title">1. 개인정보의 처리 목적</div>
        <div className="body">
          {`독자시점('https://www.doksi.kr'이하 '독자시점')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.\n\n가. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 수집 시 법정대리인 동의 여부 확인, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다. \n\n나. 민원사무 처리 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다. \n\n다. 재화 또는 서비스 제공 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제·정산 등을 목적으로 개인정보를 처리합니다.\n\n라. 마케팅 및 광고에의 활용 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.`}
        </div>
        <div className="sub_title">2. 개인정보 파일 현황</div>
        <div className="body">
          {`- 개인정보 항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보\n- 수집방법 : 홈페이지\n- 보유근거 : 서비스\n-보유기간 : 5년\n- 관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년, 계약 또는 청약철회 등에 관한 기록 : 5년, 표시/광고에 관한 기록 : 6개월`}
        </div>
        <div className="sub_title">3. 개인정보의 처리 및 보유 기간</div>
        <div className="body">
          {`① 독자시점은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리, 보유합니다.\n\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n1. 홈페이지 회원가입 및 관리\n홈페이지 회원가입 및 관리 와 관련한 개인정보는 수집.이용에 관한 동의일로부터<5년>까지 위 이용목적을 위하여 보유, 이용됩니다.\n- 보유근거 : 서비스\n1) 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년\n2) 계약 또는 청약철회 등에 관한 기록 : 5년\n3) 표시/광고에 관한 기록 : 6개월`}
        </div>
        <div className="sub_title">4. 처리하는 개인정보의 항목 작성</div>
        <div className="body">
          {`① 독자시점('https://www.doksi.kr'이하 '독자시점')은(는) 다음의 개인정보 항목을 처리하고 있습니다.\n1. 홈페이지 회원가입 및 관리\n- 필수항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보\n- 선택항목 : 닉네임`}
        </div>
        <div className="sub_title">5. 개인정보의 파기</div>
        <div className="body">
          {`독자시점은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.\n- 파기절차\n이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.\n\n-파기기한\n이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.`}
        </div>
        <div className="sub_title">
          6. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항
        </div>
        <div className="body">
          {`① 독자시점은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠기(cookie)’를 사용합니다.\n② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.\n\n가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. \n나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.\n다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.`}
        </div>
        <div className="sub_title">7. 개인정보 보호책임자 작성</div>
        <div className="body">
          {`① 독자시점('https://www.doksi.kr'이하 '독자시점')은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n▶ 개인정보 보호책임자\n성명 : 오경근\n직위 : 운영자\n연락처 : support+doksi@ggoh.dev\n\n② 정보주체께서는 독자시점('https://www.doksi.kr'이하 '독자시점')의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.\n독자시점('https://www.doksi.kr'이하 '독자시점')은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.`}
        </div>
        <div className="sub_title">8. 개인정보 처리방침 변경</div>
        <div className="body">
          ① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
          변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
          전부터 공지사항을 통하여 고지할 것입니다.
        </div>
      </PrivacyPolicyWrapper>
    </PrivacyPolicyContainer>
  )
}

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return <OnlyFooterLayout>{page}</OnlyFooterLayout>
}

export default PrivacyPolicy
