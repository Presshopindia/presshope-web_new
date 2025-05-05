import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import loginimg from "../assets/images/login-img.png";
import { Post } from "../services/user.services";
import { toast } from "react-toastify";
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
import Footerlandingpage from "../component/Footerlandingpage";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Loader from "../component/Loader";
import LoginHeader from "../component/LoginHeader";

const Login = () => {
  const [deviceId, setDeviceId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const fullName = queryParams.get("fullName") || "";

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email,
    password: "",
  });

  const [visibility, setVisibility] = useState(false);
  const Credentials = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let storedDeviceId = localStorage.getItem("deviceId");

    if (!storedDeviceId) {
      storedDeviceId = uuidv4();
      localStorage.setItem("deviceId", storedDeviceId);
    }

    setDeviceId(storedDeviceId);
  }, []);

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const obj = {
        email: credentials.email,
        password: "test@123456",
        userType: "demo"
      };

      const resp = await Post("auth/loginMediaHouse", obj);
      if (resp) {
        setLoading(false);
        navigate("/dashboard/exclusive");
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("id", resp.data.user._id);
        localStorage.setItem("user", JSON.stringify(resp.data.user));

        window.location.reload();

      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error(error?.response?.data?.errors?.msg.split("_").join(" "));
      }
      setLoading(false);
    }
  };

  const AddFirebaseMessaging = async () => {
    const formdata = new FormData();
    formdata.append("device_token", localStorage.getItem("DeviceToken"));
    formdata.append("type", "web");
    formdata.append("device_id", deviceId);
    if (localStorage.getItem("DeviceToken")) {
      try {
        const resp = await Post("mediaHouse/addFcmToken", formdata);
        // console.log("resp", resp);
      } catch (error) {
        // console.log(error);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LoginHeader />
      {loading && <Loader />}
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success">
            <Row className="row-w-m m-0">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className='onboardMain'>

                    <div className="onboardIntro sign_section border-bottom-0">
                      <h1 className="mb-0 position-relative">The Scoop’s Waiting</h1>

                      <div className="onboardStep b_border top_txt">
                        <p>
                          Welcome to PressHop — the home of real stories, told in real time.


                        </p>
                        <p>
                          Pop in your official email id below to jump into the demo and explore what the buzz is all about.


                        </p>
                        <p>
                          This access lasts for 5 days only.
                          Feel free to share it with your colleagues while it’s active.
                          Need more time? Just drop us a line at hello@presshop.co.uk and we’ll gladly sort you out with a fresh link.
                        </p>
                      </div>
                    </div>
                    <Col lg="12">
                      <Form>
                        <div className="inputs_wrap d-flex justify-content-between log_inputs mb-4">
                          <Form.Group
                            className="position-relative"
                            controlId="formBasicEmail"
                          >
                            <img className="frnt_ic" src={user} alt="user icon" />

                            <Form.Control
                              type="email"
                              required
                              autoComplete="off"
                              className="rnd grey"
                              placeholder="Enter your email id *"
                              value={credentials.email}
                              name="email"
                              onChange={Credentials}
                            />
                          </Form.Group>
                        </div>
                        <Button
                          variant=""
                          className="theme-btn custom-ab w-100 sm_btn"
                          onClick={async (e) => {
                            await Submit(e);
                            await AddFirebaseMessaging();
                          }}
                        >
                          <span>Log in</span>
                        </Button>
                      </Form>
                    </Col>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="">
                <div className="left-side">
                  <span className="shape gr_tri pos_abs"></span>
                  <span className="shape yl_sqr pos-abs"></span>
                  <span className="shape rd_crcl pos_abs"></span>
                  <div className="px-3 pt-3">
                    <img src={loginimg} className="rt_bg_img" />
                  </div>
                  <div className="right_txt ps-3">
                    <p>
                      *The <span className="news-w-text">news won’t</span> wait. Neither should you

                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container >
      </div >
      <Footerlandingpage />
    </>
  );
};

export default Login;
