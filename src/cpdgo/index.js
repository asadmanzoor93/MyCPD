import React from "react";
import KnowledgeInfoModal from "./_modals/knowledgeInfo";
import axios from "axios";
import AccountingInfoModal from "./_modals/accountingInfo";
import ATICodeModal from "./_modals/atiCodeInfo";

const Member_Info_URL = 'http://34.248.242.178/CPDCompliance/api/account/GetMember?memID=';

class CPDGO extends React.Component {
    constructor() {
        super();
        this.state = {
            knowledgeInfoModalShown: false,
            accountingInfoModalShown: false,
            atiCodeModalShown: false,
            member_info: []
        };
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
                    this.setState({
                        member_info: data,
                    });
                }
            }).catch(console.log);
    }

    render () {
        let knowledgeInfoModalClose = () => this.setState({ knowledgeInfoModalShown: false });
        let accountingInfoModalClose = () => this.setState({ accountingInfoModalShown: false });
        let atiCodeModalClose = () => this.setState({ atiCodeModalShown: false });
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="alert alert-info alert-white rounded">
                        <button type="button" data-dismiss="alert" aria-hidden="true" className="close">×</button>
                        <div className="icon"><i className="fa fa-info-circle"> </i>
                        </div>
                        <strong>Info!</strong> Please note it could take up to 24 hours before CPD hours are seen on your record!
                    </div>

                    <div className="col-md-10">
                        <p>
                            Please click the links below to proceed.
                            <br />
                            <b>Please read the instructions on how to access your FREE CPD.</b>
                            <br />
                            (Note: you may need to create an account to log in and view these platforms. Please
                            retain your user and password information)
                        </p>
                    </div>


                    <form action="#" method="post" target="_blank" className="ng-pristine ng-valid">

                        <div className="container container-table">
                            <div className="row vertical-center-row">
                                <div className="col-md-8 col-md-offset-2">
                                    <div className="input-group">
                                        <input type="submit" style={{width: '100%'}} className="btn btn-warning btn-lg"
                                               value="Online Accounting CPD and Bites (Provided by accountingcpd.net)"
                                               form="onlineAccountingform" />
                                        <a onClick={() => this.setState({ accountingInfoModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
                                            <i className="fa fa fa-info" title="Help" tooltip=""> </i>
                                        </a>
                                    </div>
                                    <div className="marginfix"> </div>
                                    <div className="input-group">
                                        <a href="#" className="btn btn-success btn-lg" style={{width: '100%'}} target="_blank">KnowledgePoint</a>
                                        <a onClick={() => this.setState({ knowledgeInfoModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
                                            <i className="fa fa fa-info" title="Help"> </i>
                                        </a>
                                    </div>
                                    <div className="marginfix"> </div>
                                    <div className="marginfix"> </div>
                                    <div className="input-group">
                                        <a className="btn btn-primary btn-lg" style={{width: '100%'}} role="button">ATI Code of Professional Ethics – 1 hour course</a>
                                        <a onClick={() => this.setState({ atiCodeModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
                                            <i className="fa fa fa-info" title="Help"> </i>
                                        </a>
                                    </div>
                                    <div className="marginfix"> </div>
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
                <KnowledgeInfoModal show={this.state.knowledgeInfoModalShown} onHide={knowledgeInfoModalClose} />
                <AccountingInfoModal show={this.state.accountingInfoModalShown} onHide={accountingInfoModalClose} />
                <ATICodeModal show={this.state.atiCodeModalShown} onHide={atiCodeModalClose} />
            </div>
        );
    }
}

export default CPDGO;