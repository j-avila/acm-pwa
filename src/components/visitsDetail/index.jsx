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
          {ended && <i className='fas fa-check-circle'></i>}
          {title}
        </h1>
        <h2>{`fecha pautada: ${date}`}</h2>
        <p>{`celador encargado: ${inCharge}`}</p>
        <Card>{body}</Card>
      </DetailWrapper>
    </UserWrapper>
  )
}

VisitDetail.defaultProps = {
  id: 1,
  title: 'algun titulo',
  date: '23-10-2022',
  inCharge: 'esteban quito',
  ended: true,
  body:
    'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
}

export default VisitDetail
