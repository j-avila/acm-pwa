import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../../UI/card'
import UserWrapper from '../../hoc/userWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboard } from '../../../store/actions/dashboard'
import { GhostLine } from '../../UI/ghostLoader'
import moment from 'moment'
import * as types from '../../../store/reducers/types'

import OnlineStatus from '../../onlineStatus/onlineStatus'

const Dashboard = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashData = useSelector(({ dashboard }) => dashboard)
  const user = useSelector(({ user }) => user)
  const loading = useSelector(({ loading }) => loading)
  const code = useSelector(({ codeActive }) => codeActive)

  const actions = useSelector(({ user }) => user.acm)

  useEffect(() => {
    code && dispatch(fetchDashboard(code))
    return () => {
      dispatch({ type: types.ERROR, error: {} })
    }
  }, [code])

  return (
    <UserWrapper>
      <OnlineStatus />
      <Dash>
        {loading ? (
          <Card className='stat-card'>
            <GhostLine />
            <GhostLine width='60%' />
            <GhostLine width='40%' />
          </Card>
        ) : dashData &&
          dashData.hasOwnProperty('requests') &&
          dashData.hasOwnProperty('fees') &&
          dashData.hasOwnProperty('number_of_actions') ? (
          <>
            <Card
              loading={loading}
              className='stat-card'
              title='Información del canal'
              notifications={dashData.notifications.length}
              onClick={() => history.push('/informacion')}
            >
              <section>
                <strong>{`Caudal Diario: ${
                  dashData.acm.daily_flow_channel.estacion || 'No disponible'
                }`}</strong>
                <h1>{`${
                  dashData.acm.daily_flow_channel.caudal || 'Sin datos'
                }`}</h1>
              </section>
              <footer>
                {dashData.acm.daily_flow_channel.updated
                  ? `Actualizado al ${dashData.acm.daily_flow_channel.updated}`
                  : 'su canal no cuenta con telemetría'}
              </footer>
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
                        'DD/MM/YYYY HH:mm'
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

                {dashData.fees.total.length >= 1 ? (
                  dashData.fees.total.map(fee => (
                    <h1>{`${fee._id}: ${fee.totalSum}`}</h1>
                  ))
                ) : (
                  <h1>0</h1>
                )}
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
              <footer>Caudal: {actions.water_flow}</footer>
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
