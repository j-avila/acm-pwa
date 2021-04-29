import styled from 'styled-components'
import { lighten } from 'polished'

export const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => (theme.darkTheme ? theme.background : 'white')};
  border-radius: 5px;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: block;
  width: calc(100% - 15vw);
  max-width: 80%;
  color: ${({ theme }) => theme.text};
  header {
    display: grid;
    grid-template-columns: 2fr 0.5fr;
    border-bottom: 1px solid grey;
    margin-bottom: 1rem;
    padding: 0 0 0.5rem 0;
    div {
      h3 {
        font-size: 18px;
        text-align: left;
      }
      p {
        text-align: left;
        color: ${({ theme }) => {
          let color = lighten(0.2, theme.text)
          return color
        }};
        font-size: 'medium';
      }
    }
    .notification {
      height: 28px;
      width: 28px;
      line-height: 26px;
      display: inline-block;
      margin-right: 10px;
      background: ${({ theme }) => theme.error};
      color: white;
      border-radius: 50%;
      font-weight: bold;
    }
    span {
      text-align: end;
      i {
        font-size: 18px;
        align-self: center;
        text-align: right;
        color: ${({ theme }) => theme.primary};
      }
    }
  }
  footer {
    color: ${({ theme }) => {
      let color = lighten(0.2, theme.text)
      return color
    }};
  }
  @media all and (min-width: 1280px) {
    max-width: 1000px;
  }
`
