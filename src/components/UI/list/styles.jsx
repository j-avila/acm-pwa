import styled from 'styled-components'
import { lighten } from 'polished'

export const ItemsList = styled.ul`
  list-style: none;
  padding-bottom: 18vh;
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
      &.fa-check {
        color: green;
      }
    }
  }
  .paginator {
    display: block;
    width: max-content;
    margin: 0 auto;
    margin-top: 12px;
    color: ${({ theme }) => theme.secondary};
    padding: 8px 12px;
    border-radius: 8px;
    background: #c4c4c4;
    i {
      margin-left: 6px;
      font-size: 14px;
    }
  }
`
