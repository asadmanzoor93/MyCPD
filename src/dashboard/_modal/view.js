import React from "react";
import {Modal, Button} from 'react-bootstrap';

class ViewModal extends React.Component {
    render () {

        return (
            <Modal {...this.props} bsSize="large" >
            <Modal.Header className="modal-header-primary">
              <Modal.Title id="contained-modal-title-lg">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.props.onHide}>
                  <i className="fa fa-close"> </i>
                </button>
              {this.props.coursename}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group col-xs-4 col-md-4" style={{marginLeft:'-16px'}}>
                    <label>Start Date:</label>
                    <p className="form-control-static">{ this.props.startdate }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Course Location:</label>
                    <p className="form-control-static">{ this.props.courselocation }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Course Type:</label>
                    <p className="form-control-static">{ this.props.coursetype }</p>
                </div>

                <div className="form-group col-xs-4 col-md-4" style={{marginLeft:'-16px'}}>
                    <label>Host:</label>
                    <p className="form-control-static">{ this.props.host }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>CPD Format:</label>
                    <p className="form-control-static">{ this.props.cpdformat }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Venue:</label>
                    <p className="form-control-static">{ this.props.venue }</p>
                </div>
                <div className="form-group">
                    <label>Trainer:</label>
                    <p className="form-control-static">{ this.props.trainer }</p>
                </div>
                <div className="form-group">
                    <label>Course Description:</label>
                    <p className="form-control-static">{ this.props.description }</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default ViewModal;