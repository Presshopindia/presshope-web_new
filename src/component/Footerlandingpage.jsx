import React, { memo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import facebook from "../assets/images/facebook.svg";
import linkedin from "../assets/images/linkedin.svg";
import instagram from "../assets/images/instagram.svg";
import twitter from "../assets/images/twitter.svg";
import { MdOutlineEmail } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import logo from "../assets/images/footer_logo.png";
import { BsCheckSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import playstore from "../assets/images/googlePlay.png";
import appstore from "../assets/images/appStore.png";
import emailic from "../assets/images/mail.svg";
import { toast, Slide } from "react-toastify";
import { Post } from "../services/user.services";
import Loader from "./Loader";

const Footerlandingpage = ({ scrollToDiv }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    setLoading(true);
    try {
      if (!email) {
        toast.error("Please add your email to subscribe.");
        setLoading(false);
        return;
      }

      await Post(`mediaHouse/addemail`, {email, for: "marketplace"});
      setEmail("");
      setLoading(false);
      toast.success('Brilliant! Thank you for subscribing.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading && <Loader />
      }
      <div className="footer">
        <Container fluid className="">
          <div className="footer-txt">
            <Row className="justify-content-between">
              <Col lg={5}>
                <div className="ftr-left">
                  <img src={logo} alt="PressHop" className="footer-logo" />
                </div>
              </Col>
              <Col lg={7}>
                <div className="footernewsLetter position-relative">
                  <img className="searchIcon icn" src={emailic} alt="" />
                  <input
                    type="text"
                    value={email}
                    placeholder="Stay connected with us. Enter your email here"
                    onChange={changeHandler}
                  />
                  <span className="subScrbutton" onClick={sendEmail} style={{ cursor: "pointer" }}>
                    <BsCheckSquare className="me-2" /> Subscribe now
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <div className="presshopInfo">
                  <h6 className="font-bold">Presshop Media UK Limited</h6>
                  <p className="mb-0">
                    167-169 Great Portland Street,
                    <br />
                    London, W1W 5PF
                    <br />
                  </p>
                  <div className="contantUsby">
                    <span>
                      <a href="mailto:support@presshop.co.uk" target="_blank"><MdOutlineEmail /> support@presshop.co.uk</a>
                    </span>
                    <span>
                      <a href="https://www.presshop.co.uk" target="_blank"><SlGlobe /> www.presshop.co.uk</a>
                    </span>
                  </div>
                </div>
                <div className="foot-logos text-center">
                  <div className="img-wrap ms-0">
                    <a href='https://www.facebook.com/presshopuk/' target="_blank">
                      <img src={facebook} alt="Facebook" className="facebook" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a href='https://www.linkedin.com/company/presshop/' target="_blank" >
                      <img src={linkedin} alt="LinkedIn" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a href='https://www.instagram.com/presshopuk/' target="_blank">
                      <img src={instagram} alt="" className="instagram" />
                    </a>
                  </div>
                  <div className="img-wrap">
                    <a href='https://twitter.com/Presshopuk/' target="_blank">
                      <img src={twitter} alt="twitter" className="twitter" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col lg={7} className="align-self-end">
                <div className="footerLinks">
                  <Row>
                    <Col md={3}>
                      <div className="aboutPress">
                        <Link onClick={() => scrollToDiv("div1")}>
                          <span>About PressHop</span>
                        </Link>
                        <Link onClick={() => scrollToDiv("div2")}>
                          Platform
                        </Link>
                        <Link onClick={() => scrollToDiv("div3")}>
                          Features
                        </Link>
                        <Link onClick={() => scrollToDiv("div4")}>Reports</Link>
                        <Link to={"/onboard"}>Onboard</Link>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="aboutPress">
                        <Link onClick={() => scrollToDiv("div5")}>FAQs</Link>
                        <Link to="/pre-login-tandc">Legal T&Cs</Link>
                        <Link to="/pre-privacy-policy">Privacy Policy</Link>
                        <Link to={"/contact-us"}>Contact us</Link>
                        <Link to={"/login"}>Log in</Link>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="disclaimerFooter">
                        <h6>Disclaimer</h6>
                        <p>
                          If you have received this email in error please notify
                          Presshop Media UK Limited immediately. This message
                          contains confidential information and is intended only
                          for the individual named. If you are not the named
                          addressee, you should not disseminate, distribute or
                          copy this e-mail.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="footerCopyRight">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <h6 className="copyrText">
                        © 2025 PressHop UK. All rights reserved.
                      </h6>
                    </Col>
                    <Col sm={6}>
                      <div className="appLinks text-end">
                        <img src={appstore} alt="" className="me-3" />
                        <img src={playstore} alt="" />
                      </div>
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

export default memo(Footerlandingpage);
