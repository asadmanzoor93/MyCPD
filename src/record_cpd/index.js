import React from "react";
import Header from '../_components/header.js';
import "react-table/react-table.css";

class RecordCPD extends React.Component {
    render () {
        return (
            <div>
                <Header />
                <div className="container main-content">
                    <div className="ng-isolate-scope">
                        <h2 className="ng-binding" aria-hidden="false"> </h2>

                        <ul className="steps-indicator steps-3">

                            <li className="ng-scope current">
                                <a href="#" className="ng-binding">Submitter Details</a>
                            </li>

                            <li className="ng-scope default">
                                <a href="#" className="ng-binding">Confirm CPD Activity Details</a>
                            </li>

                            <li className="ng-scope default">
                                <a href="#" className="ng-binding">CPD Details</a>
                            </li>

                        </ul>

                        <div className="steps ng-scope">
                            <section className="step ng-scope ng-isolate-scope current" aria-hidden="false">
                                <div className="ng-scope"> </div>
                                <div className="panel panel-primary ng-scope">
                                    <div className="panel-heading">Submitter Details</div>

                                    <div className="container container-table">
                                        <div className="row vertical-center-row" id="step-1">
                                            <div> </div>
                                            <div className="col-md-6 col-md-offset-3">
                                                <div className="form-group">
                                                    <label className="control-label">First Name</label>
                                                    <input maxLength="100" type="text" className="form-control ng-pristine ng-untouched ng-valid ng-valid-maxlength ng-not-empty" placeholder="Enter First Name" disabled="" aria-invalid="false" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Last Name</label>
                                                    <input maxLength="100" type="text" className="form-control ng-pristine ng-untouched ng-valid ng-valid-maxlength ng-not-empty" placeholder="Enter Last Name" disabled="" aria-invalid="false" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Membership Number</label>
                                                    <input maxLength="100" type="text" className="form-control ng-pristine ng-untouched ng-valid ng-valid-maxlength ng-not-empty" placeholder="Enter MembershipNumber" disabled="" aria-invalid="false"  />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Email</label>
                                                    <input maxLength="100" type="text" className="form-control ng-pristine ng-untouched ng-valid ng-valid-maxlength ng-not-empty" placeholder="Enter Email" disabled="" aria-invalid="false"  />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Address</label>
                                                    <textarea required="required" className="form-control ng-pristine ng-untouched ng-not-empty ng-valid ng-valid-required" disabled="" placeholder="Enter your address" rows="4" aria-invalid="false" > </textarea>
                                                </div>
                                                <div >
                                                    <button className="btn btn-primary pull-right" >Next step <i className="fa fa-arrow-right"> </i></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>

                            <section className="step ng-scope ng-isolate-scope ng-hide" aria-hidden="true">

                                <div className="ng-scope"> </div>
                                <div className="panel panel-primary ng-scope">
                                    <div className="panel-heading">Confirm CPD Activity Details</div>

                                    <div className="container container-table">

                                        <div className="row vertical-center-row ng-invalid ng-invalid-required ng-valid-maxlength ng-valid-min ng-valid-max ng-valid-step ng-dirty ng-invalid-parse" id="step-2" name="editForm" role="form">
                                            <div > </div>
                                            <div className="col-md-6 col-md-offset-3">
                                                <div className="form-group required">
                                                    <label className="control-label" htmlFor="cbdtype">CPD Type</label>
                                                    <select className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" name="cbdtype" required="" aria-invalid="true">
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
                                                        <div className="ui-select-container ui-select-bootstrap dropdown ng-pristine ng-untouched ng-scope ng-empty ng-invalid ng-invalid-required" aria-required="true" aria-disabled="false" aria-invalid="true">
                                                            <div className="ui-select-match ng-scope" aria-hidden="false" aria-disabled="false">
                                                                <span tabIndex="-1" className="btn btn-default form-control ui-select-toggle" aria-label="Select box activate" role="button" aria-disabled="false">
                                                                    <span className="ui-select-placeholder text-muted ng-binding" aria-hidden="false"> </span>
                                                                    <span className="ui-select-match-text pull-left ng-hide" aria-hidden="true">
                                                                        <span className="ng-binding ng-scope"> </span>
                                                                    </span>
                                                                    <i className="caret pull-right" role="button" tabIndex="0"> </i>
                                                                    <a href="#" aria-label="Select box clear" className="btn btn-xs btn-link pull-right ng-hide" aria-hidden="true">
                                                                        <i className="glyphicon glyphicon-remove" aria-hidden="true"> </i>
                                                                    </a>
                                                                </span>
                                                            </div>

                                                            <span className="ui-select-refreshing glyphicon glyphicon-refresh ui-select-spin ng-hide" aria-hidden="true"> </span>
                                                            <input type="search" autoComplete="off" className="form-control ui-select-search ng-pristine ng-untouched ng-valid ng-empty ng-hide"
                                                                   placeholder="" />

                                                            <ul className="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu ng-scope ng-hide" aria-hidden="true">
                                                                <li className="ui-select-choices-group" id="ui-select-choices-0">
                                                                    <div className="divider ng-hide" aria-hidden="true"> </div>
                                                                    <div className="ui-select-choices-group-label dropdown-header ng-binding ng-hide" aria-hidden="true"> </div>
                                                                </li>
                                                            </ul>
                                                            <div className="ui-select-no-choice"> </div>
                                                            <ui-select-single> </ui-select-single>
                                                            <input className="ui-select-focusser ui-select-offscreen ng-scope" type="text" id="focusser-0" aria-label="Select box focus" aria-haspopup="true" role="button" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group required ng-hide" aria-hidden="true">
                                                    <label htmlFor="courseTitle" className="control-label">Course Title
                                                    </label>
                                                    <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-valid-maxlength ng-valid ng-valid-required" name="courseTitle" id="courseTitle" placeholder="Course Title" aria-invalid="false" />
                                                </div>

                                                <div className="form-group required">
                                                    <label htmlFor="cmbformat" className="control-label">Format</label>
                                                    <select className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" name="cmbformat" required="" disabled="disabled" aria-invalid="true">
                                                        <option value="?" defaultValue> </option>
                                                        <option label="Conference" value="4">Conference</option>
                                                        <option label="Exam" value="3">Exam</option>
                                                        <option label="In class" value="2">In class</option>
                                                        <option label="Online" value="1">Online</option>
                                                    </select>
                                                </div>

                                                <div className="form-group required">
                                                    <label className="control-label" htmlFor="txtDescription">Description</label>
                                                    <textarea className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" name="txtDescription" id="txtDescription" rows="4" required="" aria-invalid="true"> </textarea>
                                                    <span id="helpText" className="small ng-hide" aria-hidden="true"><em>Please include a full course description/outline/agenda. Submission will be rejected if not enough detail to approve is provided.</em></span>
                                                </div>
                                                <div className="form-group required">
                                                    <label htmlFor="intputVenue" className="control-label">Venue</label>
                                                    <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength" name="intputVenue" id="intputVenue" placeholder="Venue" required="" aria-invalid="true" />
                                                </div>

                                                <div className="form-group col-xs-4 col-md-4 required">
                                                    <label className="control-label" htmlFor="InputHour">CPD Hours
                                                    </label>
                                                    <input type="number" className="form-control ng-pristine ng-untouched ng-empty ng-valid-min ng-valid-max ng-valid-step ng-invalid ng-invalid-required" id="InputHour" name="InputHour" placeholder="Hour" step="1" max="100" min="0" required="" aria-invalid="true" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label className="control-label" htmlFor="InputMin">Minutes</label>
                                                    <input type="number" className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-min ng-valid-max ng-valid-step"
                                                           id="InputMin" placeholder="Minute" step="15" max="45" min="0" aria-invalid="false" />
                                                </div>
                                                <div className="form-group col-xs-4 col-md-4">
                                                    <label htmlFor="year" className="control-label">CPD Year</label>
                                                    <select className="form-control ng-pristine ng-untouched ng-valid ng-not-empty" name="year" aria-invalid="false">
                                                        <option label="2017" value="2017">2017</option>
                                                        <option label="2018" value="2018">2018</option>
                                                        <option label="2019" value="2019" defaultValue>2019
                                                        </option>
                                                        <option label="2020" value="2020">2020</option>
                                                    </select>
                                                </div>

                                                <div className="form-group required">
                                                    <label htmlFor="courseDate" className="control-label">Date Completed
                                                    </label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control ng-untouched ng-empty ng-dirty ng-invalid ng-invalid-parse" name="courseDate" my-date-picker="" end-date="+1d" required="" aria-invalid="true" />
                                                        <span className="input-group-addon" data-toggle="datepicker">
                                    <span className="glyphicon glyphicon-calendar ng-pristine ng-untouched ng-valid ng-empty" aria-invalid="false"> </span>
                                        </span>
                                                    </div>
                                                </div>

                                                <div className="form-group required">
                                                    <label className="control-label">Upload Evidence of Attendance
                                                    </label>
                                                    <div className="upload-field ng-binding ng-scope">
                                                        Choose a file please
                                                        <input id="uploadFileInput" type="file" valid-file="" className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" data-show-preview="false" required="required" aria-invalid="true" />
                                                        <button className="icon-folder"> </button>
                                                    </div>
                                                </div>

                                                <div >
                                                    <button className="btn btn-default" name="previous" type="button"><i className="fa fa-arrow-left"> </i> Previous step
                                                    </button>
                                                    <button className="btn btn-primary pull-right" type="submit" disabled="disabled">Next step <i className="fa fa-arrow-right"> </i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="step ng-scope ng-isolate-scope ng-hide" aria-hidden="true">
                                <div  className="ng-scope"> </div>
                                <div className="panel panel-primary ng-scope">
                                    <div className="panel-heading">CPD Details</div>

                                    <div className="container container-table">
                                        <div className="row vertical-center-row" id="step-3">
                                            <div > </div>
                                            <div className="col-md-6 col-md-offset-3">

                                                <div className="form-group required">
                                                    <label htmlFor="host" className="control-label">Host</label>
                                                    <select name="host" className="form-control ng-pristine ng-untouched ng-valid ng-empty" disabled="disabled" aria-invalid="false">
                                                        <option value="?" defaultValue> </option>
                                                        <option label="N/r: Nxp saspxt" value="number:8">N/r: Nxp saspxt
                                                        </option>
                                                        <option label="rnnr" value="number:15">rnnr</option>
                                                        <option label="rnnxinpang pxnpnanarns arxsrnt" value="number:5">rnnxinpang pxnpnanarns arxsrnt
                                                        </option>
                                                        <option label="rnnxinpangnpt.nxp" value="number:6">rnnxinpangnpt.nxp
                                                        </option>
                                                        <option label="rppsxnx anspapipx xf pxnpnxsxgy" value="number:68">rppsxnx anspapipx xf pxnpnxsxgy
                                                        </option>
                                                        <option label="raB" value="number:47">raB</option>
                                                        <option label="rpa stS" value="number:1">rpa stS</option>
                                                        <option label="rpa MtS" value="number:4">rpa MtS</option>
                                                        <option label="rpa itS" value="number:3">rpa itS</option>
                                                        <option label="rpa WtS" value="number:2">rpa WtS</option>
                                                        <option label="rssxnarpaxn xf rnnxinpang pxnpnanarns (rrp)" value="number:66">rssxnarpaxn xf rnnxinpang pxnpnanarns (rrp)
                                                        </option>
                                                        <option label="rvavr" value="number:70">rvavr</option>
                                                        <option label="Brsnrs" value="number:29">Brsnrs</option>
                                                        <option label="Brnn xf arxsrnt" value="number:38">Brnn xf arxsrnt
                                                        </option>
                                                        <option label="Btx" value="number:58">Btx</option>
                                                        <option label="Bxsfrsp napy nxinnas" value="number:40">Bxsfrsp napy nxinnas
                                                        </option>
                                                        <option label="Bag Rxt Bxxn" value="number:14">Bag Rxt Bxxn
                                                        </option>
                                                        <option label="nra" value="number:11">nra</option>
                                                        <option label="nprrpxrxt anspapipx xf Pryrxss Prxfxssaxnrss" value="number:72">nprrpxrxt anspapipx xf Pryrxss Prxfxssaxnrss
                                                        </option>
                                                        <option label="nprrpxrxt anspapipx xf anpxrnrs ritapxrs" value="number:64">nprrpxrxt anspapipx xf anpxrnrs ritapxrs
                                                        </option>
                                                        <option label="nprrpxrxt anspapipx xf prxrpaxn" value="number:50">nprrpxrxt anspapipx xf prxrpaxn
                                                        </option>
                                                        <option label="naMr" value="number:17">naMr</option>
                                                        <option label="nMG Prxfxssaxnrs prranang" value="number:54">nMG Prxfxssaxnrs prranang
                                                        </option>
                                                        <option label="nPr" value="number:13">nPr</option>
                                                        <option label="nPs" value="number:57">nPs</option>
                                                        <option label="nrxnxr-a" value="number:46">nrxnxr-a</option>
                                                        <option label="tnn Grxip" value="number:22">tnn Grxip</option>
                                                        <option label="txsxappx arxsrnt ssP" value="number:63">txsxappx arxsrnt ssP
                                                        </option>
                                                        <option label="xtinrpaxn rnt prranang Fxintrpaxn" value="number:48">xtinrpaxn rnt prranang Fxintrpaxn
                                                        </option>
                                                        <option label="xnpxrprasx arxsrnt" value="number:28">xnpxrprasx arxsrnt
                                                        </option>
                                                        <option label="Fraxnts Farsp" value="number:23">Fraxnts Farsp
                                                        </option>
                                                        <option label="Grrnp ppxrnpxn" value="number:16">Grrnp ppxrnpxn
                                                        </option>
                                                        <option label="Graffapp nxssxgx tibsan" value="number:55">Graffapp nxssxgx tibsan
                                                        </option>
                                                        <option label="pM Rxvxnix rnt nispxms" value="number:19">pM Rxvxnix rnt nispxms
                                                        </option>
                                                        <option label="pSx" value="number:43">pSx</option>
                                                        <option label="arnp nxmpipxr prranang" value="number:56">arnp nxmpipxr prranang
                                                        </option>
                                                        <option label="aBrp" value="number:42">aBrp</option>
                                                        <option label="aBxn" value="number:27">aBxn</option>
                                                        <option label="aFrn" value="number:75">aFrn</option>
                                                        <option label="aFr" value="number:24">aFr</option>
                                                        <option label="anPt" value="number:60">anPt</option>
                                                        <option label="aprSnx" value="number:61">aprSnx</option>
                                                        <option label="anspapipx xf Pibsan rtmanasprrpaxn" value="number:65">anspapipx xf Pibsan rtmanasprrpaxn
                                                        </option>
                                                        <option label="aPrSS" value="number:12">aPrSS</option>
                                                        <option label="arasp sxrgix xf nrxtap inaxns" value="number:18">arasp sxrgix xf nrxtap inaxns
                                                        </option>
                                                        <option label="arasp Mrnrgxmxnp anspapipx" value="number:35">arasp Mrnrgxmxnp anspapipx
                                                        </option>
                                                        <option label="arasp prx anspapipx" value="number:32">arasp prx anspapipx
                                                        </option>
                                                        <option label="ap prssrgpp" value="number:34">ap prssrgpp
                                                        </option>
                                                        <option label="Jxpn Mnnrrppy nxnsispang" value="number:71">Jxpn Mnnrrppy nxnsispang
                                                        </option>
                                                        <option label="nPMG" value="number:67">nPMG</option>
                                                        <option label="sar" value="number:20">sar</option>
                                                        <option label="Mxrnar" value="number:41">Mxrnar</option>
                                                        <option label="Mxy Prrn" value="number:36">Mxy Prrn</option>
                                                        <option label="Missrn prranang" value="number:73">Missrn prranang
                                                        </option>
                                                        <option label="Nxrppxrn arxsrnt navas Sxrvanx" value="number:74">Nxrppxrn arxsrnt navas Sxrvanx
                                                        </option>
                                                        <option label="xffanx xf ppx Rxvxnix nxmmassaxnxrs" value="number:53">xffanx xf ppx Rxvxnix nxmmassaxnxrs
                                                        </option>
                                                        <option label="xmnaPrx" value="number:49">xmnaPrx</option>
                                                        <option label="PtP prranang" value="number:62">PtP prranang
                                                        </option>
                                                        <option label="Prrmxranr Syspxms arxsrnt" value="number:51">Prrmxranr Syspxms arxsrnt
                                                        </option>
                                                        <option label="Prxfxssaxnrs xtinrpaxn Sxmanrrs samapxt" value="number:59">Prxfxssaxnrs xtinrpaxn Sxmanrrs samapxt
                                                        </option>
                                                        <option label="PWn" value="number:10">PWn</option>
                                                        <option label="Rxsrpx" value="number:26">Rxsrpx</option>
                                                        <option label="SrGx" value="number:21">SrGx</option>
                                                        <option label="Snassnxp arxsrnt" value="number:52">Snassnxp arxsrnt
                                                        </option>
                                                        <option label="Sirxsnasss" value="number:9">Sirxsnasss</option>
                                                        <option label="ppx xxnxs nsib" value="number:7">ppx xxnxs nsib
                                                        </option>
                                                        <option label="ppx anSr" value="number:39">ppx anSr</option>
                                                        <option label="ppx anspapipx xf Brnnang" value="number:33">ppx anspapipx xf Brnnang
                                                        </option>
                                                        <option label="ppxsriris" value="number:25">ppxsriris</option>
                                                        <option label="pamxnxy sxrtxrspap anspapipx" value="number:44">pamxnxy sxrtxrspap anspapipx
                                                        </option>
                                                        <option label="prranang xn Rxnxrt" value="number:37">prranang xn Rxnxrt
                                                        </option>
                                                        <option label="inavxrsapy xf samxrann" value="number:45">inavxrsapy xf samxrann
                                                        </option>
                                                        <option label="Wxsss Frrgx Brnn anpxrnrpaxnrs:" value="number:69">Wxsss Frrgx Brnn anpxrnrpaxnrs:
                                                        </option>
                                                        <option label="Xxrx" value="number:30">Xxrx</option>
                                                        <option label="61/61 Grxip" value="number:31">61/61 Grxip
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label">Trainer</label>
                                                    <input maxLength="200" type="text" required="required" className="form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength" placeholder="Trainer" disabled="disabled" aria-invalid="true" />
                                                </div>

                                                <div className="form-group required">
                                                    <label htmlFor="location" className="control-label">Location</label>
                                                    <select name="location" className="form-control ng-pristine ng-untouched ng-valid ng-empty" disabled="disabled" aria-invalid="false">
                                                        <option value="?" defaultValue> </option>
                                                        <option label="Antrim" value="number:2">Antrim</option>
                                                        <option label="Armagh" value="number:14">Armagh</option>
                                                        <option label="Belfast" value="number:39">Belfast</option>
                                                        <option label="Carlow" value="number:35">Carlow</option>
                                                        <option label="Cavan" value="number:29">Cavan</option>
                                                        <option label="Clare" value="number:22">Clare</option>
                                                        <option label="Cork" value="number:4">Cork</option>
                                                        <option label="Donegal" value="number:15">Donegal</option>
                                                        <option label="Down" value="number:3">Down</option>
                                                        <option label="Dublin" value="number:1">Dublin</option>
                                                        <option label="Dun Laoghaire-Rathdown" value="number:10">Dun Laoghaire-Rathdown
                                                        </option>
                                                        <option label="Fermanagh" value="number:33">Fermanagh</option>
                                                        <option label="Fingal" value="number:5">Fingal</option>
                                                        <option label="Galway" value="number:7">Galway</option>
                                                        <option label="Kerry" value="number:17">Kerry</option>
                                                        <option label="Kildare" value="number:9">Kildare</option>
                                                        <option label="Kilkenny" value="number:24">Kilkenny</option>
                                                        <option label="Laois" value="number:27">Laois</option>
                                                        <option label="Leitrim" value="number:37">Leitrim</option>
                                                        <option label="Limerick" value="number:11">Limerick</option>
                                                        <option label="Londonderry" value="number:8">Londonderry
                                                        </option>
                                                        <option label="Longford" value="number:36">Longford</option>
                                                        <option label="Louth" value="number:21">Louth</option>
                                                        <option label="Mayo" value="number:20">Mayo</option>
                                                        <option label="Meath" value="number:12">Meath</option>
                                                        <option label="Monaghan" value="number:34">Monaghan</option>
                                                        <option label="na" value="number:38">na</option>
                                                        <option label="North Tipperary" value="number:30">North Tipperary
                                                        </option>
                                                        <option label="Offaly" value="number:28">Offaly</option>
                                                        <option label="Online" value="number:41">Online</option>
                                                        <option label="Outside Ireland" value="number:40">Outside Ireland
                                                        </option>
                                                        <option label="Roscommon" value="number:32">Roscommon</option>
                                                        <option label="Sligo" value="number:31">Sligo</option>
                                                        <option label="South Dublin" value="number:6">South Dublin
                                                        </option>
                                                        <option label="South Tipperary" value="number:25">South Tipperary
                                                        </option>
                                                        <option label="Tipperary" value="number:16">Tipperary</option>
                                                        <option label="Tyrone" value="number:13">Tyrone</option>
                                                        <option label="Various" value="number:42">Various</option>
                                                        <option label="Waterford" value="number:23">Waterford</option>
                                                        <option label="Westmeath" value="number:26">Westmeath</option>
                                                        <option label="Wexford" value="number:18">Wexford</option>
                                                        <option label="Wicklow" value="number:19">Wicklow</option>
                                                    </select>
                                                </div>

                                                <div className="form-group required">
                                                    <input type="checkbox" name="declare" id="declare" className="ng-pristine ng-untouched ng-valid ng-empty" aria-invalid="false" />
                                                    <label htmlFor="declare">I declare this CPD is relevant to my
                                                        <div className="row">
                                                            <h2 className="page-header">Record CPD</h2>
                                                        </div> role and in accordance with the ATI CPD </label>
                                                    <label htmlFor="declare">Guidelines and Rules.</label>
                                                </div>

                                                <div >
                                                    <button className="btn btn-default" name="previous" type="button" ><i className="fa fa-arrow-left"> </i> Previous step
                                                    </button>
                                                    <div className="row">
                                                        <h2 className="page-header">Record CPD</h2>
                                                    </div>
                                                    <button className="btn btn-success pull-right" type="button" disabled="disabled"><i className="fa fa-floppy-o"> </i> Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordCPD;