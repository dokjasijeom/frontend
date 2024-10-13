import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;700&display=swap');

  ${reset}
  * {
    font-family: 'Pretendard', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: 'Pretendard', sans-serif;
    height: 100%;
    color: ${({ theme }) => theme.color.gray[950]}
  }
  button {
    cursor: pointer;
    background-color: inherit; 
    border: none;
  }
  a {
    text-decoration:none;
    color:inherit;
  }

`

export default GlobalStyle
