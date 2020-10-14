import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from './Header'
import Landing from './Landing'
import Footer from './Footer'
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'
import ErrorPage from './ErrorPage'

import '../App.css'

function App() {
  return (
      <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing } />
            <Route exact path="/Welcome" component={Welcome} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/Login" component={Login} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
      </Router>
  );
}

export default App;
