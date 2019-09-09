import React from "react";
import {Modal, Button} from 'react-bootstrap';

class ATICodeProfessionalEthicsModal extends React.Component {
    render () {
        return (
            <Modal
                {...this.props}
            >
              <Modal.Header closeButton className="modal-header-primary">
                <Modal.Title id="contained-modal-title-lg">ATI Code of Professional Ethics – 1 hour course </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>Watch this video in full and read the ATI Code of Professional Ethics. </p><br />
                  <p><b>Note: you must watch this video in full in one sitting, you cannot exit the course and return to it at a later stage. The course will take you no longer than 1 hour to complete. Make sure to screen shot and save the final slide to use as your evidence of completion.</b></p><br />
                  <p>On completion you can then record your 1 hour of CPD. To Record follow these steps:</p><br />
                  <p>Launch MyCPD</p>
                  <p>Click Record MyCPD</p>
                  <p>Select CPDgo from drop down</p>
                  <p>Type in course title ATI Code of Professional Ethics 2019s</p>
                  <p>Select course</p>
                  <p>Upload evidence (screen shot of final slide of video)</p>
                  <p>Submit</p>
                  <video width="620" height="360" controls="controls" preload="none" id="cpdvideo1">
                      <source
                          src="http://34.248.242.178/CPDCompliance/MyCPDMultimedia/CodeofProfessionalEthics2019.mp4"
                          type="video/mp4" />
                  </video>

                  

              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}

export default ATICodeProfessionalEthicsModal;