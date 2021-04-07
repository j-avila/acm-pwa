import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../../store/actions/utils'
import { fetchVisit, getBio } from '../../store/actions/visits'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { DetailWrapper } from './styles'

const VisitDetail = props => {
  const dispatch = useDispatch()
  const loading = useSelector(({ loading }) => loading)
  const details = useSelector(({ visits }) => visits.details)
  const bio = useSelector(({ visits }) => visits.bio)
  const { location } = props

  useEffect(() => {
    dispatch(fetchVisit(location.state.id))
    dispatch(getBio(location.state.id))
  }, [])

  return (
    <UserWrapper pathName='Detalle de visita'>
      <DetailWrapper>
        {loading ? (
          <p>cargando...</p>
        ) : !details ? (
          <p>nada que mostrar</p>
        ) : (
          <>
            <h1>
              {details.closed && <i className='fas fa-check-circle'></i>}
              {details.subject}
            </h1>
            <Card>
              <div className='info'>
                <p>
                  <strong>Fecha :</strong>
                  {moment(details.visitreport_data.date).format('DD/MM/YYYY')}
                </p>
                <p>
                  <strong>Hora: </strong>
                  {moment(details.visitreport_data.date).format('HH:HH')}
                </p>
                <p>
                  <strong>Visitante</strong> : Juan Perez
                </p>
                <p>
                  <strong>Motivo de la visita: </strong>
                  {details.content}
                </p>
                <p>
                  <strong>Adjuntos</strong> :
                </p>
              </div>
            </Card>
            {bio && bio.messages.length >= 1 && <h2>Bitacora de celador</h2>}
            {bio &&
              bio.messages.length >= 1 &&
              bio.messages.map(message => (
                <Card key={message.published_at}>
                  <p>
                    <strong>
                      fecha:
                      {moment(message.published_at).format(
                        'DD/MM/YYYY - HH:HH'
                      )}
                    </strong>
                  </p>
                  <p>
                    <strong>fecha: {message.published_at}</strong>
                  </p>
                  <p>{message.message}</p>
                  {message.attached && message.attached.formats ? (
                    <>
                      <label>Aduntos:</label>
                      <img
                        src={`${apiUrl}${message.attached.formats.thumbnail.url}`}
                        alt={message.attached.name}
                      />
                    </>
                  ) : message.attached ? (
                    <span>
                      <i className='fas fa-file' />
                      <strong>{message.attached.name}</strong>
                    </span>
                  ) : (
                    ''
                  )}
                </Card>
              ))}
          </>
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
