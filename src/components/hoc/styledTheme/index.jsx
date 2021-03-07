import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Fondo from '../../../assets/background.png'

import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import theme from './theme.json'
import { reset } from './reset'
import { Helmet } from 'react-helmet'

const bodyStyles = css`
  ${reset}
  background: url(${Fondo});
  background-size: cover;
  color: ${theme.text};
  font-family: 'Open Sans', 'Sans-serif';
  h1,
  h2,
  h3,
  h4,
  button {
    font-family: 'Open Sans', 'Sans-serif';
    &:first-letter {
      text-transform: capitalize;
    }
  }
  h1{
    font-size: 22px;
    letter-spacing: 0.25px;
  }
  h2{
    font-size: 18px;
  }
  h3{
    font-size: 16px;
  }
  p {
    font-size: 16px;
    font-family: 'Open Sans', 'Sans-serif';
  }
`

export const GlobalStyles = createGlobalStyle`
  body{
    ${bodyStyles}
  }
`
export const ThemeWrapper = ({ children }) => (
  <>
    <Helmet>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap'
        rel='stylesheet'
      />
      <script
        src='https://kit.fontawesome.com/acc0890c64.js'
        crossorigin='anonymous'
      ></script>
    </Helmet>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </>
)

ThemeWrapper.propTypes = {
  children: PropTypes.node
}

ThemeWrapper.defaultProps = {
  children: null
}

export default ThemeWrapper
