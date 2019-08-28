import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../_components/header.js';
import DashboardList from './list.js';

class Dashboard extends React.Component {
  render () {
  	console.log(DashboardList,'sadasdsadada');
	const TableList = DashboardList.map((entry, index) => {
	    return (
	        <tr>
		        <td>{entry.course}</td>
		        <td>{entry.location}</td>
		        <td>{entry.descrption}</td>
	        </tr>
	    );
	});
    return (
	<div>
		<Header />
		<div className="container main-content">
			<div className="row">
				<h2>Dashboard</h2>
				<table className="table table-striped table-bordered table-hover table-condensed">
					<thead>
				        <tr className="header">
					        <th>course</th>
					        <th>location</th>
					        <th>descrption</th>
				        </tr>
					</thead>
					<tbody>
						{TableList}
					</tbody>
				</table>
			</div>
		</div>

	</div>
    );
  }
}

export default Dashboard;