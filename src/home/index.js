import React from "react";
import { Router, Route, Link } from "react-router-dom";
import Header from '../_components/header.js';

class Home extends React.Component {
  render () {
    return (
      <div>
      	<Header />
          <div className="container">
	          <nav>
	            <ul>
	              <li>
	                <Link to="/dashboard">Dashboard</Link>
	              </li>
	            </ul>
	          </nav>
          </div>
      </div>
    );
  }
}

export default Home;
