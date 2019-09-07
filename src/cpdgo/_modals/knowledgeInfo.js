import React from "react";
import $ from 'jquery';
import {Modal, Button} from 'react-bootstrap';

class KnowledgeInfoModal extends React.Component {
    render () {
        return (
            <Modal
        {...this.props}
      >
        <Modal.Header closeButton className="modal-header-primary">
          <Modal.Title id="contained-modal-title-lg">KnowledgePoint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select this option and input your Touchpoint log in details to see the full range of Accounting Technicians Ireland produced KnowledgePoint tutorials. With over 72 revision topics available for purchase it brings together the best of our face-to-face academy offerings and offers supplementary learning supports in key course areas within the Accounting Technicians Ireland qualification. We have included 5 FREE titles in your library to get you started. </p>
          <br />
          <p>Please note this is a resource intended purely for knowledge refresh and revision purposes and does not qualify for CPD hours.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
    }
}

export default KnowledgeInfoModal;