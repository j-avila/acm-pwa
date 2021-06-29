import styled from 'styled-components'
import { lighten } from 'polished'

export const ItemsList = styled.ul`
  list-style: none;
  padding-bottom: 18vh;
  li {
    width: calc(95% - 1rem);
    margin-bottom: 0.5rem;
    padding: 1rem;
    display: grid;
    grid-template-columns: ${({ listed }) =>
      listed ? '0.2fr 1fr 0.1fr' : '1fr 0.1fr'};
    border-bottom: 1px solid #dddd;
    color: ${({ theme }) => {
      const color = lighten(0.4, theme.text)
      return color
    }};
    figure {
      width: max-content;
      font-size: 10px;
      height: 16px;
      margin: 0 auto;
      padding: 0.2rem 8px;
      border-radius: 50%;
      vertical-align: middle;
      color: ${({ theme }) => theme.base};
      .debt {
        margin: 0 auto;
        text-align: center;
        color: white;
        border-radius: 6px;
        background: tomato;
        font-size: xx-small;
        padding: 2px 4px;
      }
    }
    span {
      text-align: left;
      padding-left: 8px;
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
  span {
    color: ${({ theme }) => theme.base};
    font-size: xx-small;
  }
  .paginator {
    display: block;
    width: max-content;
    margin: 0 auto;
    margin-top: 12px;
    font-size: 12px;
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
