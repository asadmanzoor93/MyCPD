import React from "react";
import { Redirect, Link } from 'react-router-dom';

import axios from "axios";

const SignOut_URL = 'http://34.248.242.178/CPDCompliance/api/account/LogOff';

class Header extends React.Component {

  constructor(props) {
      super(props);
    this.makeSignOutRequest = this.makeSignOutRequest.bind(this);
    this.state = {
        quickNavShown: false,
        password: '',
        submitted: false,
        logout: false,
        successMessage: localStorage.getItem('successMessage')
    };

    setTimeout(() => {
      this.setState({
        successMessage: null,
      });
      localStorage.removeItem('successMessage');
    }, 3000);

  }

  makeSignOutRequest() {
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
          this.setState({
            logout: true,
          });

        }).catch(console.log);
  };

  render () {

    if (this.state.logout) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <header css="headerdashboard" text="Home Page" homeicon="NO" quicknav="NO" usermodel="usermodel" contactus="" aboutus="" className="ng-scope ng-isolate-scope">
          <div className="row shadow">
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"> </span>
                    <span className="icon-bar"> </span>
                    <span className="icon-bar"> </span>
                  </button>
                  <a className="navbar-brand" href="#">
                    <img src={'images\/MyCPDLogoImg.png'} alt="" />
                  </a>
                </div>
                <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse animated fadeIn">
                  <ul className="nav navbar-nav animated fadeIn text16">
                    <li>
                      <Link to={'/home'}><i className="fa fa-home"> </i> Home </Link>
                    </li>
                    <li className="active">
                      <a href="#" onClick={e => { e.preventDefault(); this.setState({quickNavShown: !this.state.quickNavShown }) }} >
                        <i className={this.state.quickNavShown ? "fa fa-toggle-on" : "fa fa-toggle-off"}> </i> Quick Navigation
                      </a>
                    </li>
                    <li>
                      <a onClick={() => localStorage.feedBackModalShown = true } href="#"><i className="fa fa-paper-plane"> </i> Feedback!</a>
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
                      <a href="#"><i className="fa fa-info-circle"></i> About Us</a>
                    </li>
                    <li><a href="#" onClick={()=> this.makeSignOutRequest()}><i className="fa fa-sign-out"></i> Sign Out</a></li>
                  </ul>
                </div>
                <h4 className="headerdashboard" >
                  <Link to={'\/home'} className="nav-link"> Home Page </Link>
                </h4>
              </div>
            </nav>
          </div>
        </header>
        <nav className={this.state.quickNavShown ? "side-navigation active" : "side-navigation"}>
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
              <a href="#" onClick={e => { e.preventDefault(); this.setState({quickNavShown: false }) }} className="nav-link">Close <i className="fa fa-close"></i></a>
            </li>
          </ul>
        </nav>

        <div className="alert alert-success success-message"  style={{display: this.state.successMessage ? 'block' : 'none'}}>
          <strong>You are successfully logged in!</strong>
        </div>

      </div>
    );
  }
}

export default Header;
