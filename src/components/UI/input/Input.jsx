import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styles'

const FormInput = props => {
  const { label, children, display } = props
  return (
    <Wrapper display={display}>
      <label htmlFor=''>{label}</label>
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
  label: ''
}

export default FormInput
