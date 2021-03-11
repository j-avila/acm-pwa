import React, { useEffect, useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import Modal from '../UI/modal'
import { DeatilWrapper, Detail, Row, ModalContent } from './styles'
import { useHistory } from 'react-router'

const DebtDetail = props => {
  const { debt, location } = props
  const history = useHistory()
  const [modal, showModal] = useState(false)

  const copyBank = () => {
    showModal(false)
  }

  useEffect(() => {
    console.log(location.state)
  })

  return (
    <>
      <UserWrapper
        pathName={`${
          location.state.type === 'payed' ? 'Cuotas Pagadas' : 'Detalle Deuda'
        }`}
      >
        <DeatilWrapper>
          <h1>{debt.title}</h1>
          <Detail>
            <Row>
              <strong>Código de regante:</strong> <span>{debt.code}</span>
            </Row>
            <Row>
              <strong>Celador:</strong> <span>{debt.channel}</span>
            </Row>
            <Row>
              <strong>
                {location.state.type === 'payed' ? 'Estado:' : 'Fecha:'}
              </strong>
              <span>
                {location.state.type === 'payed' && debt.payed
                  ? 'finalizada'
                  : debt.dueDate}
              </span>
            </Row>
            {location.state.type === 'payed' && (
              <h3>{`Monto Cancelado: $${debt.amount}`}</h3>
            )}
            <h2>{`Total a pagar: $${debt.amount}`}</h2>
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
        <Modal action={copyBank} actionTitle='copiar'>
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
