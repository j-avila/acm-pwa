import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const FormInput = props => {
  const { label, children, display, width, className } = props
  return (
    <Wrapper display={display} width={width} className={className}>
      {label && <label htmlFor=''>{label}</label>}
      {children}
    </Wrapper>
  )
}

FormInput.propTypes = {
  display: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string
}
FormInput.defaultProps = {
  display: 'block',
  children: '',
  width: 'calc(100% - 36px)',
  label: ''
}

export default FormInput
