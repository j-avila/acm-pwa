import styled from 'styled-components'
import { darken } from 'polished'

const Wrapper = styled.div`
  width: ${({ fullWidth }) => (!fullWidth ? 'unset' : fullWidth)};
  margin: 0px auto;
  margin-top: 12px;
  > ul + form {
    border-top-left-radius: 0px !important;
  }
  .content {
    background: white;
    padding: 8px;
  }
`

export const TabList = styled.ul`
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
      margin-right: 2px;
      background: ${({ theme }) => darken(0.2, theme.background)};
      color: #a0a0a0;
      cursor: pointer;
      transition: 0.5s all ease;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      flex-basis: ${({ fullWidth }) => (!fullWidth ? 'unset' : '45%')};
      flex-grow: ${({ fullWidth }) => (!fullWidth ? 'unset' : 1)};
      padding-top: 20px;
      top: 0px;
      position: relative;
      z-index: 0;
      /* box-shadow: ${({ theme }) => theme.shadow}; */
      &.selected {
        background: white;
        color: ${({ theme }) => theme.secondary};
        font-weight: bold;
      }
    }
`

export default Wrapper
