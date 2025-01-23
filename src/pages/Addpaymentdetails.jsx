import React, { useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import accessCenter from '../assets/images/accessCenter.png';
// import office from '../assets/images/office.svg';
// import chair from '../assets/images/chair.svg';
// import location from '../assets/images/location.svg';
// import call from '../assets/images/call.svg';
// import website from '../assets/images/sortIcons/political.svg';
// import addPic from "../assets/images/add-square.svg";
import user from "../assets/images/user.svg";
// import mail from "../assets/images/mail.svg";
import bank from "../assets/images/bank.svg";
import sortcode from "../assets/images/sortcode.svg";
import accountno from "../assets/images/accountno.svg";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import stripe from "../assets/images/paymentlogo/stripe.svg";
import visa from "../assets/images/paymentlogo/visa.svg";
import mastercard from "../assets/images/paymentlogo/mastercard.svg";
import americanexpress from "../assets/images/paymentlogo/americanexpress.svg";
import directdebit from "../assets/images/paymentlogo/directdebit.svg";
import googlepay from "../assets/images/paymentlogo/googlepay.svg";
import applepay from "../assets/images/paymentlogo/applepay.svg";
import klarna from "../assets/images/paymentlogo/klarna.svg";
import sepa from "../assets/images/paymentlogo/sepa.svg";
import giropay from "../assets/images/paymentlogo/giropay.svg";
import paymentimg from "../assets/images/paymentimg.png";

import { Checkbox, FormControlLabel, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

const Addpaymentdetails = () => {
  const localData = localStorage.getItem("Page3") && JSON.parse(localStorage.getItem("Page3")) || {};
  const navigate = useNavigate();

  const [bankDetail, setBankDetails] = useState({
    company_account_name: localData?.company_account_name || "",
    bank_name: localData?.bank_name || "",
    sort_code: localData?.sort_code || "",
    account_number: localData?.account_number || "",
    is_default: localData?.is_default || true,
  });

  
  const handleDetails = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name == "sort_code") {
      value = formatSortCode(value.replace(/[^0-9]/g, ''));

      setBankDetails((prev) => ({ ...prev, [name]: value }));
    }
    else {
      setBankDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatSortCode = (value) => {
    const regex = /^(\d{0,2})(\d{0,2})(\d{0,2})$/;
    const match = value.match(regex);

    if (match) {
      return `${match[1]}${match[1] && match[2] ? '-' : ''}${match[2]}${match[2] && match[3] ? '-' : ''}${match[3]}`;
    } else {
      return value;
    }
  };

  const NextPage = (e) => {
    e.preventDefault();
    localStorage.setItem("Page3", JSON.stringify(bankDetail));
    if (localStorage.getItem("Page3")) {
      navigate("/terms-and-conditions");
    }
  };

  return (
    <>
      <HeaderN />
      {/* {console.log(bankDetail, "<---------Bankdetails")} */}
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0">
              <Col lg={6} md={6} sm={12} xs={12} className="lft_colm p-0">
                <img src={paymentimg} alt="" className="resp_bg" />
                <div className="login_stepsWrap left-pdng bg-white">
                  <div className="onboardMain">
                    <div className="onboardIntro">
                      <div className="d-flex pwrd_by_stripe">
                        <div className="pg_heading">
                          <h1 className="mb-0">Add payment details</h1>
                        </div>
                        <img src={stripe} alt="stripe" />
                      </div>
                      <div className="onboardStep payment_head">
                        <p className="mb-0">
                          We have partnered with STRIPE to deliver a safe,
                          secured, and seamless online payment gateway when you
                          purchase content, and make payments on our platform.
                          Stripe supports 135+ currencies and dozens of global
                          payment methods
                        </p>
                      </div>
                    </div>
                    <div className="onboardStep">
                      <Form onSubmit={NextPage}>
                        <div className="officeDetails sign_section">
                          {/* <h4 className='onbrdheading'>Office details</h4> */}
                          <div className="pmnt_crds_wrap">
                            <Row>
                              <Col lg={4} md={6} sm={12} xs={12}>
                                <div className="pmt_txt_cards">
                                  <p className="hd">
                                    Simple & very easy to use
                                  </p>
                                  <p className="bd mb-0">
                                    No set up fees, no monthly fees, no minimum
                                    charges and no card storage fees, Stripe
                                    makes everything easy!
                                  </p>
                                </div>
                              </Col>
                              <Col lg={4} md={6} sm={12} xs={12}>
                                <div className="pmt_txt_cards">
                                  <p className="hd">Keeps your payments safe</p>
                                  <p className="bd mb-0">
                                    Every online payment made through Stripe of
                                    any size, and in any currency is completely
                                    protected
                                  </p>
                                </div>
                              </Col>
                              <Col lg={4} md={6} sm={12} xs={12}>
                                <div className="pmt_txt_cards">
                                  <p className="hd">Supports global payments</p>
                                  <p className="bd mb-0">
                                    Stripe supports 135+ currencies and dozens
                                    of global payment methods
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="adminDetails sign_section no_border_bottom">
                          <h4 className="onbrdheading">
                            Enter company bank details
                          </h4>
                          <Row>
                            <Col lg={6} md={12} sm={12}>
                              <Form.Group className="mb-4 form-group">
                                <img src={user} alt="" />
                                <Form.Control
                                  type="text"
                                  className=""
                                  placeholder="Enter company account name *"
                                  required
                                  value={bankDetail.company_account_name}
                                  name="company_account_name"
                                  onChange={handleDetails}
                                />
                              </Form.Group>
                            </Col>

                            <Col lg={6} md={12} sm={12}>
                              <Form.Group className="mb-4 form-group">
                                <img src={bank} alt="" />
                                <Form.Control
                                  type="text"
                                  placeholder="Enter bank name *"
                                  value={bankDetail.bank_name}
                                  required
                                  name="bank_name"
                                  onChange={handleDetails}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                              <Form.Group className="mb-4 form-group">
                                <img src={sortcode} alt="" />
                                <Form.Control
                                  type="text"
                                  placeholder="Enter sort code *"
                                  value={bankDetail.sort_code}
                                  required
                                  name="sort_code"
                                  onChange={handleDetails}
                                  maxLength={8}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                              <Form.Group className="mb-4 form-group">
                                <img src={accountno} alt="" />
                                <Form.Control
                                  type="number"
                                  placeholder="Enter account number *"
                                  value={bankDetail.account_number}
                                  required
                                  name="account_number"
                                  onChange={handleDetails}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Set as default"
                                checked={bankDetail.is_default}
                                onChange={(e) => {
                                  setBankDetails((prev) => ({
                                    ...prev,
                                    is_default: e.target.checked,
                                  }));
                                  // console.log(e.target.checked);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>

                        <div className="payment_logos d-flex justify-content-start flex-wrap gap-3">
                          <img src={visa} alt="visa" />
                          <img src={mastercard} alt="mastercard" />
                          {/* <img src={americanexpress} alt="americanexpress" />
                          <img src={directdebit} alt="directdebit" />
                          <img src={googlepay} alt="googlepay" />
                          <img src={applepay} alt="applepay" />
                          <img src={klarna} alt="klarna" />
                          <img src={sepa} alt="sepa" />
                          <img src={giropay} alt="giropay" /> */}
                        </div>
                        <div className="stepFooter">
                          <Button
                            type="submit"
                            className="w-100"
                            variant="primary"
                          >
                            Next
                          </Button>
                          <h6 className="text-center mt-3">3 of 4</h6>
                        </div>
                      </Form>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="rt_col">
                {/* <div className="left-side">
                  <img src={paymentimg} alt="" />
                  <h2 className="text-center mt-3">
                    Post multiple tasks to our users. Anytime, anywhere!
                  </h2>
                </div> */}
                <div className="right-side position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <div className="">
                    <img src={paymentimg} className="rt_bg_img" />
                  </div>
                  <div className="right_txt">
                    <p>
                      Post multiple <span className="txt_bld">tasks </span> to
                      our users. Anytime, anywhere!
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Addpaymentdetails;
