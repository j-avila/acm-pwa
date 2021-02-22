import styled from 'styled-components'

export const MenuWrapper = styled.div`
  display: inline-block;
  position: relative;
  button {
    padding: 20px;
    border-bottom-left-radius: 12px;
    outline: none;
    border: 0;
    color: white;
    background: ${({ theme }) => theme.primary};
  }
`

export const List = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  width: calc(100vw - 62px);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.shadow};
  li {
    padding: 10px;
    border-bottom: 1px solid grey;
    color: grey;
    &:last-child {
      border-bottom: 0;
    }
  }
`
