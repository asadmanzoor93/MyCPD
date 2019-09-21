import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { LinearProgress } from 'react-md';
import {NotificationManager} from 'react-notifications';

const qs = require('querystring');

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          username: '',
          password: '',
          submitted: false,
          login: false,
          login_error: false,
          mainLoading: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();
      this.setState({
          submitted: true,
      });

      const {username, password} = this.state;
      if (username && password) {

        this.setState({
            mainLoading: true
        });

        axios.post('http://34.248.242.178/CPDCompliance/token', qs.stringify({
            'username': username,
            'password': password,
            'grant_type': 'password',
            'client_id': 'mycpd'
        }), {
            'headers': {
                'Content-Type': 'x-www-form-urlencoded'
            }
        })
        .then((response) => {
            if(response.data){
                // save data to local storage
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('displayName', response.data.displayName);
                localStorage.setItem('expires_in', response.data.expires_in);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('successMessage', 'Hello '+response.data.displayName);

                //Login user to site
                this.setState({
                    login: true,
                    mainLoading: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                login_error: true,
                mainLoading: false
            });
            console.log(error);
        });
    }
    }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    if (this.state.login) {
        return <Redirect to="/home" />;
    } else {
      return (
        <div className="col-md-6 col-md-offset-3">
          { this.state.mainLoading && <LinearProgress id="main-loader" /> }
            <div className="modal-header ng-scope" align="center">
                <img className="img-circle" id="img_logo" src={"/images/MyCPDLogoImage.jpg"} alt="logo"/>
            </div>
            <div className="">
                <div id="loginbox" style={{marginTop: '50px'}} className="mainbox">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                        </div>
                        <div style={{paddingTop: '30px'}} className="panel-body">
                            {submitted && (!username || !password) &&
                                <div id="login-alert" className="alert alert-danger col-sm-12">
                                    <ul>
                                    {submitted && !username &&
                                    <li ><strong>Username is required</strong></li>
                                    }
                                    {submitted && !password &&
                                    <li ><strong>Password is required</strong></li>
                                    }
                                    </ul>
                                </div>
                            }
                            <div id="invalid_grant_error" className="alert-danger" style={{display: this.state.login_error ? 'block' : 'none'}}>
                                <ul>
                                    <li><strong>Invalid Username or Password</strong></li>
                                </ul>
                            </div>

                            <form id="loginform" name="loginform"  onSubmit={this.handleSubmit}
                                  className="form-horizontal ng-dirty ng-valid-parse ng-valid ng-valid-required">

                                <div style={{marginBottom: '25px'}} className={'input-group' + (submitted && !username ? ' has-error' : '')}>
                                    <span className="input-group-addon">
                                        <i className="glyphicon glyphicon-user"> </i>
                                    </span>
                                    <input
                                        name="username" value={username} onChange={this.handleChange}
                                        className="form-control"
                                        type="text" placeholder="Enter Username"
                                        required="" autoFocus="" aria-invalid="false"
                                        autoComplete="off"
                                        style={{backgroundImage: 'url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC&quot)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'scroll', backgroundSize: '16px 18px', backgroundPosition: '98% 50%'}} />
                                </div>

                                <div style={{marginBottom: '25px'}} className={'input-group' + (submitted && !password ? ' has-error' : '')}>
                                        <span className="input-group-addon">
                                            <i className="glyphicon glyphicon-lock"> </i>
                                        </span>
                                        <input
                                            name="password" value={password} onChange={this.handleChange}
                                            className="form-control ng-untouched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required"
                                            type="password" placeholder="Enter Password" required="" aria-invalid="false"
                                            style={{backgroundImage: 'url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAUBJREFUOBGVVE2ORUAQLvIS4gwzEysHkHgnkMiEc4zEJXCMNwtWTmDh3UGcYoaFhZUFCzFVnu4wIaiE+vvq6+6qTgthGH6O4/jA7x1OiCAIPwj7CoLgSXDxSjEVzAt9k01CBKdWfsFf/2WNuEwc2YqigKZpK9glAlVVwTTNbQJZlnlCkiTAZnF/mePB2biRdhwHdF2HJEmgaRrwPA+qqoI4jle5/8XkXzrCFoHg+/5ICdpm13UTho7Q9/0WnsfwiL/ouHwHrJgQR8WEwVG+oXpMPaDAkdzvd7AsC8qyhCiKJjiRnCKwbRsMw9hcQ5zv9maSBeu6hjRNYRgGFuKaCNwjkjzPoSiK1d1gDDecQobOBwswzabD/D3Np7AHOIrvNpHmPI+Kc2RZBm3bcp8wuwSIot7QQ0PznoR6wYSK0Xb/AGVLcWwc7Ng3AAAAAElFTkSuQmCC&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;'}}
                                            autoComplete="off" />
                                </div>

                                <div style={{marginTop:'10px'}} className="form-group">
                                    <div className="col-sm-12 controls">
                                        <input type="submit" className="btn btn-success" value="Login" />
                                        {loggingIn &&
                                        <img alt="" src={{data:'image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='}} />
                                        }
                                    </div>
                                </div>
                                <p>Members and Fellows login, please <a
                                    href="https://tp.accountingtechniciansireland.ie/MemberHomePage.aspx">Click here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
      );
    }
  }
}

export default App;
