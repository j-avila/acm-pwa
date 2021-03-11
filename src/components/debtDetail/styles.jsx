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
      margin-bottom: 1.2rem;
    }
  }
  button {
    margin: 20px auto !important;
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
    button {
      display: inline-block;
      margin: 1rem 8px !important;
      width: fit-content;
    }
  }
`

export const Detail = styled.div`
  position: relative;
  padding: 1rem 2rem;
  h3 {
    text-align: left;
    padding: 1rem 0;
    border-bottom: 1px solid grey;
  }
  h2 {
    padding: 1rem 0;
    text-align: left;
    color: ${({ theme }) => theme.secondary};
  }
`

export const Row = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: 2fr 1fr;
  text-align: left;
  margin: 12px auto;
  border-bottom: 1px solid grey;
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
