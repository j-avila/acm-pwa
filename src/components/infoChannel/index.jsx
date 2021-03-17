import React, { useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { Content, InfoWrapper, NotificationArea } from './styles'

const InfoChannel = props => {
  const [alert, setAlert] = useState(true)

  return (
    <UserWrapper pathName='Información'>
      {alert && (
        <NotificationArea>
          <Card className='alert'>
            <i className='fas fa-times' onClick={() => setAlert(false)} />
            <Content>
              <i className='fas fa-info-circle'></i>
              <span>
                <h3>Aviso de corte programado</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque porro necessitatibus illum! Voluptatum officiis
                  repudiandae, corrupti magnam deserunt quasi, perferendis
                  dignissimos quibusdam quis laboriosam architecto iste
                  provident labore commodi nulla?
                </p>
                <div className='meta'>
                  <strong>Fecha: 20/12/2021</strong>
                  <strong>Hora: 12:20</strong>
                </div>
              </span>
            </Content>
          </Card>
        </NotificationArea>
      )}
      <InfoWrapper>
        <Card>
          <Content>
            <span>
              <h3>Regulación ACM</h3>
              <p>Actualizado el 12/11/2020</p>
            </span>
            <span>
              <h1>45%</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>
                Caudal Diario: <br /> Canal Vergara
              </h3>
              <p>Actualizado el 12/11/2020</p>
            </span>
            <span>
              <h1>1209 L/S</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Aporte de Laguna del Maule</h3>
              <p>Fuente: DGA</p>
            </span>
            <span>
              <h1>14 HM3</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Aporte Convenio Colbún</h3>
              <p>Fuente: DGA</p>
            </span>
            <span>
              <h1>10 HM3</h1>
            </span>
          </Content>
        </Card>
        <Card>
          <Content>
            <span>
              <h3>Volumen Laguna del Maule</h3>
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
              <h3>Tiempo en Amerillo: soleado</h3>
              <p>Actualizado el 20/12/2021</p>
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
              <h3>Pluviometría</h3>
              <p>Fuente: DGA Est. Amerillo</p>
            </span>
            <span>
              <i className='fas fa-sun'></i>
              <h1>
                1463mm <br /> acumulado
              </h1>
            </span>
          </Content>
        </Card>
      </InfoWrapper>
    </UserWrapper>
  )
}

export default InfoChannel
