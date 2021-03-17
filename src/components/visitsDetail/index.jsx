import React from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { DetailWrapper } from './styles'

const VisitDetail = props => {
  const { title, body, id, date, inCharge, ended } = props
  return (
    <UserWrapper pathName='Detalle de visita'>
      <DetailWrapper>
        <h1>
          {/* {ended && <i className='fas fa-check-circle'></i>} */}
          {title}
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
              <strong>Motivo de la visita</strong> : Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Necessitatibus in, voluptatum et
              accusantium deleniti doloremque veniam veritatis porro, eveniet ab
              at quos facilis. Non id debitis doloremque vel quam nostrum.
            </p>
            <p>
              <strong>Adjuntos</strong> :
            </p>
          </div>
        </Card>
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
