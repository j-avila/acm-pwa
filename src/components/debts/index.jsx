/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'
import Button from '../UI/button'
import Accordion from '../UI/accordion'
import List from '../UI/list'
import { DebtWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getDebts, getPayedDebts } from '../../store/actions/debts'

const Debts = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const debts = useSelector(({ debts }) => debts.debtsList)
  const loading = useSelector(({ loading }) => loading)
  const userData = useSelector(({ user }) => user)
  const [debtsToPay, setToPay] = useState({
    toPay: [],
    expired: []
  })
  const [payedDebts, setPayed] = useState([])

  const handleItem = id => {
    // alert(id)
    const debtDetail = debts.filter(i => i.id === id)
    history.push({
      pathname: `/deudas/${id}`,
      state: { type: 'notpayed', data: debtDetail[0] }
    })
  }
  const handlePayed = id => {
    // alert(id)
    history.push({
      pathname: `/deudas/${id}`,
      state: { type: 'payed' }
    })
  }

  useEffect(() => {
    dispatch(getDebts(userData.code))
    dispatch(getPayedDebts(userData.code))
  }, [])

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

  return (
    <UserWrapper pathName='Deudas'>
      <DebtWrapper>
        <Tabs selected={0}>
          <Panel title='por pagar'>
            <Accordion
              title={`próximas a vencer (${debtsToPay.toPay.length})`}
              openend
            >
              <List items={debtsToPay.toPay} action={handleItem} />
            </Accordion>
            <Accordion title={`vencidas (${debtsToPay.expired.length})`}>
              <List items={debtsToPay.expired} action={handleItem} />
            </Accordion>
          </Panel>
          <Panel title='pagado'>
            <List items={payedDebts} action={handlePayed} />
          </Panel>
        </Tabs>
        <Button
          width='80%'
          display='block'
          onClick={() => history.push({ pathname: '/deudas/new' })}
        >
          Solicitar Reporte de Deuda
        </Button>
      </DebtWrapper>
    </UserWrapper>
  )
}

export default Debts
