import styled from 'styled-components'

export const ChatWrapper = styled.div`
  overflow-x: auto;
  max-height: 400px;
`

export const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ direction }) => direction};
`

export const Bubble = styled.span`
  position: relative;
  margin: 40px;
  display: inline-block;
  position: relative;
  width: 200px;
  height: auto;
  padding: 1rem;
  color: white;
  &.rightSided {
    background: ${({ theme }) => theme.secondary};
    &:after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      left: auto;
      right: 0px;
      bottom: -20px;
      border: 12px solid;
      border-color: ${({ theme }) => {
        const color = `${theme.secondary} ${theme.secondary} transparent transparent`
        return color
      }};
    }
  }
  &.leftSided {
    background: ${({ theme }) => theme.primary};
    &:after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
      left: 0px;
      right: auto;
      top: auto;
      bottom: -20px;
      border: 22px solid;
      border-color: ${({ theme }) => {
        const color = `transparent transparent transparent ${theme.primary}`
        return color
      }};
    }
  }
  &.notification {
    width: 100%;
    color: ${({ theme }) => theme.text};
    i {
      padding: 10px 12px;
      margin-right: 12px;
      background: ${({ theme }) => theme.primary};
      border-radius: 50%;
      color: white;
    }
  }
`

export const Message = styled.div`
  padding: 6px;
  display: grid;
  grid-template-columns: 9fr 1fr;
  background: ${({ theme }) => theme.primary};
  border-radius: 8px;
  overflow: hidden;
  i {
    font-size: x-large;
  }
  input {
    padding: 6px;
    border: 0;
    border-radius: 8px;
  }
`
