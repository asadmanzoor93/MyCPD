import React from "react";
import Header from '../_components/header.js';
import "react-table/react-table.css";
import axios from "axios";
import Pagination from "react-js-pagination";

const Approved_CPD_URL = "http://34.248.242.178/CPDCompliance/api/approvedcpd";

class ApprovedCPDProviders extends React.Component {
    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            course_name: '',
            approved_cpd_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0
        }
    };

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        });
        this.makeHttpRequestWithPage(pageNumber);
    }

    componentDidMount() {
        this.makeHttpRequestWithPage(1);
    }

    makeHttpRequestWithPage(pageNumber) {

        axios.get(Approved_CPD_URL, {
            params: {
                page: pageNumber,
                pageSize: this.state.per_page,
                reverse: false,
                sortBy: 'StartDate'
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
                    approved_cpd_records: data.Items,
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
        this.makeHttpRequestWithPage(1);
    }

    render () {

        let approved_cpd_records;
        if (this.state.approved_cpd_records !== null) {
            approved_cpd_records = this.state.approved_cpd_records.map((cpd_record , index) => (
                <tr key={index}>
                    <td>{cpd_record.CourseName}</td>
                    <td>{cpd_record.LocationName}</td>
                    <td>{cpd_record.DurationHours}</td>
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
                <Header />
                <div className="container main-content">
                    <div className="panel panel-default">
                        <div className="panel-heading-cpd-3" style={{padding: '10px'}}>
                            <i className="fa fa-filter " title="" tooltip="" data-original-title="Search"> Search</i>
                        </div>
                        <div className="shadow">
                            <div className="layout-gt-sm-row">
                                <div style={{padding: '1rem'}}>
                                    <div className="form-group input-group" style={{width: '100%'}}>
                                        <span className="has-float-label" style={{width: '50%'}}>
                                            <input className="form-control ng-pristine ng-valid ng-empty ng-touched" type="text" id="courseName" value="" placeholder="Course Name" aria-invalid="false" />
                                            <label htmlFor="course_name">Course Name</label>
                                        </span>

                                        <span className="has-float-label" style={{width: '50%'}}>
                                            <input className="form-control ng-pristine ng-valid ng-empty ng-touched" type="text" id="host" value="" placeholder="Host" aria-invalid="false" />
                                            <label htmlFor="host">Host</label>
                                        </span>
                                    </div>

                                    <div className="form-group input-group" style={{width: '100%'}}>
                                        <span className="has-float-label">
                                            <input className="form-control" type="text" name="location_name" id="location_name" placeholder="Location Name" />
                                            <label htmlFor="location_name">Location Name</label>
                                        </span>

                                        <div className="has-float-label" >
                                            <p className="input-group">
                                                <input type="text" className="form-control ng-untouched ng-empty ng-dirty ng-invalid ng-invalid-parse" name="courseDate" placeholder="Enter Start Date" />
                                                <span className="input-group-addon" data-toggle="datepicker">
                                                    <span className="glyphicon glyphicon-calendar"> </span>
                                                </span>
                                            </p>
                                            <label htmlFor="courseDate">Enter Start Date</label>
                                        </div>
                                    </div>

                                    <div className="clearfix"> </div>
                                    <div>
                                        <button className="btn btn-primary" onClick={() => this.makeHttpRequestWithPage(1)}>
                                            <span className="glyphicon glyphicon-search"> </span>
                                            Search
                                        </button>
                                        <button className="btn btn-primary"><span className="glyphicon glyphicon-remove-sign"> </span> Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{paddingBottom: '30px'}}>
                        <div className="gridTopButtons">
                            <button type="button" onClick={() => window.print()}
                                    className="btn btn-danger btn-circle btn-lg ng-scope" tooltip="">
                                <i className="fa fa-print"> </i>
                            </button>
                            <button type="button" className="btn btn-success btn-circle btn-lg ng-scope" tooltip="">
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
                                <th>Course Name </th>
                                <th>Location</th>
                                <th>CPD Hours</th>
                                <th>Host</th>
                                <th>Type</th>
                                <th>Trainer</th>
                                <th>Start Date</th>
                                <th>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            { approved_cpd_records }
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
            </div>
        );
    }

}

export default ApprovedCPDProviders;