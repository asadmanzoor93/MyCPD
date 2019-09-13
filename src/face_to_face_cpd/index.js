import React from "react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
import $ from "jquery";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";

const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const FaceToFace_URL = "http://34.248.242.178/CPDCompliance/api/faceToface";

class FaceToFace extends React.Component {

    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearSearchFilters = this.clearSearchFilters.bind(this);

        this.state = {
            course_name: '',
            location_name: '',
            host_name: '',
            start_date: '',
            cpd_records: [],
            host_list: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0,
            unauthorized: false
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

    }

    makeHttpRequestWithPage(pageNumber) {
        let self = this;
        axios.get(FaceToFace_URL, {
            params: {

                CourseName: this.state.course_name,
                HostName: this.state.host_name,
                LocationName: this.state.location_name,
                StartDate: this.state.start_date,
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
                    cpd_records: data.Items,
                    totalPages: data.TotalPages,
                    totalCount: data.TotalCount,
                    activePage: data.Page,
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
            course_name: '',
            location_name: '',
            host_name: '',
            start_date: '',
            reverse: false,
            sortBy: 'StartDate',
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0,
            unauthorized: false
        });
        $('.datepicker').datepicker();
    }

    render () {
        if (this.state.unauthorized) {
            return <Redirect to='/'/>;
        }

        let cpd_records;
        if (this.state.cpd_records !== null) {
            cpd_records = this.state.cpd_records.map((cpd_record , index) => (
                <tr key={index}>
                    <td><img src={ (cpd_record.ImagePath) ? cpd_record.ImagePath.replace('app/','') : ''} /></td>
                    <td>{cpd_record.CourseName}</td>
                    <td>{cpd_record.LocationName}</td>
                    <td>{cpd_record.Duration}h</td>
                    <td>{cpd_record.HostName}</td>
                    <td>{cpd_record.CPDTypeName}</td>
                    <td>{cpd_record.Trainer}</td>
                    <td>{cpd_record.StartDate}</td>
                    <td> </td>
                </tr>
            ));
        }

        return (

            <div >
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
                                                   type="text"
                                                   id="course_name" placeholder="Course Name"
                                                   value={this.state.course_name}
                                                   name="course_name"
                                                   onChange={this.handleInputChange}
                                                   aria-invalid="false" />
                                            <label htmlFor="course_name">Course Name</label>
                                        </span>
                                </div>
                                <div className="form-group input-group" style={{width: '100%'}}>
                                            <span className="has-float-label">
                                                <input className="form-control" type="text" id="location_name"
                                                       value={this.state.location_name}
                                                       name="location_name"
                                                       onChange={this.handleInputChange}
                                                       placeholder="Location Name" />
                                                <label htmlFor="location_name">Location Name</label>
                                            </span>
                                    <div className="has-float-label" >
                                        <p className="input-group datepicker" style={{ padding: '0' }}>
                                            <input type="text" className="form-control" placeholder="Enter Start Date"
                                                   value={this.state.start_date}
                                                   name="start_date"
                                                   onChange={this.handleInputChange}
                                                   my-date-picker="" end-date="+3y" aria-invalid="true" />
                                            <span className="input-group-addon">
													<span className="glyphicon glyphicon-calendar"> </span>
												</span>
                                        </p>

                                        <label htmlFor="courseDate">Enter Start Date</label>
                                    </div>
                                </div>
                                <div className="form-group input-group" style={{width: '45.5%'}}>
                                    <div className="has-float-label" >
                                        <select className="form-control ng-pristine ng-valid ng-empty ng-touched"
                                                name="host_name" value={this.state.host_name}
                                                onChange={this.handleInputChange}
                                        >
                                            <option value="" defaultValue> </option>
                                            {this.state.host_list.map((item, key) =>
                                                <option key={key} value={item.Name} >{item.Name}</option>
                                            )}
                                        </select>
                                        <label htmlFor="host">Host</label>
                                    </div>
                                </div>
                                <div className="clearfix"> </div>
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
                    <div className="gridTopDropdown"> Show
                        <select className="input-sm ng-pristine ng-untouched ng-valid ng-not-empty" onChange={(e) => this.handlePaginationFilter(e)}>
                            <option label="10" value="10" defaultValue >10</option>
                            <option label="20" value="20">20</option>
                            <option label="30" value="30">30</option>
                        </select>
                        entries
                    </div>
                </div>
                <div className="col">
                    <table className='table table-striped table-bordered table-hover table-condensed'>
                        <thead>
                            <tr className="header">
                                <th> </th>
                                <th>Course Name </th>
                                <th>Location</th>
                                <th>CPD Hours</th>
                                <th>Host</th>
                                <th>Type</th>
                                <th>Trainer</th>
                                <th>Start Date</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            { cpd_records }
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

export default FaceToFace;