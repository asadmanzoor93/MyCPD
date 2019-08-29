import React from "react";

class Header extends React.Component {
  render () {
    return (
          <header css="headerdashboard" text="Home Page" homeicon="NO" quicknav="NO" usermodel="usermodel" contactus="" aboutus="" className="ng-scope ng-isolate-scope">
            <div className="row shadow">
              <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                      <img src={'images\/MyCPDLogoImg.png'} alt="" />
                    </a>
                  </div>
                  <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse animated fadeIn">
                    <ul className="nav navbar-nav animated fadeIn text16">
                      <li>
                        <a href="#"><i className="fa fa-home"></i> Home</a>
                      </li>
                      <li ng-hide="quicknav == &#39;NO&#39;" aria-hidden="true" className="ng-hide active">
                        <a href="#">
                        <i className="fa fa-toggle-on"></i> Quick Navigation</a>
                      </li>
                      <li ng-hide="contactus == &#39;NO&#39;" ng-click="eventmenu(&#39;MAIL&#39;)" role="button" tabIndex="0" aria-hidden="false" className="">
                        <a href="#"><i className="fa fa-paper-plane"></i> Feedback!</a>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right animated fadeIn text16">
                      <li  className="ng-binding">
                        Mohammed Umair
                      </li>
                      <li>
                        <img src={"images\/if_user_1902268.png"} />
                      </li>
                      <li aria-hidden="false" className="">
                        <a href="#"><i className="fa fa-info-circle"></i> About Us</a>
                      </li>
                      <li><a href="#" ><i className="fa fa-sign-out"></i> Sign Out</a></li>
                    </ul>
                  </div>
                  <h4 className="headerdashboard" >
                    Home Page
                  </h4>
                </div>
              </nav>
            </div>
            <div >
            </div>
          </header>
    );
  }
}

export default Header;
