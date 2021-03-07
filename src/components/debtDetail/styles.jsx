import styled from 'styled-components'

export const DeatilWrapper = styled.div`
  position: relative;
  h1 {
    padding: 0.5rem;
  }
  .info {
    max-width: 300px;
    margin: 1rem auto;
    i {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.primary};
      margin-bottom: 1rem;
    }
  }
  button {
    margin: 20px auto !important;
  }
`

export const Detail = styled.div`
  position: relative;
  padding: 1rem;
  h2 {
    padding: 1rem 0;
    border-top: 1px solid grey;
    text-align: left;
    color: ${({ theme }) => theme.secondary};
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  text-align: left;
  margin: 12px auto;
`
export const ModalContent = styled.div`
  /* position: relative; */
  p {
    width: 80%;
    margin: 12px auto;
    text-align: left;
    strong {
      font-size: 16px;
    }
  }
`
