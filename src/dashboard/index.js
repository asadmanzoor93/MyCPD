import React from "react";
import Header from '../_components/header.js';
import DashboardList from './list.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Hour_list from "../apis/hour_list";

const dashboard_listing_url = "http://34.248.242.178/CPDCompliance/api/Member/GetMemberCPD?Year=2019&page=1&pageSize=1000&reverse=false&sortBy=CourseName";
const hour_list_url = "http://34.248.242.178/CPDCompliance/api/Member/MemberCPDHours?Year=2019&UserName";

const bearer = 'bearer YQh1NHyXyuW6v6EgE3v2eQIqPFE57qaoMah4Ok8iKIMhn7-QIcAsrEIPg10n5OD1lwh6GmW3DJNWP8G84WZiBV4tjpk2mYdPgamc0NxOB6WRkoACqvQHuRkt8TCfG-d_hMq6ANzOAa-RfjgoZuHOWaFNXJT2nmbJNfy9hCKuZue-32N46eHVrx37mvDgpaJV-_nGaZ70k82QAv6t-id_qVmGQIvmDIN8fpMQyyULr0oLjpHPil5o9_B9CBDJMzfcS85AeF_4dfa9Bi7aEa_36mH4CANrtuomTxBA5tfIUjxeZXKAGtoZS4RF8-sXV4h9qb0n5igfWD3c-XmOhr4HKRJvhiXa09uCt71qVgGHUOfFGY3u4ddDvNRyjD1tSaxeKOuH2HaSjpa_NvY58ztIqMW0zPd3XEWbDm5cRP2eidfO1Rv6pM_VWx7ubAO9Ozbp';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			dashboard_listing: [],
			hour_list: [],
		}
	};

	componentDidMount() {
		// Dashboard Listing
		fetch(dashboard_listing_url, {
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
			}).catch(console.log);

		// Home List
		fetch(hour_list_url, {
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
					data_items = Hour_list;
				}
				this.setState({ hour_list: data_items });
			}).catch(console.log);


	}

	render () {

		return (
			<div>
			<Header />
			<div className="container main-content">
			<div className="row">
				<h2 className="page-header">Dashboard</h2>
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
										<option value="" selected="selected"></option>
										{this.state.hour_list.map((item, key) =>
											<option value={item.ID} >{item.Name}</option>
										)}
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