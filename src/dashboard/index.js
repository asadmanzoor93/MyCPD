import React from "react";
import axios from 'axios';
import "react-table/react-table.css";
import Pagination from "react-js-pagination";
import $ from "jquery";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";


const Listing_URL = "http://34.248.242.178/CPDCompliance/api/Member/GetMemberCPD";
const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const Hours_URL = "http://34.248.242.178/CPDCompliance/api/Member/MemberCPDHours";

class Dashboard extends React.Component {

	constructor() {
		super();
		this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.clearSearchFilters = this.clearSearchFilters.bind(this);

		this.state = {
			host_list: [],
			overdue_hours: 0,
			overdue_minutes: 0,
			required_hours: 0,
			total_hours: 0,
			total_minutes: 0,
			dashboard_records: [],
			course_name: '',
			location_name: '',
			host_id: '',
			year_selected: '',
			date_selected: '',
			reverse: false,
			sortBy: 'StartDate',
			totalPages: 0,
			totalCount: 0,
			per_page: 10,
			activePage: 0,
		}
	};

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handlePageChange(pageNumber) {
		this.setState({
			activePage: pageNumber
		});
		this.makeHttpRequestWithPage(pageNumber);
	}

	componentDidMount() {
		this.makeHttpRequestWithPage(1);


        $('.datepicker').datepicker();

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

	makeHttpRequestWithPage(pageNumber) {
		axios.get(Listing_URL, {
			params: {
				CPDTypeId: this.state.cpd_type_id,
				CourseName: this.state.course_name,
				HostId: this.state.host_id,
				LocationName: this.state.location_name,
				Venue: this.state.venue,
				reverse: this.state.reverse,
				sortBy: this.state.sortBy,
				page: pageNumber,
				pageSize: this.state.per_page,
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
				this.setState({
					dashboard_records: data.Items,
					totalPages: data.TotalPages,
					activePage: data.Page,
					totalCount: data.TotalCount,
				});

			}).catch(console.log);
	};

	handlePaginationFilter(event){
		let value = event.target.value;
		this.setState({
			per_page: value
		});
	}

	clearSearchFilters(){
		this.setState({
			dashboard_records: [],
			course_name: '',
			location_name: '',
			host_id: '',
			year_selected: '',
			date_selected: '',
			reverse: false,
			sortBy: 'StartDate',
			totalPages: 0,
			totalCount: 0,
			per_page: 10,
			activePage: 0,
		});
	}

	render () {

		let dashboard_records;
		if (this.state.dashboard_records !== null) {
			dashboard_records = this.state.dashboard_records.map((dashboard_record , index) => (
				<tr key={index}>
					<td><img src={ (dashboard_record.ImagePath) ? dashboard_record.ImagePath.replace('app/','') : ''} /></td>
					<td>{dashboard_record.CPDTypeName}</td>
					<td>{dashboard_record.CourseName}</td>
					<td>{dashboard_record.Hours}</td>
					<td>{dashboard_record.CompletionDate}</td>
					<td>{dashboard_record.Venue}</td>
					<td>{dashboard_record.Trainer}</td>
					<td>{dashboard_record.HostId}</td>
					<td>{dashboard_record.StartDate}</td>
					<td> </td>
				</tr>
			));
		}

		return (
			<div>
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
											 <input className="form-control ng-pristine ng-untouched ng-valid ng-empty"
													placeholder="Course Name" id="courseName"
													type="text"
													value={this.state.course_name}
													name="course_name"
													onChange={this.handleInputChange}
													aria-invalid="false"
											 />
											<label htmlFor="course_name">Course Name</label>
										</span>
									</div>
									<div className="has-float-label form-group input-group" style={{width: '100%'}}>
										<select className="form-control ng-pristine ng-valid ng-not-empty ng-touched" id="Year" value={this.state.year_selected} aria-invalid="false" >
											<option value="" > </option>
											<option aria-checked="true" value="2018">2018</option>
											<option aria-checked="true" value="2019">2019</option>
										</select>
										<label htmlFor="Year">Year</label>
									</div>
									<div className="form-group input-group" style={{width: '100%'}}>
										<span className="has-float-label">
											<input className="form-control ng-pristine ng-untouched ng-valid ng-empty"
												   id="location_name"
												   placeholder="Location Name"
												   type="text"
												   value={this.state.location_name}
												   name="location_name"
												   onChange={this.handleInputChange}
												   aria-invalid="false"
											/>
											<label htmlFor="location_name">Location Name</label>
										</span>
										<div className="has-float-label" >
											<p className="input-group datepicker" style={{ padding: '0' }}>
												<input type="text" className="form-control" placeholder="Enter Start Date" my-date-picker="" end-date="+3y" aria-invalid="true" />
												<span className="input-group-addon">
													<span className="glyphicon glyphicon-calendar"> </span>
												</span>
											</p>
											<label htmlFor="courseDate">Enter Start Date</label>
										</div>
									</div>

									<div className="form-group input-group" style={{width: '45.5%'}}>
										<div className="has-float-label" >
											<select id="host_id" name="host_id" value={this.state.host_id} onChange={this.handleInputChange}
													className="form-control ng-pristine ng-valid ng-empty ng-touched">
												<option value="" defaultValue> </option>
												{this.state.host_list.map((item, key) =>
													<option key={key} value={item.ID} >{item.Name}</option>
												)}
											</select>
											<label htmlFor="host">Host</label>
										</div>
									</div>


									<div className="clearfix"> </div>
									<div>
										<button className="btn btn-primary" onClick={() => this.makeHttpRequestWithPage(1)}>
											<span className="glyphicon glyphicon-search"> </span>
											Search
										</button>
										<button className="btn btn-primary" onClick={() => this.clearSearchFilters()}>
											<span className="glyphicon glyphicon-remove-sign"> </span>
											Clear
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row" style={{paddingBottom: '30px'}}>
					<div className="gridTopButtons">
						<button type="button" onClick={() => window.print()}
								className="btn btn-danger btn-circle btn-lg ">
							<i className="fa fa-print"> </i>
						</button>
						<button type="button" className="btn btn-success btn-circle btn-lg" style={{marginLeft: '10px'}}>
							<i className="fa fa-file-excel-o"> </i>
						</button>
					</div>
				</div>

				<div className="col">
					<table className='table table-striped table-bordered table-hover table-condensed'>
						<thead>
						<tr className="header">
							<td> </td>
							<th>Course Type</th>
							<th>Course</th>
							<th>Completed Hours</th>
							<th>Completion Date</th>
							<th>Venue</th>
							<th>Trainer</th>
							<th>Host</th>
							<th>Start Date</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{ dashboard_records }
						</tbody>
					</table>
					<div>
						<Pagination
							prevPageText='Previous'
							nextPageText='Next'
							firstPageText='First'
							lastPageText='Last'
							activePage={this.state.activePage}
							itemsCountPerPage={this.state.per_page}
							totalItemsCount={this.state.totalCount}
							onChange={this.handlePageChange}
						/>
					</div>

				</div>
			</div>
		);
	}
}

export default Dashboard;