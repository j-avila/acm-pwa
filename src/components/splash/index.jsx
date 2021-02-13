import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../../assets/logo-acm_.png'
import { Wrapper } from './styles'

const Splash = props => {
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
