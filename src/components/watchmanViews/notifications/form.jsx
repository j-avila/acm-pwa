import moment from 'moment'
import React, { useEffect, useState } from 'react'
import FormInput from '../../UI/input'
import { FormWrapper } from './styles'
import Select from 'react-select'
import Button from '../../UI/button'

const createLists = (arr, type) => {
  let list
  const value = type === 'channels' ? 'code' : 'id'
  if (arr.length > 0) {
    list = arr?.map(item => ({
      value: item[value],
      label: item.name
    }))
  }
  return list
}

const msgType = [
  { value: 'information', label: 'Información' },
  { value: 'urgent', label: 'Urgente' }
]

export const FormIrrigator = props => {
  const { submitAction, channels } = props
  const [channelsList, setChannelsList] = useState([])
  const [form, setForm] = useState({
    date: moment().format('YYYY-MM-DD'),
    hour: moment().format('HH:mm')
  })

  const handleChange = e => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSelectChange = (list, type) => {
    let values = list?.map(item => item.value)
    setForm({ ...form, [type]: values })
  }

  const handleSubmit = () => {
    submitAction(form)
  }

  useEffect(() => {
    setChannelsList(createLists(channels, 'channels'))
  }, [channels])

  useEffect(() => {
    setForm({ ...form, activation: `${form.date} ${form.hour}` })
  }, [form.hour])

  return (
    <FormWrapper>
      <FormInput label='Selecciona un canal'>
        <Select
          isMulti
          options={channelsList}
          classNamePrefix='select'
          placeholder='¿A que canal quieres notificar?'
          onChange={e => handleSelectChange(e, 'channels')}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Tipo de mensaje'>
        <Select
          options={msgType}
          classNamePrefix='select'
          placeholder='Selecciona un tipo'
          onChange={e => setForm({ ...form, type: e.value })}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Fecha de activación'>
        <input
          type='date'
          name='activation'
          value={form.date}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='Elige una hora para el envío'>
        <input
          type='time'
          name='hour'
          value={form.hour}
          onChange={handleChange}
        />
      </FormInput>
      <FormInput label='Descripción de la solicitud de atención'>
        <textarea name='message' onChange={handleChange} />
      </FormInput>

      <Button className='submit' onClick={handleSubmit}>
        Enviar
      </Button>
    </FormWrapper>
  )
}

export const FormWatchman = props => {
  const { submitAction, watchmans, channels } = props
  const [watchList, setwatchList] = useState([])
  const [channelsList, setChannelsList] = useState([])
  const [form, setForm] = useState({
    date: moment().format('YYYY-MM-DD'),
    hour: moment().format('HH:mm'),
    association_area_code: 'watchman'
  })

  const handleSubmit = () => {
    submitAction(form)
  }

  const handleChange = e => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSelectChange = (list, type) => {
    let values = list?.map(item => item.value)
    setForm({ ...form, [type]: values })
  }

  useEffect(() => {
    setForm({ ...form, activation: `${form.date} ${form.hour}` })
  }, [form.date, form.hour])

  useEffect(() => {
    setwatchList(createLists(watchmans))
    setChannelsList(createLists(channels, 'channels'))
  }, [])

  return (
    <FormWrapper>
      <FormInput label='Selecciona un canal'>
        <Select
          isMulti
          options={channelsList}
          classNamePrefix='select'
          placeholder='¿A que canal quieres notificar?'
          onChange={e => handleSelectChange(e, 'channel_code')}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Selecciona los celadores a notificar'>
        <Select
          isMulti
          options={watchList}
          classNamePrefix='select'
          placeholder='Todos'
          onChange={e => handleSelectChange(e, 'watchman')}
          components={{
            IndicatorSeparator: () => null
          }}
        />
      </FormInput>
      <FormInput label='Tipo de mensaje'>
        <Select
          options={msgType}
          classNamePrefix='select'
          placeholder='Selecciona un tipo'
          onChange={e => setForm({ ...form, type: e.value })}
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
        <textarea name='message' onChange={handleChange} />
      </FormInput>

      <Button className='submit' onClick={handleSubmit}>
        Enviar
      </Button>
    </FormWrapper>
  )
}
