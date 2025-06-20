import React, { memo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import user from "../assets/images/user.svg";
import "react-phone-number-input/style.css";
import companyNameImg from "../assets/images/follower.svg";
import chairImg from "../assets/images/chair.svg";
import mailImg from "../assets/images/mail.svg";

import {
  Button,
} from "@mui/material";
import Loader from "./Loader";
import { Post } from "../services/user.services";
import { toast } from "react-toastify";

const InviteUserModal = ({
  adminId,
  show,
  setShow,
  name = "",
  email = "",
  company_name = "",
  designation = "",
  setIsInvitationLinkSend,
}) => {
  const [emailIds, setEmailIds] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!emailIds) {
        return;
      }
      if (emailIds) {
        const [, adminDomain] = email.split("@");
        const emailList = emailIds.split(",").map(e => e.trim());
      
        const isSameDomain = emailList.every(emailId => {
          const [, domain] = emailId.split("@");
          return domain === adminDomain;
        });
      
        if (!isSameDomain) {
          toast.error("Please enter email IDs with the same domain as the administrator's email.");
          return;
        }
      }
      
      setLoading(true);
      await Post("auth/sendInvitationLink", { emailIds, _id: adminId });
      setEmailIds("");
      toast.success("Invitation link sent.");
      setLoading(false);
      handleClose();
      setIsInvitationLinkSend(true);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className="admin_popup_dtl">
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-hcenter profile_mdl"
          className="modal_wrapper "
          dialogClassName="my-modal adm_reg_mdl mdl_dsn add_usr_mdl"
        >
          <Form onSubmit={handleSubmit}>
            <Modal.Header
              className="modal-header profile_mdl_hdr_wrap"
              closeButton
            >
              <Modal.Title className="modal-title profile_modal_ttl ">
                <p className="mb-0">Invite new users</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid modal-body border-0">
              <Container>
                <Row className="rw_gp_sml mb-4">
                  <p className="invite-user-heading">Administrator details</p>
                  <Col lg={4} md={4} xs={12}>
                    <Form.Group className="form-group">
                      <img src={user} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-disable-field"
                        value={name}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={8} md={8} xs={12} className="mb-3">
                    <Form.Group className="form-group">
                      <img src={companyNameImg} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-disable-field"
                        value={company_name}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} xs={12}>
                    <Form.Group className="form-group">
                      <img src={chairImg} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-disable-field"
                        value={designation}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={8} md={8} xs={12}>
                    <Form.Group className="form-group">
                      <img src={mailImg} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-disable-field"
                        value={email}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="rw_gp_sml mb-10">
                  <p className="invite-user-heading">Add official email id's</p>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Group className="form-group">
                      <img src={mailImg} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-enable-field"
                        placeholder="Enter email id"
                        value={emailIds}
                        onChange={(e) => setEmailIds(e.target.value)}
                      />
                      <span className="errorInput mt-2">
                        You can add multiple id's of your team-members. Please put commas between each id.
                      </span>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="rw_gp_sml mb-4">
                  <p className="invite-user-heading">Message</p>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Group className="form-message">
                      <img src={mailImg} alt="" />
                      <div className="font-14 invite-user-enable-message">
                        <p>Dear Team Member,</p>
                        <p>I’ve just sent you an invite to join <span className="txt-success">PressHop</span>, the platform powering the future of citizen journalism! Please check your inbox for instructions to complete your registration and start exploring. It’s free, and easy to use.</p>
                        <p>If you have any questions, just give me a shout — happy to assist.</p>
                        <p>Thank you,</p>
                        <p><span className='txt-success'>Administrator.</span></p>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer className="border-0 mb-4">
              <Button
                className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
                variant="primary"
                type="submit"
                disabled={!emailIds || loading}
              >
                <div className="link_white">Send Invite</div>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default memo(InviteUserModal);
