import React, { useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import Modal from '../UI/modal'
import { DeatilWrapper, Detail, Row, ModalContent } from './styles'
import { useHistory } from 'react-router'

const DebtDetail = props => {
  const { debt } = props
  const history = useHistory()
  const [modal, showModal] = useState(false)
  return (
    <>
      <UserWrapper pathName='Detalle Deuda'>
        <DeatilWrapper>
          <h1>{debt.title}</h1>
          <Detail>
            <Row>
              <strong>código de regante</strong> <span>{debt.code}</span>
            </Row>
            <Row>
              <strong>código de regante</strong> <span>{debt.channel}</span>
            </Row>
            <Row>
              <strong>Plazo máximo</strong> <span>{debt.dueDate}</span>
            </Row>
            <h2>{`Total ${debt.payed ? 'pagado' : 'a pagar'}: $${
              debt.amount
            }`}</h2>
          </Detail>
          <Card className='info'>
            <i className='fas fa-info-circle' />
            <p>
              Acércate a nuestras oficinas para realizar el pago de tu cuota o
              realiza una transferencia bancaria
            </p>
          </Card>
          <Button width='80%' display='block' onClick={() => showModal(!modal)}>
            datos para transferencias
          </Button>
          <Button
            width='80%'
            display='block'
            onClick={() => history.push('/solicitudes/new')}
          >
            ¿Dudas acerca de esta deuda?
          </Button>
        </DeatilWrapper>
      </UserWrapper>
      {modal && (
        <Modal closeAction={showModal}>
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
    payed: false,
    amount: '999.99'
  }
}

export default DebtDetail
