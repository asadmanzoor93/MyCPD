import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap/bootstrap.min.css';
import './css/bootstrap/bootstrap-theme.css';
import './css/common/default.css';
import './css/custom.css';
import './css/common/bootstrap-float-label.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'jquery/src/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';

// import '../node_modules/jquery/dist/jquery.min.js';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Route component={App} />
    </Router>,
    document.getElementById('root'));

//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
