import styled from 'styled-components'
import { darken } from 'polished'

export const VisitsWrapper = styled.div`
  position: relative;
  button {
    position: fixed;
    bottom: 2vh;
    left: 45%;
    transform: translateX(-45%);
  }
  .tabs {
    width: 80%;
    margin: 2vh auto;
    display: flex;
    justify-content: space-between;
    button {
      position: relative;
      display: block;
      left: unset;
      top: unset;
      bottom: unset;
      transform: unset;
    }
  }
  @media all and (min-width: 1280px) {
    margin: 0 auto;
    width: 80vw;
    max-width: 1000px;
  }
`

// visits form

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
// detail
export const DetailWrapper = styled.div`
  position: relative;
  h1 {
    margin: 0 auto;
    margin-top: 1rem;
    max-width: 80vw;
    i {
      display: block;
      margin: 1rem auto;
      font-size: 4rem;
      color: ${({ theme }) => theme.secondary};
    }
  }
  #card {
    margin: 1.5rem auto;
    &.info {
      text-align: left;
      background: ${({ theme }) => darken(0.1, theme.background)};
      p {
        color: ${({ theme }) => theme.text};
      }
    }
    &.bio {
      text-align: left;
      .attachment {
        display: block;
        margin-top: 1rem;
        padding: 8px;
        border-radius: 10px;
        background: ${({ theme }) => {
          let color = darken(0.2, theme.background)
          return color
        }};
        img {
          display: block;
          margin: 0 auto;
        }
        i {
          margin-right: 8px;
        }
      }
      a {
        display: block;
        margin-top: 1rem;
        color: ${({ theme }) => theme.primary};
        text-decoration: underline;
        i {
          margin-right: 8px;
        }
      }
    }
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
    font-size: ${({ theme }) => theme.hSize};
    text-align: center;
    font-weight: bold;
    &:first-letter {
      text-transform: uppercase;
    }
  }
`
