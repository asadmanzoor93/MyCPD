import React from "react";
import $ from 'jquery';
import {Modal, Button} from 'react-bootstrap';

class FeedbackModal extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["Name"]){
            formIsValid = false;
            errors["Name"] = "Cannot be empty";
        }

        //MembershipNumber
        if(!fields["MembershipNumber"]){
            formIsValid = false;
            errors["MembershipNumber"] = "Cannot be empty";
        }

        //Email
        if(!fields["Email"]){
            formIsValid = false;
            errors["Email"] = "Cannot be empty";
        }

        //Phone
        if(!fields["Phone"]){
            formIsValid = false;
            errors["Phone"] = "Cannot be empty";
        }

        //Query
        if(!fields["Query"]){
            formIsValid = false;
            errors["Query"] = "Cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    contactSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            alert("Form submitted");
        }else{
            alert("Form has errors.")
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
                  <i class="fa fa-close"> </i>
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
                  <input type="text" className="form-control"
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
                            defaultValue
                  > </textarea>
                  <span style={{color: "red"}}>{this.state.errors["Query"]}</span>
              </div>
              <div className="modal-footer">
                  <button className="btn btn-warning" onClick={this.props.onHide}>Cancel</button>
                  <button className="btn btn-primary" onClick={this.contactSubmit.bind(this)} >Submit</button>
              </div>
            </Modal.Body>
          </Modal>
        );
    }
}

export default FeedbackModal;