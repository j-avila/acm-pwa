/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../../hoc/userWrapper'
import List from '../../UI/list'
import { IrrigatorsWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import FormInput from '../../UI/input'
import { userDataHandler } from '../../../store/actions/login'

const Irrigators = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const usersList = useSelector(({ login }) => login)
  const [irrigators, setList] = useState([])
  const [filter, setFilter] = useState('')
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const handleItem = ({ id, code }) => {
    const detail = usersList.association_user.assigned_irrigators.filter(
      i => i.code === id
    )
    // console.log(detail)
    history.push({
      pathname: `/regante/${id}`,
      state: { type: 'notpayed', data: detail[0] }
    })
  }

  const genList = inputList => {
    if (
      inputList.hasOwnProperty('association_user') &&
      inputList.association_user.assigned_irrigators
    ) {
      const listed = inputList.association_user.assigned_irrigators
      const list = listed.map(item => ({
        id: item.code,
        title: item.name,
        subtitle: item.code
      }))
      listed && setList(list)
    }
  }

  useEffect(() => {
    const role = userLogged.role.name
    dispatch(userDataHandler(role))
  }, [])

  useEffect(() => {
    genList(usersList)
  }, [usersList])

  useEffect(() => {
    if (filter.length >= 4) {
      const filtered = irrigators.filter(
        user => user.title.toLowerCase().indexOf(filter) !== -1
      )

      setList(filtered)
    } else if (filter.length === 0) {
      genList(usersList)
    }
  }, [filter])

  return (
    <UserWrapper pathName='Regantes'>
      <IrrigatorsWrapper>
        <FormInput label='Buscar por Nombre:' className='searchbar'>
          <input value={filter} onChange={e => setFilter(e.target.value)} />
          <i className='fa fa-close' onClick={() => setFilter('')} />
        </FormInput>
        <List items={irrigators} action={handleItem} />
      </IrrigatorsWrapper>
    </UserWrapper>
  )
}

export default Irrigators
