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

function App() {
  return (
    <div className='App'>
      <ThemeWrapper>
        <Router>
          <Switch>
            <Route exact path='/' component={Splash} />
            <Route path='/inicio' component={Index} />
            <Route path='/ingreso' component={Login} />
            <Route path='/tour' component={OnBoarding} />
            <Route path='/panel-de-control' component={Dashboard} />
            <Route path='/solicitudes' component={Requests} exact />
            <Route path='/acciones' component={ActionsIndex} exact />
            <Route path='/solicitudes/new' component={RequestForm} />
            <Route path='/solicitudes/:id' component={RequestDetail} />
            <Route path='/deudas' component={Debts} exact />
            <Route path='/deudas/:id' component={DebtDetail} />
            <Route path='/informacion' component={InfoChannel} />
            <Route path='/visitas' component={Visits} exact />
            <Route path='/visitas/:id' component={VisitDetail} />
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  )
}

export default App
