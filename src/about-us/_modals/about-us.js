import React from "react";
import $ from 'jquery';
import {Modal, Button} from 'react-bootstrap';

class AboutUsModal extends React.Component {
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
                <p>Accounting Technicians Ireland is a not-for-profit organisation and all our revenues are continually reinvested for the benefit of our members.</p>
                <br />
                <p>Accounting Technicians Ireland’s CPD Programme and Policy, in recognising the importance of CPD in our member’s professional lives, seeks to support.</p>
                <br />
                <p>Accounting Technicians in the workplace, to ensure their core competencies and technical skills are continually updated. The purpose of the CPD Programme is to provide ATI Full and Fellow Members with the opportunity to access and evidence continuing professional development.</p>
                <br />
                <b>This MyCPD tool is your one stop CPD hub, allowing you to plan, record and declare your CPD annually.</b>
            </Modal.Body>
           <Modal.Footer>
              <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default AboutUsModal;