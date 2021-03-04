import styled from 'styled-components'

export const ItemsList = styled.ul`
  list-style: none;
  li {
    margin-bottom: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid #dddd;
    display: flex;
    width: calc(95% - 1rem);
    justify-content: space-between;
  }
`
