import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-bottom: 1rem;
  label {
    display: ${({ display }) => display};
    font-weight: bold;
    margin-bottom: 1rem;
    &:first-letter {
      text-transform: capitalize;
    }
  }
  input,
  select,
  textarea {
    width: ${({ width }) => width};
    outline: 0;
    border: 0;
    padding: 16px;
    border-radius: 5px;
    font-weight: regular;
    background: ${({ theme }) => theme.greygradient};
    box-shadow: ${({ theme }) => theme.shadow};
    &:invalid {
      border-color: red;
    }
  }
`
