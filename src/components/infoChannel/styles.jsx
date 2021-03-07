import styled from 'styled-components'

export const InfoWrapper = styled.div`
  position: relative;
  #card {
    margin: 1rem auto;
    &.alert {
      background: tomato;
      i {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
      article {
        h3 {
          color: white;
          margin-bottom: 1rem;
        }
        display: block;
        color: white;
      }
      .fa-times {
        font-size: 20px;
        color: white;
        position: absolute;
        top: 5%;
        right: 5%;
      }
    }
  }
`
export const Content = styled.article`
  display: grid;
  grid-template-columns: 8fr 2fr;
  span {
    &:first-child {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: center;
      i {
        font-size: x-large;
        color: ${({ theme }) => theme.secondary};
      }
    }
  }
  h3 {
    color: ${({ theme }) => theme.secondary};
  }
`
