import React from "react";
import Header from '../_components/header.js';
import axios from 'axios';
import qs from'querystring';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import _ from "lodash";
import API from '../utils/API';

const Listing_URL = "http://34.248.242.178/CPDCompliance/api/Member/GetMemberCPD";
const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const Hours_URL = "http://34.248.242.178/CPDCompliance/api/Member/MemberCPDHours";

class Dashboard extends React.Component {
	constructor() {
		super();
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
		this.state = {
			dashboard_listing: [],
			host_list: [],
			overdue_hours: 0,
			overdue_minutes: 0,
			required_hours: 0,
			total_hours: 0,
			total_minutes: 0,
			course_name: null,
			location_name: null,
			host_selected: null,
			year_selected: null,
			date_selected: null,

		}
	};

	componentDidMount() {
		// Dashboard Listing

		axios.get(Listing_URL, {
			params: {
				page: 1,
				pageSize: 1000,
				Year: 2019,
				reverse: false,
				sortBy: 'CourseName'
			},
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'bearer ' + localStorage.getItem('access_token'),
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.data)
			.then((data) => {
				if (data.Items) {
					this.setState({ dashboard_listing: data.Items });
				}
			}).catch(console.log);


		// Hosts List
		axios.get(Hosts_URL, {
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'bearer ' + localStorage.getItem('access_token'),
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.data)
			.then((data) => {
				if(data){
					this.setState({ host_list: data });
				}
			}).catch(console.log);


		// Hours Data

		axios.get(Hours_URL, {
			params: {
				UserName: 'UserName',
				Year: 2019,
			},
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'bearer ' + localStorage.getItem('access_token'),
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.data)
			.then((data) => {
				if (data){
					this.setState({
						overdue_hours: data[0].OverdueHours,
						overdue_minutes: data[0].OverdueMinutes,
						required_hours: data[0].RequiredHours,
						total_hours: data[0].TotalHours,
						total_minutes: data[0].TotalMinutes
					});
				}
			}).catch(console.log);

	}

	handleSearchFilter() {
		axios.get(Listing_URL, {
			params: {
				page: 1,
				pageSize: 1000,
				Year: 2019,
				reverse: false,
				sortBy: 'CourseName'
			},
			method: 'GET',
			withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'bearer ' + localStorage.getItem('access_token'),
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.data)
			.then((data) => {
				if (data.Items) {
					this.setState({ dashboard_listing: data.Items });
				}
			}).catch(console.log);
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
					                <i className="fa fa-graduation-cap"> </i>
					            </div>
					            {this.state.required_hours} <span className="mediumfont">Hour</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}> </div>
					            </div>
					            <div className="dashboard-box-footer" id="dashBox1">
					                <div id="courseToDo">
					                    <span>Required</span>
					                    <span style={{float:'right'}}>2019</span>
					                </div>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-4">
					        <div className="dashboard_box">
					            <div className="pull-right green_icon">
					                <i className="fa fa-clock-o"> </i>
					            </div>
					            {this.state.overdue_hours} <span className="mediumfont">Hour {this.state.overdue_minutes} Mins</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}> </div>
					            </div>
					            <div className="dashboard-box-footer" id="remainingdashBox">
					                <div id="courseToDo">
					                    <span>Remaining</span>
					                    <span style={{float:'right'}}>2019</span>
					                </div>
					            </div>
					        </div>
					    </div>
					    <div className="col-md-4">
					        <div className="dashboard_box">
					            <div className="pull-right green_icon">
					                <i className="fa fa-trophy"> </i>
					            </div>
					            {this.state.total_hours}
					            <span className="mediumfont">Hour {this.state.total_minutes}  Mins</span>
					            <div className="white_progress">
					                <div className="white_progress_inner" style={{width:'100%'}}> </div>
					            </div>
					            <div className="dashboard-box-footer" id="completedDashBox">
					                <div id="courseToDo">
					                    <span>COMPLETED</span>
					                    <span style={{float:'right'}}>2019</span>
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
							<div className="layout-gt-sm-row">
								<div style={{padding: '1rem'}}>

									<div className="form-group input-group" style={{width: '100%'}}>
										<span className="has-float-label" style={{width: '50%'}}>
											<input className="form-control ng-pristine ng-valid ng-empty ng-touched"
												   type="text" id="courseName" value={this.state.course_name}
												   placeholder="Course Name" aria-invalid="false" />
											<label htmlFor="course_name">Course Name</label>
										</span>
									</div>
										<div className="has-float-label form-group input-group" style={{width: '100%'}}>
											<select className="form-control ng-pristine ng-valid ng-not-empty ng-touched" id="Year" value={this.state.year_selected} aria-invalid="false" >
												<option aria-checked="true" value="" selected={ (this.state.year_selected === null) ? "selected" : "" } > </option>
												<option aria-checked="true" value="2018" selected={ (this.state.year_selected === "2018") ? "selected" : "" } >2018</option>
												<option aria-checked="true" value="2019" selected={ (this.state.year_selected === "2018") ? "selected" : "" }>2019</option>
											</select>
											<label htmlFor="Year">Year</label>
										</div>
										<div className="form-group input-group" style={{width: '100%'}}>
											<span className="has-float-label">
												<input className="form-control" type="text" name="location_name" id="location_name" placeholder="Location Name" />
												<label htmlFor="location_name">Location Name</label>
											</span>
											<div className="has-float-label" >
												<p className="input-group">
													<input type="text" className="form-control ng-untouched ng-empty ng-dirty ng-invalid ng-invalid-parse" name="courseDate" placeholder="Enter Start Date" my-date-picker="" end-date="+3y" aria-invalid="true" />
													<span className="input-group-addon" data-toggle="datepicker">
														<span className="glyphicon glyphicon-calendar"> </span>
													</span>
												</p>
												<label htmlFor="courseDate">Enter Start Date</label>
											</div>
										</div>
										<div className="form-group input-group" style={{width: '45.5%'}}>
											<div className="has-float-label" >
												<select className="form-control ng-pristine ng-valid ng-empty ng-touched">
													<option value="" defaultValue></option>
													{this.state.host_list.map((item, key) =>
														<option value={item.ID} >{item.Name}</option>
													)}
												</select>
												<label htmlFor="host">Host</label>
											</div>
										</div>
										<div className="clearfix"> </div>
											<div>
												<button className="btn btn-primary" onClick={this.handleSearchFilter} ><span className="glyphicon glyphicon-search"> </span> Search</button>
												<button className="btn btn-primary"><span className="glyphicon glyphicon-remove-sign"> </span> Clear</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row" style={{paddingBottom: '30px'}}>
							<div className="gridTopButtons">
								<button type="button" className="btn btn-danger btn-circle btn-lg ">
									<i className="fa fa-print"> </i>
								</button>
								<button type="button" className="btn btn-success btn-circle btn-lg" style={{marginLeft: '10px'}}>
									<i className="fa fa-file-excel-o"> </i>
								</button>
							</div>
						</div>
						<ReactTable
						data={this.state.dashboard_listing}
						filterable
						columns={[{
							Header: 'Course Type',
							accessor: 'CPDTypeName',
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
						defaultPageSize={10}
						className="-striped -highlight"
						/>
					</div>
			</div>
		);
	}
}

export default Dashboard;