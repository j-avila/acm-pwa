import React, { useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { Content, InfoWrapper } from './styles'

const InfoChannel = () => {
  const [alert, setAlert] = useState(true)

  return (
    <UserWrapper>
      <InfoWrapper>
        {alert && (
          <Card className='alert'>
            <i className='fas fa-times' onClick={() => setAlert(false)} />
            <Content>
              <i className='fas fa-info-circle'></i>
              <span>
                <h3>Aviso de corte programado</h3>
                <p>
                  Hola sr. xxxxxxx le informamos que debido a una falla en un
                  recolector del canal vergara debemos suspender mañana el
                  servicio de 08:00 a 13:00 Disculpe las milestias
                </p>
                <p>actializado el 20/12/2021</p>
              </span>
            </Content>
          </Card>
        )}
        <Card>
          <Content>
            <span>
              <h3>Regucalión ACM</h3>
              <p>Actualizadio el 12/11/2020</p>
            </span>
            <span>
              <h1>45L.</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>
                Caudal Diario: <br /> Canal Vergagra
              </h3>
              <p>Actualizadio el 12/11/2020</p>
            </span>
            <span>
              <h1>1209 l/s</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Volumen Laguna Maule</h3>
              <p>
                Fuente: <strong>Junta de vigilancia Río Maule</strong>
              </p>
            </span>
            <span>
              <h1>263 HM3</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Tiempo: soleado</h3>
              <p>actializado el 20/12/2021</p>
            </span>
            <span>
              <i className='fas fa-sun'></i>
              <h1>30ºC</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Humedad relativa</h3>
              <p>Actualizado el 20/12/2012</p>
            </span>
            <span>
              <i className='fas fa-tint'></i>
              <h1>75%</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Pluvometría</h3>
              <p>Fuente: DGA</p>
            </span>
            <span>
              <i className='fas fa-sun'></i>
              <h1>
                1463mm <br /> acumulado
              </h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Aporte de laguna del maule</h3>
              <p>Fuente: DGA</p>
            </span>
            <span>
              <h1>14 l/s</h1>
            </span>
          </Content>
        </Card>
      </InfoWrapper>
    </UserWrapper>
  )
}

export default InfoChannel
