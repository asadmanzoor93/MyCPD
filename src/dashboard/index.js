import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../_components/header.js';
import Lits from './list.json';

class Dashboard extends React.Component {
  render () {
  	console.log(Lits,'sadasdsadada');
	const TableList = Lits.map((entry, index) => {
	    return (
	        <p>
	            {entry.course}
	        </p>
	    );
	});
    return (
	<div>
		<Header />
		<div className="container main-content">
			<div className="row">
				<h2>Dashboard</h2>
			</div>
		</div>
	</div>
    );
  }
}

export default Dashboard;