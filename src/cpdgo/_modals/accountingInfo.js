import React from "react";
import {Modal, Button} from 'react-bootstrap';

class AccountingInfoModal extends React.Component {
    render () {
        return (
            <Modal
                {...this.props}
            >
              <Modal.Header closeButton className="modal-header-primary">
                <Modal.Title id="contained-modal-title-lg">Online Accounting CPD and Bites, Provided by accountingcpd.net</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>When you select this option you will be brought to the accountingcpd.net ATI platform</p><br />
                <p>Step 1: Select Online Accounting CPD and Bites, Provided by accountingcpd.net</p><br />
                <p>Step 2: You will be taken to the accountingcpd.net website</p><br />
                <p>Step 3: Follow the onscreen instructions to set up your account and gain access to the accountingcpd.net ATI platform</p><br />
                <p><u>RETAIN YOUR LOG IN DETAILS</u></p><br />
                <p>Step 4: When the platform launches you will see the full Online Accounting CPD accountingcpd offering. This is a selection of FREE and paid for CPD along with your CPD Bites back catalogue</p><br />
                <p>Step 5: Scroll down to Select CPD Bites from the menu. You will to find the Bite of the week along with the full back catalogue available to you for FREE. Note: we will also send you a CPD Bite weekly direct to your inbox along with a direct link to your FREE 4 One hour courses</p><br />
                <p>Step 6: Click CPD Courses and filter by Free Course to access your FREE 4 One hour courses</p><br />
                <p>Step 7: If you wish to complete any further online Accounting CPD you can purchase it direct via this platform</p><br />
                <p><u>NOTE: ALL CPD COMPLETED ON ACCOUNTINGCPD WILL BE AUTOMATICALLY LOGGED IN MYCPD</u></p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-warning" onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
        );
    }
}

export default AccountingInfoModal;