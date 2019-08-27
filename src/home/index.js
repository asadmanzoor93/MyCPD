import React from "react";
import { Router, Route, Link } from "react-router-dom";
import Header from '../_components/header.js';

class Home extends React.Component {
  render () {
    return (
      <div>
      	<Header />
          <div className="container main-content">
			  <div>
				  <section id="portfolio" className="smallfont ng-scope">
					  <div>
						  <div className="row">
							  <div className="col-sm-4 portfolio-item">
								  <a href="#" onClick={(e)=> { e.preventDefault(); this.props.history.push('/dashboard') }}>
									  <div className="panel panel-default">
										  <div className="panel-heading panel-heading-cpd ng-binding">CPD Dashboard</div>
										  <div className="panel-body" >
											  <img id="mycpd" width="100" height="100" ng-alt="row.FeatureName" src={"images/MyCPDDashboard.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">See all your completed CPD in one View</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item">
								  <a href="#">
									  <div className="panel panel-default">
										  <div className="panel-heading panel-heading-cpd ng-binding">Record CPD</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/recordmycpd.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/recordmycpd.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">Record your CPD hours here</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item">
								  <a href="#" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">Face to Face CPD</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/FacetoFaceCPD.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/FacetoFaceCPD.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">College runs CPD throughout the year, see what’s coming up!</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item">
								  <a href="#" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">CPDgo</div>
										  <div className="panel-body" >
											  <img id="mycpd" ng-src="app/images/CPDgo.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/CPDgo.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">Free and discounted online CPD</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item">
								  <a href="#" ng-click="vm.action(row.Action)">
									  <div className="panel panel-default">


										  <div className="panel-heading panel-heading-cpd ng-binding">Approved CPD Providers</div>
										  <div className="panel-body">
											  <img id="mycpd" ng-src="app/images/ApprovedCPDProviders.png" width="100" height="100" ng-alt="row.FeatureName" src={"images/ApprovedCPDProviders.png"}/>
										  </div>
										  <div className="panel-footer cpdfooter ng-binding">External CPD Accredited by College</div>
									  </div>
								  </a>
							  </div>
							  <div className="col-sm-4 portfolio-item">
								  <a href="#" ng-click="vm.action(row.Action)">
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
