import './App.css'
import ThemeWrapper from '../src/components/hoc/styledTheme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Splash from './components/splash'
import Index from './components/start'
import Login from './components/login'
import { OnBoarding } from './components/onBoarding'
import Dashboard from './components/dashboard'
import Requests from './components/requests'
import RequestForm from './components/requestForm'
import RequestDetail from './components/requestDetail'
import Debts from './components/debts'
import DebtDetail from './components/debtDetail'
import ActionsIndex from './components/actions'
import InfoChannel from './components/infoChannel'
import Visits from './components/visits'
import VisitDetail from './components/visitsDetail'
import DebtForm from './components/debtForm'
import EditProfile from './components/editProfile'
import { EndSession } from './components/end Session'
import VistisForm from './components/visits/vistisRequests'
import { useEffect, useState } from 'react'
import { socket } from './components/hoc/utils'

const App = () => {
  const [sessionUser, setSession] = useState()

  const setSockets = () => {
    socket.emit('join', sessionUser)
    socket.on('welcome', data =>
      console.log(
        `💻 welcome user ${data.username} 🔌 in the socket: ${data.socket}`
      )
    )
    console.log(sessionUser)
  }

  const setUser = () => {
    const sessionId = JSON.parse(localStorage.getItem('userActive'))
    setSession(sessionId.id)
  }

  useEffect(() => {
    !sessionUser && setUser()
    sessionUser && setSockets()
  }, [sessionUser])

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
            <Route path='/solicitar-visita' component={VistisForm} />
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  )
}

export default App
