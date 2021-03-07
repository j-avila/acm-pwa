import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  .toggle-volume {
    position: absolute;
    top: 2vh;
    left: 2vw;
    z-index: 10;
    i {
      font-size: xx-large;
    }
  }
  .slick-slider {
    .slick-next {
      right: 2vh;
    }
    .slick-prev {
      left: 2vh;
      z-index: 10;
    }
    .slick-dots {
      bottom: 2vh;
      li button {
        &:before {
          font-size: 15px;
        }
      }
    }
  }
`

export const Slide = styled.div`
  height: 100vh;
  background: ${({ bgImg }) => `url(${bgImg})`};
  p {
    text-align: center;
    position: relative;
    color: white;
    padding: 3rem;
    font-size: large;
    top: 50%;
    transform: translateY(-50%);
    button {
      margin-top: 2rem;
    }
  }
`

export const FormWrapp = styled.form`
  .form-input {
    margin-top: 12px;
    label {
      text-align: left !important;
    }
  }
`
