import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const Card = ({ children, id }) => {
  return <Wrapper id={id}>{children}</Wrapper>
}

Card.propTypes = {
  children: PropTypes.node
}

export default Card
