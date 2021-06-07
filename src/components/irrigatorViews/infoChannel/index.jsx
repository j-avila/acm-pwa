import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfoCards } from '../../../store/actions/infoChannels'
import { apiUrl, getAuth } from '../../../store/actions/utils'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import { GhostLine } from '../../UI/ghostLoader'
import { Content, InfoWrapper, NotificationArea } from './styles'

const InfoChannel = props => {
  const dispatch = useDispatch()
  const infoCards = useSelector(({ information }) => information.infoCards)
  const dashData = useSelector(({ dashboard }) => dashboard)
  const code = useSelector(({ codeActive }) => codeActive)
  const user = useSelector(({ user }) => user)
  const [alert, setAlert] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dailyFlow, setDailyFlow] = useState({})

  const handleDailyFlow = () => {
    const acmChannel = infoCards.daily_flow_channel.value

    const userChannel = user.acm.channel

    const result = acmChannel.filter(channel => channel.channel === userChannel)
    console.log(result)
    setDailyFlow(
      result && result[0] ? result[0] : 'no hay informacióñ disponible'
    )
  }

  const markAsRead = async id => {
    const url = `${apiUrl}/notification-centers/${id}/${code}`
    await axios.get(url, getAuth()).then(({ data }) => {
      const filtered = alert.filter(item => item.id !== id)
      setAlert(filtered)
    })
  }

  useEffect(() => {
    code && dispatch(fetchInfoCards(code))
  }, [code])

  useEffect(() => {
    setAlert(dashData.notifications)
  }, [dashData])

  useEffect(() => {
    infoCards && setLoading(false)
    if (user && infoCards) {
      handleDailyFlow()
    }
  }, [infoCards])

  return (
    <UserWrapper pathName='Información del canal'>
      <InfoWrapper>
        {alert &&
          alert.length >= 1 &&
          alert.map(item => (
            <NotificationArea key={item.id}>
              <Card className={`alert ${item.type === 'urgent' && 'urgent'}`}>
                <i
                  className='fas fa-times'
                  onClick={() => markAsRead(item.id)}
                />
                <Content>
                  <i className='fas fa-info-circle'></i>
                  <span>
                    {item.title && <h3>{item.title}</h3>}
                    <p>{item.message}</p>
                    <div className='meta'>
                      <strong>{`Fecha: ${moment(item.date).format(
                        'DD/MM/YYYY'
                      )}`}</strong>
                      <strong>{`hora: ${moment(item.date).format(
                        'HH'
                      )}`}</strong>
                    </div>
                  </span>
                </Content>
              </Card>
            </NotificationArea>
          ))}
        {!infoCards ? (
          <Card>
            <GhostLine />
            <GhostLine width='60%' />
            <GhostLine width='40%' />
          </Card>
        ) : (
          <>
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
                  <h3>
                    {dailyFlow.estacion
                      ? `Caudal Diario: ${dailyFlow.estacion}`
                      : 'Sin datos'}
                  </h3>
                  <p>
                    {dailyFlow.updated
                      ? `Actualizado el ${dailyFlow.updated}`
                      : 'su canal no cuenta con telemetría'}
                  </p>
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
            {infoCards.pluviometry.length >= 1 &&
              infoCards.pluviometry.map((card, index) => (
                <Card key={index}>
                  <Content>
                    <span>
                      <h3>{`Pluviometría: ${card.origin}`}</h3>
                      <p>{`Actualizado: ${card.updated}`}</p>
                    </span>
                    <span>
                      <i className='fas fa-thermometer-half'></i>
                      <p>{`${card.value}`}</p>
                    </span>
                  </Content>
                </Card>
              ))}
          </>
        )}
      </InfoWrapper>
    </UserWrapper>
  )
}

export default InfoChannel
