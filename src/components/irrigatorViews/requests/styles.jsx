import styled from 'styled-components'
import { darken } from 'polished'

export const Wrapper = styled.div`
  position: relative;
  min-height: 500px;
  .btn-new {
    position: fixed;
    bottom: 2vh;
    left: 45%;
    transform: translateX(-45%);
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
  }
`

// chat
export const DetailsWrapper = styled.div`
  #card {
    margin: 0.5rem auto;
    margin-bottom: 12vh;
  }
`

export const CeladorSection = styled.div`
  padding: 1rem 2rem;
  align-items: center;
  h1 {
    margin: 0 auto;
    margin-bottom: 12px;
    font-size: ${({ theme }) => theme.hSize};
    text-align: center;
    font-weight: bold;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  p {
    margin-bottom: 8px;
    color: ${({ theme }) => {
      const color = theme.base
      return darken('0.1', color)
    }};
  }
  .description {
    i {
      margin-left: 8px;
    }
    h4 {
      margin: 8px 0;
    }
    p {
      padding: 0;
    }
  }
`

// form
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
  justify-content: center;
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
