import styled from 'styled-components'

export const Dash = styled.div`
  position: relative;
  .stat-card {
    margin: 1rem auto;
    header {
      display: grid;
      grid-template-columns: 2fr 0.2fr;
      border-bottom: 1px solid grey;
      margin-bottom: 1rem;
      padding: 8px 0;
      h3 {
        font-size: 18px;
        text-align: left;
      }
      i {
        align-self: center;
        text-align: right;
        color: ${({ theme }) => theme.primary};
      }
    }
    section {
      text-align: left;
      h1 {
        font-size: 20px;
        color: ${({ theme }) => theme.primary};
      }
    }
    footer {
      text-align: left;
      color: #858585;
    }
    &.visits {
      section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        span {
          text-align: center;
          h1 {
            font-size: xxx-large;
          }
          &:first-child {
            border-right: 1px solid #a5a5a5;
          }
        }
      }
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
