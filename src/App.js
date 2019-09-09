import React from "react";
import { Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import axios from "axios";

import Login from './login/index.js'
import Home from './home/index.js'
import Dashboard from './dashboard/index.js'
import CPDGO from './cpdgo/index.js'
import RecordCPD from "./record_cpd";
import FaceToFace from "./face_to_face_cpd";
import ApprovedCPDProviders from "./approved_cpd_providers";
import Library from "./library";
import FeedbackModal from './feedback/_modals/modal';
import AboutUsModal from './about-us/_modals/about-us';

const SignOut_URL = 'http://34.248.242.178/CPDCompliance/api/account/LogOff';

class App extends React.Component {
  constructor(props) {

      super(props);

      this.state = {
          quickNavShown: false,
          password: '',
          submitted: false,
          feedBackModalShown: false,
          aboutUsModalShown: false,
          logout: false,
      };

      this.makeSignOutRequest = this.makeSignOutRequest.bind(this);
  }

  makeSignOutRequest() {
    this.setState({
      logout: true,
    });
    axios.get(SignOut_URL, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem('access_token'),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response)
    .then((response) => {

    }).catch(console.log);
  };

  render () {
    let feedBackModalShownClose = () => this.setState({ feedBackModalShown: false });
    let aboutUsModalShownClose = () => this.setState({ aboutUsModalShown: false });
    if (this.state.logout) {
      return <Redirect to="/" />;
    }

    return (
        <div>
          <header css="headerdashboard" text="Home Page"
                  style={{display: (this.props.location.pathname === '/login' || this.props.location.pathname === '/') ? 'none' : 'block'}}
                  className="ng-scope ng-isolate-scope">
            <div className="row shadow">
              <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"> </span>Route
                      <span className="icon-bar"> </span>
                      <span className="icon-bar"> </span>
                    </button>
                    <a className="navbar-brand" href="#">
                      <img src={'images\/MyCPDLogoImg.png'} alt="" />
                    </a>
                  </div>
                  <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse animated fadeIn">
                    <ul className="nav navbar-nav animated fadeIn text16">
                      <li style={{display: this.props.location.pathname === '/home' ? 'none' : 'block' }}>
                        <Link to={'/home'}><i className="fa fa-home"> </i> Home </Link>
                      </li>
                      <li className="active" style={{display: this.props.location.pathname === '/home' ? 'none' : 'block' }}>
                        <a href="#" onClick={e => { e.preventDefault(); this.setState({quickNavShown: !this.state.quickNavShown }) }} >
                          <i className={this.state.quickNavShown ? "fa fa-toggle-on" : "fa fa-toggle-off"}> </i> Quick Navigation
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.setState({ feedBackModalShown : true }) } href="#"><i className="fa fa-paper-plane"> </i> Feedback!</a>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right animated fadeIn text16">
                      <li style={{padding: '13px 10px 0'}}>
                        {localStorage.getItem('displayName')}
                      </li>
                      <li>
                        <img src={"images\/if_user_1902268.png"} />
                      </li>
                      <li aria-hidden="false" className="">
                        <a onClick={() => this.setState({ aboutUsModalShown : true }) } href="#"><i className="fa fa-info-circle"></i> About Us</a>
                      </li>
                      <li><a href="#" onClick={()=> this.makeSignOutRequest()}><i className="fa fa-sign-out"></i> Sign Out</a></li>
                    </ul>
                  </div>

                  <h4 className= { this.props.location.pathname === '/home' ? "headerdashboard" : "headerpages nav-page-headers" } >
                    {(() => {
                      switch (this.props.location.pathname) {
                        case "/home" :   return "Home Page";
                        case "/dashboard": return "My CPD DashBoard";
                        case "/mycpd":  return "Record MyCPD";
                        case "/cpdgo":  return "CPD GO";
                        case "/cpdclassroom":  return "Face to Face CPD";
                        case "/cpdaccredt":  return "Approved CPD Providers";
                        case "/library":  return "Library";
                        default:      return "Home Page";
                      }
                    })()}
                  </h4>


                </div>
              </nav>
            </div>
          </header>
          <nav className={this.state.quickNavShown ? "side-navigation active" : "side-navigation"}
               style={{display: (this.props.location.pathname === '/login' || this.props.location.pathname === '/') ? 'none' : 'block'}}
          >
            <ul className="c-footer-list">
              <li>
                <Link to={'\/home'} className="nav-link">Home</Link>
              </li>
              <li>
                <Link to={'\/dashboard'} className="nav-link">My CPD Dashboard <i className="fa fa-home"></i></Link>
              </li>
              <li>
                <Link to={'\/mycpd'} className="nav-link">Record My CPD <i className="fa fa-upload"></i></Link>
              </li>
              <li>
                <Link to={'\/cpdclassroom'} className="nav-link">Face To Face CPD <i className="fa fa-search"></i></Link>
              </li>
              <li>
                <Link to={'\/cpdgo'} className="nav-link">CPDgo <i className="fa fa-registered"></i></Link>
              </li>
              <li>
                <Link to={'\/cpdaccredt'} className="nav-link">Approved CPD Providers <i className="fa fa-credit-card"></i></Link>
              </li>
              <li>
                <Link to={'\/library'} className="nav-link">Library <i className="fa fa-unsorted"></i></Link>
              </li>
              <li>
                <a href="#" onClick={e => { this.setState({quickNavShown: false }) }} className="nav-link">Close <i className="fa fa-close"></i></a>
              </li>
            </ul>
          </nav>
          <div className={(this.props.location.pathname === '/login' || this.props.location.pathname === '/') ? "container" : "container main-content"}>
            <Switch>
              <Route exact path="\/" component={withRouter(Login)} />
              <Route exact path="/login" component={withRouter(Login)}  />
              <Route exact path="/home" component={withRouter(Home)} />
              <Route exact path="/dashboard" component={withRouter(Dashboard)} />
              <Route exact path="/cpdgo" component={withRouter(CPDGO)} />
              <Route exact path="/mycpd/:mode?/:wfid?" component={withRouter(RecordCPD)} />
              <Route exact path="/cpdclassroom" component={withRouter(FaceToFace)} />
              <Route exact path="/cpdaccredt" component={withRouter(ApprovedCPDProviders)} />
              <Route exact path="/library" component={withRouter(Library)} />
            </Switch>
          </div>
          <FeedbackModal show={ this.state.feedBackModalShown } onHide={feedBackModalShownClose} />
          <AboutUsModal show={ this.state.aboutUsModalShown } onHide={aboutUsModalShownClose} />
        </div>
    );
  }

}

export default App;
