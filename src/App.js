import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './login/index.js'
import Home from './home/index.js'
import Dashboard from './dashboard/index.js'


function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
