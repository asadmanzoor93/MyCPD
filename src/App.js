import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from './login/index.js'
import Home from './home/index.js'
import Dashboard from './dashboard/index.js'
import CPDGO from './cpdgo/index.js'
import RecordCPD from "./record_cpd";
import FaceToFace from "./face_to_face_cpd";
import ApprovedCPDProviders from "./approved_cpd_providers";
import Library from "./library";
import FeedbackModal from './feedback/_modals/modal';

function App() {
  // localStorage.feedBackModalShown = false;
  let feedbackModalClose = () => { localStorage.feedBackModalShown = false; }
  return (
      <div>
          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
            <Route exact path="/home" component={withRouter(Home)} />
            <Route exact path="/dashboard" component={withRouter(Dashboard)} />
            <Route exact path="/cpdgo" component={withRouter(CPDGO)} />
            <Route exact path="/mycpd" component={withRouter(RecordCPD)} />
            <Route exact path="/cpdclassroom" component={withRouter(FaceToFace)} />
            <Route exact path="/cpdaccredt" component={withRouter(ApprovedCPDProviders)} />
            <Route exact path="/library" component={withRouter(Library)} />
          </Switch>
          <FeedbackModal />
      </div>
  );
}

export default App;
