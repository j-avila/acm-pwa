import styled from 'styled-components'

export const DetailsWrapper = styled.div`
  #card {
    margin: 0.5rem auto;
  }
`

export const CeladorSection = styled.div`
  display: grid;
  grid-template-columns: 8fr 1fr;
  padding: 1rem 2rem;
  align-items: center;
  h1 {
    font-size: 16px;
    text-align: left;
    font-weight: bold;
    &:first-letter {
      text-transform: uppercase;
    }
  }
`
