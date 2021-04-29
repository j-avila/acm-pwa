import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const Card = ({
  children,
  className,
  title,
  subTitle,
  onClick,
  notifications
}) => {
  return (
    <Wrapper id='card' className={className} onClick={onClick}>
      {title && (
        <header>
          <div>
            <h3>{title}</h3>
            {subTitle && <p>{subTitle}</p>}
          </div>
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
