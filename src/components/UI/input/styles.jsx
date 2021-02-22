import styled from 'styled-components'

export const Wrapper = styled.div`
  label {
    display: ${({ display }) => display};
    font-weight: bold;
    margin-bottom: 1rem;
    &:first-letter {
      text-transform: capitalize;
    }
  }
  input,
  select {
    width: 100%;
    outline: 0;
    border: 0;
    padding: 16px;
    border-radius: 5px;
    font-weight: regular;
    background: ${({ theme }) => theme.greygradient};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`
