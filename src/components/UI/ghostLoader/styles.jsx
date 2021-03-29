import styled from 'styled-components'

export const GhostWrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  height: 100px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  justify-content: space-between;
  .circle {
    opacity: 0.4;
    flex-basis: 50px;
    flex-grow: 1;
  }
  .bars {
    padding-right: 3rem;
    flex-basis: 60px;
    flex-grow: 6;
    width: 100%;
    overflow: hidden;
    span {
      opacity: 0.4;
      margin: 10px 0;
    }
  }
`

export const GhostBar = styled.span`
  width: ${({ width }) => width};
  position: relative;
  display: block;
  opacity: ${({ opacity }) => opacity};
  height: ${({ height }) => height};
  background: #ffffff52;
  overflow: hidden;
  margin-bottom: 0.6rem;
  border-radius: ${({ radius }) => radius};
  &:before {
    content: '';
    display: block;
    width: ${({ width }) => width};
    height: ${({ circle, height }) => (circle ? '100%' : height)};
    background: #ffffff52;
    background: linear-gradient(
      to right,
      rgba(238, 238, 238, 1) 0%,
      rgba(229, 229, 229, 1) 33%,
      rgba(224, 224, 224, 1) 52%,
      rgba(229, 229, 229, 1) 73%,
      rgba(238, 238, 238, 1) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation-name: loading;
    animation-name: loading;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkist-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  @-webkit-keyframes loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  @keyframes loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  .ghost-container {
    position: relative;
    overflow: hidden;
    height: 100px;
    border-radius: 8px;
    max-width: 400px;
  }
  .ghost-stripe {
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: #eeeeee;
  }
  .ghost-stripe:before {
    content: '';
    display: block;
    width: 200px;
    height: 100%;
    background: #eeeeee;
    background: linear-gradient(
      to right,
      rgba(238, 238, 238, 1) 0%,
      rgba(229, 229, 229, 1) 33%,
      rgba(224, 224, 224, 1) 52%,
      rgba(229, 229, 229, 1) 73%,
      rgba(238, 238, 238, 1) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation-name: loading;
    animation-name: loading;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkist-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }
`
