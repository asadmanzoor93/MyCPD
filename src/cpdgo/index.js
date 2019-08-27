import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CPGGO extends React.Component {
    render () {
        return (

            <div className="col-md-11">
                <div className="panel panel-primary">
                    <div className="alert alert-info alert-white rounded">
                        <button type="button" data-dismiss="alert" aria-hidden="true" className="close">×</button>
                        <div className="icon">
                            <i className="fa fa-info-circle"></i>
                        </div>

                        <strong>Info!</strong> Please note it could take up to 24 hours before CPD hours are seen on
                        your record!
                    </div>

                    <div className="col-md-10" style="margin-top:10px;">
                        <p>
                            Please click the links below to proceed.
                            <br />
                                <b>Please read the instructions on how to access your FREE CPD.</b>
                                <br />
                                    (Note: you may need to create an account to log in and view these platforms. Please
                                    retain your user and password information)
                        </p>
                    </div>


                    <form action="https://acpd.alpha.imago3.com/admLogin.asp" method="post" id="onlineAccountingform"
                          ng-submit="vm.confirm('accountingcpd')" target="_blank" className="ng-pristine ng-valid">

                        <div className="container container-table">
                            <div className="row vertical-center-row">
                                <div className="col-md-10 col-md-offset-1" style="margin-top:40px;">


                                    <input type="submit" className="btn btn-warning btn-lg col-lg-8"
                                           style="margin-bottom:6px;white-space: normal; margin-left:20px;"
                                           value="Online Accounting CPD and Bites (Provided by accountingcpd.net)"
                                           form="onlineAccountingform" />
                                    <a className="btn btn-default btn-circle" style="margin-left:5px;" ng-click="vm.nelsonCroom('lg')">
                                        <i className="fa fa fa-info ng-scope" style="font-size:31px" title="Help" tooltip=""></i>
                                    </a>
                                    <div className="marginfix"></div>
                                    <a href="http://34.248.242.178/ATI_Portal_Test/Index.aspx"
                                       className="btn btn-success btn-lg col-lg-8"
                                       style="margin-bottom:6px;white-space: normal; margin-left:20px;"
                                       target="_blank" ng-click="vm.confirm('KnowledgePoint')">KnowledgePoint</a>
                                    <a className="btn btn-default btn-circle" style="margin-left:5px;" ng-click="vm.knowledgepoint('lg')">
                                        <i className="fa fa fa-info ng-scope" style="font-size:31px" title="Help" tooltip=""></i>
                                    </a>
                                    <div className="marginfix"></div>
                                    <div className="marginfix"></div>

                                    <a className="btn btn-primary btn-lg col-lg-8"
                                       style="margin-bottom:6px;white-space: normal; margin-left:20px;"
                                       role="button" ng-click="vm.playVideo('lg')">ATI Code of Professional Ethics –
                                        1 hour course</a>
                                    <a className="btn btn-default btn-circle" style="margin-left:5px;" ng-click="vm.professionalEthics('lg')">
                                        <i className="fa fa fa-info ng-scope" style="font-size:31px" title="Help" tooltip=""></i>
                                    </a>
                                    <div className="marginfix"></div>
                                </div>
                            </div>


                            <input type="hidden" name="M" value="AR" autoComplete="off" />
                            <input type="hidden" name="GrpID" value="G20051010163243-949240147" autoComplete="off" />
                            <input name="UN" type="hidden" value="USERNAME" autoComplete="off" />
                            <input name="PW" type="hidden" value="PASSWORD" autoComplete="off" />
                            <input name="Email" type="hidden" value="EMAIL" autoComplete="off" />
                            <input name="FirstName" type="hidden" value="FIRSTNAME" autoComplete="off" />
                            <input name="Surname" type="hidden" value="SURNAME" autoComplete="off" />
                            <input name="ExternalRef" type="hidden" value="ATI99999" autoComplete="off" />
                            <input name="AutoregType" type="hidden" value="ATI" autoComplete="off"/>
                            <input name="Target" type="hidden" value="Welcome_ATI_Members" autoComplete="off" />

                        </div>
                    </form>
                </div>

            </div>



        );
    }
}

export default CPGGO;