import styled from 'styled-components'

export const NetworkWatcher = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: ${({ theme }) => theme.error};
`
export const MessageBlock = styled.div`
  display: block;
  text-align: center;

  p {
    color: white;
    font-family: 'Open sans', sans-serif, arial;
    font-weight: 300;
    text-align: center;
    padding: 12px 0;
  }
`
