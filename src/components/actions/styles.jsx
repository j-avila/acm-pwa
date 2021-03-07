import styled from 'styled-components'

export const ActionWrapper = styled.div`
  position: relative;
  #card {
    max-width: 50vh;
    margin: 10vh auto;
    h1 {
      color: ${({ theme }) => theme.secondary};
    }
  }
`
