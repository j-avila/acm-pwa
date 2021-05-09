import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../../UI/card'
import UserWrapper from '../../hoc/userWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboard } from '../../../store/actions/dashboard'
import { GhostLine } from '../../UI/ghostLoader'
import moment from 'moment'

const Dashboard = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashData = useSelector(({ dashboard }) => dashboard)
  const user = useSelector(({ user }) => user)
  const code = useSelector(({ codeActive }) => codeActive)

  useEffect(() => {
    code && dispatch(fetchDashboard(code))
  }, [code])

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
              notifications={dashData.notifications.length}
              onClick={() => history.push('/informacion')}
            >
              <section>
                <strong>{`Caudal Diario: ${dashData.acm.daily_flow_channel.estacion}`}</strong>
                <h1>{`${dashData.acm.daily_flow_channel.caudal}`}</h1>
              </section>
              <footer>{`Actualizado al ${dashData.acm.daily_flow_channel.updated}`}</footer>
            </Card>

            <Card
              className='stat-card visits'
              title='Solicitudes'
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
                <h1>
                  {dashData.next_visit
                    ? moment(dashData.next_visit.visitreport_data.date).format(
                        'DD MMMM YYYY - HH:HH'
                      )
                    : 'Sin definir'}
                </h1>
              </section>
              <footer>{`Celador: ${
                user.watchman ? user.watchman.name : 'Sin asignar'
              }`}</footer>
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

            <Card
              className='stat-card'
              title='Acciones'
              onClick={() => {
                history.push('/acciones')
              }}
            >
              <section>
                <h1>{`${dashData.number_of_actions} Acciones`}</h1>
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
