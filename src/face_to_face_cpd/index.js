import React from "react";
import Header from '../_components/header.js';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import styles from './App.module.css';
import axios from "axios";

const Hosts_URL = "http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost";
const FaceToFace_URL = "http://34.248.242.178/CPDCompliance/api/faceToface";

class FaceToFace extends React.Component {

    constructor() {
        super();
        this.handlePaginationFilter = this.handlePaginationFilter.bind(this);
        this.state = {
            host_list: [],
            course_name: '',
            cpd_records: null,
            totalPages: null,
            per_page: 10,
            current_page: null
        }
    };

    componentDidMount() {
        this.makeHttpRequestWithPage(1);

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

        axios.get(FaceToFace_URL, {
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
                    cpd_records: data.Items,
                    totalPages: data.TotalPages,
                    per_page: data.Count,
                    current_page: data.Page,
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

        let cpd_records, renderPageNumbers;
        if (this.state.cpd_records !== null) {
            cpd_records = this.state.cpd_records.map(cpd_record => (
                <tr key={cpd_record.CourseName}>
                    <td>{cpd_record.CourseName}</td>
                    <td>{cpd_record.LocationName}</td>
                    <td>{cpd_record.Duration}</td>
                    <td>{cpd_record.HostName}</td>
                    <td>{cpd_record.CPDTypeName}</td>
                    <td>{cpd_record.Trainer}</td>
                    <td>{cpd_record.StartDate}</td>
                </tr>
            ));
        }

        const pageNumbers = [];
        if (this.state.totalPages !== null) {
            for (let i = 1; i <= this.state.totalPages; i++) {
                pageNumbers.push(i);
            }
            renderPageNumbers = pageNumbers.map(number => {
                let classes = this.state.current_page === number ? styles.active : '';
                return (
                    <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
                );
            });

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

                    <div className="row ng-scope">
                        <div id="gridTopItems">
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
                    </div>
                </div>

                <div>
                    <div className={styles.app}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>Course Name </th>
                                <th>Location</th>
                                <th>CPD Hours</th>
                                <th>Host</th>
                                <th>Type</th>
                                <th>Trainer</th>
                                <th>Start Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            { cpd_records }
                            </tbody>
                        </table>
                        <div className={styles.pagination}>
                            <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
                            {renderPageNumbers}
                            <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default FaceToFace;