import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Fondo from '../../../assets/background.png'

import { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import theme from './theme.json'
import darkTheme from './darkTheme.json'
import { reset } from './reset'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

export const GlobalStyles = createGlobalStyle`
  body{
    ${reset}
    background: ${({ dark }) => (dark ? 'none' : `url(${Fondo})`)};
    background-color: ${({ theme }) => theme.background};
    background-size: cover;
    font-size: ${({ theme }) => theme.pSize};
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
      font-size: ${({ theme }) => theme.hSize};
      letter-spacing: 0.25px;
    }
    h2{
      font-size: ${({ theme }) => theme.h2Size};
    }
    h3{
      font-size: ${({ theme }) => theme.h3Size};
    }
    p, label, strong {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.pSize};
      font-family: 'Open Sans', 'Sans-serif';
    }
    a:hover {
      cursor: pointer;
    }
  }
`
export const ThemeWrapper = ({ children }) => {
  const user = useSelector(({ user }) => user)
  const [userTheme, setTheme] = useState()

  const setTxtSize = size => {
    let txtSizes

    switch (size) {
      case 'medium':
        txtSizes = {
          hSize: '35px !important',
          h2Size: '24px !important',
          h3Size: '20px !important',
          pSize: '16px !important'
        }
        break
      case 'large':
        txtSizes = {
          hSize: '42px !important',
          h2Size: '30px !important',
          h3Size: '26px !important',
          pSize: '18px !important'
        }
        break

      default:
        txtSizes = {
          hSize: '22px !important',
          h2Size: '18px !important',
          h3Size: '16px !important',
          pSize: '13px !important'
        }
        break
    }
    return txtSizes
  }

  const genTheme = () => {
    let UTheme = user?.app_setting?.theme === '1' ? darkTheme : theme

    const txtSize = setTxtSize(user?.app_setting?.size)
    setTheme({ ...UTheme, ...txtSize })
  }

  useEffect(() => {
    user?.app_setting && genTheme()
  }, [])

  useEffect(() => {
    user?.app_setting && genTheme()
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
        <GlobalStyles />
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
