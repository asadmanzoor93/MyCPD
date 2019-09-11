import React from "react";
import {Modal, Button} from 'react-bootstrap';

class ViewModal extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props);
      this.state = {
        startDate:          this.props.listViewDatastartDate,
        courseLocation:     this.props.listViewDatacourseLocation || "Course Location",
        courseType:         this.props.listViewDatacourseType || "Course Type",
        host:               this.props.listViewDatahost || "Host",
        cpdFormat:          this.props.listViewDatacpdCPDFormat || "CPD Format",
        venue:              this.props.listViewDatavenue || "Venue",
        trainer:            this.props.listViewDatatrainer || "Venue",
        courseDescription:  this.props.listViewDatacourseDescription || "Course Description",
      }
    }
    render () {
        return (
            <Modal {...this.props} bsSize="large" >
            <Modal.Header className="modal-header-primary">
              <Modal.Title id="contained-modal-title-lg">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.props.onHide}>
                  <i className="fa fa-close"></i>
                </button>
              Feedback Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group col-xs-4 col-md-4" style={{marginLeft:'-16px'}}>
                    <label>Start Date:</label>
                    <p className="form-control-static">{ this.state.startDate }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Course Location:</label>
                    <p className="form-control-static">{ this.state.courseLocation }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Course Type:</label>
                    <p className="form-control-static">{ this.state.courseType }</p>
                </div>

                <div className="form-group col-xs-4 col-md-4" style={{marginLeft:'-16px'}}>
                    <label>Host:</label>
                    <p className="form-control-static">{ this.state.host }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>CPD Format:</label>
                    <p className="form-control-static">{ this.state.cpdFormat }</p>
                </div>
                <div className="form-group col-xs-4 col-md-4">
                    <label>Venue:</label>
                    <p className="form-control-static">{ this.state.venue }</p>
                </div>
                <div className="form-group">
                    <label>Trainer:</label>
                    <p className="form-control-static">{ this.state.trainer }</p>
                </div>
                <div className="form-group">
                    <label>Course Description:</label>
                    <p className="form-control-static">{ this.state.courseDescription }</p>
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