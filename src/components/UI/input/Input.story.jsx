import React from 'react'
import FormInput from '.'
import { action } from '@storybook/addon-actions'

const options = {
  title: 'FormInput container',
  component: FormInput
}

const Template = args => (
  <FormInput {...args}>
    <input type='text' />
  </FormInput>
)

export const BasicUse = Template.bind({})
BasicUse.args = {
  label: 'da FormInput!'
}

export const WithSelect = () => (
  <FormInput label='with selector'>
    <select
      onChange={action('event trigered')}
      placeholder='algun listado por seleccionar'
    >
      <option value='0' disabled>
        Selecciona una opcion
      </option>
      <option value='1'>opcion uno</option>
      <option value='2'>opcion dos</option>
      <option value='3'>opcion tres</option>
    </select>
  </FormInput>
)

export default options
