import React, { useState } from "react";
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import usrLoginbg from "../assets/images/usrLoginbg.jpg";
import Form from "react-bootstrap/Form";
import Email from "../assets/images/mail.svg";
// import forgotrtimg from "../assets/images/forgotrtimg.svg";
import { Post } from "../services/user.services";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import LoginHeader from "../component/LoginHeader";

const UserForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const ForgotPassword = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const resp = await Post(`auth/media/house/forgotPassword`, {
        email: email,
      });
  
      if (resp) {
        localStorage.setItem("Email", email);
        navigate("/User-reset-Password");
        // toast.success("OTP sent successfully")
        setLoading(false);
      }
    }
    catch(error){
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* <HeaderN /> */}
      <LoginHeader />

      {
        loading && <Loader/>
      }
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success user_login_dtl">
            <form onSubmit={ForgotPassword}>
              <Row className="row-w-m m-0">
                <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                  <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721378348137forgotrtimg.svg"} alt="" className="resp_bg" />
                  <div className="login_stepsWrap left-pdng forget_pass_wrap left-side cstm_ht bg-white">
                    <div className="onboardMain">
                      <div className="onboardIntro sign_section border-bottom-0 ">
                        <div className="pg_heading">
                          <h1 className="mb-0 position-relative frgt_hdng">
                            Forgot your password?
                          </h1>
                        </div>

                        <div className="onboardStep b_border top_txt">
                          <p>
                            Please enter your registered email address below,
                            and we will send you a link to reset your password.
                          </p>
                          <p>
                            If you haven't forgotten your password, you don't
                            have to do anything. Simply use the top menu bar to
                            navigate, or{" "}
                            <span className="txt-success-link">
                              <Link to="/login">click here</Link>{" "}
                            </span>{" "}
                            to go home
                          </p>
                          <p>
                            Always remember, that your password is like your
                            toothbrush. Never share it with anyone!
                          </p>
                        </div>
                      </div>
                      <div className="Forget_Password mt-4">
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          className="p-0 mb-2"
                        >
                          <div className="d-flex justify-content-start">
                            <Form.Group
                              className="form-group forgot_inp"
                              controlId="formBasicEmail"
                            >
                              <img
                                className="inp_img"
                                src={Email}
                                alt="user icon"
                              />
                              <Form.Control
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter registered email address *"
                              />
                            </Form.Group>
                          </div>
                        </Col>
                      </div>
                    </div>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className="forget_password_btn mb-5"
                    >
                      <div className="stepFooter ">
                        {/* <Link to=''> */}
                        <Button
                          type="submit"
                          className="w-100"
                          variant="primary"
                        >
                          Submit
                        </Button>
                        {/* </Link> */}
                      </div>
                    </Col>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className="rt_col">
                  <div className="left-side right-side position-relative">
                    <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721378348137forgotrtimg.svg"} className="w-100" alt="" />
                    <div className="tri"></div>
                    <div className="circle"></div>
                    <div className="big_circle"></div>
                    <h2 className="mt-3 text-center">
                      <span className="txt_bold">No worries, </span> we got you!
                    </h2>
                  </div>
                  {/* <div className="right-side position-relative">
                    <div className="">
                      <img src={loginimg} className="rt_bg_img" />
                    </div>
                    <div className="right_txt">
                      <p>
                        <span className="txt_bld">No worries,</span> time, let's
                        dive straight in
                      </p>
                    </div>
                  </div> */}
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default UserForgetPassword;
