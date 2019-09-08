import React from "react";
import axios from 'axios';
import $ from 'jquery';
import {Modal, Button} from 'react-bootstrap';

const Feedback_URL = 'http://34.248.242.178/CPDCompliance/api/contact/SendInfo';

class FeedbackModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
            props_state: props
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["Name"]){
            formIsValid = false;
            errors["Name"] = "Name is required.";
        }

        //MembershipNumber
        if(!fields["MembershipNumber"]){
            formIsValid = false;
            errors["MembershipNumber"] = "MembershipNumber is required.";
        }

        //Email
        if(!fields["Email"]){
            formIsValid = false;
            errors["Email"] = "Email is required.";
        }

        if(typeof fields["Email"] !== "undefined"){
            let lastAtPos = fields["Email"].lastIndexOf('@');
            let lastDotPos = fields["Email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["Email"].indexOf('@@') == -1 && lastDotPos > 2
                && (fields["Email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["Email"] = "Email is not valid";
            }
        }

        //Phone
        if(!fields["Phone"]){
            formIsValid = false;
            errors["Phone"] = "Phone is required.";
        }

        //Query
        if(!fields["Query"]){
            formIsValid = false;
            errors["Query"] = "Query is required.";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    feedbackSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            // Hours Data
            axios.post(Feedback_URL,
                {
                    Name: this.state.fields['Name'],
                    MembershipNumber: this.state.fields['MembershipNumber'],
                    Phone: this.state.fields['Phone'],
                    Email: this.state.fields['Email'],
                    Query: this.state.fields['Query']
                },
                {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('access_token'),
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({
                    fields: {},
                    errors: {}
                });
                this.state.props_state.onHide();
                alert('Feedback Submitted Successfully');
            }).catch(console.log);
        }
    }

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }


    render () {
        return (
            <Modal {...this.props} >
            <Modal.Header className="modal-header-primary">
              <Modal.Title id="contained-modal-title-lg">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.props.onHide}>
                  <i className="fa fa-close"> </i>
                </button>
              Feedback Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Name">Name</label>
                  <input type="text" className="form-control"
                         id="Name" name="Name"
                         placeholder="Your Name" required
                         onChange={this.handleChange.bind(this, "Name")}
                         value={this.state.fields["Name"]}
                  />
                  <span style={{color: "red"}}>{this.state.errors["Name"]}</span>
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="MembershipNumber">Membership Number</label>
                  <input type="text" className="form-control"
                         id="MembershipNumber" name="MembershipNumber"
                         placeholder="Your Membership Number" required
                         onChange={this.handleChange.bind(this, "MembershipNumber")}
                         value={this.state.fields["MembershipNumber"]}
                  />
                  <span style={{color: "red"}}>{this.state.errors["MembershipNumber"]}</span>
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Email">Email</label>
                  <input type="email" className="form-control"
                         id="Email" name="Email"
                         placeholder="Your Valid Email" required
                         onChange={this.handleChange.bind(this, "Email")}
                         value={this.state.fields["Email"]}
                  />
                  <span style={{color: "red"}}>{this.state.errors["Email"]}</span>
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Phone">Phone</label>
                  <input type="phone" className="form-control"
                         id="Phone" name="Phone"
                         placeholder="Your Phone" required
                         onChange={this.handleChange.bind(this, "Phone")}
                         value={this.state.fields["Phone"]}
                  />
                  <span style={{color: "red"}}>{this.state.errors["Phone"]}</span>
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Query">Query</label>
                  <textarea className="form-control" id="Query" name="Query" rows="4"
                            placeholder="Your Query here" required
                            onChange={this.handleChange.bind(this, "Query")}
                            value={this.state.fields["Query"]}
                  > </textarea>
                  <span style={{color: "red"}}>{this.state.errors["Query"]}</span>
              </div>
              <div className="modal-footer">
                  <button className="btn btn-warning" onClick={this.props.onHide}>Cancel</button>
                  <button className="btn btn-primary" onClick={this.feedbackSubmit.bind(this)} >Submit</button>
              </div>
            </Modal.Body>
          </Modal>
        );
    }
}

export default FeedbackModal;