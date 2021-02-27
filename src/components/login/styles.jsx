import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  #card {
    max-width: 80%;
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
      i {
        padding: 0.2rem;
        margin-left: 0.4rem;
        font-size: large;
      }
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
