import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: block;
  width: calc(100% - 15vw);
  max-width: 80%;
  header {
    display: grid;
    grid-template-columns: 2fr 0.5fr;
    border-bottom: 1px solid grey;
    margin-bottom: 1rem;
    padding: 0 0 0.5rem 0;
    h3 {
      font-size: 18px;
      text-align: left;
    }
    .notification {
      height: 28px;
      width: 28px;
      line-height: 26px;
      display: inline-block;
      margin-right: 10px;
      background: ${({ theme }) => theme.error};
      color: white;
      border-radius: 50%;
      font-weight: bold;
    }
    i {
      font-size: 18px;
      align-self: center;
      text-align: right;
      color: ${({ theme }) => theme.primary};
    }
  }
  @media all and (min-width: 1280px) {
    max-width: 1000px;
  }
`
