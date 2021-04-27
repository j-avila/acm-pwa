import styled from 'styled-components'
import { transparentize } from 'polished'

export const TogglerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 280px;
  border-radius: 6px 6px 0 0;
  background: ${({ theme }) => theme.secondary};
  h2 {
    color: ${({ theme }) => theme.background};
  }
`

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  i {
    font-size: large;
    color: ${({ theme }) => theme.background};
  }
`

export const DataList = styled.ul`
  list-style: none;
  max-height: 45vh;
  overflow: auto;
  color: ${({ theme }) => theme.background};
  li {
    padding: 12px;
    font-size: large;
    border-top: ${({ theme }) => {
      const color = transparentize(0.8, theme.background)
      return `1px solid ${color} `
    }};
    border-bottom: ${({ theme }) => {
      const color = transparentize(0.8, theme.background)
      return `1px solid ${color} `
    }};
  }
`
