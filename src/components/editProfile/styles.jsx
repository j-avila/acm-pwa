import styled, { ThemeConsumer } from 'styled-components'

export const ProfileWrapper = styled.form`
  position: relative;
  margin: 1rem auto;
  .avatar {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inputForm {
    max-width: 90%;
    margin: 1rem auto;
  }
  label {
    text-align: left;
  }
`

export const Alert = styled.div`
  padding: 8px;
  width: calc(100% - 40px);
  border-radius: 10px;
  background: ${({ theme }) => theme.error};
  color: white;
  margin: 0.5rem auto;
`

export const Title = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 90%;
`
export const ActionArea = styled.div`
  max-width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`
