import styled from 'styled-components'

export const ActionWrapper = styled.div`
  position: relative;
  #card {
    max-width: 50vh;
    margin: 10vh auto;
    h1 {
      color: ${({ theme }) => theme.secondary};
    }
    h2 {
      margin: 1rem 0;
    }
    p {
      strong {
        font-size: large;
      }
      font-size: large;
    }
  }
`
