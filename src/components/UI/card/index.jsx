import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const Card = ({ children, className, title, onClick, notifications }) => {
  return (
    <Wrapper id='card' className={className} onClick={onClick}>
      {title && (
        <header>
          <h3>{title}</h3>
          <span>
            {notifications >= 1 && (
              <span className='notification'>{notifications}</span>
            )}
            {onClick && <i className='fa fa-chevron-right' />}
          </span>
        </header>
      )}
      {children}
    </Wrapper>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  notifications: PropTypes.number
}

export default Card
