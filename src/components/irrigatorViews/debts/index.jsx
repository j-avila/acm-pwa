/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import UserWrapper from '../../hoc/userWrapper'
import Tabs, { Panel } from '../../UI/tabs'
import Button from '../../UI/button'
import Accordion from '../../UI/accordion'
import List from '../../UI/list'
import { DebtWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getDebts, getPayedDebts } from '../../../store/actions/debts'

const Debts = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const debts = useSelector(({ debts }) => debts.debtsList)
  const payed = useSelector(({ debts }) => debts.payedDebts)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const userData = useSelector(({ user }) => user)
  const [debtsToPay, setToPay] = useState({
    toPay: [],
    expired: []
  })
  const [payedDebts, setPayed] = useState([])

  const handleItem = ({ id }) => {
    // alert(id)
    const debtDetail = debts.filter(i => i.id === id)
    history.push({
      pathname: `/deudas/${id}`,
      state: { type: 'notpayed', data: debtDetail[0] }
    })
  }
  const handlePayed = id => {
    // alert(id)
    const debtDetail = payed.filter(i => i.id === id)
    console.log(debtDetail)
    history.push({
      pathname: `/deudas/${id}`,
      state: { type: 'payed', data: debtDetail[0] }
    })
  }

  useEffect(() => {
    codeActive && dispatch(getDebts(codeActive))
    codeActive && dispatch(getPayedDebts(codeActive))
  }, [codeActive])

  useEffect(() => {
    if (debts && debts.length >= 1) {
      const currentYear = moment().format('YYYY')
      let results = arr =>
        arr.map(item => ({
          id: item.id,
          overdue:
            moment(item.expiration).format('YYYY') === currentYear
              ? false
              : true,
          title: `periodo: ${item.year}`,
          subtitle: `Vence el: ${moment(item.expiration).format('DD/MM/YYYY')}`
        }))

      setToPay({
        toPay: results(debts).filter(e => !e.overdue),
        expired: results(debts).filter(e => e.overdue)
      })
    }
  }, [debts])

  useEffect(() => {
    if (payed && payed.length >= 1) {
      const currentYear = moment().format('YYYY')
      let results = arr =>
        arr.map(item => ({
          id: item.id,
          overdue:
            moment(item.expiration).format('YYYY') === currentYear
              ? false
              : true,
          title: `periodo: ${item.year}`,
          subtitle: `Vence el: ${moment(item.expiration).format('DD/MM/YYYY')}`
        }))

      setPayed(results(payed).filter(e => e.overdue))
    }
  }, [payed])

  return (
    <UserWrapper pathName='Deudas'>
      <DebtWrapper>
        <Tabs selected={0}>
          <Panel title='por pagar'>
            <List items={debtsToPay.expired} action={handleItem} />
          </Panel>
          <Panel title='pagado'>
            <List items={payedDebts} action={handlePayed} />
          </Panel>
        </Tabs>
        <Button
          width='80%'
          display='block'
          onClick={() => history.push({ pathname: '/reporte' })}
        >
          Enviar Reporte de Pago
        </Button>
      </DebtWrapper>
    </UserWrapper>
  )
}

export default Debts
