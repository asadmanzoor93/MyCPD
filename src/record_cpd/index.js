import React from "react";
import "react-table/react-table.css";
import $ from "jquery";
import axios from "axios";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";


const Member_Info_URL = 'http://34.248.242.178/CPDCompliance/api/account/GetMember?memID=';
const Types_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/CPDTypesForMyCPD';
const Formats_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/CPDFormat';
const Hosts_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost';
const Locations_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/Location';
const Courses_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/GetCourses';


//On view load: Call member info, types, formats, hosts, locations api. Fill data for first step automatically
class RecordCPD extends React.Component {
    constructor() {
        super();
        this.state = {
            currentStep: 1,
            host_list: [],
            member_info: [],
            types: [],
            formats: [],
            locations: [],
            courses: [],
            cpd_type_id: 2
        };

        this.handlePrevStep = this.handlePrevStep.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleSaveRecord = this.handleSaveRecord.bind(this);
        this.fetchMemberInfo = this.fetchMemberInfo.bind(this);
        this.fetchTypes = this.fetchTypes.bind(this);
        this.fetchFormats = this.fetchFormats.bind(this);
        this.fetchHosts = this.fetchHosts.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);

    };

    componentDidMount() {
        $('.datepicker').datepicker();
        this.fetchTypes();
        this.fetchMemberInfo();
        this.fetchFormats();
        this.fetchHosts();
        this.fetchLocations();
        this.fetchCourses();
    }

    fetchTypes () {
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
                    this.setState({ types: data });
                }
            }).catch(console.log);
    }

    fetchMemberInfo () {
        axios.get(Member_Info_URL, {
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
                    this.setState({ member_info: data });
                }
            }).catch(console.log);
    }

    fetchFormats () {
        axios.get(Formats_URL, {
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
                    this.setState({ formats: data });
                }
            }).catch(console.log);
    }

    fetchHosts () {
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

    fetchLocations () {
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
                    this.setState({ locations: data });
                }
            }).catch(console.log);
    }

    fetchCourses () {
        axios.get(Courses_URL, {
            params: {
                CPDTypeId: this.state.cpd_type_id,
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
                if(data.Items){
                    this.setState({ courses: data.Items });
                }
            }).catch(console.log);
    }

    handlePrevStep(){
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    }

    handleNextStep(){
        this.setState({
            currentStep: this.state.currentStep + 1
        });
    }

    handleSaveRecord(){

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render () {
        let ListItemOne,
            ListItemTwo;

        if(this.state.currentStep > 1) {
            ListItemOne = <li className="done"><a>Submitter Details</a></li>
        } else {
            ListItemOne = <li className="current"><a>Submitter Details</a></li>
        }
        if(this.state.currentStep > 2) {
            ListItemTwo = <li className="default"><a>Confirm CPD Activity Details</a></li>
        } else {
            ListItemTwo = <li className="current"><a>Submitter Details</a></li>
        }


        return (
            <div>
                <div>
                    <ul className="steps-indicator steps-3">
                        { ListItemOne }
                        { ListItemTwo }
                        <li className="default">
                            <a>CPD Details</a>
                        </li>
                    </ul>
                    <div className="steps ">
                        <section className="step" style={{display: (this.state.currentStep === 1) ? 'block' : 'none' }}>
                            <div className="panel panel-primary ">
                                <div className="panel-heading">Submitter Details</div>
                                <div className="container container-table">
                                    <div className="row vertical-center-row" id="step-1">
                                        <div style={{marginTop:'40px'}}> </div>
                                        <div className="col-md-6 col-md-offset-3">
                                            <div className="form-group">
                                                <label className="control-label">First Name</label>
                                                <input maxLength="100" type="text" className="form-control "
                                                       placeholder="Enter First Name"
                                                       disabled="disabled"
                                                       value={this.state.member_info['FirstName']}
                                                       aria-invalid="false" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Last Name</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Last Name"
                                                       disabled="disabled"
                                                       value={this.state.member_info['LastName']}
                                                       aria-invalid="false" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Membership Number</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter MembershipNumber"
                                                       disabled="disabled"
                                                       value={this.state.member_info['MemberNumber']}
                                                       aria-invalid="false"  />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Email</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Email"
                                                       disabled="disabled"
                                                       value={this.state.member_info['Email']}
                                                       aria-invalid="false"  />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Address</label>
                                                <textarea required="required" className="form-control"
                                                          disabled="disabled"
                                                          value={this.state.member_info['Address']}
                                                          placeholder="Enter your address" rows="4"
                                                          aria-invalid="false" > </textarea>
                                            </div>
                                            <div >
                                                <button className="btn btn-primary pull-right" onClick={this.handleNextStep} >Next step <i className="fa fa-arrow-right"> </i></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="step" style={{display: (this.state.currentStep === 2) ? 'block' : 'none' }}>
                            <div className="panel panel-primary ">
                                <div className="panel-heading">Confirm CPD Activity Details</div>
                                <div className="container container-table">
                                    <div className="row vertical-center-row ng-invalid ng-invalid-required " id="step-2" name="editForm" role="form">
                                        <div style={{marginTop:'40px'}}> </div>
                                        <div className="col-md-6 col-md-offset-3">
                                            <div className="form-group required">
                                                <label className="control-label" htmlFor="cpd_type_id">CPD Type</label>
                                                <select className="form-control  ng-empty ng-invalid ng-invalid-required"
                                                        name="cpd_type_id"
                                                        id="cpd_type_id"
                                                        value={this.state.cpd_type_id}
                                                        onChange={this.handleInputChange}
                                                        required=""
                                                        aria-invalid="true">
                                                    <option value="" defaultValue> </option>
                                                    {this.state.types.map((item, key) =>
                                                        <option key={key} value={item.CPDTypeId} label={item.Description} >{item.Description}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="form-group required" aria-hidden="false">
                                                <label className="control-label" htmlFor="course">Course Title
                                                </label>
                                                <div id="custom-search-input">
                                                    <div className="ui-select-container ui-select-bootstrap dropdown   ng-empty ng-invalid ng-invalid-required" aria-required="true" aria-disabled="false" aria-invalid="true">
                                                        <div className="ui-select-match " aria-hidden="false" aria-disabled="false">
                                                            <span tabIndex="-1" className="btn btn-default form-control ui-select-toggle" aria-label="Select box activate" role="button" aria-disabled="false">
                                                                <span className="ui-select-placeholder text-muted ng-binding" aria-hidden="false"> </span>
                                                                <span className="ui-select-match-text pull-left ng-hide" aria-hidden="true">
                                                                    <span className="ng-binding "> </span>
                                                                </span>
                                                                <i className="caret pull-right" role="button" tabIndex="0"> </i>
                                                                <a href="#" aria-label="Select box clear" className="btn btn-xs btn-link pull-right ng-hide" aria-hidden="true">
                                                                    <i className="glyphicon glyphicon-remove" aria-hidden="true"> </i>
                                                                </a>
                                                            </span>
                                                        </div>

                                                        <span className="ui-select-refreshing glyphicon glyphicon-refresh ui-select-spin ng-hide" aria-hidden="true"> </span>
                                                        <input type="search" autoComplete="off" className="form-control ui-select-search  ng-empty ng-hide"
                                                               placeholder="" />

                                                        <ul className="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu  ng-hide" aria-hidden="true">
                                                            <li className="ui-select-choices-group" id="ui-select-choices-0">
                                                                <div className="divider ng-hide" aria-hidden="true"> </div>
                                                                <div className="ui-select-choices-group-label dropdown-header ng-binding ng-hide" aria-hidden="true"> </div>
                                                            </li>
                                                        </ul>
                                                        <div className="ui-select-no-choice"> </div>
                                                        <ui-select-single> </ui-select-single>
                                                        <input className="ui-select-focusser ui-select-offscreen " type="text" id="focusser-0" aria-label="Select box focus" aria-haspopup="true" role="button" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group required ng-hide" aria-hidden="true">
                                                <label htmlFor="courseTitle" className="control-label">Course Title
                                                </label>
                                                <input type="text" className="form-control  ng-empty-required" name="courseTitle" id="courseTitle" placeholder="Course Title" aria-invalid="false" />
                                            </div>

                                            <div className="form-group required">
                                                <label htmlFor="cmbformat" className="control-label">Format</label>
                                                <select className="form-control  ng-empty ng-invalid ng-invalid-required" name="cmbformat" required="" disabled="disabled" aria-invalid="true">
                                                    <option value="?" defaultValue> </option>
                                                    <option label="Conference" value="4">Conference</option>
                                                    <option label="Exam" value="3">Exam</option>
                                                    <option label="In class" value="2">In class</option>
                                                    <option label="Online" value="1">Online</option>
                                                </select>
                                            </div>

                                            <div className="form-group required">
                                                <label className="control-label" htmlFor="txtDescription">Description</label>
                                                <textarea className="form-control  ng-empty ng-invalid ng-invalid-required" name="txtDescription" id="txtDescription" rows="4" required="" aria-invalid="true"> </textarea>
                                                <span id="helpText" className="small ng-hide" aria-hidden="true"><em>Please include a full course description/outline/agenda. Submission will be rejected if not enough detail to approve is provided.</em></span>
                                            </div>
                                            <div className="form-group required">
                                                <label htmlFor="intputVenue" className="control-label">Venue</label>
                                                <input type="text" className="form-control  ng-empty ng-invalid ng-invalid-required-maxlength" name="intputVenue" id="intputVenue" placeholder="Venue" required="" aria-invalid="true" />
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-xs-4 col-md-4 required">
                                                    <label className="control-label" htmlFor="InputHour">CPD Hours
                                                    </label>
                                                    <input type="number" className="form-control  ng-empty ng-invalid ng-invalid-required" id="InputHour" name="InputHour" placeholder="Hour" step="1" max="100" min="0" required="" aria-invalid="true" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label className="control-label" htmlFor="InputMin">Minutes</label>
                                                    <input type="number" className="form-control  ng-empty-step"
                                                           id="InputMin" placeholder="Minute" step="15" max="45" min="0" aria-invalid="false" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label htmlFor="year" className="control-label">CPD Year</label>
                                                    <select className="form-control " name="year" aria-invalid="false">
                                                        <option label="2017" value="2017">2017</option>
                                                        <option label="2018" value="2018">2018</option>
                                                        <option label="2019" value="2019" defaultValue>2019
                                                        </option>
                                                        <option label="2020" value="2020">2020</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group required">
                                                <label htmlFor="courseDate" className="control-label">Date Completed
                                                </label>
                                                <div className="input-group">
                                                    <input id="dateCompleted" type="text" className="form-control datepicker" />
                                                    <label htmlFor="dateCompleted" className="input-group-addon">
                                                        <span className="glyphicon glyphicon-calendar"> </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group required">
                                                <label className="control-label">Upload Evidence of Attendance
                                                </label>
                                                <div className="upload-field ng-binding ">
                                                    Choose a file please
                                                    <input id="uploadFileInput" type="file" valid-file="" className="form-control  ng-empty ng-invalid ng-invalid-required" data-show-preview="false" required="required" aria-invalid="true" />
                                                    <button className="icon-folder"> </button>
                                                </div>
                                            </div>

                                            <div >
                                                <button className="btn btn-default" name="previous" onClick={this.handlePrevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                                </button>
                                                <button className="btn btn-primary pull-right" type="submit" onClick={this.handleNextStep}>Next step <i className="fa fa-arrow-right"> </i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <section className="step" style={{display: (this.state.currentStep === 3) ? 'block' : 'none' }}>
                            <div style={{marginTop: '60px'}} className="ng-scope"> </div>
                            <div className="panel panel-primary ng-scope">
                                <div className="panel-heading">CPD Details</div>
                                <div className="container container-table">
                                    <div className="row vertical-center-row" id="step-3">
                                        <div style={{marginTop: '40px'}}> </div>
                                        <div className="col-md-6 col-md-offset-3">

                                            <div className="form-group required">
                                                <label htmlFor="host" className="control-label">Host</label>
                                                <select name="host" className="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                                                        disabled="disabled" aria-invalid="false">
                                                    <option label="N/r: Nxp saspxt" value="number:8">N/r: Nxp saspxt</option>
                                                    <option label="rnnr" value="number:15">rnnr</option>
                                                    <option label="rnnxinpang pxnpnanarns arxsrnt" value="number:5">rnnxinpang pxnpnanarns
                                                        arxsrnt
                                                    </option>
                                                    <option label="rnnxinpangnpt.nxp" value="number:6">rnnxinpangnpt.nxp</option>
                                                    <option label="rppsxnx anspapipx xf pxnpnxsxgy" value="number:68">rppsxnx anspapipx xf
                                                        pxnpnxsxgy
                                                    </option>
                                                    <option label="naMr" value="number:17">naMr</option>
                                                    <option label="Xxrx" value="number:30">Xxrx</option>
                                                    <option label="61/61 Grxip" value="number:31" selected="selected">61/61 Grxip</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Trainer</label>
                                                <input maxLength="200" type="text" required="required"
                                                       className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength"
                                                       placeholder="Trainer" disabled="disabled"
                                                       aria-invalid="true" />
                                            </div>

                                            <div className="form-group required">
                                                <label htmlFor="location" className="control-label">Location</label>
                                                <select name="location"
                                                        className="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                                                        disabled="disabled" aria-invalid="false" >
                                                    <option label="Antrim" value="number:2">Antrim</option>
                                                    <option label="Armagh" value="number:14">Armagh</option>
                                                    <option label="Belfast" value="number:39">Belfast</option>
                                                    <option label="Wexford" value="number:18">Wexford</option>
                                                    <option label="Wicklow" value="number:19">Wicklow</option>
                                                </select>
                                            </div>

                                            <div className="form-group required">
                                                <input type="checkbox" name="declare" id="declare"
                                                       className="ng-pristine ng-untouched ng-valid ng-empty" aria-invalid="false" />
                                                <label htmlFor="declare">I declare this CPD is relevant to my role and in accordance
                                                    with the ATI CPD </label>
                                                <label htmlFor="declare">Guidelines and Rules.</label>
                                            </div>

                                            <div style={{ marginBottom: '20px'}}>
                                                <button className="btn btn-default" name="previous" onClick={this.handlePrevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                                </button>
                                                <button className="btn btn-primary pull-right" type="submit" onClick={this.handleSaveRecord}> Save <i className="fa fa-arrow-right"> </i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </section>
                    </div>
                </div>
            </div>
        );
    }
}




export default RecordCPD;