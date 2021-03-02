import './App.css'
import ThemeWrapper from '../src/components/hoc/styledTheme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Splash from './components/splash'
import Index from './components/start'
import Login from './components/login'
import { OnBoarding } from './components/onBoarding'

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
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  )
}

export default App
