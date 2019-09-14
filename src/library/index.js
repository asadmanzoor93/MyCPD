import React from "react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Pagination from "react-js-pagination";
import { TextField, DatePicker, SelectField } from 'react-md';
import "../../node_modules/react-md/dist/react-md.indigo-blue.min.css";
import ViewModal from "./_modal/view";

const Locations_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/Location";
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
            host_dict: {},
            types_dict: {},
            locations_dict: {},
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
            sort: {
                column: 'StartDate',
                direction: 'desc'
            },
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

    handleInputChange(name, value) {
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
                    let type_dic = {};
                    for(let i = 0; i < data.length; i++){
                        type_dic[data[i]['CPDTypeId']] = data[i]['Description'];
                    }

                    this.setState({
                        types_list: data,
                        type_dict: type_dic
                    });
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
                    let host_dic = {};
                    for(let i = 0; i < data.length; i++){
                        host_dic[data[i]['ID']] = data[i]['Name'];
                    }

                    this.setState({
                        host_list: data,
                        host_dict: host_dic
                    });
                }
            }).catch(console.log);

        // Locations List
        axios.get(Locations_URL, {
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
                    let locations_dic = {};
                    for(let i = 0; i < data.length; i++){
                        locations_dic[data[i]['ID']] = data[i]['Name'];
                    }

                    this.setState({
                        locations_dict: locations_dic
                    });
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
                    library_records: data.Items,
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
            sort: {
                column: 'StartDate',
                direction: 'desc'
            },
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

    render () {
        if (this.state.unauthorized) {
            return <Redirect to='/'/>;
        }

        let listViewModalShownClose = () => this.setState({ listViewModalShown: false })
        let library_records;
        if (this.state.library_records !== null) {
            library_records = this.state.library_records.map((cpd_record , index) => (
                <tr key={index}>
                    <td><img src={ (cpd_record.ImagePath) ? cpd_record.ImagePath.replace('app/','') : ''} /></td>
                    <td>{cpd_record.CourseName}</td>
                    <td>{this.state.locations_dict[cpd_record.LocationID]}</td>
                    <td>{cpd_record.DurationHours}h</td>
                    <td>{this.state.type_dict[cpd_record.CPDTypeId]}</td>
                    <td>{this.state.host_dict[cpd_record.HostID]}</td>
                    <td>{cpd_record.Trainer}</td>
                    <td>{cpd_record.Venue}</td>
                    <td>{cpd_record.StartDate}</td>
                    <td><a data-item={cpd_record}
                           onClick={() => {this.openModalWithItem(
                               cpd_record.CourseName,
                               cpd_record.StartDate,
                               this.state.locations_dict[cpd_record.LocationID],
                               this.state.type_dict[cpd_record.CPDTypeId],
                               this.state.host_dict[cpd_record.HostID],
                               cpd_record.FormatName,
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
                                </div>
                                <div className="md-grid">
                                    <SelectField
                                        id="host"
                                        label="Host"
                                        placeholder="Host"
                                        name="host"
                                        menuItems={['Host 1', 'Host 2']}
                                        value={this.state.host}
                                        onChange={(value) => {this.handleInputChange('host',value)}}
                                        className="md-cell md-cell--6 md-cell--bottom"
                                    />
                                    <TextField
                                          id="venue"
                                          label="Venue"
                                          lineDirection="center"
                                          placeholder="Venue"
                                          value={this.state.venue}
                                          onChange={(value) => {this.handleInputChange('venue',value)}}
                                          className="md-cell md-cell--6 md-cell--bottom"
                                        />
                                </div>

                                <div className="md-grid">
                                    <SelectField
                                        id="cpd_type_id"
                                        label="CPD Type"
                                        placeholder="cpd_type_id"
                                        name="cpd_type_id"
                                        menuItems={['CPD Type 1', 'CPD Type 2']}
                                        value={this.state.cpd_type_id}
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
                        <button type="button" style={{marginLeft: '10px'}} onClick={(e)=> this.exportExcelReport(e)}
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
                            <th role="button" onClick={this.onSort('CourseName')}>Course Name <i className={this.setArrow('CourseName')}> </i></th>
                            <th role="button" onClick={this.onSort('LocationID')}>Location<i className={this.setArrow('LocationID')}> </i></th>
                            <th role="button" onClick={this.onSort('DurationHours')}>CPD Hours<i className={this.setArrow('DurationHours')}> </i></th>
                            <th role="button" onClick={this.onSort('CPDTypeId')}>Type<i className={this.setArrow('CPDTypeId')}> </i></th>
                            <th role="button" onClick={this.onSort('HostID')}>Host<i className={this.setArrow('HostID')}> </i></th>
                            <th role="button" onClick={this.onSort('Trainer')}>Trainer<i className={this.setArrow('Trainer')}> </i></th>
                            <th role="button" onClick={this.onSort('Venue')}>Venue<i className={this.setArrow('Venue')}> </i></th>
                            <th role="button" onClick={this.onSort('StartDate')}>Start Date<i className={this.setArrow('StartDate')}> </i></th>
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

export default Library;