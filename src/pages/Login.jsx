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
      const auth = getAuth();
      const obj = {
        email: credentials.email,
        password: credentials.password,
      };

      const resp = await Post("auth/loginMediaHouse", obj);
      // return
      if (resp) {
        setLoading(false);
        navigate("/dashboard/exclusive");
        // toast.success("Login Successfully")

        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("id", resp.data.user._id);
        localStorage.setItem("user", JSON.stringify(resp.data.user));

        window.location.reload();

        signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        )
          .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
          })

          .catch((error) => {
            // Handle errors here
          });
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

  // console.log(localStorage.getItem("DeviceToken"), "token")

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
    // socket.disconnect();
  }, []);

  // const scrollToDiv = (divName) => {
  //   targetRefs[divName].current.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      {/* <HeaderN scrollToDiv={scrollToDiv}/> */}
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
                      <h1 className="mb-0 position-relative">Welcome{fullName ? `, ${fullName}` : null}
                        {
                          fullName ? (<Badge className='admin_badge' text="dark">
                            Admin
                          </Badge>
                        ) : null
                      }
                      </h1>

                      <div className="onboardStep b_border top_txt">
                        <p>Congratulations, your onboarding process is now fully
                          complete. You are now part of our growing publications
                          community around the UK, and soon the rest of the World.
                        </p>
                        <p>
                          Please enter your email and password below to gain
                          access onto our marketplace platform. If you have
                          forgotten your password, please{" "}
                          <Link to="/User-Forget-Password" className="link">
                            click here
                          </Link>{" "}
                          and we will help create a new password for you. This
                          happens to most of us, and is absolutely fine.
                        </p>
                        <p>
                          If you face any trouble logging in, please{" "}
                          <Link to="/contact-us" className="link">
                            contact
                          </Link>{" "}
                          our helpful team members who will be happy to assist. See
                          you on the other side. Cheers!
                        </p>
                      </div>
                    </div>
                    <Col lg="12">
                      <Form>
                        <div className="inputs_wrap d-flex justify-content-between log_inputs">
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
                              placeholder="Enter registered email id *"
                              value={credentials.email}
                              name="email"
                              onChange={Credentials}
                            />
                          </Form.Group>
                          <Form.Group
                            className="position-relative"
                            controlId="formBasicPassword"
                          >
                            <img src={lock} className="frnt_ic" alt="" />
                            <Form.Control
                              type={!visibility ? "password" : "text"}
                              required
                              className="rnd grey"
                              autoComplete="off"
                              placeholder="Enter password *"
                              value={credentials.password}
                              name="password"
                              onChange={Credentials}
                            />
                            {!visibility && (
                              <div
                                color="#000"
                                className="pass_ic_wrap"
                                onClick={() => {
                                  setVisibility(true);
                                }}
                              >
                                <BsEyeSlash />
                              </div>
                            )}
                            {visibility && (
                              <div
                                color="#000"
                                className="pass_ic_wrap"
                                onClick={() => {
                                  setVisibility(false);
                                }}
                              >
                                <BsEye />
                              </div>
                            )}
                          </Form.Group>

                          {/* <Form.Control type="password" required className="rnd grey" placeholder="Password" value={credentials.password} name='password' onChange={Credentials} /> */}

                          {/* <Form>
                                                    <div className="inputs_wrap d-flex justify-content-between log_inputs">
                                                        <Form.Group className="position-relative" controlId="formBasicEmail">
                                                            <img className="frnt_ic" src={user} alt="user icon" />
                                                            <Form.Control type="email" className="rnd grey" placeholder="Enter email" />
                                                        </Form.Group>
                                                        <Form.Group className="position-relative" controlId="formBasicPassword">
                                                            <img src={lock} className="frnt_ic" alt="" />
                                                            <Form.Control type="password" className="rnd grey" placeholder="Password" />
                                                            <img className='view_pass' src={eye} alt="" />
                                            </Form.Group> */}
                        </div>
                        <Form.Group
                          className="mb-4 mt-1 d-flex justify-content-end"
                          controlId="formBasicCheckbox"
                        >
                          <Link to={"/User-Forget-Password"} className="link">
                            {" "}
                            Forgot Password?
                          </Link>
                        </Form.Group>
                        <Button
                          variant=""
                          className="theme-btn custom-ab mb-4 w-100 sm_btn"
                          onClick={async (e) => {
                            await Submit(e);
                            await AddFirebaseMessaging();
                          }}
                        >
                          <span>Log In</span>
                        </Button>
                        <Form.Group
                          className="mb-4 mt-0 d-flex justify-content-end sign_link_wrp"
                          controlId="formBasicCheckbox"
                        >
                          <Link to={"/onboard"} className="link"> New User?</Link>
                        </Form.Group>
                      </Form>
                    </Col>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="">
                <div className="left-side">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <div className="">
                    <img src={loginimg} className="rt_bg_img" />
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
        </Container >
      </div >
      <Footerlandingpage />
    </>
  );
};

export default Login;
