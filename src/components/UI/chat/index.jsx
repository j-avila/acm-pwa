/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import Button from '../button'
import ChatBubble from './ChatBubble'
import { Row, Message, ChatWrapper, FileAdd, ActionArea } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { GhostLine } from '../ghostLoader'
import moment from 'moment'
import * as type from '../../../store/reducers/types'
import { apiUrl } from '../../../store/actions/utils'
import Modal from '../modal'
import { ModalContent } from '../../hoc/userWrapper'
import { checkRole, scrollTo } from '../../hoc/utils'
import { useHistory } from 'react-router'
import FormInput from '../input'
import { getRoles } from '../../../store/actions/bookings'
import Dots from '../dots'

const ChatCard = props => {
  const hiddenFileInput = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const { id, items, msgAction, chatBar } = props
  const loading = useSelector(({ requests }) => requests.loading)
  const loggedUser = useSelector(({ user }) => user)
  const [actions, openActions] = useState(false)
  const [preview, setPreview] = useState()
  const [userAttended, seAttended] = useState(props.chatuser)
  const roles = useSelector(({ requests }) => requests.roles)
  const eventType = useSelector(({ requests }) =>
    requests.details && requests.details.event
      ? requests.details.event.type
      : ''
  )
  const [derive, setDerive] = useState()
  const [rolesList, setList] = useState([])
  const [messageObj, setMessage] = useState({
    data: {
      event_book: id
    },
    file: undefined
  })
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setMessage({
          data: {
            ...messageObj.data,
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
        })
      })
      openActions(false)
      dispatch({
        type: type.NOTIFICATIONS,
        notification: {
          message: 'Localización copiada exitosamente.',
          type: 'location'
        }
      })
    } else {
      alert('Este navegador no admite la geolocalización.')
    }
  }

  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  // enconde img to base64
  const handleImg = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setPreview(reader.result)
      setMessage({
        ...messageObj,
        file: file
      })
    }

    openActions(false)
    reader.readAsDataURL(file)
  }

  const handleMessage = async param => {
    await msgAction(messageObj)
    param && setDerive(false)
    if (!loading) {
      setMessage({
        data: {
          ...messageObj.data,
          message: '',
          coordinates: ''
        },
        file: undefined
      })
      setPreview(undefined)
    }
  }

  const genRolesList = () => {
    let list =
      roles.length >= 1 &&
      roles.map(role => ({
        label: role.name,
        value: role.id
      }))
    setList(list)
  }

  const setRole = user =>
    user.hasOwnProperty('code')
      ? 'flex-end'
      : user.role.type === 'watchman'
      ? 'flex-start'
      : 'notification'

  useEffect(() => {
    dispatch(getRoles())

    return () => {
      dispatch({ type: type.RESET_CHAT, payload: {} })
    }
  }, [])

  useEffect(() => {
    roles && genRolesList()
  }, [roles])

  useEffect(() => {
    // handling the transferend conversations
    const last = items.length - 1
    if (
      items.length >= 1 &&
      items[last] &&
      items[last].hasOwnProperty('transferred_to')
    ) {
      loggedUser.association_area.code !== items[last].transferred_to.code &&
        history.push('/solicitudes')
    }

    // cheking if the last message is from the watchman
    if (items.length >= 2) {
      const last = items.length
      const lastMessage = items[1]
      const isUserLast = lastMessage.user.code === loggedUser.code
      const fields = Object.keys(messageObj.data)
      const results = fields.filter(field => messageObj.data[field])
      const attended = items.filter(m => m.user.hasOwnProperty('code'))
    }
    scrollTo('bottom')
  }, [items, messageObj])

  return (
    <Card>
      <ChatWrapper id='chatWrapper'>
        {items.length <= 0 && loading ? (
          <Row direction='flex-end'>
            <ChatBubble direction='flex-end' width='200px'>
              <GhostLine />
              <GhostLine width='60%' />
              <GhostLine width='40%' />
            </ChatBubble>
          </Row>
        ) : (!loading && !items) | (!loading && items.length <= 0) ? (
          <span>Comienza por escribir un mensaje</span>
        ) : (
          <>
            {items.map(message => (
              <Row key={message.id} direction={setRole(message.user)}>
                <ChatBubble
                  direction={setRole(message.user)}
                  loggedUser={loggedUser}
                  provName={message.user.name}
                >
                  {message.message}
                  <div>
                    {(message.attached && message.attached.formats) ||
                    (message.file && message.file.formats) ? (
                      <>
                        <span className='attachment'>
                          <p>
                            <strong>Adjuntos:</strong>
                          </p>
                          <a
                            href={`${apiUrl}${message.attached.url}`}
                            rel='noreferrer'
                            target='_blank'
                          >
                            <img
                              src={`${apiUrl}${message.attached.formats.thumbnail.url}`}
                              alt={message.attached.name}
                            />
                          </a>
                        </span>
                        <a
                          href={`${apiUrl}${message.attached.url}`}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <i className='fas fa-download'></i>
                          Descargar archivo
                        </a>
                      </>
                    ) : message.attached ? (
                      <>
                        <span className='attachment'>
                          <i className='fas fa-file' />
                          <strong>{message.attached.name}</strong>
                        </span>
                        <a
                          href={`${apiUrl}${message.attached.url}`}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <i className='fas fa-download' />
                          Descargar archivo
                        </a>
                      </>
                    ) : message.coordinates &&
                      message.coordinates.hasOwnProperty('latitude') ? (
                      <span className='attachment'>
                        <a
                          href={`https://www.google.com/maps/@${message.coordinates.longitude}, ${message.coordinates.latitude}`}
                        >
                          <i className='fa fa-map-marker-alt' /> Ubicación
                        </a>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                  <span className='meta'>
                    {moment(message.createdAt).format('DD/MM/YYYY HH:mm')}
                  </span>
                </ChatBubble>
              </Row>
            ))}
            {loading && (
              <Row direction='flex-start'>
                <ChatBubble direction='flex-start' width='80px'>
                  <Dots />
                </ChatBubble>
              </Row>
            )}
          </>
        )}
      </ChatWrapper>
      {chatBar && (
        <Message
          content={
            preview || messageObj.data.coordinates?.latitude ? '1fr 9fr' : '1fr'
          }
        >
          {actions && (
            <ActionArea>
              {loggedUser.user &&
                !checkRole(loggedUser.user) &&
                eventType == 'requestforattention' && (
                  <>
                    {['adminacm', 'sectionm'].includes(
                      userLogged.role.type
                    ) ? null : (
                      <span>
                        <Button
                          background='primary'
                          display='block'
                          onClick={() =>
                            history.push({
                              pathname: '/solicitudes/new',
                              state: {
                                type: 'visitreport',
                                code: userAttended
                              }
                            })
                          }
                        >
                          <i className='fas fa-calendar' />
                        </Button>
                        Agendar Visita
                      </span>
                    )}

                    {props.route.includes('solicitudes') && (
                      <span>
                        <Button
                          background='primary'
                          display='block'
                          onClick={() => setDerive(true)}
                        >
                          <i className='far fa-share-square' />
                        </Button>
                        Derivar a
                      </span>
                    )}
                  </>
                )}
              <span>
                <Button
                  display='block'
                  background='rgba(87,162,198,1)'
                  onClick={() => handleFileClick()}
                >
                  <i className='fas fa-paperclip'></i>
                </Button>
                Agregar Archivo
              </span>
              <span>
                <Button
                  background='secondary'
                  onClick={() => getLocation()}
                  display='block'
                >
                  <i className='fas fa-crosshairs'></i>
                </Button>
                Agregar Ubicación
              </span>
            </ActionArea>
          )}

          <FileAdd onClick={() => openActions(!actions)}>
            <i className='fas fa-plus'></i>
          </FileAdd>
          <div className='message-holder'>
            {preview && (
              <div className='attach-preview'>
                <i
                  className='fas fa-times'
                  onClick={() => {
                    setMessage({
                      ...messageObj,
                      file: undefined
                    })
                    setPreview(undefined)
                  }}
                />
                <img src={preview} alt='file' />
              </div>
            )}
            {messageObj.data.coordinates?.latitude &&
              messageObj.data.coordinates?.longitude && (
                <div className='attach-preview'>
                  <i
                    className='fas fa-times'
                    onClick={() => {
                      setMessage({
                        ...messageObj,
                        data: {
                          coordinates: undefined
                        }
                      })
                    }}
                  />
                  <figure className='fa fa-map-marked map-attached' />
                </div>
              )}
            <input
              type='text'
              value={messageObj.data.message || ''}
              onChange={e =>
                setMessage({
                  ...messageObj,
                  data: { ...messageObj.data, message: e.target.value }
                })
              }
            />
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              onChange={e => handleImg(e)}
            />
          </div>
          <Button
            background='transparent'
            onClick={() => handleMessage()}
            // disabled={valid ? '' : 'disabled'}
          >
            <i className='fas fa-paper-plane'></i>
          </Button>
        </Message>
      )}

      {derive && (
        <Modal>
          <ModalContent>
            <h2>Seleccionar area a derivar</h2>
            <FormInput>
              <select
                onChange={({ target }) =>
                  setMessage({
                    ...messageObj,
                    data: { transferred_to: target.value, event_book: id }
                  })
                }
              >
                <option disabled selected>
                  Selecciona una opción
                </option>
                {rolesList &&
                  rolesList.length >= 1 &&
                  rolesList.map(item => (
                    <option value={item.value}>{item.label}</option>
                  ))}
              </select>
            </FormInput>
            <div className='actions'>
              <Button background='secondary' onClick={() => setDerive(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleMessage('derivate')}>Derivar</Button>
            </div>
          </ModalContent>
        </Modal>
      )}
      <div id='bottom'></div>
    </Card>
  )
}

ChatCard.propTypes = {
  items: PropTypes.array
}

ChatCard.defaultProps = {
  items: []
}

export default ChatCard
