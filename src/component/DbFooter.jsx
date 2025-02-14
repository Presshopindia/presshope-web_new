import React, { memo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import facebook from "../assets/images/facebook.svg";
import linkedin from "../assets/images/linkedin.svg";
import instagram from "../assets/images/instagram.svg";
import google from "../assets/images/google.svg";
import twitter from "../assets/images/twitter.svg";
import { MdOutlineEmail } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import logo from '../assets/images/footer_logo.png';
import logoDark from '../assets/images/footerlogoDarkMode.png';
import { Button } from '@mui/material';
import { Link, NavLink, useNavigate } from "react-router-dom";
import playstore from '../assets/images/googlePlay.png'
import appstore from '../assets/images/appStore.png'
import tutorials from '../assets/images/tutorials.svg'
import graph from '../assets/images/graph.svg';
import task from '../assets/images/taskIcon.svg';

import contactusdark from '../assets/images/contactusdark.svg'
import { toast } from 'react-toastify';

const DbFooter = () => {
  return (
    <>
      <div className="footer dbfooterWrap">
        <Container fluid className="p-0">
          <div className="footer-txt">
            <Row>
              <Col lg={4} md={6} sm={12} className="">
                <div className="ftr-left">
                  <img src={logo} alt="PressHop" className="footer-logo" />
                  {/* <img
                    src={logoDark}
                    alt="PressHop"
                    className="footer-logo darkLogo"
                  /> */}
                </div>
                <div className="presshopInfo">
                  <h6 className="font-bold">Presshop Media UK Limited</h6>
                  <p className="ftr_adr">
                    167-169 Great Portland Street,
                    <br />
                    London, W1W 5PF
                    <br />
                  </p>
                  <div className="contantUsby">
                    <span>
                      <MdOutlineEmail />
                      hello@presshop.co.uk
                    </span>
                    <span>
                      <SlGlobe />
                      www.presshop.news
                    </span>
                  </div>
                </div>
                <div className="foot-logos text-center">
                  <div className="img-wrap ms-0">
                    <a
                      href="https://www.facebook.com/presshopuk/"
                      target="_blank"
                    >
                      <img src={facebook} alt="Facebook" className="facebook" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a
                      href="https://www.linkedin.com/company/presshop/"
                      target="_blank"
                    >
                      <img src={linkedin} alt="LinkedIn" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a
                      href="https://www.instagram.com/presshopuk/"
                      target="_blank"
                    >
                      <img src={instagram} alt="" className="instagram" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a href="https://twitter.com/Presshopuk/" target="_blank">
                      <img src={twitter} alt="twitter" className="twitter" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <div className="footerLinks mt-3">
                  <Row>
                    <Col lg={12} md={12} sm={12} className="pe-3 ps-0">
                      <div className="disclaimerFooter">
                        <p className="ftr_sb_hdng">Handy tips</p>
                        <div className="allTips_wrap ps-0 dashCard-body">
                          <div className="singleTip">
                            <span className="ms-0 tipIcon">
                              <img src={task} alt="" className="me-2" />
                              <img src={graph} alt="" />
                            </span>
                            <p>
                              You can view all reports in details, and in a
                              tabular format by clicking here{" "}
                            </p>
                          </div>
                          <div className="singleTip">
                            <Form.Group className="globalSort">
                              <Form.Select>
                                <option>Monthly</option>
                                <option>Latest</option>
                                <option>Relevance</option>
                              </Form.Select>
                            </Form.Group>
                            <p>
                              Change your views to daily, weekly, monthly, or
                              yearly from the drop down box
                            </p>
                          </div>
                          <div className="singleTip">
                            <Form.Group className="globalSort">
                              <Form.Select>
                                <option>Sort</option>
                                <option>Latest</option>
                                <option>Relevance</option>
                              </Form.Select>
                            </Form.Group>
                            <p>Sort your data by clicking here</p>
                          </div>
                          <div className="singleTip">
                            <Form.Group className="globalSort">
                              <Form.Select>
                                <option>Filter</option>
                                <option>Latest</option>
                                <option>Relevance</option>
                              </Form.Select>
                            </Form.Group>
                            <p>Filter your data by clicking here</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="footerCopyRight">
                  <Row className="align-items-end">
                    <Col md={12} sm={12} className="ps-0">
                      <p className="ftr_sb_hdng">24 x 7 support</p>
                      <div className="supportLinks d-flex align-items-start">
                        <img src={contactusdark} alt="" className="me-1" />
                        <img src={tutorials} alt="" className="me-2" />
                        <p className="mb-0">
                          Please refer to our{" "}
                          <Link to={"/faq-post"}>
                            <a>FAQs</a>
                          </Link>
                          , <Link to={"/all-tutorials"}>tutorials</Link>, or{" "}
                          <Link to={"/contact-us-post"}>
                            {" "}
                            <a>contact</a>
                          </Link>{" "}
                          our helpful teams who will be happy to help
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={4} md={6} sm={12}>
                <div className="footerLinks mt-3">
                  <Row>
                    <Col md={12} className="ps-5">
                      <div className="disclaimerFooter">
                        <p className="ftr_sb_hdng">Quick links</p>
                        <Row>
                          <Col md={6} sm={6}>
                            <div className="aboutPress">
                              {/* <Link to={"/landing-page"}>About PressHop</Link> */}
                              <NavLink
                                //   onClick={() => navigate("/landing-page?q='div1'")}
                                to="/landing-page?q=div1"
                                className="active nav-link"
                              >
                                About PressHop
                              </NavLink>
                              {/* <Link to={"/landing-page?q=div1"}>
                                About PressHop
                              </Link> */}
                              <Link to={"/broadcasted-taks"}>Tasks</Link>
                              <Link
                                to={"/content/exclusive/published/favourited"}
                              >
                                Content
                              </Link>
                              <Link to={"/chat"}>Chat</Link>
                              <Link to={"/reports/content"}>Reports</Link>
                              <Link to={"/onboard"}>Onboard</Link>
                            </div>
                          </Col>
                          <Col md={6} sm={6} className="ps-4">
                            <div className="aboutPress">
                              <Link to={"/published-content"}>Feed</Link>
                              {/* <Link to={"/faq-post"}>FAQs</Link> */}
                              <Link to={"/landing-page?q=div5"}>FAQs</Link>
                              <Link to={"/post-login-tandc"}>Legal T&Cs</Link>
                              <Link to={"/privacy-policy"}>Privacy Policy</Link>
                              <Link to={"/contact-us-post"}>
                                Contact PressHop
                              </Link>
                              <Link to={"/login"}>Log in</Link>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="footerCopyRight">
                  <Row className="align-items-end">
                    <Col sm={12} className="ps-5 pe-0">
                      <div className="appLinks">
                        <img src={appstore} alt="" className="me-3" />
                        <img src={playstore} alt="" />
                      </div>
                      <h6 className="copyrText mt-1 mb-0">
                        © 2024 PressHop UK. All rights reserved.
                      </h6>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="dark-layer"></div>
      </div>
    </>
  );
};

export default memo(DbFooter);
