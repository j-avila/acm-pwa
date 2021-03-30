import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../UI/card'
import UserWrapper from '../hoc/userWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { userDataHandler } from '../../store/actions/login'
import { fetchDashboard } from '../../store/actions/dashboard'
import { GhostLine } from '../UI/ghostLoader'

const Dashboard = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashData = useSelector(({ dashboard }) => dashboard)
  const loading = useSelector(({ loading }) => loading)
  const [info, setInfo] = useState()

  useEffect(() => {
    dispatch(userDataHandler())
    dispatch(fetchDashboard())
  }, [])

  return (
    <UserWrapper>
      <Dash>
        {dashData &&
        dashData.hasOwnProperty('requests') &&
        dashData.hasOwnProperty('fees') &&
        dashData.hasOwnProperty('number_of_actions') ? (
          <>
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
                  <h1>{dashData.requests.pending}</h1>
                </span>
                <span>
                  <strong>Cerradas</strong>
                  <h1>{dashData.requests.closed}</h1>
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
                <h1>{`${
                  dashData.fees.total.length >= 1
                    ? dashData.fees.total[0]._id
                    : ''
                } ${
                  dashData.fees.total.length >= 1
                    ? dashData.fees.total[0].totalSum
                    : 0
                }`}</h1>
              </section>
              <footer>{`Cuotas impagas: ${dashData.fees.count}`}</footer>
            </Card>

            <Card className='stat-card' title='Acciones'>
              <section>
                <h1>{`${Math.floor(dashData.number_of_actions)} Acciones`}</h1>
              </section>
            </Card>
          </>
        ) : (
          <Card className='stat-card'>
            <GhostLine />
            <GhostLine width='60%' />
            <GhostLine width='40%' />
          </Card>
        )}
      </Dash>
    </UserWrapper>
  )
}

export default Dashboard
