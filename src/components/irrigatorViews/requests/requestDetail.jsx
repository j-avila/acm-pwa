/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats, setMessage } from '../../../store/actions/requests'
import UserWrapper from '../../hoc/userWrapper'
import { checkRole, socket } from '../../hoc/utils'
import Chat from '../../UI/chat'
import { CeladorSection, DetailsWrapper } from './styles'
import * as type from '../../../store/reducers/types'
import { useHistory } from 'react-router-dom'

const RequestDetail = props => {
  const { location } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const request = useSelector(({ requests }) => requests)
  const loggedUser = useSelector(({ user }) => user)
  const session = useSelector(({ login }) => login)
  const [description, openDescription] = useState()
  const [reqDetails, setDetails] = useState({
    event_book: location.state.id,
    title: '',
    code: location.state.code,
    chats: []
  })
  const handleForm = form => {
    dispatch(setMessage(form))
  }

  const checkTransfered = items => {
    if (items) {
      const last = items.length

      if (last >= 1) {
        let transferedMsg = items[last - 1]

        if (transferedMsg.hasOwnProperty('transferred_to')) {
          transferedMsg.transferred_to.id !== loggedUser.association_area.id &&
            dispatch({ type: type.RESET_CHAT, payload: {} })
          history.push('/solicitudes')
        }
      }
    }
  }

  // event handlers
  useEffect(() => {
    dispatch(getChats(location.state.id))
    socket.emit('open:chat', location.state.id)
    socket.on('message:chat', message => {
      dispatch({ type: type.REQUEST_FORM, message: message })
    })
  }, [])

  useEffect(() => {
    request.hasOwnProperty('details') &&
      request.details.hasOwnProperty('messages') &&
      setDetails({
        ...reqDetails,
        closed: request.details.event.closed || false,
        title: request.details.event.subject,
        description: request.details.event.content,
        messages: request.details.messages,
        user: request.details.event.irrigator,
        area: request.details.event.association_area.name,
        type: request.details.event.type
      })
    checkTransfered(reqDetails.messages)
  }, [request.details])

  return (
    <UserWrapper pathName='Detalle de Solicitud'>
      <DetailsWrapper>
        <CeladorSection>
          <h1>{reqDetails.title}</h1>
          {!checkRole(session) && reqDetails.user && (
            <p className='irrigator-info'>
              <strong>{reqDetails.user.name}</strong> ({reqDetails.user.code})
            </p>
          )}
          <div className='description'>
            {reqDetails.description && (
              <>
                <strong onClick={() => openDescription(!description)}>
                  Ver detalles
                  <i
                    className={`fa ${
                      description ? 'fa-chevron-up' : 'fa-chevron-down'
                    }`}
                  />
                </strong>

                {description && (
                  <>
                    {checkRole(session) && reqDetails.area && (
                      <h4>Area: {reqDetails.area}</h4>
                    )}
                    <p>{reqDetails.description}</p>
                  </>
                )}
              </>
            )}
          </div>
        </CeladorSection>
        <Chat
          chatuser={reqDetails.code}
          id={location.state.id}
          items={reqDetails.messages}
          msgAction={handleForm}
          chatBar={!reqDetails.closed}
          type={reqDetails.type}
          route={location.pathname}
        />
      </DetailsWrapper>
    </UserWrapper>
  )
}

export default RequestDetail
