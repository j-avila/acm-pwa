import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { apiUrl } from '../../../store/actions/utils'
import { fetchVisit, getBio } from '../../../store/actions/visits'
import UserWrapper from '../../hoc/userWrapper'
import { checkRole } from '../../hoc/utils'
import Button from '../../UI/button'
import Card from '../../UI/card'
import { GhostLine } from '../../UI/ghostLoader'
import { DetailWrapper } from './styles'

const VisitDetail = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const session = useSelector(({ login }) => login)
  const loading = useSelector(({ loading }) => loading)
  const details = useSelector(({ visits }) => visits.details)
  const bio = useSelector(({ visits }) => visits.bio)
  const [isAdmin, setRol] = useState()
  const { location } = props

  useEffect(() => {
    const role = !checkRole(session, 'irrigator')
    dispatch(fetchVisit(location.state.id))
    dispatch(getBio(location.state.id))
    setRol(role)
  }, [])

  return (
    <UserWrapper pathName='Detalle de visita'>
      <DetailWrapper>
        {loading ? (
          <>
            <h1>
              <GhostLine />
            </h1>

            <Card className='stat-card'>
              <GhostLine />
              <GhostLine width='60%' />
              <GhostLine width='40%' />
            </Card>
          </>
        ) : !details ? (
          <p>nada que mostrar</p>
        ) : (
          <>
            <h1>
              {details.closed && <i className='fas fa-check-circle'></i>}
              {details.subject}
            </h1>
            <Card className='info'>
              <p>
                <strong>Fecha: </strong>
                {moment(details.visitreport_data.date).format('DD/MM/YYYY')}
              </p>
              <p>
                <strong>Hora: </strong>
                {moment(details.visitreport_data.date).format('HH:mm')}
              </p>
              <p>
                <strong>Visitante: </strong>
                {details.hasOwnProperty('association_user')
                  ? details.association_user.name
                  : 'no asignado'}
              </p>
              <p>
                <strong>Motivo de la visita: </strong>
                {details.content}
              </p>
            </Card>

            {isAdmin && bio && bio.messages.length >= 1 && (
              <h2>Bitacora de celador</h2>
            )}
            {loading ? (
              <Card className='stat-card'>
                <GhostLine />
                <GhostLine width='60%' />
                <GhostLine width='40%' />
              </Card>
            ) : (
              isAdmin &&
              bio &&
              bio.messages.length >= 1 &&
              bio.messages.map(message => (
                <Card key={message.published_at} className='bio'>
                  <p>
                    <strong>
                      Publicado el:
                      {moment(message.published_at).format(
                        'DD/MM/YYYY - HH:mm'
                      )}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      Fecha: {moment(message.published_at).format('DD/MM/YYYY')}
                    </strong>
                  </p>
                  <p>
                    <strong>Bitacora: </strong>
                    {message.message}
                  </p>
                  {message.attached && message.attached.formats ? (
                    <>
                      <span className='attachment'>
                        <p>
                          <strong>Adjuntos:</strong>
                        </p>
                        <a
                          href={`${apiUrl}${message.attached.url}`}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <img
                            src={`${apiUrl}${message.attached.formats.thumbnail.url}`}
                            alt={message.attached.name}
                          />
                        </a>
                      </span>
                      <a
                        href={`${apiUrl}${message.attached.url}`}
                        rel='noreferrer'
                        target='_blank'
                      >
                        <i className='fas fa-download'></i>
                        Descargar archivo
                      </a>
                    </>
                  ) : message.attached ? (
                    <>
                      <span className='attachment'>
                        <i className='fas fa-file' />
                        <strong>{message.attached.name}</strong>
                      </span>
                      <a
                        href={`${apiUrl}${message.attached.url}`}
                        rel='noreferrer'
                        target='_blank'
                      >
                        <i className='fas fa-download'></i>
                        Descargar archivo
                      </a>
                    </>
                  ) : (
                    ''
                  )}
                </Card>
              ))
            )}
          </>
        )}
        {isAdmin && details && !details.closed && (
          <Button
            onClick={() =>
              history.push({
                pathname: `/solicitudes/${location.state.id}`,
                state: { id: location.state.id }
              })
            }
          >
            Agregar Reporte
          </Button>
        )}
      </DetailWrapper>
    </UserWrapper>
  )
}

VisitDetail.defaultProps = {
  id: 1,
  title: 'Celador: Alvaro Gomez',
  date: '23-10-2022',
  inCharge: 'esteban quito',
  ended: true,
  body:
    'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
}

export default VisitDetail
