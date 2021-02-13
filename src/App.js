import './App.css'
import ThemeWrapper from '../src/components/hoc/styledTheme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Splash from './components/splash'

function App() {
  return (
    <div className='App'>
      <ThemeWrapper>
        <Router>
          <Switch>
            <Route path='/' component={Splash} />
          </Switch>
        </Router>
      </ThemeWrapper>
    </div>
  )
}

export default App
