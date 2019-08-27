import React from "react";
import { Router, Route, Link } from "react-router-dom";
import Header from '../_components/header.js';

class Home extends React.Component {
  render () {
    return (
      <div>
      	<Header />
          <div className="container">
			  <div className="container ng-scope">
				  <nav-header css="headerdashboard" text="Home Page" homeicon="NO" quicknav="NO" usermodel="usermodel" contactus="" aboutus="" className="ng-scope ng-isolate-scope">
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
									  <a className="navbar-brand" href="http://34.248.242.178/mycpd/">
										  <img src={"images/MyCPDLogoImg.png"} />
									  </a>
								  </div>
								  <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse animated fadeIn">
									  <ul className="nav navbar-nav animated fadeIn text16">
										  <li ng-hide="homeicon == &#39;NO&#39;" aria-hidden="true" className="ng-hide">
											  <a href="http://34.248.242.178/mycpd/" ng-click="gotohome()"><i className="fa fa-home"></i> Home</a>
										  </li>
										  <li ng-hide="quicknav == &#39;NO&#39;" aria-hidden="true" className="ng-hide active">
											  <a href="http://34.248.242.178/mycpd/" ng-click="toggleLeft()">
											  <i className="fa fa-toggle-on"></i> Quick Navigation</a>
										  </li>
										  <li ng-hide="contactus == &#39;NO&#39;" ng-click="eventmenu(&#39;MAIL&#39;)" role="button" tabindex="0" aria-hidden="false" className="">
											  <a href="http://34.248.242.178/mycpd/"><i className="fa fa-paper-plane"></i> Feedback!</a>
										  </li>
									  </ul>
									  <ul className="nav navbar-nav navbar-right animated fadeIn text16">
										  <li  className="ng-binding">
											  Mohammed Umair
										  </li>
										  <li>
											  <img src={"images/if_user_1902268.png"} />
										  </li>
										  <li aria-hidden="false" className="">
											  <a href="http://34.248.242.178/mycpd/" ng-click="AboutUs()"><i className="fa fa-info-circle"></i> About Us</a>
										  </li>
										  <li><a href="http://34.248.242.178/mycpd/" ng-click="logOut()"><i className="fa fa-sign-out"></i> Sign Out</a></li>
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
				  </nav-header>

				  <br />
				  <Link to="/dashboard">Dashboard</Link>
				  <br />
				  <br />
				  <br />
				  <br />

				  <section id="portfolio" className="smallfont ng-scope">
					  <div className="container margin-top-100">
						  <div className="row">
							  <div className="col-sm-4 portfolio-item ng-scope" ng-repeat="row in vm.model" >
								  <a href="http://34.248.242.178/mycpd/">
									  <div className="panel panel-default">
										  <div className="panel-heading panel-heading-cpd ng-binding">CPD Dashboard</div>
										  <div className="panel-body" >
											  <img id="mycpd" width="100" height="100" ng-alt="row.FeatureName" src={"images/MyCPDDashboard.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">See all your completed CPD in one View</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item ng-scope">
								  <a href="http://34.248.242.178/mycpd/">
									  <div className="panel panel-default">
										  <div className="panel-heading panel-heading-cpd ng-binding">Record CPD</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/recordmycpd.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/recordmycpd.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">Record your CPD hours here</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item ng-scope" ng-repeat="row in vm.model">
								  <a href="http://34.248.242.178/mycpd/" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">Face to Face CPD</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/FacetoFaceCPD.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/FacetoFaceCPD.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">College runs CPD throughout the year, see what’s coming up!</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item ng-scope" ng-repeat="row in vm.model">
								  <a href="http://34.248.242.178/mycpd/" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">CPDgo</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/CPDgo.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/CPDgo.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">Free and discounted online CPD</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item ng-scope" ng-repeat="row in vm.model">
								  <a href="http://34.248.242.178/mycpd/" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">Approved CPD Providers</div>
										  <div className="panel-body">
											  <img id="mycpd" ng-src="app/images/ApprovedCPDProviders.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/ApprovedCPDProviders.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">External CPD Accredited by College</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item ng-scope" ng-repeat="row in vm.model">
								  <a href="http://34.248.242.178/mycpd/" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">Library</div>
										  <div className="panel-body">
											  <img id="mycpd" ng-src="app/images/library.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/library.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">Full listing of all CPDgo, Face to Face and Approved External CPD Providers</div>
									  </div>
								  </a>
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

export default Home;
