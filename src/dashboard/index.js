import React from "react";
import Header from '../_components/header.js';
import DashboardList from './list.js';
// import dashboard_column from '../apis/listing_columns.js';
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
				<div>
					<h2 className="page-header">Dashboard</h2>
					<div className="row" style={{ marginBottom: '3rem' }}>
					    <div className="col-md-4">
					        <div className="dashboard_box">
					            <div className="pull-right green_icon">
					                <i className="fa fa-graduation-cap"></i>
					            </div>
					            8 <span className="mediumfont">Hour</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}></div>
					            </div>
					            <div className="dashboard-box-footer" id="dashBox1">
					                <div id="courseToDo">
					                    <span>Required</span>
					                    <span style={{float:'right'}} className="ng-binding">2019</span>
					                </div>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-4">
					        <div className="dashboard_box">
					            <div className="pull-right green_icon">
					                <i className="fa fa-clock-o"></i>
					            </div>
					            0 <span className="mediumfont">Hour 0 Mins</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}></div>
					            </div>
					            <div className="dashboard-box-footer" id="remainingdashBox">
					                <div id="courseToDo">
					                    <span>Remaining</span>
					                    <span style={{float:'right'}} className="ng-binding">2019</span>
					                </div>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-4">
					        <div className="dashboard_box">
					            <div className="pull-right green_icon">
					                <i className="fa fa-trophy"></i>
					            </div>
					            55 <span className="mediumfont">Hour 7  Mins</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}></div>
					            </div>
					            <div className="dashboard-box-footer" id="completedDashBox">
					                <div id="courseToDo">
					                    <span>COMPLETED</span>
					                    <span style={{float:'right'}} className="ng-binding">2019</span>
					                </div>
					            </div>
					        </div>
					    </div>
					</div>
					<div className="panel panel-default">
						<div className="panel-heading-cpd-3" style={{padding: '10px'}}>
							<i className="fa fa-filter " title="" tooltip="" data-original-title="Search"> Search</i>
						</div>
						<div className="shadow">
							<div layout-gt-sm="row" className="layout-gt-sm-row">
								<div style={{padding: '1rem'}}>

									<div className="form-group input-group" style={{width: '100%'}}>
										<span className="has-float-label" style={{width: '50%'}}>
											<input className="form-control ng-pristine ng-valid ng-empty ng-touched" ng-model="vm.pagingInfo.CourseName" type="text" id="courseName" placeholder="Course Name" aria-invalid="false" />
											<label for="courseName">Course Name</label>
										</span>
										<div className="has-float-label" >
											<select className="form-control ng-pristine ng-valid ng-not-empty ng-touched" id="Year" aria-invalid="false" >
												<option aria-checked="true" value="number:2018">2018</option>
												<option aria-checked="true" value="number:2019" selected="selected">2019</option>
												<option ng-repeat="year in vm.years" ng-value="year" aria-checked="true" value="number:2020">2020</option>
											</select>
											<label for="Year">Year</label>
										</div>
									</div>
									<div className="form-group input-group" style={{width: '100%'}}>
										<span className="has-float-label">
											<input className="form-control" type="text" placeholder="Location Name" />
											<label for="LocationName">Location Name</label>
										</span>
										<div className="has-float-label" >
											<p className="input-group">
												<input type="text" className="form-control ng-untouched ng-empty ng-dirty ng-invalid ng-invalid-parse" name="courseDate" placeholder="Enter Start Date" ng-model="vm.pagingInfo.StartDate" my-date-picker="" end-date="+3y" aria-invalid="true" />
												<span className="input-group-addon" data-toggle="datepicker">
													<span className="glyphicon glyphicon-calendar"></span>
												</span>
											</p>
											<label for="courseDate">Enter Start Date</label>
										</div>
									</div>
									<div className="form-group input-group">
										<div className="has-float-label" >
											<select className="form-control ng-pristine ng-valid ng-empty ng-touched">
												<option value="?" selected="selected"></option>
												<option label="N/r: Nxp saspxt" value="number:8">N/r: Nxp saspxt</option>
												<option label="rnnr" value="number:15">rnnr</option>
												<option label="rnnxinpang pxnpnanarns arxsrnt" value="number:5">rnnxinpang pxnpnanarns arxsrnt</option>
												<option label="rnnxinpangnpt.nxp" value="number:6">rnnxinpangnpt.nxp</option>
												<option label="rppsxnx anspapipx xf pxnpnxsxgy" value="number:68">rppsxnx anspapipx xf pxnpnxsxgy</option>
											</select>
											<label for="host">Host</label>
										</div>
									</div>

									<div className="clearfix"></div>
										<div>
											<button className="btn btn-primary" ng-click="vm.search()" ><span className="glyphicon glyphicon-search"></span> Search</button>
											<button className="btn btn-primary" ng-click="vm.clear()" ><span className="glyphicon glyphicon-remove-sign"></span> Clear</button>
										</div>
									</div>


								</div>
							</div>
						</div>
						<div className="row" style={{paddingBottom: '30px'}}>
							<div className="gridTopButtons">
								<button type="button" className="btn btn-danger btn-circle btn-lg ">
									<i className="fa fa-print"></i>
								</button>
								<button type="button" className="btn btn-success btn-circle btn-lg" style={{marginLeft: '10px'}}>
									<i className="fa fa-file-excel-o"></i>
								</button>
							</div>
						</div>
						<ReactTable
						data={this.state.dashboard_listing}
						filterable
						columns={[{
							Header: 'Course Type',
							accessor: 'CPDTypeName',// String-based value accessors!
							filterMethod: (filter, row) =>
							row[filter.id].startsWith(filter.value) &&
							row[filter.id].endsWith(filter.value)
						}, {
							Header: 'Completed Hours',
							accessor: 'Hours'
						}, {
							Header: 'Completion Date',
							accessor: 'CompletionDate'
						}, {
							Header: 'Venue',
							accessor: 'Venue'
						}, {
							Header: 'Trainer',
							accessor: 'Trainer'
						}, {
							Header: 'Host',
							accessor: 'HostId'
						}, {
							Header: 'Start Date',
							accessor: 'StartDate'
						}]}
						defaultPageSize={2}
						className="-striped -highlight"
						showPagination={true}
						showPaginationTop={false}
						showPaginationBottom={true}
						pageSizeOptions={[5, 10, 20, 25, 50, 100]}
						manual
						defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
						onFetchData={(state, instance) => {
							return [{
								Header: 'Course Type',
								accessor: 'CPDTypeName',// String-based value accessors!
								filterMethod: (filter, row) =>
								row[filter.id].startsWith(filter.value) &&
								row[filter.id].endsWith(filter.value)
							}, {
								Header: 'Completed Hours',
								accessor: 'Hours'
							}, {
								Header: 'Completion Date',
								accessor: 'CompletionDate'
							}, {
								Header: 'Venue',
								accessor: 'Venue'
							}, {
								Header: 'Trainer',
								accessor: 'Trainer'
							}, {
								Header: 'Host',
								accessor: 'HostId'
							}, {
								Header: 'Start Date',
								accessor: 'StartDate'
							}]
						}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;