import styled from 'styled-components'
import { darken } from 'polished'

export const ChatWrapper = styled.div`
  overflow-x: auto;
  max-height: 400px;
  min-height: 56vh;
  span {
    display: block;
    /* margin: 1rem 0; */
    position: relative;
    background: ${({ theme }) => {
      const bg = darken(0.2, theme.background)
      return bg
    }};
    /* padding: 12px; */
    border-radius: 8px;
  }
`

export const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ direction }) => direction};
`

export const Bubble = styled.span`
  position: relative;
  margin: 40px 0;
  display: inline-block;
  position: relative;
  max-width: 200px;
  height: auto;
  padding: 1rem;
  color: white;
  font-size: 15px;
  &.rightSided {
    background: ${({ theme }) => theme.secondary};
    text-align: right;
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
    text-align: left;
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
    text-align: left;
    i {
      padding: 10px 12px;
      margin-right: 12px;
      background: ${({ theme }) => theme.primary};
      border-radius: 50%;
      color: white;
    }
  }
  .meta {
    font-size: xx-small;
    color: #d6d6d6;
    background: none;
  }
  h4 {
    color: white;
    font-size: small;
    font-weight: bold;
  }
`

export const Message = styled.form`
  width: calc(100% - 6px);
  padding: 6px;
  display: grid;
  position: fixed;
  bottom: 0vh;
  left: 45%;
  transform: translateX(-45%);
  grid-template-columns: 1fr 9fr 1fr;
  background: ${({ theme }) => theme.primary};
  /* border-radius: 8px; */
  button {
    padding: 1rem;
    i {
      font-size: large;
    }
  }
  .message-holder {
    position: relative;
    padding: 2px 6px;
    border: 0;
    border-radius: 8px;
    background: ${({ theme }) => theme.background};
    display: grid;
    grid-template-columns: 1fr 9fr;
    .attach-preview {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      img {
        height: 100%;
        margin: 0 auto;
        display: block;
      }
      i {
        position: absolute;
        padding: 6px 8px;
        top: 0px;
        left: 0px;
        border-radius: 50%;
        background: red;
        color: white;
      }
    }
    input {
      border: 0;
      outline: 0;
      padding: 0 12px;
      color: ${({ theme }) => theme.text};
      background: transparent;
      &:focus,
      &:active {
        border: 0;
        outline: 0;
      }
    }
  }
`

export const FileAdd = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  i {
    margin: 0 auto;
    font-size: large;
    padding: 1rem;
    color: ${({ theme }) => theme.background};
  }
`

export const ActionArea = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  bottom: 100%;
  padding: 1rem 0;
  align-content: center;
  background: ${({ theme }) => {
    let bgcolor = darken(0.2, theme.background)
    return bgcolor
  }};
  span {
    text-align: center;
    display: inline-block;
    font-size: x-small;
    max-width: 20%;
    button {
      margin: 8px auto;
      padding: 10px;
      border-radius: 50%;
      i {
        font-size: large;
      }
    }
  }
  .btn-send {
    padding: 12px 40px;
  }
`
