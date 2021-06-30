/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../../hoc/userWrapper'
import List from '../../UI/list'
import { IrrigatorsWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../../UI/input'
import { userDataHandler } from '../../../store/actions/login'
import {
  filterIrrigatorsList,
  getIrrigatorsList
} from '../../../store/actions/irrigator'
import Select from 'react-select'
import { getChannels } from '../../../store/actions/dashboard'
import { removeDuplicates } from '../../hoc/utils'

const Irrigators = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const usersList = useSelector(({ irrigators }) => irrigators)
  const channelsList = useSelector(({ channelsList }) => channelsList)
  const [irrigators, setList] = useState([])
  const [filter, setFilter] = useState({ name: '', channel: undefined })
  const userLogged = JSON.parse(localStorage.getItem('userActive'))
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [channels, setChannels] = useState([])
  const user = useSelector(({ user }) => user)

  const handleItem = ({ id, code }) => {
    const detail = usersList.data.filter(i => i.code === id)
    // console.log(detail)
    history.push({
      pathname: `/regante/${id}`,
      state: { type: 'notpayed', data: detail[0] }
    })
  }

  const genList = inputList => {
    const listed = inputList
    const list = listed.map(item => ({
      id: item.code,
      title: item.name,
      subtitle: item.code
    }))
    listed && setList(list)
  }

  useEffect(() => {
    const role = userLogged.role.name
    dispatch(userDataHandler(role, codeActive))
    dispatch(getIrrigatorsList())
    dispatch(getChannels())
  }, [])

  useEffect(() => {
    if (filter.name.length >= 4 || filter.channel >= 1) {
      console.log(filter)
      dispatch(filterIrrigatorsList(0, 20, filter.name, filter.channel))
    } else if (filter.name.length === 0 || !filter.channel) {
      dispatch(getIrrigatorsList())
    }
  }, [filter])

  useEffect(() => {
    genList(usersList.data)
  }, [usersList.data])
 

  useEffect(() => {
    if (channelsList.length >= 1) {

      let channelsList = removeDuplicates(
        user.assigned_irrigators,
        item => item.channel
      )

      let list = channelsList.map(channel => ({
        label: channel.channel_name,
        value: channel.channel
      }))
      setChannels(list)
    }
  }, [channelsList])




  return (
    <UserWrapper pathName='Regantes'>
      <IrrigatorsWrapper>
        <center>
        <FormInput label='Buscar por Nombre:' className='searchbar'>
          <input
            value={filter.name}
            onChange={e => setFilter({ ...filter, name: e.target.value })}
          />
          <i
            className='fa fa-close'
            onClick={() => setFilter({ ...filter, name: '' })}
          />
        </FormInput>
        </center>
        <FormInput label='Filtrar por canal:' className='filter'>
          <Select
            id='select'
            classNamePrefix='select'
            placeholder='selecciona un canal'
            options={channels}
            onChange={selected =>
              setFilter({ ...filter, channel: selected.value })
            }
          />
        </FormInput>
        <List items={irrigators} action={handleItem} />
      </IrrigatorsWrapper>
    </UserWrapper>
  )
}

export default Irrigators
