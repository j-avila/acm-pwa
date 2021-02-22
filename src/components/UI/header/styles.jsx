import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  color: white;
  z-index: 10;
  .head {
    z-index: 2;
    position: relative;
    padding: 0;
    background: ${({ theme }) => theme.blueGradient};
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    display: ${({ menu }) => (menu ? 'grid' : 'block')};
    grid-template-columns: ${({ menu }) => (menu ? '9fr .3fr' : 'unset')};
    .title {
      text-align: center;
      padding: 12px 0;
    }
  }
  .user {
    z-index: 1;
    margin-top: -10px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 15px;
    background: ${({ theme }) => theme.secondary};
  }
`
