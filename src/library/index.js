import React from "react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
import { TextField, DatePicker, SelectField } from 'react-md';
import "../../node_modules/react-md/dist/react-md.indigo-blue.min.css";

const Types_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/CPDTypes";
const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const Library_URL = "http://34.248.242.178/CPDCompliance/api/Library";
const Excel_Report_URL = "http://34.248.242.178/CPDCompliance/api/Library/Excel";

class Library extends React.Component {

    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearSearchFilters = this.clearSearchFilters.bind(this);
        this.exportExcelReport = this.exportExcelReport.bind(this);

        this.state = {
            host_list: [],
            types_list: [],
            library_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0,
            cpd_type_id: '',
            course_name: '',
            host_id: '',
            location_name: '',
            venue: '',
            unauthorized: false,
            reverse: false,
            sortBy: 'StartDate',
        }
    };

    handleInputChange(name, value) {
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
        let self = this;
        axios.get(Library_URL, {
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
                    library_records: data.Items,
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
            host_list: [],
            types_list: [],
            library_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0,
            cpd_type_id: '',
            course_name: '',
            host_id: '',
            location_name: '',
            venue: '',
            unauthorized: false,
            reverse: false,
            sortBy: 'StartDate',
        });
    }

    exportExcelReport(event){
        axios.get(
            Excel_Report_URL, {
            method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/xlsx'
            }
        }
        ).then(response => {

            console.log(response);
            var fileName='Library.xlsx';
            var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const blobURL = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobURL;
            tempLink.setAttribute('download', fileName);
            tempLink.click();
        })
    }

    render () {
        if (this.state.unauthorized) {
            return <Redirect to='/'/>;
        }

        let library_records;
        if (this.state.library_records !== null) {
            library_records = this.state.library_records.map((cpd_record , index) => (
                <tr key={index}>
                    <td> </td>
                    <td>{cpd_record.CourseName}</td>
                    <td>{cpd_record.LocationID}</td>
                    <td>{cpd_record.DurationHours}h</td>
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
                                          onChange={(value) => {this.handleInputChange('course_name',value)}}
                                          className="md-cell md-cell--6 md-cell--bottom"
                                        />

                                    <TextField
                                          id="location_name"
                                          label="Location Name"
                                          lineDirection="center"
                                          placeholder="Location Name"
                                          name="location_name"
                                          onChange={(value) => {this.handleInputChange('location_name',value)}}
                                          className="md-cell md-cell--6 md-cell--bottom"
                                        />
                                </div>
                                <div className="md-grid">
                                    <SelectField
                                        id="host"
                                        label="Host"
                                        placeholder="Host"
                                        name="host"
                                        menuItems={['Host 1', 'Host 2']}
                                        onChange={(value) => {this.handleInputChange('host',value)}}
                                        className="md-cell md-cell--6 md-cell--bottom"
                                    />
                                    <TextField
                                          id="venue"
                                          label="Venue"
                                          lineDirection="center"
                                          placeholder="Host"
                                          onChange={(value) => {this.handleInputChange('venue',value)}}
                                          className="md-cell md-cell--6 md-cell--bottom"
                                        />
                                </div>

                                <div className="md-grid">
                                    <SelectField
                                        id="cpd_type_id"
                                        label="CPD Type"
                                        placeholder="cpd_type_id"
                                        name="host"
                                        menuItems={['CPD Type 1', 'CPD Type 2']}
                                        onChange={(value) => {this.handleInputChange('cpd_type_id',value)}}
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
                <div className="row" style={{paddingBottom: '30px'}}>
                    <div className="gridTopButtons">
                        <button type="button" onClick={() => window.print()}
                                className="btn btn-danger btn-circle btn-lg ng-scope">
                            <i className="fa fa-print"> </i>
                        </button>
                        <button type="button" onClick={(e)=> this.exportExcelReport(e)}
                                className="btn btn-success btn-circle btn-lg ng-scope">
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
                            <td> </td>
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
        );
    }

}

export default Library;