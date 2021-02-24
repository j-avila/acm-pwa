import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'
import Theme from '../../hoc/styledTheme'

const Button = props => {
  const {
    children,
    background,
    color,
    onClick,
    width,
    display,
    shadow,
    disabled
  } = props

  return (
    <Theme>
      <Wrapper
        background={background}
        color={color}
        onClick={onClick}
        width={width}
        display={display}
        shadow={shadow}
        disabled={disabled ? 'disabled' : ''}
      >
        {children}
      </Wrapper>
    </Theme>
  )
}

Button.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  action: PropTypes.func,
  width: PropTypes.string,
  display: PropTypes.string,
  shadow: PropTypes.bool,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  background: 'primary',
  color: 'white',
  onClick: e => console.log(e),
  width: 'max-content',
  display: 'inline-block',
  shadow: false,
  disabled: false
}

export default Button
