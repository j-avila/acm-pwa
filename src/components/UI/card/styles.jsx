import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  padding: 2rem 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: block;
  width: calc(100% - 15vw);
  max-width: 80%;
  header {
    display: grid;
    grid-template-columns: 2fr 0.5fr;
    border-bottom: 1px solid grey;
    margin-bottom: 1rem;
    padding: 8px 0;
    h3 {
      font-size: 18px;
      text-align: left;
    }
    .notification {
      display: inline-block;
      margin-right: 10px;
      background: ${({ theme }) => theme.error};
      color: white;
      padding: 6px 8px;
      border-radius: 50%;
      font-weight: bold;
    }
    i {
      align-self: center;
      text-align: right;
      color: ${({ theme }) => theme.primary};
    }
  }
  @media all and (min-width: 1280px) {
    max-width: 1000px;
  }
`
