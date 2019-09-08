import React from "react";
import "react-table/react-table.css";
import axios from "axios";
import Pagination from "react-js-pagination";
import $ from "jquery";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";

const Approved_CPD_URL = "http://34.248.242.178/CPDCompliance/api/approvedcpd";

class ApprovedCPDProviders extends React.Component {
    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearSearchFilters = this.clearSearchFilters.bind(this);
        this.onSort = this.onSort.bind(this)

        this.state = {
            course_name: '',
            location_name: '',
            host: '',
            start_date: '',
            reverse: false,
            sortBy: 'StartDate',
            approved_cpd_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0
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
        $('.datepicker').datepicker();
        this.makeHttpRequestWithPage(1);
    }

    makeHttpRequestWithPage(pageNumber) {

        axios.get(Approved_CPD_URL, {
            params: {
                CourseName: this.state.course_name,
                HostName: this.state.host,
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

    clearSearchFilters(){
        this.setState({
            course_name: '',
            location_name: '',
            host: '',
            start_date: '',
            reverse: false,
            sortBy: 'StartDate',
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0
        });
        $('.datepicker').datepicker();
    }

    onSort(event, sortKey){
        const data = this.state.sortBy;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({data})
    }

    render () {

        let approved_cpd_records;
        if (this.state.approved_cpd_records !== null) {
            approved_cpd_records = this.state.approved_cpd_records.map((cpd_record , index) => (
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
                                               id="courseName"
                                               placeholder="Course Name"
                                               type="text"
                                               value={this.state.course_name}
                                               name="course_name"
                                               onChange={this.handleInputChange}
                                               aria-invalid="false" />
                                        <label htmlFor="course_name">Course Name</label>
                                    </span>

                                    <span className="has-float-label" style={{width: '50%'}}>
                                        <input className="form-control ng-pristine ng-valid ng-empty ng-touched"
                                               id="host"
                                               placeholder="Host"
                                               type="text"
                                               value={this.state.host}
                                               name="host"
                                               onChange={this.handleInputChange}
                                               aria-invalid="false" />
                                        <label htmlFor="host">Host</label>
                                    </span>
                                </div>

                                <div className="form-group input-group" style={{width: '100%'}}>
                                    <span className="has-float-label">
                                        <input className="form-control"
                                               id="location_name"
                                               placeholder="Location Name"
                                               type="text"
                                               value={this.state.location_name}
                                               name="location_name"
                                               onChange={this.handleInputChange}
                                        />
                                        <label htmlFor="location_name">Location Name</label>
                                    </span>

                                    <div className="has-float-label" >
                                        <p className="input-group datepicker" style={{ padding: '0' }}>
                                            <input type="text" className="form-control"
                                                   placeholder="Enter Start Date"
                                                   name="start_date"
                                                   value={this.state.start_date}
                                                   onChange={this.handleInputChange}
                                                   aria-invalid="true" />
                                            <span className="input-group-addon">
													<span className="glyphicon glyphicon-calendar"> </span>
												</span>
                                        </p>
                                        <label htmlFor="start_date">Enter Start Date</label>
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
                            <th> </th>
                            <th>Course Name <i className="fa fa-fw fa-sort" onClick={ this.onSort}> </i></th>
                            <th>Location <i className="fa fa-fw fa-sort"> </i></th>
                            <th>CPD Hours <i className="fa fa-fw fa-sort"> </i></th>
                            <th>Host <i className="fa fa-fw fa-sort"> </i></th>
                            <th>Type <i className="fa fa-fw fa-sort"> </i></th>
                            <th>Trainer <i className="fa fa-fw fa-sort"> </i></th>
                            <th>Start Date <i className="fa fa-fw fa-sort"> </i></th>
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
        );
    }

}

export default ApprovedCPDProviders;