import React from "react";
import { Router, Route, Link } from "react-router-dom";

class Header extends React.Component {
  render () {
    return (
      <div>
          <div className="container">
	          <nav>
	            <ul>
	              <li>
	                <Link to="/dashboard">Main nav</Link>
	              </li>
	            </ul>
	          </nav>
          </div>
      </div>
    );
  }
}

export default Header;
