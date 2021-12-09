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
import * as type from '../../../store/reducers/types'
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
  const [selected, setSelected] = useState('visits')
  const [reports, setReports] = useState([])
  const [binnacles, setBinnacles] = useState([])
  const [pageControl, setPageControl] = useState({
    visitsStart: 0,
    channelStart: 0,
    limit: 20
  })
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const handleItem = ({ id }) => {
    // alert(id)
    history.push({ pathname: `/visitas/${id}`, state: { id: id } })
  }

  const handleModalAction = () => {
    dispatch({ type: type.NOTIFICATIONS, notification: false })
    history.push('/visitas')
  }

  const fetchVisitsData = (start, limit, reqType) => {
    dispatch(fetchReports(start, limit, reqType))

    let startNum = reqType === 'visits' ? 'visitsStart' : 'channelStart'
    let paged = {
      ...pageControl,
      [startNum]: (pageControl[startNum] += 20)
    }
    setPageControl(paged)
  }

  const createList = arr =>
    arr?.map(item => ({
      id: item.id,
      title: item.subject,
      status: item.closed && 'fa-check',
      subtitle: `Creada: ${moment(item.createdAt).format(
        'DD/MM/YYYY HH:mm'
      )} - Cod: ${item.irrigator_code || item.channel_code}`,
      viewitem: 0
    }))

  useEffect(() => {
    fetchVisitsData()
  }, [])

  useEffect(() => {
    const reportsList = removeDuplicates(
      createList(reportData?.data),
      item => item.id
    )

    setReports(reportsList)
    console.log('repos', reports)
  }, [reportData.data])

  useEffect(() => {
    const binnaclesList = removeDuplicates(
      createList(binnaclesData?.data),
      item => item.id
    )
    setBinnacles(binnaclesList)
    console.log('bins', binnacles)
  }, [binnaclesData.data])

  return (
    <UserWrapper pathName='Reportes'>
      <VisitsWrapper>
        <Tabs selected={0}>
          <Panel title='Visitas'>
            <List
              items={reports}
              action={handleItem}
              refresh={() =>
                fetchVisitsData(
                  pageControl.visitsStart,
                  pageControl.limit,
                  'visits'
                )
              }
              count={reportData.count}
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
              refresh={() =>
                fetchVisitsData(
                  pageControl.channelStart,
                  pageControl.limit,
                  'channels'
                )
              }
              count={binnaclesData.count}
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
