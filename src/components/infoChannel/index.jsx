import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfoCards } from '../../store/actions/infoChannels'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import { Content, InfoWrapper, NotificationArea } from './styles'

const InfoChannel = props => {
  const dispatch = useDispatch()
  const infoCards = useSelector(state => state.information.infoCards)
  const loggedUser = useSelector(state => state.login)
  const [alert, setAlert] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dailyFlow, setDailyFlow] = useState({})

  const handleDailyFlow = () => {
    const northchannel =
      infoCards.daily_flow_channel['caudales-del-sistema-maule-norte']

    const userChannel = loggedUser.user.acm.channel

    const result = northchannel.filter(
      channel => channel.channel === userChannel
    )
    console.log(result)
    setDailyFlow(result)
  }

  useEffect(() => {
    dispatch(fetchInfoCards())
  }, [])

  useEffect(() => {
    infoCards && setLoading(false)
    if (loggedUser && loggedUser.user && infoCards) {
      handleDailyFlow()
    }
  }, [infoCards])

  return (
    <UserWrapper pathName='Información del canal'>
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
      {!infoCards ? (
        <p>Cargando...</p>
      ) : (
        <InfoWrapper>
          <Card>
            <Content>
              <span>
                <h3>Regulación ACM</h3>
                <p>{`Actualizado el ${infoCards.acm_regulation.updated}`}</p>
                {infoCards.acm_regulation.origin && (
                  <p>{`Origen: ${infoCards.acm_regulation.origin}`}</p>
                )}
              </span>
              <span>
                <h1>{infoCards.acm_regulation.value}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>{`Caudal Diario: ${dailyFlow.estacion}`}</h3>
                <p>{`Actualizado el ${dailyFlow.updated}`}</p>
              </span>
              <span>
                <h1>{dailyFlow.caudal}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>Extracción Laguna del Maule</h3>
                <p>{`Fuente: ${infoCards.extraction.origin}`}</p>
                <p>{`Actualizado: ${infoCards.extraction.updated}`}</p>
              </span>
              <span>
                <h1>{infoCards.extraction.value}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>Aporte Convenio Colbún</h3>
                <p>{`Fuente: ${infoCards.colbun.origin}`}</p>
                <p>
                  {infoCards.colbun.updated &&
                    `Actualizado: ${infoCards.colbun.updated}`}
                </p>
              </span>
              <span>
                <h1>{infoCards.colbun.value}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>Volumen Laguna del Maule</h3>
                <p>{`Fuente: ${infoCards.volume.origin}`}</p>
                <p>
                  {infoCards.volume.updated &&
                    `Actualizado: ${infoCards.volume.updated}`}
                </p>
              </span>
              <span>
                <h1>{infoCards.volume.value}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>{`Tiempo en ${infoCards.weather.location.name}: ${infoCards.weather.current.condition.day_text}`}</h3>
                <p>{`Actualizado el ${infoCards.weather.current.last_updated}`}</p>
              </span>
              <span>
                <i className='fas fa-sun'></i>
                <h1>{`${infoCards.weather.current.temp_c}ºC`}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>Humedad relativa</h3>
                <p>{`Actualizado el ${infoCards.weather.current.last_updated}`}</p>
              </span>
              <span>
                <i className='fas fa-tint'></i>
                <h1>{`${infoCards.weather.current.humidity}%`}</h1>
              </span>
            </Content>
          </Card>
          <Card>
            <Content>
              <span>
                <h3>Pluviometría</h3>
                <p>{`Fuente: ${infoCards.pluviometry.origin}`}</p>
              </span>
              <span>
                <i className='fas fa-thermometer-half'></i>
                <h1>${infoCards.pluviometry.value}</h1>
              </span>
            </Content>
          </Card>
        </InfoWrapper>
      )}
    </UserWrapper>
  )
}

export default InfoChannel
