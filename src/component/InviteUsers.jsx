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
  activationLink = ""
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
      setLoading(true);
      await Post("auth/sendInvitationLink", { emailIds, _id: adminId });
      setEmailIds("");
      toast.success("Invitation link send.");
      setLoading(false);
      handleClose();
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const jsxElement = <strong>Hello, JSX!</strong>;

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
                  <p className="invite-user-heading">Activation link</p>
                  <Col lg={12} md={12} xs={12}>
                    <Form.Group className="form-group">
                      <img src={mailImg} alt="" />
                      <Form.Control
                        type="text"
                        size="sm"
                        className="user invite-user-disable-field"
                        value={activationLink}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="rw_gp_sml mb-4">
                  <p className="invite-user-heading">Message</p>
                  {/* <Col lg={12} md={12} xs={12}>
                    <Form.Group
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        className="invite-user-enable-field"
                        as="textarea"
                        placeholder="Enter message"
                        rows={7}
                        value={ReactDOMServer.renderToString(jsxElement)}
                        defaultValue={""}
                      />
                    </Form.Group>
                  </Col> */}
                  <Col lg={12} md={12} xs={12}>
                    <Form.Group className="form-message">
                      <img src={mailImg} alt="" />
                      <div className="font-14 invite-user-enable-message">
                        <p>Dear team-members,</p>
                        <p>Please use this activation link to commence your onboarding process onto the <span className="txt-success">PressHop</span> platform. This activation link is valid for 5 days from now and will automatically expire.</p>
                        <p>If you have any questions, you can always contact me by email.</p>
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
