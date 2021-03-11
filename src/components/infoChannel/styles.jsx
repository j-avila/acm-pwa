import styled from 'styled-components'

export const InfoWrapper = styled.div`
  position: relative;
  #card {
    margin: 1rem auto;
  }
  @media all and (min-width: 1280px) {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    #card {
      width: calc(100% - 3rem);
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
    .meta {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      margin: 12px auto;
      text-align: left;
    }
  }
  h3 {
    color: ${({ theme }) => theme.secondary};
  }
`
export const NotificationArea = styled.span`
  .alert {
    margin: 1rem auto;
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
`
