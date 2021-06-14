import styled from 'styled-components'

export const IrrigatorsWrapper = styled.div`
  display: block;
  position: relative;
  button {
    position: fixed;
    left: 45%;
    transform: translateX(-45%);
    bottom: 5vh;
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
  }
  .searchbar {
    padding: 30px 50px;
    position: sticky;
    max-width: 400px;
    top: 5vh;
    z-index: 9;
    background: ${({ theme }) => theme.background};
    i {
      position: absolute;
      top: 60%;
      right: 15%;
    }
  }
`
// detail
export const DeatilWrapper = styled.div`
  position: relative;
  h1 {
    padding: 2rem 0.5rem;
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
  #card {
    margin: 0 auto;
    .geoButton {
      font-size: xx-small;
      padding: 8px;
      i {
        margin-right: 8px;
      }
    }
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
  padding: 0;
  width: 100%;
  h3 {
    text-align: left;
    padding: 1rem 0;
  }
  h2 {
    padding: 1rem 0;
    text-align: left;
    color: ${({ theme }) => theme.secondary};
  }
`

export const Row = styled.div`
  display: grid;
  padding: 0.6rem 0;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  margin: 12px auto;
  a {
    text-decoration: underline;
  }
`
export const Actions = styled.div`
  margin: 1rem auto;
  width: calc(100% - 10vw);
  max-width: 400px;
  display: grid;
  column-gap: 15px;
  grid-template-columns: 1fr 1fr 8fr;
  align-items: center;
  button {
    margin: 0 auto;
    padding: 1.5rem;
    height: fit-content;
  }
`

export const ModalContent = styled.div`
  /* position: relative; */
  h1 {
    margin-bottom: 1rem;
  }
  p {
    width: 80%;
    margin: 12px auto;
    text-align: left;
    strong {
      font-size: 16px;
    }
  }
`

//form
export const RequestWrapper = styled.form`
  position: relative;
  .form-card {
    margin: 0 auto;
  }
  h1 {
    max-width: 80%;
    font-size: 18px;
    margin: 12px auto;
  }
  label {
    text-align: left;
  }
  @media all and (min-width: 1280px) {
    .form-card {
      max-width: 500px;
      .actions {
        justify-content: flex-end;
        button {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
`
export const ActionArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    padding: 8px 12px;
    i {
      font-size: large;
    }
  }
  .btn-send {
    padding: 12px 40px;
  }
`
