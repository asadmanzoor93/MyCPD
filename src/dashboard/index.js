import React from "react";
import Header from '../_components/header.js';
import DashboardList from './list.js';
import dashboard_column from '../apis/listing_columns.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const url = "http://34.248.242.178/CPDCompliance/api/Member/GetMemberCPD?Year=2019&page=1&pageSize=1000&reverse=false&sortBy=CourseName";
const bearer = 'Bearer 8Nu2XEEkNpk8zB95Y1cwJjafutVFiSo55mDp5mgWAX2byDeLXqMbDO7o1rY35nDR1Z7lXmMFFcKC3EPIdslBvVIC2Qcr-XC4KMZmcRAb23vWVsctUtjPZCOsyHqaQ7GT4OQLIyQUrmmUURJznzllC6QcaUd_qFfcQsRKBMIelPvH_clyqX6b4Kv1AvpTZYR_LN3pffeBCVmpTpoN-fiOQJHEPP9EV0aOg3bcmmudAWcjbcpwEivWuYrlIcN7t09Cja4o2XjUUU-jwhalW5d7N1o_F52kEZGKePIJ8GoDzqcl1SS-IdgJJsaoscQeggZGIGmBy5ohgWRY1dejMBSGXmnPcov-op4pQekzcPeL7aclPrRKS0tQkjEq0kV4hIAQ8dW8JKFPPBCnpYA7V1K8bE1qcDOVXtMtoLydiPcQchZcJw2c2p0HGOpclVIviZjq';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			dashboard_listing: [],
		}
	};

	componentDidMount() {
		fetch(url, {
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': bearer,
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then((data) => {
				let data_items = data.Items;
				if(!data_items) {
					data_items = DashboardList;
				}
				this.setState({ dashboard_listing: data_items });
			})
			.catch(console.log)
	}

	render () {


    return (
	<div>
		<Header />
		<div className="container main-content">
			<div className="row">
				<h2 className="page-header">Dashboard</h2>
				<div className="gridTopButtons">
				    <button type="button" className="btn btn-danger btn-circle btn-lg ng-scope" tooltip="" ng-click="vm.print()" data-original-title="" title=""><i className="fa fa-print"></i></button>
				    <div className="btn-group" dropdown="" is-open="status.isopen">
				        <button type="button" className="btn btn-success  btn-lg dropdown-toggle">
				            <i className="fa fa-file-excel-o"></i>
				        </button>
				    </div>
				</div>
				<ReactTable
					data={this.state.dashboard_listing}
					columns={dashboard_column}
				/>
			</div>
		</div>

	</div>
    );
  }
}

export default Dashboard;