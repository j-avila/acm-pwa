import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  color: white;
  z-index: 10;
  width: 100%;
  .head {
    width: 100%;
    z-index: 2;
    position: fixed;
    padding: 0;
    background: ${({ theme }) => theme.blueGradient};
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    align-items: center;
    display: ${({ menu }) => (menu ? 'grid' : 'block')};
    grid-template-columns: ${({ menu }) => (menu ? '.2fr 2fr .2fr' : 'unset')};
    .title {
      text-align: center;
      padding: 12px 0;
    }
    .back {
      padding: 8px;
      font-size: large;
    }
  }
  .user {
    display: flex;
    justify-content: flex-start;
    z-index: 1;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 15px 4vw;
    padding-top: 60px;
    text-align: left;
    background: ${({ theme }) => theme.secondary};
    figure {
      margin-right: 1rem;
    }
    h3 {
      font-size: 20px;
    }
  }
  .action-zone {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    i.notification-but {
      margin-right: 12px;
      font-size: xx-large;
    }
  }
`
