import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../UI/card'
import UserWrapper from '../hoc/userWrapper'

const Dashboard = () => {
  const history = useHistory()

  return (
    <UserWrapper>
      <Dash>
        <Card className='stat-card'>
          <header>
            <h3>Información del canal</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Caudal:</strong>
            <h1>123.456 1395 Litros/segundo</h1>
          </section>
          <footer>Actualizado al 28 de octubre 2020</footer>
        </Card>

        <Card className='stat-card'>
          <header
            onClick={() => {
              history.push('/solicitudes')
            }}
          >
            <h3>Solicitudes/Reclamos</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Próxima visita programada:</strong>
            <h1>Celador: Jorge Ortiz</h1>
          </section>
          <footer>Actualizado al 28 de octubre 2020</footer>
        </Card>

        <Card className='stat-card'>
          <header>
            <h3>Deuda</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Deuda total:</strong>
            <h1>$ 0</h1>
          </section>
          <footer>Último pago: 12 de abril</footer>
        </Card>

        <Card className='stat-card'>
          <header>
            <h3>Acciones</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Disponible:</strong>
            <h1>13.4 Acciones</h1>
          </section>
        </Card>
      </Dash>
    </UserWrapper>
  )
}

export default Dashboard
