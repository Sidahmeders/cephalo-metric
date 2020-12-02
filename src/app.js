import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/app.scss'
import Navbar from './components/navbar/navbar.jsx'
import HomePage from './pages/home'
import CephaloPage from './pages/cephalo'
// import Test from './pages/test'

const App = () => {

    return (
        <Router>
        <div className="app">
        <Navbar />
          <Switch>
            <Route path="/" exact  component={ HomePage } />
            <Route path="/cephalo" component={ CephaloPage } />
            {/* <Route path="/test" component={ Test } /> */}
          </Switch>
        </div>
    </Router>
    )
}

export default App