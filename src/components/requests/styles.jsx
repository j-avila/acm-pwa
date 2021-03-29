import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  min-height: 500px;
  .btn-new {
    position: fixed;
    bottom: 5vh;
    left: 45%;
    transform: translateX(-45%);
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
  }
`
