import React, { useState, useEffect } from 'react'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import Modal from '../../UI/modal'
import { DeatilWrapper, Detail, Row, ModalContent, Actions } from './styles'
import { useHistory } from 'react-router'
import FormInput from '../../UI/input'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHistory,
  getIrrigatorDetails,
  updateCoords
} from '../../../store/actions/irrigator'
import { GhostLine } from '../../UI/ghostLoader'
import axios from 'axios'
import { apiUrl, getAuth } from '../../../store/actions/utils'
import * as types from '../../../store/reducers/types'
import moment from 'moment'
import Tabs, { Panel } from '../../UI/tabs'
import List from '../../UI/list'

const IrrigatorDetail = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { data, location } = props
  const irrigator = useSelector(({ irrigator }) => irrigator)
  const loading = useSelector(({ loading }) => loading)
  const [form, setForm] = useState({ date: '', message: '' })
  const [modal, showModal] = useState(false)
  const [iData, setData] = useState()
  const [historyList, setList] = useState()
  const [geoLocation, setGeoLocation] = useState()


  const handleModal = props => {
    const newForm = {
      ...form,
      message:
        modal === 'urgent'
          ? `El día ${form.date}: ${form.message}`
          : form.message,
      irrigators: [location.state.data.code],
      type: modal,
      activation: moment().utc().format('YYYY-MM-DD HH:mm')
    }

    axios
      .post(`${apiUrl}/notification-centers`, newForm, getAuth())
      .then(data => {
        showModal(false)
      })
      .catch(err => {
        showModal(false)
        dispatch({ type: types.ERROR, error: err })
      })
  }

  const handleItem = ({ id, code }) => {
    const data = { id: id, code: code }
    history.push({ pathname: `/anotaciones/${id}`, state: data })
  }

  // handler for the location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {

        const ubication = {
          coordinates: {
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            altitudeAccuracy: pos.coords.altitudeAccuracy,
            heading: pos.coords.heading,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            speed: pos.coords.speed
          }
        }

        dispatch(updateCoords(irrigator.detail.profile.id, ubication))
        setGeoLocation(ubication)
      })
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    const code = location.state.data.code
    dispatch(getIrrigatorDetails(code))
  }, [])

  useEffect(() => {
    setForm({
      ...form,
      irrigators: props.location.state.data.code,
      type: modal
    })
  }, [modal])

  useEffect(() => {
    if (irrigator.detail) {
      setData(irrigator.detail)
      dispatch(getHistory(irrigator.detail.code))
    }

    if (irrigator.history) {
      setList(
        irrigator.history.map(item => ({
          id: item.id,
          title: item.subject,
          code: item.irrigator.code,
          subtitle: item.irrigator.name
        }))
      )
    }
  }, [irrigator.detail])


  return (
    <>
      <UserWrapper pathName='Regante'>
        <DeatilWrapper>
          {loading || !iData ? (
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
          ) : (
            <>
              <h1>{iData.name || 'No Disponible'}</h1>
              <Tabs selected={0}>
                <Panel title='información'>
                  <>
                    <Card className='detailCard'>
                      <Detail>
                        <Row>
                          <strong>Código de regante:</strong>
                          <span>{iData.code || 'No Disponible'}</span>
                        </Row>
                        <Row>
                          <strong>Canal:</strong>
                          <span>
                            {`${iData.channel.code}(${iData.channel.name})` ||
                              'No Disponible'}
                          </span>
                        </Row>
                        <Row>
                          <strong>Estado:</strong>
                          <span
                            style={{
                              color: iData.slow_payer && 'tomato',
                              fontWeight: iData.slow_payer && '900'
                            }}
                          >
                            {`${iData.slow_payer ? 'Tiene Deuda' : 'Al día'}`}
                          </span>
                        </Row>
                        <Row>
                          <strong>Forja:</strong>
                          <span>{iData.rol || 'No Disponible'}</span>
                        </Row>
                        <Row>
                          <strong>Direción:</strong>
                          <span>{iData.address || 'No Disponible'}</span>
                        </Row>
                        <Row>
                          <strong>Teléfono:</strong>
                          <span>{iData.phone || 'No Disponible'}</span>
                        </Row>
                        <Row>
                          <strong>Geolocalización:</strong>
                          {iData.profile && iData.profile.coordinates ? (
                            <a
                              href={`https://maps.google.com/maps?q=${iData.profile.coordinates.latitude}%2C${iData.profile.coordinates.longitude}&hl=es`}
                            >{`lat: ${iData.profile.coordinates.latitude} - long: ${iData.profile.coordinates.longitude}`}</a>
                          ) : geoLocation && geoLocation.coordinates ? (
                            <a
                              href={`https://www.google.com/maps/@${geoLocation.coordinates.longitude}%2C${geoLocation.coordinates.latitude}`}
                            >{`lat: ${geoLocation.coordinates.latitude} - long: ${geoLocation.coordinates.longitude}`}</a>
                          ) : (
                            <Button
                              className='geoButton'
                              onClick={() => getLocation()}
                            >
                              <i className='fa fa-map-marker' />
                              obtener coordenadas
                            </Button>
                          )}
                        </Row>
                      </Detail>
                    </Card>
                    <Actions>
                      <Button
                        background='secondary'
                        onClick={() => showModal('information')}
                        className='fa fa-bell'
                        size='20px'
                      ></Button>
                      <Button
                        background='error'
                        onClick={() => showModal('urgent')}
                        className='fa fa-tint-slash'
                        size='20px'
                      ></Button>
                      <Button
                        width='100%'
                        display='block'
                        onClick={() =>
                          history.push({
                            pathname: '/solicitudes/new',
                            state: {
                              type: 'visitreport',
                              code: location.state.data.code
                            }
                          })
                        }
                      >
                        Agendar Visita
                      </Button>
                    </Actions>
                  </>
                </Panel>
                <Panel title='Historial'>
                  {loading || !irrigator.history ? (
                    <Card className='stat-card'>
                      <GhostLine />
                      <GhostLine width='60%' />
                      <GhostLine width='40%' />
                    </Card>
                  ) : (
                    <List items={historyList} action={handleItem} />
                  )}
                  <Actions
                    style={{ gridTemplateColumns: '1fr', alignItems: 'center' }}
                  >
                    <Button
                      margin='0 auto'
                      onClick={() =>
                        history.push({
                          pathname: '/solicitudes/new',
                          state: {
                            name: 'Anotaciones',
                            type: 'annotation',
                            code: form.irrigators
                          }
                        })
                      }
                    >
                      Crear anotacion
                    </Button>
                  </Actions>
                </Panel>
              </Tabs>
            </>
          )}
        </DeatilWrapper>
      </UserWrapper>

      {modal && (
        <Modal
          action={handleModal}
          closeAction={showModal}
          txtAction={modal === 'urgent' ? 'Aviso  de corte' : 'Notificación'}
        >
          <ModalContent>
            <h1>
              {modal === 'urgent'
                ? 'Notificación de corte'
                : 'Enviar notificación'}
            </h1>

            {modal === 'urgent' && (
              <FormInput label='Elegir un Día'>
                <input
                  type='datetime-local'
                  name='date'
                  onChange={e => setForm({ ...form, date: e.target.value })}
                />
              </FormInput>
            )}
            <FormInput label='Mensaje'>
              <input
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </FormInput>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

IrrigatorDetail.defaultProps = {
  data: {
    title: 'Deuda primer semestre 2020',
    code: 123,
    channel: 'Vergara',
    dueDate: '12-12-2020',
    payed: true,
    amount: '999.999',
    coordinates: 'no asignadas'
  }
}

export default IrrigatorDetail
