import styled from 'styled-components'

// form
export const Wrapper = styled.form`
  position: relative;
  .form-card {
    margin: 0 auto;
  }
  h1 {
    max-width: 80%;
    font-size: 18px;
    margin: 12px auto;
  }
  .selector {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin: 1rem auto;
    i {
      margin-right: 1rem;
    }
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
  margin-top: 1rem;
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

export const FormWrapper = styled.div`
  display: block;
`
