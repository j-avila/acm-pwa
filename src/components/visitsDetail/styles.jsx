import styled from 'styled-components'
import { darken } from 'polished'
export const DetailWrapper = styled.div`
  position: relative;
  h1 {
    margin-top: 1rem;
    i {
      display: block;
      margin: 1rem auto;
      font-size: 4rem;
      color: ${({ theme }) => theme.secondary};
    }
  }
  #card {
    margin: 1.5rem auto;
    &.info {
      text-align: left;
      background: ${({ theme }) => darken(0.1, theme.background)};
      p {
        color: ${({ theme }) => theme.text};
      }
    }
    &.bio {
      text-align: left;
      .attachment {
        display: block;
        margin-top: 1rem;
        padding: 8px;
        border-radius: 10px;
        background: ${({ theme }) => {
          let color = darken(0.2, theme.background)
          return color
        }};
        img {
          display: block;
          margin: 0 auto;
        }
        i {
          margin-right: 8px;
        }
      }
      a {
        display: block;
        margin-top: 1rem;
        color: ${({ theme }) => theme.primary};
        text-decoration: underline;
        i {
          margin-right: 8px;
        }
      }
    }
  }
`
