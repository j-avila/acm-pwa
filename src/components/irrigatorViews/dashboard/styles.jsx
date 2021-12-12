import styled from 'styled-components'

export const Dash = styled.div`
  position: relative;
  .stat-card {
    margin: 1rem auto;
    section {
      text-align: left;
      h1 {
        font-size: ${({ theme }) => theme.hSize};
        color: ${({ theme }) => theme.primary};
      }
    }
    footer {
      text-align: left;
    }
    &.visits {
      section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        span {
          text-align: center;
          h1 {
            font-size: ${({ theme }) => theme.hSize};
          }
          &:first-child {
            border-right: 1px solid #a5a5a5;
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 10vh;
    }
  }
  @media all and (min-width: 1280px) {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    #card {
      width: calc(100% - 3rem);
    }
  }
`
