import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './login/index.js'
import Home from './home/index.js'


function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
