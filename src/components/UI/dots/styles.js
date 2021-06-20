import styled from 'styled-components'

export const WrapperDots = styled.div`
  position: realtive;
  top: 50%;
  left: 50%;
  /* height: 250px; */
  /* width: 250px; */
  border-radius: 20px;
  .dot1 {
    position: absolute;
    background: cyan;
    height: 10px;
    width: 10px;
    border: none;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: func 2s linear infinite;
    animation-delay: 0.5s;
  }
  .dot2 {
    animation: func 2s linear infinite;
    animation-delay: 0s;
    position: absolute;
    background: cyan;
    height: 10px;
    width: 10px;
    border: none;
    border-radius: 50%;
    left: 35%;
    top: 50%;
    transform: translate(-35%, -50%);
  }
  .dot3 {
    position: absolute;
    background: cyan;
    height: 10px;
    width: 10px;
    border: none;
    border-radius: 50%;
    left: 65%;
    top: 50%;
    transform: translate(-65%, -50%);
    animation: func 2s linear infinite;
    animation-delay: 1s;
  }
  @keyframes func {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  span {
    position: absolute;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -95%);
    font-size: 10px;
    color: cyan;
    letter-spacing: 2px;
  }
`
