import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
// import HeaderN from "../component/HeaderN";
import loginimg from "../assets/images/login-img.png";
import { Post } from "../services/user.services";
import { toast } from "react-toastify";
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
import eye from "../assets/images/sortIcons/custom.svg";
import Footerlandingpage from "../component/Footerlandingpage";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Loader from "../component/Loader";
import { useDarkMode } from "../context/DarkModeContext";
import LoginHeader from "../component/LoginHeader";
//import io from "socket.io-client";
//const socket = io.connect("https://betazone.promaticstechnologies.com:3005");

const Login = () => {
  const [deviceId, setDeviceId] = useState("");
  const navigate = useNavigate();
  const location=useLocation();
  console.log("all location ---->",location);
  const queryParams = new URLSearchParams(location.search); 
  const emailIdAdmin = queryParams.get("emailId");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
 if(emailIdAdmin){    setCredentials((old) => {
  return { ...old, email: emailIdAdmin };
});}
  const { setProfileChange } = useDarkMode();

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


      console.log("response bakend ----->", resp)
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
            // console.log(user, "<------------userCredential.user");
          })

          .catch((error) => {
            // Handle errors here
          });
      }
    } catch (error) {
      console.log("error?.response?.data?.errors?.msg",error?.response)
      if(error?.response?.data?.msg){
        toast.error(error?.response?.data?.msg);
      }else{
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
      <div className="login-page">
        <Container fluid className="pdng">
          <div className="log-wrap">
            <Row className="row-w-m m-0 position-relative">
              <Col lg={6} md={6} sm={12} xs={12} className="p-0 lft_colm">
                <img src={loginimg} alt="" className="resp_bg" />
                <div className="left-side bg-white cstm_ht">
                  <div className="pg_heading">
                    <h1>Welcome</h1>
                  </div>
                  <div className="log_txt">
                    <Typography variant="body2">
                      Congratulations, your onboarding process is now fully
                      complete. You are now part of our growing publications
                      community around the UK, and soon the rest of the World.
                    </Typography>
                    <Typography variant="body2">
                      Please enter your email and password below to gain
                      access onto our marketplace platform. If you have
                      forgotten your password, please{" "}
                      <Link to="/User-Forget-Password" className="link">
                        click here
                      </Link>{" "}
                      and we will help create a new password for you. This
                      happens to most of us, and is absolutely fine.
                    </Typography>
                    <Typography variant="body2" className="mb-0">
                      If you face any trouble logging in, please{" "}
                      <Link to="/contact-us" className="link">
                        contact
                      </Link>{" "}
                      our helpful team members who will be happy to assist. See
                      you on the other side. Cheers!
                    </Typography>
                  </div>

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
                      <a className="frgt-ps link">
                        <Link to={"/User-Forget-Password"}>
                          {" "}
                          Forgot Password?
                        </Link>
                      </a>
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
                      <a className="frgt-ps link">
                        <Link to={"/onboard"}> New User?</Link>
                      </a>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12} className="pos_stick rt_col">
                <div className="right-side position-relative">
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
        </Container>
      </div>
      <Footerlandingpage />
    </>
  );
};

export default Login;
