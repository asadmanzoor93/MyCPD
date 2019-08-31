import React from "react";
import Header from '../_components/header.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CPDGO from '../cpdgo/index.js';


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
									<Link to={'/dashboard'}>
										<div className="panel panel-default">
											<div className="panel-heading panel-heading-cpd ng-binding">CPD Dashboard</div>
											<div className="panel-body" >
												<img id="mycpd" width="100" height="100" alt="" src={"images/MyCPDDashboard.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">See all your completed CPD in one View</div>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 portfolio-item">
									<Link to={'/mycpd'}>
										<div className="panel panel-default">
											<div className="panel-heading panel-heading-cpd ng-binding">Record CPD</div>
											<div className="panel-body" >
												<img id="mycpd" alt="" width="100" height="100" src={"images/recordmycpd.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">Re cord your CPD hours here</div>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 portfolio-item">
									<Link to={'/cpdclassroom'}>
										<div className="panel panel-default">
											<div className="panel-heading panel-heading-cpd ng-binding">Face to Face CPD</div>
											<div className="panel-body" >
												<img id="mycpd" width="100" height="100" alt="" src={"images/FacetoFaceCPD.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">College runs CPD throughout the year, see what’s coming up!</div>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 portfolio-item">
									<Link to={'/cpdgo'}>
										<div className="panel panel-default">
											<div className="panel-heading panel-heading-cpd ng-binding">
												CPDgo
											</div>
											<div className="panel-body" >
												<img id="mycpd" alt="" width="100" height="100" src={"images/CPDgo.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">Free and discounted online CPD</div>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 portfolio-item">
									<Link to={'/cpdaccredt'}>
										<div className="panel panel-default">
											<div className="panel-heading panel-heading-cpd ng-binding">Approved CPD Providers</div>
											<div className="panel-body">
												<img id="mycpd" width="100" alt="" height="100" src={"images/ApprovedCPDProviders.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">External CPD Accredited by College</div>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 portfolio-item">
									<Link to={'/library'}>
										<div className="panel panel-default">


											<div className="panel-heading panel-heading-cpd ng-binding">Library</div>
											<div className="panel-body">
												<img id="mycpd" width="100" alt="" height="100" src={"images/library.png"}/>
											</div>
											<div className="panel-footer cpdfooter ng-binding">Full listing of all CPDgo, Face to Face and Approved External CPD Providers</div>
										</div>
									</Link>
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
