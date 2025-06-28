import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import gmailLogo from "../assets/images/gmail.svg";
import yahoo from "../assets/images/yahooMail.svg";
import outlook from "../assets/images/outlook.svg";
import appleMail from "../assets/images/apple_mail.svg";
import { CloseButton } from 'react-bootstrap';


const EmailClientModal = ({ show, handleClose }) => {
  const openEmailClient = (client) => {
    let url = '';
    switch (client) {
      case 'gmail':
        url = 'https://mail.google.com';
        break;
      case 'yahoo':
        url = 'https://mail.yahoo.com';
        break;
      case 'outlook':
        url = 'https://outlook.live.com';
        break;
      case 'apple':
        url = 'https://www.icloud.com/mail';
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, '_blank');
      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="email-client-modal"
    >
      <Modal.Body className="text-center p-8 position-relative">
        <CloseButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }} />
        <h2 className="mb-10">Please verify your email.</h2>
        
        <div className="email-options">
          <div className="row mb-3">
            <div className="col-md-6">
              <Button
                variant="outlined"
                className="email-option-btn w-100"
                onClick={() => openEmailClient('gmail')}
                startIcon={<img src={gmailLogo} alt="Gmail" width="20" />}
              >
                Open Gmail
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                variant="outlined"
                className="email-option-btn w-100"
                onClick={() => openEmailClient('yahoo')}
                startIcon={<img src={yahoo} alt="Yahoo" width="20" />}
              >
                Open Yahoo
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Button
                variant="outlined"
                className="email-option-btn w-100"
                onClick={() => openEmailClient('outlook')}
                startIcon={<img src={outlook} alt="Outlook" width="20" />}
              >
                Open Outlook
              </Button>
            </div>
            <div className="col-md-6 mb-3">
              <Button
                variant="outlined"
                className="email-option-btn w-100"
                onClick={() => openEmailClient('apple')}
                startIcon={<img src={appleMail} alt="Apple Mail" width="20" />}
              >
                Open Apple Mail
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EmailClientModal;