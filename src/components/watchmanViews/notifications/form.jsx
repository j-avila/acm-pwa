import moment from 'moment'
import React, { useState } from 'react'
import FormInput from '../../UI/input'
import { FormWrapper } from './styles'
import Select from 'react-select'

export const FormIrrigator = () => {
  const [form, setForm] = useState({
    date: moment().format('YYYY-MM-DD')
  })

  const handleChange = e => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <FormWrapper>
      <FormInput label='Selecciona un canal'>
        <Select
          isMulti
          options={[]}
          classNamePrefix='select'
          placeholder='¿A que canal quieres notificar?'
          onChange={e => console.log(e)}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Tipo de mensaje'>
        <Select
          options={[]}
          classNamePrefix='select'
          placeholder='Selecciona un tipo'
          onChange={e => console.log(e)}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Fecha de activación'>
        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='elige una hora para el envío'>
        <input
          type='time'
          name='hour'
          value={form.hour}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='Descripción de la solicitud de atención'>
        <textarea name='content' onChange={handleChange} />
      </FormInput>
    </FormWrapper>
  )
}

export const FormWatchman = () => {
  const [form, setForm] = useState({
    date: moment().format('YYYY-MM-DD')
  })

  const handleChange = e => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <FormWrapper>
      <FormInput label='Selecciona un canal'>
        <Select
          isMulti
          options={[]}
          classNamePrefix='select'
          placeholder='¿A que canal quieres notificar?'
          onChange={e => console.log(e)}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Selecciona los regantes a notificar'>
        <Select
          isMulti
          options={[]}
          classNamePrefix='select'
          placeholder='Todos'
          onChange={e => console.log(e)}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Tipo de mensaje'>
        <Select
          isMulti
          options={[]}
          classNamePrefix='select'
          placeholder='Selecciona un tipo'
          onChange={e => console.log(e)}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Fecha de activación'>
        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='elige una hora para el envío'>
        <input
          type='time'
          name='hour'
          value={form.hour}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='Descripción de la solicitud de atención'>
        <textarea name='content' onChange={handleChange} />
      </FormInput>
    </FormWrapper>
  )
}
