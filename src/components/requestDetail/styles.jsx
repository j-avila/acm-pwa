import styled from 'styled-components'

export const DetailsWrapper = styled.div`
  #card {
    margin: 1rem auto;
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
  img {
    overflow: hidden;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 2px;
    background: ${({ theme }) => theme.background};
  }
`

export const ActionArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    margin: 10px;
    i {
      font-size: x-large;
    }
  }
  .btn-send {
    padding: 12px 40px;
  }
`
