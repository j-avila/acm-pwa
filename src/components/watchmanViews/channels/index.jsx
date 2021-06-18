import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfoCards } from '../../../store/actions/infoChannels'
import { apiUrl } from '../../../store/actions/utils'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import { GhostLine } from '../../UI/ghostLoader'
import {
  Content,
  InfoWrapper,
  NotificationArea
} from '../../irrigatorViews/infoChannel/styles'

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
      result && result[0] ? result[0] : 'no hay información disponible'
    )
  }

  useEffect(() => {
    dispatch(fetchInfoCards())
  }, [])

  useEffect(() => {
    setAlert(dashData.notifications)
  }, [dashData])

  useEffect(() => {
    infoCards && setLoading(false)
    if (user && infoCards) {
      // handleDailyFlow()
    }
  }, [infoCards])

  return (
    <UserWrapper pathName='Información del canal'>
      <InfoWrapper>
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
                 {
                  infoCards.acm_regulation.comment.length > 0 &&
                  <p> {infoCards.acm_regulation.comment}</p>     
                  }                       
                </span>
                <span>
                  <h1>{infoCards.acm_regulation.value}</h1>
                </span>
        
              </Content>
            </Card>
            {infoCards.daily_flow_channel.value.map(channel => (
              <Card>
                <Content>
                  <span>
                    <h3>{`Caudal Diario: ${
                      channel.estacion || 'no disponible'
                    }`}</h3>
                    <p>{`Caudal ${channel.caudal || 'no disponible'}`}</p>
                  </span>
                  <span>
                    <h1>{channel.caudal}</h1>
                  </span>
                </Content>
              </Card>
            ))}
            <Card>
              <Content>
                <span>
                  <h3>Extracción Laguna del Maule</h3>
                  <p>{`Fuente: ${infoCards.extraction.origin}`}</p>
                  <p>{`Actualizado: ${infoCards.extraction.updated}`}</p>
                  {
                  infoCards.extraction.comment.length > 0 &&
                  <p> {infoCards.extraction.comment}</p>     
                  }  
                </span>
                <span>
                  <h1>{infoCards.extraction.value}</h1>
                </span>
              </Content>
            </Card>

            {infoCards.contributions.length >= 1 &&
              infoCards.contributions.map((card, index) => (
                <Card key={index}>
                  <Content>
                    <span>
                      <h3>{card.title}</h3>
                      <p>{`Fuente: ${card.origin}`}</p>
                      <p>{`Actualizado: ${card.updated}`}</p>
                      {
                      card.comment.length > 0 &&
                      <p> {card.comment}</p>     
                      } 
                    </span>
                    <span>
                      <p>{`${card.value}`}</p>
                    </span>
                       
                  </Content>
                </Card>
              ))}


            <Card>
              <Content>
                <span>
                  <h3>Volumen Laguna del Maule</h3>
                  <p>{`Fuente: ${infoCards.volume.origin}`}</p>
                  <p>
                    {infoCards.volume.updated &&
                      `Actualizado: ${infoCards.volume.updated}`}
                  </p>
                  {
                  infoCards.volume.comment.length > 0 &&
                  <p> {infoCards.volume.comment}</p>     
                  }  
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
                      {
                      card.comment.length > 0 &&
                      <p> {card.comment}</p>     
                      } 
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
