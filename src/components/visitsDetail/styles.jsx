import styled from 'styled-components'

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
    .info {
      text-align: left;
    }
  }
`
