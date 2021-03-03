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
  }
`
