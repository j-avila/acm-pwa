import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import Button from '../button'
import ChatBubble from './ChatBubble'
import { Row, Message, ChatWrapper, FileAdd, ActionArea } from './styles'
import { useSelector } from 'react-redux'
import { GhostLine } from '../ghostLoader'
import { socket } from '../../hoc/utils'

const ChatCard = props => {
  const hiddenFileInput = useRef(null)
  const { id, items, msgAction } = props
  const loading = useSelector(({ loading }) => loading)
  const loggedUser = useSelector(({ user }) => user)
  const requests = useSelector(({ requests }) => requests)
  const [location, setLocation] = useState('')
  const [actions, openActions] = useState()
  const [message, setMessage] = useState({
    event_book: id,
    message: '',
    coordinates: '',
    attached: undefined
  })

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
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
    console.log('file to upload:', e.target.files[0])
    let file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = _handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = readerEvt => {
    let binaryString = readerEvt.target.result
    setMessage({ ...message, attached: btoa(binaryString) })
  }

  const handleMessage = () => {
    msgAction(message)
    setMessage({
      ...message,
      message: '',
      coordinates: '',
      attached: undefined
    })
  }

  useEffect(() => {
    // console.log(items)
    location.hasOwnProperty('coords') &&
      setMessage({ ...message, coordinates: location.coords })
  }, [location])

  useEffect(() => {
    console.log(socket.connected)
    requests.form &&
      requests.form.length >= 1 &&
      socket.emit('message:chat', 'olo')
  }, [requests.form])

  return (
    <Card>
      <ChatWrapper>
        {loading ? (
          <Row direction='flex-start'>
            <ChatBubble direction='flex-start'>
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
                <span className='meta'>{message.createdAt}</span>
              </ChatBubble>
            </Row>
          ))
        )}
      </ChatWrapper>
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
        <input
          type='text'
          value={message.message}
          onChange={e => setMessage({ ...message, message: e.target.value })}
        />
        <Button background='transparent' onClick={() => handleMessage()}>
          <i className='fas fa-paper-plane'></i>
        </Button>
      </Message>
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
