import styled from 'styled-components'

export const Alert = styled.div`
  padding: 8px;
  width: calc(100% - 40px);
  border-radius: 10px;
  background: ${({ theme }) => theme.error};
  color: white;
  margin: 0.5rem auto;
`
