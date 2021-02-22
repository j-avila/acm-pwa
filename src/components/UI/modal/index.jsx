/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import PropTypes from 'prop-types'
import { ActionZone, Overlay } from './styles'
import Card from '../card/index.'
import Button from '../button/Button'

const Modal = ({ children, action, closeAction }) => {
  // const [show, setShow] = useContext(ModalContext)
  return (
    <Overlay>
      <Card id='card'>
        {children}
        <ActionZone>
          {closeAction && <Button onClick={closeAction}>cerrar</Button>}
          {action && <Button onClick={action}>cerrar</Button>}
        </ActionZone>
      </Card>
    </Overlay>
  )
}

Modal.propTypes = {
  children: PropTypes.node
}

export default Modal
