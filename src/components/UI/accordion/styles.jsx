import styled from 'styled-components'
import { darken } from 'polished'

export const AccordionWrapper = styled.div`
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  header {
    font-weight: bold;
    width: calc(96% - 1rem);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    &:first-letter {
      color: grey;
      text-transform: uppercase;
    }
    i{
      font-size: 1rem;
    }
  }
`
export const Content = styled.div`
  background: #ffffcc;
  padding: 0;
  width: 100%;
  overflow: hidden;
  animation-delay: 1s;
  transition: all 1s ease-in-out;
  background: ${({ theme }) => {
    const bg = darken(0.1, theme.background)
    return bg
  }};
`
