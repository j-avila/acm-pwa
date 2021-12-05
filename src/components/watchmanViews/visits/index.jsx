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

const AdminReports = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const reportData = useSelector(({ reports }) => reports)
  const notification = useSelector(({ notifications }) => notifications)
  const [visits, setVisits] = useState({
    booked: [],
    done: []
  })
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
    console.log(reqType)

    let startNum = reqType === 'visits' ? 'visitsStart' : 'channelStart'
    let paged = {
      ...pageControl,
      [startNum]: (pageControl[startNum] += 20)
    }
    setPageControl(paged)
  }

  useEffect(() => {
    fetchVisitsData()
  }, [])

  useEffect(() => {
    if (
      reportData.hasOwnProperty('reports') &&
      reportData.hasOwnProperty('binnacles')
    ) {
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

      const reports = createList(reportData.reports)
      const binnacles = createList(reportData.binnacles)

      setVisits({ ...visits, reports, binnacles })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData])

  return (
    <UserWrapper pathName='Reportes'>
      <VisitsWrapper>
        <Tabs selected={0}>
          <Panel title='Visitas'>
            <List
              items={visits.reports}
              action={handleItem}
              refresh={() =>
                fetchVisitsData(
                  pageControl.visitsStart,
                  pageControl.limit,
                  'visits'
                )
              }
              count={reportData.reportsCount}
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
              items={visits.binnacles}
              action={handleItem}
              refresh={() =>
                fetchVisitsData(
                  pageControl.channelStart,
                  pageControl.limit,
                  'channels'
                )
              }
              count={reportData.binnaclesCount}
              loadState={reportData.loading}
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
