import styled from 'styled-components'

export const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  #card {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 80%;
    button {
      margin-top: 1rem;
    }
  }
`
export const ActionZone = styled.div`
  display: flex;
  justify-content: space-evenly;
`
