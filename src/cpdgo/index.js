import React from "react";
import KnowledgeInfoModal from "./_modals/knowledgeInfo";
import axios from "axios";
import AccountingInfoModal from "./_modals/accountingInfo";
import ATICodeInfoModal from "./_modals/atiCodeInfo";
import ATICodeProfessionalEthicsModal from "./_modals/atiCodeProfessionalEthics";

const Member_Info_URL = 'http://34.248.242.178/CPDCompliance/api/account/GetMember?memID=';
const Accounting_Login_URL = 'http://34.248.242.178/CPDCompliance/api/CPDgo/CPDGOLog?action=accountingcpd&isBrowser=true';
const Knowledge_Login_URL = 'http://34.248.242.178/CPDCompliance/api/CPDgo/CPDGOLog?action=KnowledgePoint&isBrowser=true';

class CPDGO extends React.Component {
    constructor() {
        super();
        this.fetchMemberInfo = this.fetchMemberInfo.bind(this);
        this.accountingLogin = this.accountingLogin.bind(this);
        this.knowledgeLogin = this.knowledgeLogin.bind(this);

        this.state = {
            knowledgeInfoModalShown: false,
            accountingInfoModalShown: false,
            atiCodeInfoModalShown: false,
            atiCodeProfessionalEthicsModalShown: false,
            member_info: []
        };
    }

    componentDidMount() {
        this.fetchMemberInfo();
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

    accountingLogin () {
        axios.get(Accounting_Login_URL, {
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
            }).catch(console.log);
    }

    knowledgeLogin () {
        axios.get(Knowledge_Login_URL, {
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
            }).catch(console.log);
    }

    render () {
        let knowledgeInfoModalClose = () => this.setState({ knowledgeInfoModalShown: false });
        let accountingInfoModalClose = () => this.setState({ accountingInfoModalShown: false });
        let atiCodeInfoModalClose = () => this.setState({ atiCodeInfoModalShown: false });
        let atiCodeProfessionalEthicsModalClose = () => this.setState({ atiCodeProfessionalEthicsModalShown: false });
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
                                    <br />
                                    <br />
                                    <div className="input-group">
                                        <a href="https://acpd.alpha.imago3.com/Welcome_ATI_Members"
                                           onClick={this.accountingLogin} className="btn btn-warning btn-lg"
                                           style={{width: '100%'}} target="_blank">Online Accounting CPD and Bites (Provided by accountingcpd.net)</a>

                                        <a onClick={() => this.setState({ accountingInfoModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
                                            <i className="fa fa fa-info" title="Help" tooltip=""> </i>
                                        </a>
                                    </div>
                                    <div className="marginfix"> </div>
                                    <div className="input-group">
                                        <a href="http://34.248.242.178/ATI_Portal_Test/Index.aspx"
                                           onClick={this.knowledgeLogin} className="btn btn-success btn-lg"
                                           style={{width: '100%'}} target="_blank">KnowledgePoint</a>
                                        <a onClick={() => this.setState({ knowledgeInfoModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
                                            <i className="fa fa fa-info" title="Help"> </i>
                                        </a>
                                    </div>
                                    <div className="marginfix"> </div>
                                    <div className="marginfix"> </div>
                                    <div className="input-group">
                                        <a onClick={() => this.setState({ atiCodeProfessionalEthicsModalShown: true })} className="btn btn-primary btn-lg" style={{width: '100%'}} role="button">ATI Code of Professional Ethics – 1 hour course</a>
                                        <a onClick={() => this.setState({ atiCodeInfoModalShown: true })} className="input-group-addon btn btn-default btn-circle" style={{fontSize: '23px'}}>
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
                <ATICodeInfoModal show={this.state.atiCodeInfoModalShown} onHide={atiCodeInfoModalClose} />
                <ATICodeProfessionalEthicsModal show={this.state.atiCodeProfessionalEthicsModalShown} onHide={atiCodeProfessionalEthicsModalClose} />
            </div>
        );
    }
}

export default CPDGO;