import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVisit } from '../../store/actions/visits'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { DetailWrapper } from './styles'

const VisitDetail = props => {
  const dispatch = useDispatch()
  const details = useSelector(({ visits }) => visits.details)
  const loading = useSelector(({ loading }) => loading)
  const { location } = props

  useEffect(() => {
    dispatch(fetchVisit(location.state.id))
  }, [])

  return (
    <UserWrapper pathName='Detalle de visita'>
      <DetailWrapper>
        {loading ? (
          <p>cargando...</p>
        ) : (
          <>
            <h1>
              {details.closed && <i className='fas fa-check-circle'></i>}
              {details.subject}
            </h1>
            <Card>
              <div className='info'>
                <p>
                  <strong>Fecha</strong> : 12/12/2021
                </p>
                <p>
                  <strong>Hora</strong> : 12:00
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
