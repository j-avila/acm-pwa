import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 2rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: block;
  width: calc(100% - 15vw);
  max-width: 80%;
  @media all and (min-width: 1280px) {
    max-width: 1000px;
  }
`
