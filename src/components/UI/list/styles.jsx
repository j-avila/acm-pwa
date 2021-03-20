import styled from 'styled-components'
import { lighten } from 'polished'

export const ItemsList = styled.ul`
  list-style: none;
  li {
    margin-bottom: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid #dddd;
    display: flex;
    width: calc(95% - 1rem);
    justify-content: space-between;
    color: ${({ theme }) => {
      const color = lighten(0.4, theme.text)
      return color
    }};
    span {
      text-align: left;
      strong {
        color: ${({ theme }) => theme.text};
        display: block;
        &:first-letter {
          text-transform: capitalize;
        }
      }
    }
    i {
      font-size: 18px;
      align-self: center;
      text-align: right;
      color: ${({ theme }) => theme.primary};
    }
  }
`
