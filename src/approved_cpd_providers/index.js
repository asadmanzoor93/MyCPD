import React from "react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
import $ from "jquery";
import { TextField, DatePicker } from 'react-md';
import "../../node_modules/react-md/dist/react-md.indigo-blue.min.css";
import ViewModal from "../dashboard/_modal/view";

const Approved_CPD_URL = "http://34.248.242.178/CPDCompliance/api/approvedcpd";
const Excel_Download_URL = "http://34.248.242.178/CPDCompliance/api/approvedcpd/Excel";

class ApprovedCPDProviders extends React.Component {
    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearSearchFilters = this.clearSearchFilters.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);
        this.onSort = this.onSort.bind(this);

        this.state = {
            course_name: '',
            location_name: '',
            host: '',
            start_date: '',
            sort: {
                column: 'StartDate',
                direction: 'desc'
            },
            approved_cpd_records: [],
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0,
            unauthorized: false,
            listViewModalShown: false,
            listViewDataCourseName:         "",
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
        console.log(name,value);
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
    
    makeHttpRequestWithPage(pageNumber, column, direction) {
        let reverse= (this.state.sort.direction === 'asc') ? false : true;
        let sortBy= this.state.sort.column;

        if(column){
            sortBy = column;
        }

        if(direction){
            reverse = direction;
        }

        let self = this;
        axios.get(Approved_CPD_URL, {
            params: {
                CourseName: this.state.course_name,
                HostName: this.state.host,
                LocationName: this.state.location_name,
                StartDate: this.state.start_date,
                reverse: reverse,
                sortBy: sortBy,
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

            }).catch(function (error) {
                if(error){
                    if(error.response){
                        if (error.response.status === 401) {
                            self.setState({
                                unauthorized: true,
                            });
                            localStorage.setItem('failureMessage', 'Login Expired');
                        }
                    }
                }
            });
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
            sort: {
                column: 'StartDate',
                direction: 'desc'
            },
            totalPages: 0,
            totalCount: 0,
            per_page: 10,
            activePage: 0
        });
        $('.datepicker').datepicker();
    }

    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        this.setState({
            sort: {
                column,
                direction,
            }
        });
        this.makeHttpRequestWithPage(1, column, direction);
    };

    setArrow = (column) => {
        let className = 'fa fa-sort';
        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? '-asc' : '-desc';
        }
        return className;
    };

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

    downloadExcel() {
        var fileType = 'application/vnd.ms-excel';
        var name;
        this.setState({ mainLoading: true });
        axios(Excel_Download_URL, {
            responseType: 'blob',
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                var blob = new Blob([response.data],
                    { type: fileType });

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, name);
                }
                else {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'ApprovedCPDProviders.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .then((data) => {
                this.setState({ mainLoading: false });
            }).catch(console.log);
    }

    render () {
        if (this.state.unauthorized) {
            return <Redirect to='/'/>;
        }

        let listViewModalShownClose = () => this.setState({ listViewModalShown: false });
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
                    <td><a data-item={cpd_record}
                           onClick={() => {this.openModalWithItem(
                               cpd_record.CourseName,
                               cpd_record.StartDate,
                               cpd_record.LocationName,
                               cpd_record.CPDTypeName,
                               cpd_record.HostName,
                               cpd_record.CPDFormatName,
                               cpd_record.Venue,
                               cpd_record.Trainer,
                               cpd_record.CourseDescription
                           )}} style={{fontSize:'20px', cursor: 'pointer'}}><i className="fa fa fa-eye"> </i></a>
                    </td>
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
                        <button type="button" onClick={() => {this.downloadExcel()}}
                                style={{marginLeft: '10px',lineHeight: '28px'}}
                                className="btn btn-success btn-circle btn-lg ">
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
                                <th role="button" onClick={this.onSort('CourseName')}>Course Name <i className={this.setArrow('CourseName')}> </i></th>
                                <th role="button" onClick={this.onSort('LocationName')}>Location<i className={this.setArrow('LocationName')}> </i></th>
                                <th role="button" onClick={this.onSort('Duration')}>CPD Hours<i className={this.setArrow('Duration')}> </i></th>
                                <th role="button" onClick={this.onSort('HostName')}>Host<i className={this.setArrow('HostName')}> </i></th>
                                <th role="button" onClick={this.onSort('CPDTypeName')}>Type<i className={this.setArrow('CPDTypeName')}> </i></th>
                                <th role="button" onClick={this.onSort('Trainer')}>Trainer<i className={this.setArrow('Trainer')}> </i></th>
                                <th role="button" onClick={this.onSort('StartDate')}>Start Date<i className={this.setArrow('StartDate')}> </i></th>
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

export default ApprovedCPDProviders;