import styled from 'styled-components'

export const UserPicture = styled.figure`
  overflow: hidden;
  border-radius: 10%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0px;
  /* border: 1px solid white; */
  background: ${({ theme }) => theme.background};
  text-align: 'center';
  img {
    height: 100%;
    margin: 0 auto;
    /* transform: translate(-20%, 0%); */
  }
`
