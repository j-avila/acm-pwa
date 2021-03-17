import styled from 'styled-components'

export const DebtWrapper = styled.div`
  display: block;
  position: relative;
  button {
    position: fixed;
    left: 45%;
    transform: translateX(-45%);
    bottom: 5vh;
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
  }
`
