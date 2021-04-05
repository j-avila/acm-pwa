import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Fondo from '../../../assets/background.png'

import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import theme from './theme.json'
import darkTheme from './darkTheme.json'
import { reset } from './reset'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

const bodyStyles = css`
  ${reset}
  background: ${({ dark }) => (dark ? 'none' : `url(${Fondo})`)};
  background-color: ${({ theme }) => theme.background};
  background-size: cover;
  color: ${theme.text};
  font-family: 'Open Sans', 'Sans-serif';
  h1,
  h2,
  h3,
  h4,
  button {
    color: ${({ theme }) => theme.text};
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
  p, label {
    color: ${({ theme }) => theme.text};
    font-size: ${({ txtSize }) => txtSize};
    font-family: 'Open Sans', 'Sans-serif';
  }
`

export const GlobalStyles = createGlobalStyle`
  body{
    ${bodyStyles}
  }
`
export const ThemeWrapper = ({ children }) => {
  const profile = useSelector(({ editProfile }) => editProfile)

  return (
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
      <ThemeProvider
        theme={
          profile.settings && profile.settings.theme === '1' ? darkTheme : theme
        }
      >
        <GlobalStyles
          dark={
            profile.settings && profile.settings.theme === '1' ? true : false
          }
          txtSize={profile.settings ? profile.settings.size : '16px'}
        />
        {children}
      </ThemeProvider>
    </>
  )
}

ThemeWrapper.propTypes = {
  children: PropTypes.node
}

ThemeWrapper.defaultProps = {
  children: null
}

export default ThemeWrapper
