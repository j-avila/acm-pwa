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
        <Card
          className='stat-card'
          title='Información del canal'
          notifications={2}
          onClick={() => history.push('/informacion')}
        >
          <section>
            <strong>Caudal Diario: Canal Vergara</strong>
            <h1>1209 l/s</h1>
          </section>
          <footer>Actualizado al 28 de octubre 2020</footer>
        </Card>

        <Card
          className='stat-card visits'
          title='Solicitudes/Reclamos'
          onClick={() => {
            history.push('/solicitudes')
          }}
        >
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

        <Card
          className='stat-card'
          title='Visitas'
          onClick={() => {
            history.push('/visitas')
          }}
        >
          <section>
            <strong>Próxima visita programada:</strong>
            <h1>14 de abril 14:00</h1>
          </section>
          <footer>Celador: Jorge Ortiz</footer>
        </Card>

        <Card
          className='stat-card'
          title='Deuda'
          onClick={() => history.push('/deudas')}
        >
          <section>
            <strong>Deuda total:</strong>
            <h1>$ 0</h1>
          </section>
          <footer>Último pago: 12 de abril</footer>
        </Card>

        <Card className='stat-card' title='Acciones'>
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
