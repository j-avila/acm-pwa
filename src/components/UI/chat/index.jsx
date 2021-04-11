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

const ChatCard = props => {
  const hiddenFileInput = useRef(null)
  const dispatch = useDispatch()
  const notification = useSelector(({ notifications }) => notifications)
  const error = useSelector(({ errors }) => errors)
  const { id, items, msgAction, chatBar } = props
  const loading = useSelector(({ loading }) => loading)
  const loggedUser = useSelector(({ user }) => user)
  const [location, setLocation] = useState('')
  const [actions, openActions] = useState()
  const [valid, setValid] = useState(false)
  const [preview, setPreview] = useState()
  const [message, setMessage] = useState({
    event_book: id,
    message: undefined,
    coordinates: undefined,
    attached: undefined
  })

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
      openActions(false)
      dispatch({
        type: type.NOTIFICATIONS,
        notification: {
          message: 'localización copiada exitosamente',
          type: 'location'
        }
      })
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleModalAction = () => {
    dispatch({ type: type.NOTIFICATIONS, notification: false })
  }

  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  // enconde img to base64
  const handleImg = e => {
    let reader = new FileReader()
    let file = e.target.files[0]
    console.log('file to upload:', file)

    reader.onloadend = () => {
      setPreview(reader.result)
      setMessage({
        ...message,
        attached: { filename: file.name, url: file }
      })
    }

    openActions(false)
    reader.readAsDataURL(file)
  }

  const handleMessage = () => {
    msgAction(message, message.file)

    if (!loading) {
      setMessage({
        ...message,
        message: '',
        coordinates: '',
        attached: undefined
      })
      setPreview(undefined)
    }

    /* error &&
      setMessage({
        ...message,
        message: '',
        coordinates: '',
        attached: undefined,
        preview: ''
      }) */
  }

  useEffect(() => {
    // console.log(items)
    if (location) {
      setMessage({ ...message, coordinates: location })
      console.log(location)
    }
  }, [location, loading])

  useEffect(() => {
    if (items.length >= 1) {
      const last = items.length
      const lastMessage = items[1]
      const isUserLast = lastMessage.user.code === loggedUser.code
      const fields = Object.keys(message)
      const results = fields.filter(field => message[field])

      if (isUserLast) {
        // setValid(!isUserLast)
        console.log(isUserLast)
        setValid(results.length >= 2)
      } else {
        setValid(results.length >= 2)
      }
    }
  }, [items, message])

  return (
    <Card>
      <ChatWrapper>
        {loading ? (
          <Row direction='flex-end'>
            <ChatBubble direction='flex-end' width='200px'>
              <GhostLine />
              <GhostLine width='60%' />
              <GhostLine width='40%' />
            </ChatBubble>
          </Row>
        ) : !items | (items.length <= 0) ? (
          <span>Comienza por escribir un mensaje</span>
        ) : (
          items.map(message => (
            <Row
              key={message.id}
              direction={
                message.user.code !== loggedUser.code
                  ? 'flex-start'
                  : !message.user.code
                  ? 'notification'
                  : 'flex-end'
              }
            >
              <ChatBubble
                direction={
                  !message.user.code
                    ? 'notification'
                    : message.user.code !== loggedUser.code
                    ? 'flex-start'
                    : 'flex-end'
                }
                isUser={message.user.code === loggedUser.code}
                provName={message.user.name}
              >
                {message.message}
                <div>
                  {message.attached && message.attached.formats ? (
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
                        <i className='fas fa-download'></i>
                        Descargar archivo
                      </a>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                <span className='meta'>
                  {moment(message.createdAt).format('MMMM DD YYYY')}
                </span>
              </ChatBubble>
            </Row>
          ))
        )}
      </ChatWrapper>
      {chatBar && (
        <Message>
          {actions && (
            <ActionArea>
              <span>
                <Button background='primary' display='block'>
                  <i className='fas fa-camera'></i>
                </Button>
                Agregar Foto
              </span>
              <span>
                <Button
                  display='block'
                  background='rgba(87,162,198,1)'
                  onClick={() => handleFileClick()}
                  onChange={e => getFile(e)}
                >
                  <i className='fas fa-paperclip'></i>
                  <input
                    type='file'
                    typeof='.jepg, .png, .jpg'
                    style={{ display: 'none' }}
                    ref={hiddenFileInput}
                    onChange={e => handleImg(e)}
                  />
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
                      ...message,
                      attached: undefined
                    })
                    setPreview(undefined)
                  }}
                />
                <img src={preview} alt='attached' />
              </div>
            )}
            <input
              type='text'
              value={message.message}
              onChange={e =>
                setMessage({ ...message, message: e.target.value })
              }
            />
          </div>
          <Button
            background='transparent'
            onClick={() => handleMessage()}
            disabled={valid ? '' : 'disabled'}
          >
            <i className='fas fa-paper-plane'></i>
          </Button>
        </Message>
      )}
      {notification && notification.hasOwnProperty('message') && (
        <Modal>
          <ModalContent type='success'>
            <i className='fas fa-check'></i>
            <p>{notification.message}</p>
            <Button
              background='primary'
              width='100%'
              onClick={() => {
                handleModalAction()
              }}
            >
              Volver
            </Button>
          </ModalContent>
        </Modal>
      )}
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
