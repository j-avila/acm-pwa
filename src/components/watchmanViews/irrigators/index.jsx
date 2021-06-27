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
      subtitle: item.code,
      slow_payer: item.slow_payer
    }))
    listed && setList(list)
  }

  const fetchIrrigators = (from, to) => {
    dispatch(getIrrigatorsList(from, to))
  }

  useEffect(() => {
    const role = userLogged.role.name
    dispatch(userDataHandler(role, codeActive))
    fetchIrrigators()
    dispatch(getChannels())
  }, [])

  useEffect(() => {
    if (filter.name.length >= 4 || filter.channel >= 1) {
      dispatch(filterIrrigatorsList(0, 20, filter.name, filter.channel))
    } else if (filter.name.length === 0 || !filter.channel) {
      fetchIrrigators()
    }
  }, [filter])

  useEffect(() => {
    if (channelsList.length >= 1) {
      let list = channelsList.map(channel => ({
        label: channel.name,
        value: channel.code
      }))
      setChannels(list)
    }
  }, [channelsList])

  useEffect(() => {
    genList(usersList.data)
  }, [usersList.data])

  return (
    <UserWrapper pathName='Regantes'>
      <IrrigatorsWrapper>
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
        <List
          items={irrigators}
          action={handleItem}
          refresh={fetchIrrigators}
          count={usersList.count}
          listed
        />
      </IrrigatorsWrapper>
    </UserWrapper>
  )
}

export default Irrigators
