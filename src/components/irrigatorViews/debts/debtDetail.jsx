import React, { useEffect, useState } from 'react'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import Modal from '../../UI/modal'
import { DeatilWrapper, Detail, Row, ModalContent } from './styles'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

const DebtDetail = props => {
  const { debt, location } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const userData = useSelector(({ user }) => user)
  const [modal, showModal] = useState(false)
  const [state, setState] = useState({})
  const debtData = location.state.data

  const copyBank = () => {
    showModal(false)
  }

  useEffect(() => {
    if (debtData) {
      setState(debtData)
    }
  }, [])

  // useEffect(() => {
  //   debtsFetched.hasOwnProperty('expiration') && setState(debtsFetched)
  // }, [debtsFetched])

  return (
    <>
      <UserWrapper
        pathName={`${
          location.state.type === 'payed' ? 'Cuotas Pagadas' : 'Detalle Deuda'
        }`}
      >
        <DeatilWrapper>
          <h1>{debtData.title}</h1>
          <Detail>
            <Row>
              <strong>Código de regante:</strong> <span>{debtData.code}</span>
            </Row>
            <Row>
              <strong>Canal:</strong> <span>{userData.acm.channel}</span>
            </Row>
            <Row>
              <strong>Fecha:</strong>
              <span>{debtData.expiration}</span>
            </Row>
            {location.state.type === 'payed' && (
              <h3>{`Monto Cancelado: ${debtData.coin || '$'} ${
                debtData.amount
              }`}</h3>
            )}
            {location.state.type === 'payed' ? (
              <h2>{`Estado: pagado`}</h2>
            ) : (
              <h2>{`Total a pagar: ${debtData.coin} ${debtData.amount}`}</h2>
            )}
          </Detail>
          <Card className='info'>
            <i className='fas fa-info-circle' />
            <p>
              Acércate a nuestras oficinas para realizar el pago de tu cuota o
              realiza una transferencia bancaria
            </p>
          </Card>
          {location.state.type !== 'payed' && (
            <Button
              width='80%'
              display='block'
              onClick={() => showModal(!modal)}
            >
              Datos para transferencia bancaria
            </Button>
          )}
          <Button
            width='80%'
            display='block'
            onClick={() => history.push({ pathname: '/deudas/new' })}
          >
            Solicitar Reporte de Deuda
          </Button>
        </DeatilWrapper>
      </UserWrapper>
      {modal && (
        <Modal action={copyBank} txtAction='copiar'>
          <ModalContent>
            <h1>Datos para transferir</h1>
            <p>
              <strong>Banco: </strong> banco del desarrollo
            </p>
            <p>
              <strong>Cuenta corriente: </strong>002304547
            </p>
            <p>
              <strong>RUT: </strong>7.345.567-3
            </p>
            <p>
              <strong>correo electrónico: </strong>pagos@canaldelmaule.cl
            </p>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

DebtDetail.defaultProps = {
  debt: {
    title: 'Deuda primer semestre 2020',
    code: 123,
    channel: 'Vergara',
    dueDate: '12-12-2020',
    payed: true,
    amount: '999.999'
  }
}

export default DebtDetail
