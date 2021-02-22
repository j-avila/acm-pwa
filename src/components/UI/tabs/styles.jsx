import styled from 'styled-components'
import { darken } from 'polished'

const Wrapper = styled.div`
  width: ${({ fullWidth }) => (!fullWidth ? 'unset' : fullWidth)};
  margin: 0px auto;
  > ul + form {
    border-top-left-radius: 0px !important;
  }
  ul {
    display: flex;
    flex-flow: row;
    padding: 0;
    margin: 0;
    li {
      text-transform: capitalize;
      list-style: none;
      padding: 0.8rem 2rem;
      font-weight: 500;
      margin: 0;
      margin-bottom: 1rem;
      margin-right: 2px;
      background: ${({ theme }) => darken(0.2, theme.background)};
      color: #a0a0a0;
      cursor: pointer;
      transition: 0.5s all ease;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      flex-basis: ${({ fullWidth }) => (!fullWidth ? 'unset' : '45%')};
      flex-grow: ${({ fullWidth }) => (!fullWidth ? 'unset' : 1)};
      padding-top: 30px;
      top: -20px;
      position: relative;
      z-index: 0;
      box-shadow: ${({ theme }) => theme.shadow};
      &.selected {
        background: ${({ theme }) => theme.secondary};
        color: white;
      }
    }
  }
`
export default Wrapper
