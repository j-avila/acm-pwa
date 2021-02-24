import React from 'react'
import FormInput from '../UI/input'

const ActivateForm = () => {
  return (
    <div>
      <p>
        <strong>
          Hemos enviado un número de confirmación al teléfono +569xxxxxxx.
          Ingrésalo aquí:{' '}
        </strong>
        <FormInput label='Número de activación'>
          <input type='number' />
        </FormInput>
        <a href='#'>Reenviar número</a>
      </p>
    </div>
  )
}

export default ActivateForm
