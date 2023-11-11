import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: 'Pretendard-Regular';
    height: 100%;
  }
  button {
    cursor: pointer;
    background-color: inherit;
  }
  a {
    text-decoration:none;
    color:inherit;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
        format('woff');
    font-weight: 400;
    font-style: normal;
}

`

export default GlobalStyle
