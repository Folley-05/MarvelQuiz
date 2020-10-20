import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {IconContext} from 'react-icons'

import Header from './Header'
import Landing from './Landing'
import Footer from './Footer'
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'
import ErrorPage from './ErrorPage'
import ForgetPasword from './ForgetPasword'

import '../App.css'

function App() {
  return (
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing } />
              <Route exact path="/Welcome" component={Welcome} />
              <Route exact path="/SignUp" component={SignUp} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/forgetpassword" component={ForgetPasword} />
              <Route component={ErrorPage} />
            </Switch>
            <Footer />
          </IconContext.Provider>
      </Router>
  );
}

export default App;
