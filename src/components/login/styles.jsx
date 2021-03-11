import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  #card {
    margin: 10vh auto;
    img {
      width: 60%;
      max-width: 360px;
      margin-bottom: 2rem;
    }
    button {
      margin: 1rem 0;
    }
    .field {
      margin-bottom: 1rem;
      &.append {
        .wrapper {
          display: flex;
          align-items: center;
        }
        i {
          background: ${({ theme }) => theme.greygradient};
          padding: 16px;
          margin-left: 0;
          font-size: large;
          border-radius: 0 8px 8px 0;
          box-shadow: ${({ theme }) => theme.shadow};
        }
      }
    }
    @media all and (min-width: 1280px) {
      max-width: 350px;
    }
  }
`

export const Error = styled.div`
  i {
    padding: 12px;
    background: ${({ theme }) => theme.error};
    border-radius: 50%;
    font-size: 24px;
    color: white;
  }

  p {
    margin: 1rem auto;
    font-weight: 900;
  }
`
