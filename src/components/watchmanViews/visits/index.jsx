/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchReports } from '../../../store/actions/visits'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Button from '../../UI/button'
import List from '../../UI/list'
import Tabs, { Panel } from '../../UI/tabs'
import { VisitsWrapper } from './styles'
import * as types from '../../../store/reducers/types'
import Modal from '../../UI/modal'
import { removeDuplicates } from '../../hoc/utils'

const AdminReports = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  //redux store
  const reportData = useSelector(({ reports }) => reports)
  const binnaclesData = useSelector(({ binnacles }) => binnacles)
  const notification = useSelector(({ notifications }) => notifications)

  //component states
  const [reports, setReports] = useState([])
  const [binnacles, setBinnacles] = useState([])

  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const handleItem = ({ id }) => {
    // alert(id)
    history.push({ pathname: `/visitas/${id}`, state: { id: id } })
  }

  const handleModalAction = () => {
    dispatch({ type: types.NOTIFICATIONS, notification: false })
    history.push('/visitas')
  }

  const fetchReportData = (start, mode) => {
    dispatch(fetchReports(start, mode))
    let pagination = start + 20

    if (mode === 'visits') {
      paginator(pagination, types.COUNT_REPORTS)
    } else {
      paginator(pagination, types.COUNT_BINNACLES)
    }
  }

  const paginator = (start, mode) => {
    dispatch({ type: mode, count: start })
  }

  // crea los items de las listas
  const createList = arr =>
    arr?.map(item => {
      let subtitle = `Creada:${moment(item.createdAt).format(
        'DD/MM/YYYY HH:mm'
      )} - Cod:${item.irrigator_code || item.channel_code}`

      if (item.association_user)
        subtitle += ` - Por:${item.association_user.name}`

      return {
        id: item.id,
        title: item.subject,
        status: item.closed && 'fa-check',
        subtitle,
        viewitem: 0
      }
    })

  useEffect(() => {
    /* 
      Si no se ha realizado ninguna peticion, se hace la peticion y se regista en el state, 
      en caso contrario no se ejecuta para trabajar con los datos del state.
    */
    if(!reportData.count){
      /* Se setea en 20 para la siguiete busqueda de datos */
      paginator(20, types.COUNT_REPORTS)
      paginator(20, types.COUNT_BINNACLES)
      /* Hace la busqueda inicial de los reportes de visita y reportes de canal, desde el 0 y solo 20 items */
      dispatch(fetchReports(0))
    }
  }, [])

  useEffect(() => {
    const reportsList = removeDuplicates(
      createList(reportData?.data),
      item => item.id
    )

    setReports(reportsList)
  }, [reportData.data])

  useEffect(() => {
    const binnaclesList = removeDuplicates(
      createList(binnaclesData?.data),
      item => item.id
    )
    setBinnacles(binnaclesList)
  }, [binnaclesData.data])

  return (
    <UserWrapper pathName='Reportes'>
      <VisitsWrapper>
        <Tabs selected={0}>
          <Panel title='Visitas'>
            <List
              items={reports}
              action={handleItem}
              refresh={() => fetchReportData(reportData.count, 'visits') }
              count={reportData.total}
              loadState={reportData.loading}
              listed
            />
            {['adminacm', 'sectionm'].includes(userLogged.role.type) ? null : (
              <Button
                onClick={() =>
                  history.push({
                    pathname: '/solicitudes/new',
                    state: { type: 'visitreport' }
                  })
                }
              >
                Crear Reporte de Visita
              </Button>
            )}
          </Panel>
          <Panel title='Canal'>
            <List
              items={binnacles}
              action={handleItem}
              refresh={() => fetchReportData( binnaclesData.count, 'channels' )}
              count={binnaclesData.total}
              loadState={binnaclesData.loading}
              listed
            />
            {['adminacm', 'sectionm'].includes(userLogged.role.type) ? null : (
              <Button
                onClick={() =>
                  history.push({
                    pathname: '/solicitudes/new',
                    state: { type: 'channelreport' }
                  })
                }
              >
                Crear Reporte de Canal
              </Button>
            )}
          </Panel>
        </Tabs>
      </VisitsWrapper>
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
    </UserWrapper>
  )
}

export default AdminReports
