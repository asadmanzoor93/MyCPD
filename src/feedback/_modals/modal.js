import React from "react";
import $ from 'jquery';
import {Modal, Button} from 'react-bootstrap';

class FeedbackModal extends React.Component {
    render () {
        return (
            <Modal {...this.props} >
            <Modal.Header className="modal-header-primary">
              <Modal.Title id="contained-modal-title-lg">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"  onClick={this.props.onHide}>
                  <i class="fa fa-close"></i>
                </button>
              Feedback Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Name">Name</label>
                  <input type="text" className="form-control" id="Name" placeholder="Your Name" required="" />
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="MembershipNumber">Membership Number</label>
                  <input type="text" className="form-control" id="MembershipNumber" placeholder="Your Membership Number" required="" />
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Email">Email</label>
                  <input type="email" className="form-control" id="Email" placeholder="Your Valid Email" required="" />
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Phone">Phone</label>
                  <input type="text" className="form-control" id="Phone" placeholder="Your Phone" required="" />
              </div>
              <div className="form-group required">
                  <label className="control-label" htmlFor="Query">Query</label>
                  <textarea className="form-control" id="Query" rows="4" placeholder="Your Query here" required=""></textarea>
              </div>
              <div className="modal-footer">
                  <button className="btn btn-warning" onClick={this.props.onHide}>Cancel</button>
                  <button className="btn btn-primary" disabled="disabled">Submit</button>
              </div>
            </Modal.Body>
          </Modal>
        );
    }
}

export default FeedbackModal;