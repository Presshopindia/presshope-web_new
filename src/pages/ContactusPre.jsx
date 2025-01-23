import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from "../component/HeaderN";
import loginimg from "../assets/images/login-img.png";
import { Post } from "../services/user.services";
import { toast } from "react-toastify";
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
import eye from "../assets/images/sortIcons/custom.svg";
import Footerlandingpage from "../component/Footerlandingpage";
import { BsEyeSlash, BsEye, BsArrowLeft } from "react-icons/bs";
import PhoneInput from "react-phone-number-input";
import mail from "../assets/images/mail.svg";
import Loader from "../component/Loader";
import { successToasterFun } from "../component/commonFunction";
// import Form from 'react-bootstrap/Form';

const ContactusPre = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    country_code: "",
    email: "",
    content: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const ContactUs = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await Post(`mediaHouse/addCotactUs`, details);
      if (resp) {
        setLoading(false);
        setDetails({
          first_name: "",
          last_name: "",
          contact_number: "",
          country_code: "",
          email: "",
          content: "",
        });
        successToasterFun(
          "Thank you for contacting us.We will get back ASAP. Cheers!"
        );
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <HeaderN />
      <div className="login-page contact_us_pst">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="p-0">
                <div className="left-side bg-white cstm_ht">
                  <Link
                    className="back_link mb-2"
                    onClick={() => window.history.back()}
                  >
                    <BsArrowLeft className="text-pink" /> Back{" "}
                  </Link>
                  <div className="pg_heading">
                    <h1>Contact Us</h1>
                  </div>
                  <div className="log_txt">
                    <Typography variant="body2">
                      Our helpful teams are available 24x7 to assist, and answer
                      your questions. You can choose to send us a{" "}
                      <a className="link">message</a>, an{" "}
                      <a className="link">email</a>, or simply{" "}
                      <a className="link">chat</a> with one of our live team
                      members. We don't use Bots because we believe in keeping
                      everything real.
                    </Typography>
                    <Typography variant="body2" className="mb-0">
                      Meanwhile, you can also read our{" "}
                      <Link to={"/faq-post"} className="link">
                        FAQs
                      </Link>{" "}
                      for answers to most common questions, or check our online{" "}
                      <Link to={"/all-tutorials"} className="link">
                        video tutorials
                      </Link>
                      , for some handy tips on how to better use our platform
                    </Typography>
                  </div>
                  <Form onSubmit={ContactUs}>
                    <div className="cnt_mb inputs_wrap d-flex justify-content-between log_inputs">
                      <div className="">
                        <label className="cmn_lbl">First name</label>
                        <Form.Group
                          className="position-relative"
                          controlId="formBasicEmail"
                        >
                          <img className="frnt_ic" src={user} alt="user icon" />
                          <Form.Control
                            type="text"
                            required
                            className="rnd grey"
                            value={details.first_name}
                            placeholder="Enter First Name"
                            name="first_name"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                      <div className="">
                        <label className="cmn_lbl">Last name</label>
                        <Form.Group
                          className="position-relative"
                          controlId="formBasicEmail"
                        >
                          <img className="frnt_ic" src={user} alt="user icon" />
                          <Form.Control
                            type="text"
                            required
                            className="rnd grey"
                            value={details.last_name}
                            placeholder="Enter Last Name"
                            name="last_name"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="cnt_mb inputs_wrap d-flex justify-content-between log_inputs">
                      <div className="d-flex flex-column">
                        <label className="cmn_lbl">Mobile number</label>
                        <div className="number_inp_wrap">
                          <input
                            type="number"
                            required
                            className="input_nmbr"
                            value={details.contact_number}
                            placeholder=" phone"
                            name="contact_number"
                            onChange={handleChange}
                            ref={phoneInputRef}
                          />
                          <PhoneInput
                            className="f_1 cntry_code"
                            international
                            countryCallingCodeEditable={true}
                            required
                            name="country_code"
                            onChange={(e) => {
                              setDetails((prev) => ({
                                ...prev,
                                country_code: e,
                              }));
                              handleCountryCodeChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <label className="cmn_lbl">Email address</label>
                        <Form.Group className="form-group position-relative">
                          <img src={mail} alt="" className="frnt_ic" />
                          <Form.Control
                            type="email"
                            required
                            className=""
                            value={details.email}
                            placeholder="Enter email address"
                            name="email"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="contct_us inputs_wrap d-flex justify-content-between log_inputs">
                      <div className="d-flex flex-column">
                        <label className="cmn_lbl">Message</label>
                        <Form.Group
                          className=""
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Control
                            as="textarea"
                            placeholder="Enter message"
                            required
                            value={details.content}
                            name="content"
                            rows={3}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      type="submit"
                      className="cntct_btn sm_btn_blk w-100"
                    >
                      Email us
                    </Button>
                    {/* <div className="or_opt">
                                            <span>or</span>
                                        </div>
                                        <div className="d-flex justify-content-between btm_btns">
                                            <Button variant="secondary" className="w-100 cntct_btn sm_btn_blk">
                                                <Link to={'/chat'}>Chat</Link>
                                            </Button>
                                            <Button variant="secondary" className="w-100 cntct_btn sm_btn_blk">
                                                <Link to='mailto:mediahouse@mailinator.com'>Email us</Link>
                                            </Button>
                                        </div> */}
                  </Form>
                </div>
              </Col>
              <Col lg="6 pos_stick">
                <div className="right-side position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <div className="">
                    <img src={loginimg} alt="" srcset="" />
                  </div>
                  <div className="right_txt">
                    <p>
                      It's <span className="txt_bld">action</span> time, let's
                      dive straight in
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footerlandingpage />
    </>
  );
};

export default ContactusPre;
