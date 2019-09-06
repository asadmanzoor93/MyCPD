import React from "react";
import Header from '../_components/header.js';
import "react-table/react-table.css";
import axios from "axios";
import Pagination from "react-js-pagination";

const Types_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/CPDTypes";
const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const Library_URL = "http://34.248.242.178/CPDCompliance/api/Library";

class Library extends React.Component {

    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            host_list: [],
            types_list: [],
            course_name: '',
            library_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0
        }
    };

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        });
        this.makeHttpRequestWithPage(pageNumber);
    }

    componentDidMount() {
        this.makeHttpRequestWithPage(1);

        // Types List
        axios.get(Types_URL, {
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
                    this.setState({ types_list: data });
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

    }

    makeHttpRequestWithPage(pageNumber) {

        axios.get(Library_URL, {
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
                    library_records: data.Items,
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

    render () {

        let library_records;
        if (this.state.library_records !== null) {
            library_records = this.state.library_records.map((cpd_record , index) => (
                <tr key={index}>
                    <td>{cpd_record.CourseName}</td>
                    <td>{cpd_record.LocationID}</td>
                    <td>{cpd_record.DurationHours}</td>
                    <td>{cpd_record.CPDTypeId}</td>
                    <td>{cpd_record.HostID}</td>
                    <td>{cpd_record.Trainer}</td>
                    <td>{cpd_record.Venue}</td>
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
                                    <div className="form-group input-group">
                                        <span className="has-float-label" style={{width: '590px'}}>
                                            <input className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                                                   type="text" placeholder="Course Name" id="courseName" aria-invalid="false" />
                                            <label htmlFor="courseName">Course Name</label>
                                        </span>
                                        <span className="has-float-label" style={{width: '590px'}}>
                                            <input className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                                                   type="text" id="LocationName"
                                                   placeholder="Location Name" aria-invalid="false" />
                                            <label htmlFor="LocationName">Location Name</label>
                                        </span>
                                    </div>

                                    <div className="form-group input-group">
                                        <div className="has-float-label" style={{width: '560px'}}>
                                            <select className="form-control ng-pristine ng-untouched ng-valid ng-empty" id="courseType" aria-invalid="false">
                                                <option value="" defaultValue> </option>
                                                {this.state.types_list.map((item, key) =>
                                                    <option key={key} label={item.Description} value={item.CPDTypeId} >{item.Description}</option>
                                                )}
                                            </select>
                                            <label htmlFor="courseType">CPD Type</label>
                                        </div>

                                        <span className="has-float-label" style={{width: '560px'}}>
                                            <input className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                                                   id="Venue" type="text" placeholder="Venue"
                                                   aria-invalid="false" />
                                            <label htmlFor="Venue">Venue</label>
                                        </span>
                                    </div>

                                    <div className="form-group input-group" style={{width: '45.5%'}}>
                                        <div className="has-float-label" >
                                            <select className="form-control ng-pristine ng-valid ng-empty ng-touched">
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
                                        <button className="btn btn-primary"><span className="glyphicon glyphicon-remove-sign"> </span> Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{paddingBottom: '30px'}}>
                        <div className="gridTopButtons">
                            <button type="button" className="btn btn-danger btn-circle btn-lg ng-scope" tooltip="">
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
                                <th>Type</th>
                                <th>Host</th>
                                <th>Trainer</th>
                                <th>Venue</th>
                                <th>Start Date</th>
                                <th>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            { library_records }
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

export default Library;