/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import ThemeWrapper from '../src/components/hoc/styledTheme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Splash from './components/splash'
import Index from './components/start'
import Login from './components/login'
import { OnBoarding } from './components/onBoarding'
// general
import EditProfile from './components/editProfile'
import Settings from './components/settings'
import { EndSession } from './components/end Session'
// irrigators
import Dashboard from './components/irrigatorViews/dashboard'
import InfoChannel from './components/irrigatorViews/infoChannel'
import Requests from './components/irrigatorViews/requests'
import RequestDetail from './components/irrigatorViews/requests/requestDetail'
import RequestForm from './components/irrigatorViews/requests/requestForm'
import Visits from './components/irrigatorViews/visits'
import VistisForm from './components/irrigatorViews/visits/vistisRequests'
import VisitDetail from './components/irrigatorViews/visits/visitDetail'
import Debts from './components/irrigatorViews/debts'
import DebtDetail from './components/irrigatorViews/debts/debtDetail'
import DebtForm from './components/irrigatorViews/debts/debtForm'
import ActionsIndex from './components/irrigatorViews/actions'
// watchman
import { useEffect, useState } from 'react'
import { socket } from './components/hoc/utils'
import { useSelector } from 'react-redux'

const App = () => {
  const [sessionUser, setUserSession] = useState()
  const user = useSelector(({ user }) => user)

  const setSockets = () => {
    console.log(typeof sessionUser)
    socket.emit('join', sessionUser)
    socket.on('welcome', data =>
      console.log(
        `💻 welcome user ${data.username} 🔌 in the socket: ${data.socket}`
      )
    )
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userActive'))
    if (user && user.hasOwnProperty('id')) {
      setUserSession(user.id)
    }
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    sessionUser && setSockets()
    user && setSockets()
  }, [sessionUser, user])

  return (
    <div className='App'>
      <ThemeWrapper>
        <Router>
          <Switch>
            <Route exact path='/' component={Splash} />
            <Route path='/inicio' component={Index} />
            <Route path='/cerrar-sesion' component={EndSession} />
            <Route path='/ingreso' component={Login} />
            <Route path='/tour' component={OnBoarding} />
            <Route path='/panel-de-control' component={Dashboard} />
            <Route path='/solicitudes' component={Requests} exact />
            <Route path='/acciones' component={ActionsIndex} exact />
            <Route path='/solicitudes/new' component={RequestForm} />
            <Route path='/solicitudes/:id' component={RequestDetail} />
            <Route path='/deudas' component={Debts} exact />
            <Route path='/deudas/new' component={DebtForm} />
            <Route path='/deudas/:id' component={DebtDetail} />
            <Route path='/informacion' component={InfoChannel} />
            <Route path='/visitas' component={Visits} exact />
            <Route path='/visitas/:id' component={VisitDetail} />
            <Route path='/perfil' component={EditProfile} />
            <Route path='/opciones' component={Settings} />
            <Route path='/solicitar-visita' component={VistisForm} />
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  )
}

export default App
