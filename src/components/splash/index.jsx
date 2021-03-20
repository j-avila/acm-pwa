/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Logo from '../../assets/logo.png'
import { Wrapper } from './styles'

const Splash = props => {
  const history = useHistory()

  const session = localStorage.getItem('session')

  useEffect(() => {
    session ? history.push('/panel-de-control') : history.push('/inicio')
  }, [])

  return (
    <Wrapper>
      <div id='brand'>
        <img id='logo' src={Logo} alt='canal maule' />
        <div className='loader'>
          <i className='fas fa-circle-notch fa-spin'></i>
          <h4>Cargando</h4>
        </div>
      </div>
    </Wrapper>
  )
}

Splash.propTypes = {
  props: PropTypes.object
}

export default Splash
