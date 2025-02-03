import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from "../../component/HeaderN";
import loginimg from "../../assets/images/login-img.png";
import { Get, Post } from "../../services/user.services";
import { toast } from "react-toastify";
import user from "../../assets/images/user.svg";
import lock from "../../assets/images/sortIcons/lock.svg";
import eye from "../../assets/images/sortIcons/custom.svg";
import Footerlandingpage from "../../component/Footerlandingpage";
import { BsEyeSlash, BsEye, BsArrowLeft } from "react-icons/bs";
import PhoneInput from "react-phone-number-input";
import mail from "../../assets/images/mail.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import chairic from "../../assets/images/chair.svg";
import Header from "../../component/Header";
import DbFooter from "../../component/DbFooter";
import Loader from "../../component/Loader";
import callic from "../../assets/images/call.svg";
import contactimg from "../../assets/images/login-images/contact_us_post.png";
import { successToasterFun } from "../../component/commonFunction";

// import Form from 'react-bootstrap/Form';

const ContactusPost = () => {
  const [loading, setLoading] = useState(false);
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate()

  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    country_code: "",
    email: "",
    content: "",
    designation: "",
    is_urgent: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const Profile = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/getProfile`);
      // console.log(resp.data.profile, "<----------resp.data.profile")

      if (resp) {
        // console.log(resp, `<<<<<this is profile detail`)
        setLoading(false);
        setDetails({
          first_name: resp.data.profile.first_name,
          last_name: resp.data.profile.last_name,
          contact_number: resp.data.profile.phone,
          country_code: resp.data.profile.admin_detail.country_code,
          email: resp.data.profile.email,
          designation: resp.data.profile?.designation_id,
        });

        const list = await Get(`mediaHouse/getCategoryType?type=designation`);
        const designation = list.data.data.find(
          (desig) => desig._id === resp.data.profile?.designation_id
        );
        setDesignation(designation?.name);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const ContactUs = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!details?.content) {
      setLoading(false);
      toast.error("Message is required");
      return;
    }

    try {
      const resp = await Post(`mediaHouse/addCotactUs`, details);
      if (resp) {
        setLoading(false);
        setDetails({
          is_urgent: false,
          content: "",
        });
        successToasterFun("Thank you for contacting us.We will get back ASAP. Cheers!")
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    Profile();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="login-page contact_us_pst">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg="6" className="p-0">
                <div className="left-side bg-white cstm_ht">
                <Link className='back_link mb-2' onClick={() => window.history.back()}><BsArrowLeft className='text-pink' /> Back </Link>
                  <div className="pg_heading">
                    <h1>
                      <span className="txt_light">Hi, </span>
                      {details.first_name + " " + details.last_name}
                    </h1>
                  </div>
                  <div className="log_txt">
                    <Typography variant="body2">
                      Our helpful teams are available 24x7 to assist, and answer
                      your questions. You can choose to send us 
                      {" "}
                      {/* <a className="link">message</a>, an{" "} */}
                      an 
                      <a className="link"> email</a>, or simply{" "}
                      <Link to={"/chat"} className="link">chat</Link> with one of our live team
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
                            disabled
                            className="rnd"
                            value={details.first_name}
                            name="firstname"
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
                            disabled
                            className="rnd"
                            value={details.last_name}
                            name="lastname"
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="cnt_mb inputs_wrap d-flex justify-content-between log_inputs">
                      <div className="">
                        <label className="cmn_lbl">Designation</label>
                        <Form.Group
                          className="position-relative"
                          controlId="formBasicEmail"
                        >
                          <img
                            className="frnt_ic"
                            src={chairic}
                            alt="user icon"
                          />
                          <Form.Control
                            disabled
                            className="rnd"
                            value={capitalizeFirstLetter(designation)}
                            name="designation"
                          />
                        </Form.Group>
                      </div>
                      <div className="d-flex flex-column">
                        <label className="cmn_lbl mbl_nmb_lbl">
                          Mobile number
                        </label>
                        <div className="number_inp_wrap contct disabled">
                          <input
                            value={
                              details?.country_code +
                              " " +
                              details?.contact_number
                            }
                            name="phone"
                          />
                          <div className="call_ic">
                            <img src={callic} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Row>
                      <Col md={6}>
                        <div className="cnt_mb inputs_wrap d-flex justify-content-between log_inputs">
                          <div className="d-flex flex-column">
                            <label className="cmn_lbl">Email address</label>
                            <Form.Group className="form-group position-relative">
                              <img src={mail} alt="" className="frnt_ic" />
                              <Form.Control
                                disabled
                                type="text"
                                required
                                className=""
                                value={details.email}
                                placeholder="Enter email address"
                                name="office_email"
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="cnt_mb check">
                      <FormControlLabel
                        className="landing_checks"
                        control={<Checkbox />}
                        label="Please contact me urgently"
                        onChange={(e) => {
                          setDetails((prev) => ({
                            ...prev,
                            is_urgent: e.target.checked,
                            content: e.target.checked ? "URGENT  "  : ""
                          }));
                        }}
                        checked={details?.is_urgent}
                      />
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
                            required
                            placeholder="Enter message"
                            value={details?.content}
                            onChange={(e) => {
                              setDetails((prev) => ({
                                ...prev,
                                content: e.target.value,
                              }));
                            }}
                            rows={3}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    {/* <Button
                      variant=""
                      type="submit"
                      className="theme-btn custom-ab w-100 cntct_btn sm_btn"
                    >
                      Submit
                    </Button>
                    <div className="or_opt">
                      <span>or</span>
                    </div> */}
                    <div className="d-flex justify-content-between btm_btns mt-3">
                      <Button
                        variant=""
                        className="theme-btn custom-ab w-100 cntct_btn sm_btn"
                        onClick={() => {
                          localStorage.setItem("tabName", JSON.stringify("presshop"))
                          localStorage.setItem("contact_us_message", details.content)
                          navigate("/chat");
                        }}
                      >
                        Chat
                      </Button>
                      <Button
                        type="submit"
                        variant="secondary"
                        // className="w-100 cntct_btn sm_btn_blk"
                        className="theme-btn custom-ab w-100 cntct_btn sm_btn emal-btn"

                        onClick={(e) => ContactUs(e)}
                      >
                        Email us
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col lg="6 pos_stick">
                <div className="right-side position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <div className="">
                    <img src={contactimg} alt="" srcset="" className="rt_img" />
                  </div>
                  <div className="right_txt">
                    <p>
                      Our helpful teams are here to{" "}
                      <span className="txt_bld">assist</span>
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

export default ContactusPost;
