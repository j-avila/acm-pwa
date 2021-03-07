import styled from 'styled-components'

export const MenuWrapper = styled.div`
  display: inline-block;
  position: relative;
  button {
    padding: 18px;
    outline: none;
    border: 0;
    color: white;
    font-size: large;
    background: ${({ theme }) => theme.primary};
  }
`

export const List = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  width: 100vw;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  li {
    padding: 1rem 10px;
    border-bottom: 1px solid #c7c7c7;
    color: white;
    &:last-child {
      border-bottom: 0;
    }
    a {
      text-decoration: none;
    }
  }
  .user {
    z-index: 1;
    margin-top: -10px;
    padding: 15px;
    color: white;
    background: ${({ theme }) => theme.secondary};
  }
`
