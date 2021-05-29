import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Dash } from './styles'
import Card from '../../UI/card'
import UserWrapper from '../../hoc/userWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboard } from '../../../store/actions/dashboard'
import { GhostLine } from '../../UI/ghostLoader'
import moment from 'moment'
import * as types from '../../../store/reducers/types'

const AdminDashboard = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashData = useSelector(({ dashboard }) => dashboard)
  const user = useSelector(({ user }) => user)
  const session = useSelector(({ login }) => login)
  const code = useSelector(({ codeActive }) => codeActive)

  const getDash = (code = null) => {
    const role = session.hasOwnProperty('role') && session.role.name
    role && dispatch(fetchDashboard(null, role))
  }

  useEffect(() => {
    console.log('mounted')
    getDash()

    return () => {
      dispatch({ type: types.ERROR, error: {} })
    }
  }, [])

  useEffect(() => {
    console.log('pase por aqui')
    if (code) {
      getDash(code)
    } else if (user) {
      getDash()
    }
  }, [code, user])

  return (
    <UserWrapper>
      <Dash>
        {dashData &&
        session &&
        session.hasOwnProperty('association_user') &&
        dashData.hasOwnProperty('requests') &&
        dashData.hasOwnProperty('next_visit') &&
        dashData.hasOwnProperty('acm') ? (
          <>
            <Card
              className='stat-card visits'
              title='Solicitudes de Atención'
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
              title='Regantes'
              onClick={() => {
                history.push('/regantes')
              }}
            >
              <section>
                <strong>Lista de regantes de la zona:</strong>
                <h1>
                  {(session.association_user.assigned_irrigators &&
                    session.association_user.assigned_irrigators.length) ||
                    'No disponible'}
                </h1>
              </section>
              <footer>{`Zona ${session.provider}`}</footer>
            </Card>

            <Card
              className='stat-card'
              title='Reportes'
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
            </Card>

            <Card
              className='stat-card'
              title='Información General'
              subTitle={dashData.acm.acm_regulation.origin}
              onClick={() => {
                history.push('/canales')
              }}
            >
              <section>
                <strong>Caudal Diario:</strong>
                <h1>{dashData.acm.acm_regulation.value}</h1>
              </section>
              <footer>{`Actualizado el: ${dashData.acm.acm_regulation.updated}`}</footer>
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

export default AdminDashboard
