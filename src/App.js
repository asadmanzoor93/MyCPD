import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Login from './login/index.js'
import Home from './home/index.js'
import Dashboard from './dashboard/index.js'
import CPDGO from './cpdgo/index.js'


function App() {
  return (
      <div>
          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
            <Route exact path="/home" component={withRouter(Home)} />
            <Route exact path="/dashboard" component={withRouter(Dashboard)} />
            <Route exact path="/cpdgo" component={withRouter(CPDGO)} />
          </Switch>
      </div>
  );
}

export default App;
