import React from "react";
import "react-table/react-table.css";
import { Redirect } from 'react-router-dom';
import $ from "jquery";
import axios from "axios";
import { DatePicker } from 'react-md';
import {NotificationManager} from 'react-notifications';
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";

const moment = require('moment');

const MAX_DATE = new Date();

const CPDRecord_Info_URL = 'http://34.248.242.178/CPDCompliance/api/Member/GetMemberCPD';
const Member_Info_URL = 'http://34.248.242.178/CPDCompliance/api/account/GetMember?memID=';
const Types_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/CPDTypesForMyCPD';
const Formats_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/CPDFormat';
const Hosts_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/LoadCPDHost';
const Locations_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/Location';
const Courses_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/GetCourses';
const Course_Detail_URL = 'http://34.248.242.178/CPDCompliance/api/Lookup/GetCourse';
const ADD_Record_URL = 'http://34.248.242.178/CPDCompliance/api/Workflow/add';
const File_Upload_URL = 'http://34.248.242.178/CPDCompliance/api/Workflow/file/upload';


//On view load: Call member info, types, formats, hosts, locations api. Fill data for first step automatically
class RecordCPD extends React.Component {
    constructor(props) {
        super(props);
        const { match: { params } } = this.props;

        this.state = {
            mode: params.mode,
            workFlowId: params.workFlowId,
            currentStep: 1,
            host_list: [],
            member_info: [],
            types: [],
            formats: [],
            locations: [],
            courses: [],
            courses_options: [],
            cpd_type_id: 2,
            MemberId: null,
            course_format: 'Online',
            course_id: '',
            course_name: '',
            course_detail: [],
            course_description: '',
            venue: '',
            cpd_hours: '',
            cpd_mins: '',
            cpd_year: '',
            date_completed: null,
            start_date_iso: '',
            file_upload: null,
            file_name: null,
            host_id: '',
            trainer: '',
            location_id: '',
            is_declared: false,
            third_tab_active: false,
            unauthorized: false,
            redirectDashboard: false,
        };

        this.handlePrevStep = this.handlePrevStep.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleSaveRecord = this.handleSaveRecord.bind(this);
        this.fetchMemberInfo = this.fetchMemberInfo.bind(this);
        this.fetchTypes = this.fetchTypes.bind(this);
        this.fetchFormats = this.fetchFormats.bind(this);
        this.fetchHosts = this.fetchHosts.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.fetchCourseDetail = this.fetchCourseDetail.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.fetchCPDRecord = this.fetchCPDRecord.bind(this);
        this.makeThirdTabActive = this.makeThirdTabActive.bind(this);

    };

    componentWillMount() {
        $('.datepicker').datepicker({
            autoclose: true,
            todayHighlight: true,
            maxDate: new Date()
        });
        this.fetchTypes();
        this.fetchMemberInfo();
        this.fetchFormats();
        this.fetchHosts();
        this.fetchLocations();
        this.fetchCourses();

        if(this.state.mode === 'edit'){
            this.fetchCPDRecord();
        }
    }

    fetchTypes () {
        let self = this;
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
                    self.setState({ types: data });
                }
            }).catch(console.log);
    }

    fetchMemberInfo () {
        let self = this;
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
                    self.setState({
                        member_info: data,
                        MemberId: data.MemberId
                    });
                }
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
    }

    fetchFormats () {
        let self = this;
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
                    self.setState({ formats: data });
                }
            }).catch(console.log);
    }

    fetchHosts () {
        let self = this;
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
                    self.setState({ host_list: data });
                }
            }).catch(console.log);
    }

    fetchLocations () {
        let self = this;
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
                    self.setState({ locations: data });
                }
            }).catch(console.log);
    }

    fetchCourses (TypeId) {
        let self = this;
        let cpd_type_id = this.state.cpd_type_id;
        if(TypeId){
            cpd_type_id = TypeId;
        }

        this.setState( {
            cpd_type_id: TypeId,
            course_format: 'Online',
            course_id: '',
            course_name: '',
            course_description: '',
            venue: '',
            cpd_hours: '',
            cpd_mins: '',
            cpd_year: '',
            date_completed: null,
            start_date_iso: '',
            file_upload: null,
            file_name: null,
            host_id: '',
            trainer: '',
            location_id: '',
        });

        axios.get(Courses_URL, {
            params: {
                CPDTypeId: cpd_type_id,
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

                    let courses_option = [];
                    data.Items.map((item, key) =>
                        courses_option.push({
                            key: item.CourseId, value: item.CourseName, text: item.CourseName
                        })
                    );

                    self.setState({
                        courses: data.Items,
                        courses_option: courses_option
                    });
                }
            }).catch(console.log);
    }

    fetchCourseDetail (CourseId) {
        let self = this;
        let course_id = this.state.course_id;
        if(CourseId){
            course_id = CourseId;
        }

        axios.get(Course_Detail_URL, {
            params: {
                CourseId: course_id,
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
                if(data){
                    self.setState({
                        course_detail: data,
                        course_id: CourseId,
                        course_format: data.CPDFormatId,
                        course_description: data.CourseDescription,
                        venue: data.Venue,
                        cpd_hours: data.DurationHours,
                        cpd_mins: data.Minutes,
                        cpd_year:'',
                        date_completed: null,
                        trainer: data.Trainer,
                        host_id: data.HostId,
                        location_id: data.LocationId,
                        file_upload: null,
                        file_name: null,
                    });

                    this.makeThirdTabActive();
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

    makeThirdTabActive(){
        if (this.state.cpd_type_id == 4) {
            if(
                this.state.cpd_type_id !== ''
                && this.state.course_name !== ''
                && this.state.course_format !== ''
                && this.state.course_description !== ''
                && this.state.venue !== ''
                && this.state.cpd_hours !== ''
                && this.state.file_name !== null
                && this.state.date_completed !== ''){
                this.setState({
                    third_tab_active: true
                });
            } else {
                this.setState({
                    third_tab_active: false
                });
            }
        } else {
            if(
                this.state.cpd_type_id !== ''
                && this.state.course_id !== ''
                && this.state.course_description !== ''
                && this.state.venue !== ''
                && this.state.cpd_hours !== ''
                && this.state.file_name !== null
                && this.state.date_completed !== ''){
                this.setState({
                    third_tab_active: true
                });
            } else {
                this.setState({
                    third_tab_active: false
                });
            }
        }
    }

    handleSaveRecord() {
        let self = this;
        if(this.state.mode === 'edit'){

            axios.post('http://34.248.242.178/CPDCompliance/api/Workflow/Update', {
                MemberId: this.state.MemberId,
                CPDTypeId: this.state.cpd_type_id,
                CourseId: this.state.course_id,
                CourseName: this.state.course_name,
                Description: this.state.course_description,
                Venue: this.state.venue,
                Trainer: this.state.trainer,
                Hours: this.state.cpd_hours,
                Minutes: this.state.cpd_mins,
                CompletionDate: this.state.start_date_iso,
                CPDYear: this.state.cpd_year,
                CPDWorkflowId: this.state.workFlowId,
                FileName: this.state.file_name,
                CPDFormatId: this.state.course_format,
                HostId: this.state.host_id,
                LocationId: this.state.location_id,
                CourseMode: 1,
                IsDeclared: this.state.is_declared
            },{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.data)
                .then((data) => {
                    if(self.state.file_upload){
                        self.handleFileUpload(data)
                    } else {
                        NotificationManager.success('Success!', 'MyCPD Record Created Successfully');
                        self.setState({
                            redirectDashboard: true
                        })
                    }

                }).catch(function (error) {
                console.log(error.response);
                if(error){
                    if(error.response){
                        if (error.response.status === 401) {
                            self.setState({
                                unauthorized: true,
                            });
                            localStorage.setItem('failureMessage', 'Login Expired');
                        }else if(error.response.data){
                            alert(error.response.data[0])
                        }
                    }
                }
            });
        } else {
            axios.post(ADD_Record_URL, {
                MemberId: this.state.MemberId,
                CPDTypeId: this.state.cpd_type_id,
                CourseId: this.state.course_id,
                CourseName: this.state.course_name,
                Description: this.state.course_description,
                Venue: this.state.venue,
                Trainer: this.state.trainer,
                Hours: this.state.cpd_hours,
                Minutes: this.state.cpd_mins,
                CompletionDate: this.state.start_date_iso,
                CPDYear: this.state.cpd_year,
                CPDWorkflowId: 0,
                FileName: this.state.file_name,
                CPDFormatId: this.state.course_format,
                HostId: this.state.host_id,
                LocationId: this.state.location_id,
                CourseMode:"",
                IsDeclared: this.state.is_declared
            },{
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.data)
                .then((data) => {
                    this.handleFileUpload(data)
                }).catch(function (error) {
                console.log(error.response);
                if(error){
                    if(error.response){
                        if (error.response.status === 401) {
                            self.setState({
                                unauthorized: true,
                            });
                            localStorage.setItem('failureMessage', 'Login Expired');
                        }else if(error.response.data){
                            alert(error.response.data[0])
                        }
                    }
                }
            });
        }

    }

    handleFileUpload(record){
        let self = this;
        let blobFile = this.state.file_upload;
        let formData = new FormData();
        formData.append("file", blobFile);

        axios.post(File_Upload_URL, formData,{
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryoCoWNN0H9G5MODKB',
                'workflowreqid': record.CPDWorkflowId,
            }
        })
            .then(response => response.data)
            .then((data) => {
                self.setState({
                    redirectDashboard: true
                });
                NotificationManager.success('Success!', 'MyCPD Record Created Successfully');
            }).catch(console.log);
    }

    handleInputChange(event,field_name) {

        if (field_name == 'date_completed') {
            let newValue = event;

            var mydate = moment(newValue, 'DD/MM/YYYY'); 
            let newDate = new Date(moment(mydate).format("MM/DD/YYYY"));
            newValue = newDate.toISOString();
            this.setState({
                start_date_iso: newValue,
                [field_name]: event
            });
        } else {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            if(name === 'file_upload'){
                console.log(event.target.files.length);
                if(event.target.files.length > 0) {
                    this.setState({
                        [name]: event.target.files[0],
                        file_name: event.target.files[0].name
                    });
                    console.log(this.state.file_name, event.target.files[0].name)
                }
            } else if (name === 'is_declared'){
                this.setState({
                    is_declared: target.checked
                });
            } else {
                this.setState({
                    [name]: value
                });
            }

            if (name === 'cpd_type_id'){
                console.log(value);
                this.fetchCourses(value);
            }

            if (name === 'course_id'){
                this.fetchCourseDetail(value);
            }
        }

        setTimeout(() => {
            this.makeThirdTabActive();
        }, 500);
    }

    fetchCPDRecord(){
        let self = this;

        axios.get(CPDRecord_Info_URL, {
            params: {
                page: 1,
                pageSize: 10,
                reverse: true,
                sortBy: 'CPDWorkflowId',
                limit: this.state.workFlowId
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

                    data.Items.forEach((element) => {
                        if(element.CPDWorkflowId == self.state.workFlowId){
                            self.setState({
                                course_format: element.CPDFormatId,
                                course_id: element.CourseId,
                                course_name: element.CourseName,
                                course_description: element.CourseDescription,
                                venue: element.Venue,
                                cpd_hours: element.Hours,
                                cpd_mins: (element.Minutes) ? element.Minutes : '',
                                cpd_year: element.CPDYear,
                                date_completed: element.CompletionDate,
                                start_date_iso: element.CompletionDate,
                                file_name: element.FileName,
                                host_id: element.HostId,
                                trainer: element.Trainer,
                                location_id: element.LocationId,
                                is_declared: element.IsDeclared,
                            });
                        }
                    });
                }
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
    }

    render () {
        if (this.state.unauthorized) {
            return <Redirect to='/'/>;
        }

        if (this.state.redirectDashboard) {
            return <Redirect to='/dashboard'/>;
        }

        let ListItemOne, ListItemTwo;

        if(this.state.currentStep > 1) {
            ListItemOne = <li className="done"><a onClick={this.handlePrevStep} href="#">Submitter Details</a></li>
        } else {
            ListItemOne = <li className="current"><a>Submitter Details</a></li>
        }

        if(this.state.currentStep > 2) {
            ListItemTwo = <li className="done"><a onClick={this.handlePrevStep} href="#">Confirm CPD Activity Details</a></li>
        } else if(this.state.currentStep === 2) {
            ListItemTwo = <li className="current"><a>Confirm CPD Activity Details</a></li>
        } else {
            ListItemTwo = <li className="default"><a>Confirm CPD Activity Details</a></li>
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
                                                <label htmlFor="FirstName" className="control-label">First Name</label>
                                                <input type="text" className="form-control "
                                                       placeholder="Enter First Name"
                                                       disabled="disabled"
                                                       id="FirstName"
                                                       name="FirstName"
                                                       value={this.state.member_info['FirstName']}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Surname" className="control-label">Last Name</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Last Name"
                                                       disabled="disabled"
                                                       id="Surname"
                                                       name="Surname"
                                                       readOnly
                                                       value={this.state.member_info['Surname']}
                                                       aria-invalid="false" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="MemberNumber" className="control-label">Membership Number</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter MembershipNumber"
                                                       disabled="disabled"
                                                       id="MemberNumber"
                                                       name="MemberNumber"
                                                       readOnly
                                                       value={this.state.member_info['MemberNumber']}
                                                       aria-invalid="false"  />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Email" className="control-label">Email</label>
                                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Email"
                                                       disabled="disabled"
                                                       id="Email"
                                                       name="Email"
                                                       readOnly
                                                       value={this.state.member_info['Email']}
                                                       aria-invalid="false"  />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Address" className="control-label">Address</label>
                                                <textarea required="required" className="form-control"
                                                          disabled="disabled"
                                                          value={ (this.state.member_info['Address']) ? this.state.member_info['Address'] : 'address'}
                                                          placeholder="Enter your address" rows="4"
                                                          id="Address"
                                                          name="Address"
                                                          readOnly
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
                                    <div className="row vertical-center-row ng-invalid ng-invalid-required " id="step-2" >
                                        <div style={{marginTop:'40px'}}> </div>
                                        <div className="col-md-6 col-md-offset-3">
                                            <div className="form-group required">
                                                <label className="control-label" htmlFor="cpd_type_id">CPD Type</label>
                                                <select className="form-control"
                                                        name="cpd_type_id"
                                                        id="cpd_type_id"
                                                        value={this.state.cpd_type_id}
                                                        onChange={this.handleInputChange}
                                                        required=""
                                                        aria-invalid="true">
                                                    <option value="" defaultValue> </option>
                                                    {this.state.types.map((item, key) =>
                                                        <option key={key} value={item.CPDTypeId}>{item.Description}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group required" aria-hidden="true">
                                                <label className="control-label" htmlFor="course_id">Course Title
                                                </label>
                                                <div id="custom-search-input">
                                                    <select className="form-control ng-empty ng-invalid ng-invalid-required"
                                                            name="course_id"
                                                            id="course_id"
                                                            value={this.state.course_id}
                                                            onChange={this.handleInputChange}
                                                            required=""
                                                            aria-invalid="true"
                                                            style={{display: (this.state.cpd_type_id != 4) ? 'block' : 'none' }}>
                                                        <option value="" defaultValue> </option>
                                                        {this.state.courses.map((item, key) =>
                                                            <option key={key} value={item.CourseId} label={item.CourseName} >{item.CourseName}</option>
                                                        )}
                                                    </select>

                                                    <input type="text" className="form-control ng-empty ng-invalid ng-invalid-required-maxlength"
                                                           name="course_name"
                                                           id="course_name"
                                                           value={this.state.course_name}
                                                           onChange={this.handleInputChange}
                                                           placeholder="Course Title" required=""
                                                           aria-invalid="true"
                                                           style={{display: (this.state.cpd_type_id == 4) ? 'block' : 'none' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group required">
                                                <label htmlFor="cmbformat" className="control-label">Format</label>
                                                <select className="form-control"
                                                        name="course_format"
                                                        id="course_format"
                                                        value={this.state.course_format}
                                                        onChange={this.handleInputChange}
                                                        required=""
                                                        disabled={ (this.state.cpd_type_id === '4') ? "" : "disabled" }
                                                        aria-invalid="true">
                                                    {this.state.formats.map((item, key) =>
                                                        <option key={key} value={item.ID} label={item.Name} >{item.Name}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="form-group required">
                                                <label className="control-label" htmlFor="txtDescription">Description</label>
                                                <textarea className="form-control  ng-empty ng-invalid ng-invalid-required"
                                                          name="course_description"
                                                          id="course_description"
                                                          value={this.state.course_description}
                                                          onChange={this.handleInputChange}
                                                          rows="4" required="" aria-invalid="true">
                                                </textarea>
                                                <span id="helpText" className="small ng-hide" aria-hidden="true">
                                                    <em>Please include a full course description/outline/agenda. Submission will be rejected if not enough detail to approve is provided.</em>
                                                </span>
                                            </div>
                                            <div className="form-group required">
                                                <label htmlFor="intputVenue" className="control-label">Venue</label>
                                                <input type="text" className="form-control ng-empty ng-invalid ng-invalid-required-maxlength"
                                                       name="venue" id="venue"
                                                       value={this.state.venue}
                                                       onChange={this.handleInputChange}
                                                       placeholder="Venue" required=""
                                                       aria-invalid="true" />
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-xs-4 col-md-4 required">
                                                    <label className="control-label" htmlFor="InputHour">CPD Hours
                                                    </label>
                                                    <input type="number" className="form-control ng-empty ng-invalid ng-invalid-required"
                                                           id="cpd_hours" name="cpd_hours"
                                                           value={this.state.cpd_hours}
                                                           onChange={this.handleInputChange}
                                                           placeholder="Hour" step="1" max="100" min="0" required=""
                                                           aria-invalid="true" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label className="control-label" htmlFor="InputMin">Minutes</label>
                                                    <input type="number" className="form-control ng-empty-step"
                                                           id="cpd_mins"
                                                           name="cpd_mins"
                                                           value={this.state.cpd_mins}
                                                           onChange={this.handleInputChange}
                                                           placeholder="Minute" step="15" max="45" min="0"
                                                           aria-invalid="false" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label htmlFor="year" className="control-label">CPD Year</label>
                                                    <select className="form-control "
                                                            id="cpd_year"
                                                            name="cpd_year"
                                                            value={this.state.cpd_year}
                                                            onChange={this.handleInputChange}
                                                            aria-invalid="false">
                                                        <option label="2017" value="2017">2017</option>
                                                        <option label="2018" value="2018">2018</option>
                                                        <option label="2019" value="2019" defaultValue>2019
                                                        </option>
                                                        <option label="2020" value="2020">2020</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group required">
                                                <label className="control-label">Date Completed
                                                </label>
                                                <DatePicker
                                                    id="date_completed"
                                                    label="Enter Completed Date"
                                                    name="date_completed"
                                                    maxDate={MAX_DATE}
                                                    locales="en-GB"
                                                    onChange={(value) => {this.handleInputChange(value,'date_completed')}}
                                                />
                                            </div>
                                            <div className="form-group required">
                                                <label className="control-label">Upload Evidence of Attendance
                                                </label>
                                                <div className="upload-field ng-binding ">
                                                    { this.state.file_name ? this.state.file_name : 'Choose a file please' }
                                                    <input id="file_upload" type="file"
                                                           name="file_upload"
                                                           onChange={this.handleInputChange}
                                                           className="form-control"
                                                           required="required" aria-invalid="true" />
                                                    <button className="icon-folder"> </button>
                                                </div>
                                            </div>
                                            <div >
                                                <button className="btn btn-default" name="previous" onClick={this.handlePrevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                                </button>
                                                <button className="btn btn-primary pull-right"
                                                        type="button"
                                                        disabled={ !this.state.third_tab_active }
                                                        onClick={this.handleNextStep}
                                                >Next step <i className="fa fa-arrow-right"> </i></button>
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
                                                <select name="host_id"
                                                        id="host_id"
                                                        value={this.state.host_id}
                                                        onChange={this.handleInputChange}
                                                        disabled={ (this.state.cpd_type_id === '4') ? "" : "disabled" }
                                                        className="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                                                        aria-invalid="false">
                                                    <option value="" defaultValue> </option>
                                                    {this.state.host_list.map((item, key) =>
                                                        <option key={key} value={item.ID} >{item.Name}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label">Trainer</label>
                                                <input maxLength="200" type="text" required="required"
                                                       id="trainer"
                                                       name="trainer"
                                                       value={(this.state.trainer) ? this.state.trainer: ''}
                                                       onChange={this.handleInputChange}
                                                       disabled={ (this.state.cpd_type_id === '4') ? "" : "disabled" }
                                                       className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength"
                                                       placeholder="Trainer"
                                                       aria-invalid="true" />
                                            </div>

                                            <div className="form-group required">
                                                <label htmlFor="location" className="control-label">Location</label>
                                                <select
                                                    name="location_id"
                                                    id="location_id"
                                                    value={this.state.location_id}
                                                    onChange={this.handleInputChange}
                                                    disabled={ (this.state.cpd_type_id === '4') ? "" : "disabled" }
                                                    className="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                                                    aria-invalid="false" >
                                                    <option value="" defaultValue> </option>
                                                    {this.state.locations.map((item, key) =>
                                                        <option key={key} value={item.ID} >{item.Name}</option>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="form-group required">
                                                <input type="checkbox" name="is_declared" id="is_declared"
                                                       onChange={this.handleInputChange}
                                                       checked={this.state.is_declared}
                                                       value={this.state.is_declared}
                                                       style={{ float: 'left', margin: '3px 9px 0 0' }}
                                                       aria-invalid="false" />
                                                <label htmlFor="is_declared" style={{ overflow: 'hidden', display: 'block' }}>
                                                    I declare this CPD is relevant to my role and in accordance with the ATI CPD Guidelines and Rules.
                                                </label>
                                            </div>

                                            <div style={{ marginBottom: '20px'}}>
                                                <button className="btn btn-default" name="previous" onClick={this.handlePrevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                                </button>
                                                <button className="btn btn-success pull-right" type="button"
                                                        disabled={ (this.state.is_declared === true) ? "" : "disabled"}
                                                        value={this.state.is_declared}
                                                        onClick={this.handleSaveRecord} ><i className="fa fa-floppy-o"> </i> Save </button>
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