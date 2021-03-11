import styled from 'styled-components'

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
