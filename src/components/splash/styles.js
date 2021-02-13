import styled from 'styled-components'
import BgImg from '../../assets/login_bg.png'
import { lighten } from 'polished'

export const Wrapper = styled.div`
  height: 100vh;
  background: url(${BgImg});
  background-size: cover;
  #brand {
    margin: 0 auto;
    padding-top: 25vh;
  }
  .loader {
    font-size: xx-large;
    color: ${({ theme }) => lighten(0.6, theme.text)};
  }
`
