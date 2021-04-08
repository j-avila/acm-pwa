import React, { Fragment, useState, useEffect } from 'react'
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
  const user = useSelector(({ user }) => user)
  const [userTheme, setTheme] = useState()

  const genTheme = () => {
    let UTheme =
      user.profile &&
      user.profile.hasOwnProperty('app_setting') &&
      user.profile.app_setting.theme === '1'
        ? darkTheme
        : theme
    setTheme(UTheme)
  }

  useEffect(() => {
    user.hasOwnProperty('profile') && genTheme()
  }, [])

  useEffect(() => {
    user.hasOwnProperty('profile') && genTheme()
  }, [user])

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
      <ThemeProvider theme={userTheme || theme}>
        <GlobalStyles
          dark={
            user.profile &&
            user.profile.hasOwnProperty * 'app_setting' &&
            user.profile.app_setting.theme === '1'
              ? true
              : false
          }
          txtSize={
            user.profile && user.profile.hasOwnProperty('app_setting')
              ? user.profile.app_setting.size
              : '16px'
          }
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
