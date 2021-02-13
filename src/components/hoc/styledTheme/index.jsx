import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import theme from './theme.json'
import { reset } from './reset'
import { Helmet } from 'react-helmet'

const bodyStyles = css`
  ${reset}
  h1,h2,h3,h4 {
    &:first-letter {
      text-transform: capitalize;
    }
  }
`

export const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${theme.background};
    color: ${theme.text};
    font-family: 'Open Sans', 'Sans-serif';
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
