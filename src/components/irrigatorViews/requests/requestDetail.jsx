/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats, setMessage } from '../../../store/actions/requests'
import UserWrapper from '../../hoc/userWrapper'
import { socket } from '../../hoc/utils'
import Chat from '../../UI/chat'
import { CeladorSection, DetailsWrapper } from './styles'
import * as type from '../../../store/reducers/types'

const RequestDetail = props => {
  const { location } = props
  const dispatch = useDispatch()
  const request = useSelector(({ requests }) => requests)
  const [reqDetails, setDetails] = useState({
    event_book: location.state.id,
    title: '',
    chats: []
  })
  const handleForm = form => {
    dispatch(setMessage(form))
  }

  // event handlers
  useEffect(() => {
    console.log(props)
    dispatch(getChats(location.state.id))
    socket.emit('open:chat', location.state.id)
    socket.on('message:chat', message => {
      dispatch({ type: type.REQUEST_FORM, message: message })
    })
  }, [])

  useEffect(() => {
    request.hasOwnProperty('details') &&
      setDetails({
        ...reqDetails,
        closed: request.details.event.closed || false,
        title: request.details.event.subject,
        messages: request.details.messages,
        code: location.state.code
      })
  }, [request.details])

  return (
    <UserWrapper pathName='Detalle de Solicitud'>
      <DetailsWrapper>
        <CeladorSection>
          <h1>{reqDetails.title}</h1>
        </CeladorSection>
        <Chat
          chatuser={reqDetails.code}
          id={location.state.id}
          items={reqDetails.messages}
          msgAction={handleForm}
          chatBar={!reqDetails.closed}
        />
      </DetailsWrapper>
    </UserWrapper>
  )
}

export default RequestDetail
