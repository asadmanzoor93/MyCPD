import React from "react";
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import "react-table/react-table.css";
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import $ from "jquery";
import { TextField, DatePicker, SelectField } from 'react-md';
import "../../node_modules/react-md/dist/react-md.indigo-blue.min.css";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import ViewModal from "./_modal/view";


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
			year: '',
			date_selected: '',
			totalPages: 0,
			totalCount: 0,
			per_page: 10,
			activePage: 0,
		    sort: {
		      column: 'StartDate',
		      direction: 'desc'
		    },
			unauthorized: false,
			listViewModalShown: false,
			listViewDataCourseName:          "",
	        listViewDatastartDate:          "",
	        listViewDatacourseLocation:     "",
	        listViewDatacourseType:         "",
	        listViewDatahost:               "",
	        listViewDatacpdFormat:          "",
	        listViewDatavenue:              "",
	        listViewDatatrainer:            "",
	        listViewDatacourseDescription:  ""
		}
	};

	handleInputChange(name,value) {
        let newValue = value;
        if (name == 'start_date') {
            let newDate = new Date(value);
            newValue = newDate.toISOString();
        }
        this.setState({
            [name]: newValue
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
		let self = this;
		axios.get(Listing_URL, {
			params: {
				CPDTypeId: this.state.cpd_type_id,
				CourseName: this.state.course_name,
				HostId: this.state.host_id,
				LocationName: this.state.location_name,
				Venue: this.state.venue,
				reverse: (this.state.sort.direction === 'asc') ? false : true,
				sortBy: this.state.sort.column,
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

			}).catch(function (error) {
				if (error.response.status === 401) {
					self.setState({
						unauthorized: true,
					});
				}
			});
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
			year: '',
			date_selected: '',
			sort: {
				column: 'StartDate',
				direction: 'desc'
			},
			totalPages: 0,
			totalCount: 0,
			per_page: 10,
			activePage: 0,
			unauthorized: false,
		});
	}

    openModalWithItem(courseName,startDate,courseLocation,courseType,host,cpdFormat,venue,trainer,courseDescription) {
       this.setState({
	        listViewDataCourseName:         courseName,
	        listViewDatastartDate:          (startDate) ? startDate : 'na',
	        listViewDatacourseLocation:     (courseLocation) ? courseLocation : 'na',
	        listViewDatacourseType:         (courseType) ? courseType : 'na',
	        listViewDatahost:               (host) ? host : 'na',
	        listViewDatacpdFormat:          (cpdFormat) ? cpdFormat : 'na',
	        listViewDatavenue:              (venue) ? venue : 'na',
	        listViewDatatrainer:            (trainer) ? trainer : 'na',
	        listViewDatacourseDescription:  (courseDescription) ? courseDescription : 'na',
			listViewModalShown: true
       })
    }

	onSort = (column) => (e) => {
	    const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
	    this.setState({
	      sort: {
	        column,
	        direction,
	      }
	    });
	};

	setArrow = (column) => {
		let className = 'fa fa-sort';
		if (this.state.sort.column === column) {
			className += this.state.sort.direction === 'asc' ? '-asc' : '-desc';
		}
		return className;
	};

	render () {
		if (this.state.unauthorized) {
			return <Redirect to='/'/>;
		}

		let listViewModalShownClose = () => this.setState({ listViewModalShown: false })
		let dashboard_records;

		const csvData = [
			["firstname", "lastname", "email"],
			["Ahmed", "Tomi", "ah@smthing.co.com"],
			["Raed", "Labes", "rl@smthing.co.com"],
			["Yezzi", "Min l3b", "ymin@cocococo.com"]
		];

		if (this.state.dashboard_records !== null) {
			dashboard_records = this.state.dashboard_records.map((dashboard_record , index) => {
					return (
					<tr key={index}>
						<td><img src={ (dashboard_record.ImagePath) ? dashboard_record.ImagePath.replace('app/','') : ''} /></td>
						<td>{dashboard_record.CPDTypeName}</td>
						<td>{dashboard_record.CourseName}</td>
						<td>{dashboard_record.Hours}h</td>
						<td>{dashboard_record.CompletionDate}</td>
						<td>{dashboard_record.Venue}</td>
						<td>{dashboard_record.Trainer}</td>
						<td>{dashboard_record.HostId}</td>
						<td>{dashboard_record.StartDate}</td>
						<td><a data-item={dashboard_record}
							   onClick={() => {this.openModalWithItem(
							   	dashboard_record.CourseName,
								dashboard_record.StartDate,
								dashboard_record.LocationName,
								dashboard_record.CPDTypeName,
								dashboard_record.HostId,
								dashboard_record.CPDFormatId,
								dashboard_record.Venue,
								dashboard_record.Trainer,
								dashboard_record.CourseDescription
							)}} style={{fontSize:'20px', cursor: 'pointer'}}><i className="fa fa fa-eye"> </i></a>
						</td>
					</tr>
				)
			}
			);
		}

		return (
			<div>
				<div>
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
							<i className="fa fa-filter " title="" data-original-title="Search"> Search</i>
						</div>
	                    <div className="shadow">
	                        <div className="layout-gt-sm-row">
	                            <div style={{padding: '1rem'}}>
	                                <div className="md-grid">
	                                    <TextField
	                                          id="courseName"
	                                          label="Course Name"
	                                          lineDirection="center"
	                                          placeholder="Course Name"
	                                          name="course_name"
											  value={this.state.course_name}
	                                          onChange={(value) => {this.handleInputChange('course_name',value)}}
	                                          className="md-cell md-cell--6 md-cell--bottom"
	                                        />

	                                    <SelectField
										    id="select_year"
										    label="Select Year"
										    placeholder="Year"
										    name="year"
										    menuItems={['2017', '2018']}
											value={this.state.year}
	                                        onChange={(value) => {this.handleInputChange('year',value)}}
										    className="md-cell md-cell--6 md-cell--bottom"
										/>
	                                </div>

	                                <div className="md-grid">
	                                    <TextField
	                                          id="location_name"
	                                          label="Location Name"
	                                          lineDirection="center"
	                                          placeholder="Location Name"
	                                          name="location_name"
											  value={this.state.location_name}
	                                          onChange={(value) => {this.handleInputChange('location_name',value)}}
	                                          className="md-cell md-cell--6 md-cell--bottom"
	                                        />

	                                    <DatePicker
	                                          id="start_date"
	                                          label="Enter Start Date"
	                                          name="start_date"
											  value={this.state.start_date}
	                                          onChange={(value) => {this.handleInputChange('start_date',value)}}
	                                          className="md-cell md-cell--6 md-cell--bottom"
	                                    />

	                                </div>
	                                <div className="md-grid">
	                                    <TextField
	                                          id="host"
	                                          label="Host"
	                                          lineDirection="center"
	                                          placeholder="Host"
											  value={this.state.host}
	                                          onChange={(value) => {this.handleInputChange('host',value)}}
	                                          className="md-cell md-cell--6 md-cell--bottom"
	                                        />

	                                </div>
	                                <div>
	                                    <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={() => this.makeHttpRequestWithPage(1)}>
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
						<CSVLink data={csvData} className="btn btn-success btn-circle btn-lg" style={{marginLeft: '10px',lineHeight: '28px'}}>
							<i className="fa fa-file-excel-o"> </i>
						</CSVLink>
						<button type="button"
								style={{marginLeft: '10px'}}
								className="btn btn-primary btn-circle btn-lg ng-scope"
								data-original-title="" title="">
								<Link to={'/mycpd'}>
									<i className="fa fa-plus"> </i>
								</Link>
						</button>
					</div>
				</div>
				<div className="col">
					<table className='table table-striped table-bordered table-hover table-condensed'>
						<thead>
						<tr className="header">
							<th> </th>
							<th role="button" onClick={this.onSort('CPDTypeName')}>Course Type <i className={this.setArrow('CPDTypeName')}> </i></th>
							<th role="button" onClick={this.onSort('CourseName')}>Course<i className={this.setArrow('CourseName')}> </i></th>
							<th role="button" onClick={this.onSort('Hours')}>Completed Hours<i className={this.setArrow('Hours')}> </i></th>
							<th role="button" onClick={this.onSort('CompletionDate')}>Completion Date<i className={this.setArrow('CompletionDate')}> </i></th>
							<th role="button" onClick={this.onSort('Venue')}>Venue<i className={this.setArrow('Venue')}> </i></th>
							<th role="button" onClick={this.onSort('Trainer')}>Trainer<i className={this.setArrow('Trainer')}> </i></th>
							<th role="button" onClick={this.onSort('HostId')}>Host<i className={this.setArrow('HostId')}> </i></th>
							<th role="button" onClick={this.onSort('StartDate')}>Start Date<i className={this.setArrow('StartDate')}> </i></th>
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
				<ViewModal show={ this.state.listViewModalShown }
						   data={this.state}
						   onHide={listViewModalShownClose}
						   coursename={this.state.listViewDataCourseName}
						   startdate={this.state.listViewDatastartDate}
						   courselocation={this.state.listViewDatacourseLocation}
						   coursetype={this.state.listViewDatacourseType}
						   host={this.state.listViewDatahost}
						   cpdformat={this.state.listViewDatacpdFormat}
						   venue={this.state.listViewDatavenue}
						   trainer={this.state.listViewDatatrainer}
						   description={this.state.listViewDatacourseDescription}
				/>
			</div>
		);
	}
}

export default Dashboard;