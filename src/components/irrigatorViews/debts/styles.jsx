import styled from 'styled-components'

export const DebtWrapper = styled.div`
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
`
// form
export const DeatilWrapper = styled.div`
  position: relative;
  .form-card {
    margin: 0 auto;
  }
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
  .attach-preview {
    display: grid;
    position: relative;
    grid-template-columns: 2fr 6fr 2fr;
    column-gap: 8px;
    align-items: center;
    i {
      font-size: large;
      color: ${({ theme }) => theme.error};
    }
    p {
      text-align: left;
      color: grey;
    }
    .thumbnail {
      border: 1px solid #adadad;
      border-radius: 6px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      img {
        width: 100%;
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

//details
export const RequestWrapper = styled.form`
  position: relative;
  .form-card {
    margin: 0 auto;
  }
  h1 {
    max-width: 80%;
    font-size: ${({ theme }) => theme.hSize};
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
  justify-content: center;
  column-gap: 8px;
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
