import React from "react";
import "react-table/react-table.css";
import $ from "jquery";
import "bootstrap-datepicker/js/bootstrap-datepicker.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";


class RecordCPD extends React.Component {
    constructor() {
        super();
        this.state = {
            currentStep: 1,
        }
    // Bind new functions for next and previous
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)

    };
    handleChange = date => {
        this.setState({
          startDate: date
        });
    };

        // Test current step with ternary
        // _next and _previous functions will be called on button click
    _next() {
        let currentStep = this.state.currentStep
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev() {
        let currentStep = this.state.currentStep
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    render () {
        let ListItemOne,
            ListItemTwo
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
                        <Step1 currentStep={this.state.currentStep} nextStep={this._next} prevStep={this._prev} />
                        <Step2 currentStep={this.state.currentStep} nextStep={this._next} prevStep={this._prev} />
                        <Step3 currentStep={this.state.currentStep} nextStep={this._next} prevStep={this._prev} />
                    </div>
                </div>
            </div>
        );
    }
}

class Step1 extends React.Component{
  render(){
    if (this.props.currentStep !== 1) {
      return null
    }
    return(
        <section className="step">
            <div className="panel panel-primary ">
                <div className="panel-heading">Submitter Details</div>
                <div className="container container-table">
                    <div className="row vertical-center-row" id="step-1">
                        <div style={{marginTop:'40px'}}></div>
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label className="control-label">First Name</label>
                                <input maxLength="100" type="text" className="form-control " placeholder="Enter First Name" disabled="" aria-invalid="false" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Last Name</label>
                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Last Name" disabled="" aria-invalid="false" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Membership Number</label>
                                <input maxLength="100" type="text" className="form-control " placeholder="Enter MembershipNumber" disabled="" aria-invalid="false"  />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Email</label>
                                <input maxLength="100" type="text" className="form-control " placeholder="Enter Email" disabled="" aria-invalid="false"  />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Address</label>
                                <textarea required="required" className="form-control" defaultValue='' disabled="" placeholder="Enter your address" rows="4" aria-invalid="false" > </textarea>
                            </div>
                            <div >
                                <button className="btn btn-primary pull-right" onClick={this.props.nextStep} >Next step <i className="fa fa-arrow-right"> </i></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

class Step2 extends React.Component{
    componentDidMount() {
        $('.datepicker').datepicker();
    }
  render(){
    if (this.props.currentStep !== 2) {
      return null
    }
    return(
        <section className="step">
            <div className="panel panel-primary ">
                <div className="panel-heading">Confirm CPD Activity Details</div>
                <div className="container container-table">
                    <div className="row vertical-center-row ng-invalid ng-invalid-required " id="step-2" name="editForm" role="form">
                        <div style={{marginTop:'40px'}}></div>
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="cbdtype">CPD Type</label>
                                <select className="form-control  ng-empty ng-invalid ng-invalid-required" name="cbdtype" required="" aria-invalid="true">
                                    <option value="?" defaultValue> </option>
                                    <option label="Approved CPD Provider" value="number:2">Approved CPD Provider
                                    </option>
                                    <option label="CPDgo" value="number:3">CPDgo</option>
                                    <option label="Face to Face" value="number:1">Face to Face
                                    </option>
                                    <option label="Submit a New Course" value="number:4">Submit a New Course
                                    </option>
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
                                        <span className="glyphicon glyphicon-calendar"></span>
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
                                <button className="btn btn-default" name="previous" onClick={this.props.prevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                </button>
                                <button className="btn btn-primary pull-right" type="submit" onClick={this.props.nextStep}>Next step <i className="fa fa-arrow-right"> </i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}


class Step3 extends React.Component{
    componentDidMount() {
        $('.datepicker').datepicker();
    }
  render(){
    if (this.props.currentStep !== 3) {
      return null
    }
    return(
    <section className="step">
        <div className="panel panel-primary ">
            <div className="panel-heading">Confirm CPD Activity Details</div>
            <div className="container container-table">
                <div className="row vertical-center-row ng-invalid ng-invalid-required " id="step-2" name="editForm" role="form">
                    <div style={{marginTop:'40px'}}></div>
                    <div className="col-md-6 col-md-offset-3">
                        <div className="form-group required">
                            <label className="control-label" htmlFor="cbdtype">CPD Type</label>
                            <select className="form-control  ng-empty ng-invalid ng-invalid-required" name="cbdtype" required="" aria-invalid="true">
                                <option value="?" defaultValue> </option>
                                <option label="Approved CPD Provider" value="number:2">Approved CPD Provider
                                </option>
                                <option label="CPDgo" value="number:3">CPDgo</option>
                                <option label="Face to Face" value="number:1">Face to Face
                                </option>
                                <option label="Submit a New Course" value="number:4">Submit a New Course
                                </option>
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
                                    <span className="glyphicon glyphicon-calendar"></span>
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
                            <button className="btn btn-default" onClick={this.props.prevStep} type="button"><i className="fa fa-arrow-left"> </i> Previous step
                            </button>
                            <button className="btn btn-primary pull-right" type="submit" >Complete <i className="fa fa-arrow-right"> </i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
  }
}

export default RecordCPD;