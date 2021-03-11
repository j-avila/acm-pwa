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
    margin,
    display,
    shadow,
    disabled,
    className,
    type
  } = props

  return (
    <Theme>
      <Wrapper
        type={type}
        className={className}
        background={background}
        color={color}
        onClick={onClick}
        width={width}
        margin={margin}
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
  type: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  action: PropTypes.func,
  width: PropTypes.string,
  margin: PropTypes.string,
  display: PropTypes.string,
  shadow: PropTypes.bool,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  type: 'button',
  className: '',
  background: 'primary',
  color: 'white',
  onClick: e => console.log(e),
  width: 'max-content',
  display: 'inline-block',
  shadow: false,
  disabled: false,
  margin: '0'
}

export default Button
