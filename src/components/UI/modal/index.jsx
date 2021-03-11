/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import PropTypes from 'prop-types'
import { ActionZone, Overlay } from './styles'
import Card from '../card'
import Button from '../button'

const Modal = ({ children, action, actionTitle, closeAction }) => {
  // const [show, setShow] = useContext(ModalContext)
  return (
    <Overlay>
      <Card id='card'>
        {children}
        <ActionZone>
          {closeAction && (
            <Button onClick={() => closeAction(false)}>cerrar</Button>
          )}
          {action && <Button onClick={action}>{actionTitle}</Button>}
        </ActionZone>
      </Card>
    </Overlay>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  actionTitle: PropTypes.string
}

Modal.defaultProps = {
  actionTitle: 'Aceptar'
}

export default Modal
