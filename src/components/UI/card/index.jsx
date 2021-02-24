import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const Card = ({ children, className }) => {
  return (
    <Wrapper id='card' className={className}>
      {children}
    </Wrapper>
  )
}

Card.propTypes = {
  children: PropTypes.node
}

export default Card
