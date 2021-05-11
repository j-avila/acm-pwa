import React, { useState, useEffect } from 'react'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import Modal from '../../UI/modal'
import { DeatilWrapper, Detail, Row, ModalContent, Actions } from './styles'
import { useHistory } from 'react-router'
import FormInput from '../../UI/input'
import { useDispatch, useSelector } from 'react-redux'
import { getIrrigatorDetails } from '../../../store/actions/irrigator'
import { GhostLine } from '../../UI/ghostLoader'
import axios from 'axios'
import { apiUrl, getAuth } from '../../../store/actions/utils'
import * as types from '../../../store/reducers/types'
import moment from 'moment'

const IrrigatorDetail = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { data, location } = props
  const irrigator = useSelector(({ irrigator }) => irrigator)
  const loading = useSelector(({ loading }) => loading)
  const [form, setForm] = useState({ date: '', message: '' })
  const [modal, showModal] = useState(false)
  const [iData, setData] = useState()

  const handleModal = () => {
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

  useEffect(() => {
    const code = location.state.data.code
    dispatch(getIrrigatorDetails(code))
  }, [])

  useEffect(() => {
    setForm({ ...form, irrigators: irrigator.detail.code, type: modal })
  }, [modal])

  useEffect(() => {
    setData(irrigator.detail)
  }, [irrigator])

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
              <Card>
                <Detail>
                  <Row>
                    <strong>Código de regante:</strong>
                    <span>{iData.code || 'No Disponible'}</span>
                  </Row>
                  <Row>
                    <strong>Canal:</strong>
                    <span>
                      {`${location.state.data.channel_name}(${iData.channel})` ||
                        'No Disponible'}
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
                    <span>{iData.location || 'No Disponible'}</span>
                  </Row>
                </Detail>
              </Card>

              <Actions>
                <Button
                  background='secondary'
                  onClick={() => showModal('notification')}
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
                        type: 'requestforattention',
                        code: location.state.data.code
                      }
                    })
                  }
                >
                  Agendar Visita
                </Button>
              </Actions>
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
                  type='date'
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
    amount: '999.999'
  }
}

export default IrrigatorDetail
