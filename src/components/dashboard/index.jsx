import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../UI/card'
import UserWrapper from '../hoc/userWrapper'

const Dashboard = props => {
  const history = useHistory()
  useEffect(() => {
    console.log(props.location)
  }, [])
  return (
    <UserWrapper>
      <Dash>
        <Card className='stat-card'>
          <header onClick={() => history.push('/informacion')}>
            <h3>Información del canal</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Caudal Diario: Canal Vergara</strong>
            <h1>1209 l/s</h1>
          </section>
          <footer>Actualizado al 28 de octubre 2020</footer>
        </Card>

        <Card className='stat-card visits'>
          <header
            onClick={() => {
              history.push('/solicitudes')
            }}
          >
            <h3>Solicitudes/Reclamos</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <span>
              <strong>Pendientes</strong>
              <h1>12</h1>
            </span>
            <span>
              <strong>Cerradas</strong>
              <h1>4</h1>
            </span>
          </section>
        </Card>

        <Card className='stat-card'>
          <header
            onClick={() => {
              history.push('/visitas')
            }}
          >
            <h3>Visitas</h3>
            <i className='fa fa-chevron-right' />
          </header>
          <section>
            <strong>Próxima visita programada:</strong>
            <h1>14 de abril 14:00</h1>
          </section>
          <footer>Celador: Jorge Ortiz</footer>
        </Card>

        <Card className='stat-card'>
          <header onClick={() => history.push('/deudas')}>
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
