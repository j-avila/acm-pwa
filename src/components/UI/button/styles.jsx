import styled from 'styled-components'
import { checkThemeProp } from '../../hoc/utils'

export const Wrapper = styled.button`
  display: ${({ display }) => display};
  border-radius: 15px;
  font-size: 16px;
  border: 0;
  outline: 0;
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  color: ${({ theme, color }) => checkThemeProp(theme, color)};
  background: ${({ theme, background }) => checkThemeProp(theme, background)};
  padding: 14px 2rem;
  box-shadow: ${({ theme, shadow }) =>
    shadow ? checkThemeProp(theme, 'shadow') : ''};
  &:first-letter {
    text-transform: capitalize;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background: grey;
    opacity: 0.3;
    cursor: not-allowed;
  }
`
