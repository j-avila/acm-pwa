/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import PropTypes from 'prop-types'
import { ActionZone, Overlay } from './styles'
import Card from '../card'
import Button from '../button'

const Modal = ({ children, action, closeAction, txtAction, txtClose }) => {
  // const [show, setShow] = useContext(ModalContext)
  return (
    <Overlay>
      <Card id='card'>
        {children}
        <ActionZone>
          {closeAction && (
            <Button background='base' onClick={() => closeAction(false)}>
              {txtClose}
            </Button>
          )}
          {action && <Button onClick={action}>{txtAction}</Button>}
        </ActionZone>
      </Card>
    </Overlay>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  actionTitle: PropTypes.string,
  txtClose: PropTypes.string,
  txtAction: PropTypes.string
}

Modal.defaultProps = {
  txtClose: 'Cerrar',
  txtAction: 'aceptar'
}

export default Modal
