import { React, useState, useEffect } from 'react';
import HeaderN from "../component/HeaderN";
import DbFooter from "../component/DbFooter"
import { Container, Row, Col } from "react-bootstrap";
import {
  Button,
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
// import usrLoginbg from "../assets/images/usrLoginbg.jpg"
import Form from 'react-bootstrap/Form';
// import Email from "../assets/images/mail.svg"
// import forgotrtimg from "../assets/images/forgotrtimg.svg";
import OtpInput from 'react-otp-input';
import timeout from "../assets/images/timeout.svg";
import user from "../assets/images/user.svg"
import lock from "../assets/images/sortIcons/lock.svg"
import eye from "../assets/images/sortIcons/custom.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Post } from '../services/user.services';
import { toast } from 'react-toastify';
import Loader from '../component/Loader';
import { isArray } from 'lodash';

const UserForgetPassword = () => {

  const localEmail = localStorage.getItem("Email")
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_Password] = useState("")
  const [visibility1, setVisibility1] = useState(false)
  const [visibility2, setVisibility2] = useState(false)
  const [loading, setLoading] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(300);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const ResetPassword = async (e) => {
    e.preventDefault()
    const obj = {
      otp: otp,
      email: localEmail,
      password: password
    }

    try {
      setLoading(true);
      if (password !== confirm_password) {
        // toast.error("Password Doesn't Match")
      }
      else {
      console.log("all error related to forget password")

        const resp = await Post(`auth/media/house/resetPassword`, obj)
         console.log("all error related to forget password",resp);

        if (resp) {
          // toast.success("Password Updated")
          localStorage.clear()
          navigate("/login")
          setLoading(false);
        }
      }
    } catch (error) {
      if(error?.response?.data?.errors?.msg){
        let errorMessage = error?.response?.data?.errors?.msg
        console.log("all error related to forget password error ----?>>>>>",error?.response?.data?.errors?.msg);
            if(Array.isArray(errorMessage)){
              toast.error(errorMessage[1].msg)

            }else{

              toast.error(error?.response?.data?.errors?.msg)
            }
      }
      setLoading(false);
    }
  }

  const RenewOTP = async (e) => {
    e.preventDefault()
    try{
      setLoading(true);
      console.log("all error related to forget password")

      const resp = await Post(`auth/media/house/forgotPassword`, { email: localEmail })
      console.log("all error related to forget resp",resp)

      if (resp) {
        toast.success("New OTP sent again")
        setTimeRemaining(300)
        setLoading(false);
      }
    }
    catch(error){
      console.log("all error related to forget password",error)

      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      // toast.error("OTP expired!!")
    }
  }, [timeRemaining]);

  return (
    <>
      <HeaderN />
      {
        loading && <Loader/>
      }
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success user_login_dtl">
            <Form onSubmit={ResetPassword}>
              <Row className="row-w-m m-0">
                <Col lg="6" className="bg-white p-0">
                  <div className="login_stepsWrap left-pdng forget_pass_wrap left-side cstm_ht">
                    <div className='onboardMain'>

                      <div className="onboardIntro sign_section border-bottom-0">
                        <h1 className="mb-0 position-relative">Reset your password</h1>

                        <div className="onboardStep b_border top_txt otp_inp_wrap">
                          <p>Please enter the 5 digit OTP received on your registered email address <span className='txt-success-link'><Link>{localEmail}</Link></span> </p>
                          <OtpInput
                            bg='grey'
                            value={otp}
                            // inputType="number"
                            onChange={setOtp}
                            numInputs={5}
                            renderInput={(props) => <input {...props} />}
                          />
                          <p className="otp_time"><img src={timeout} alt="timeout" /> The OTP will expire in {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes</p>
                          <p>
                            If you haven't received an OTP, please <span className='txt-success-link'><Link onClick={RenewOTP}>click here </Link></span>
                            for a fresh OTP. If you continue facing any problems, please <span className='txt-success-link'><Link to={"/contact-us"}>contact</Link></span> our experienced team who will be happy to assist. </p>
                          <p>Please choose a memorable password that is strong, and you don't have to write it down anywhere. Always remember, that you wouldn't share your ATM pin, so why would you share your password!!</p>
                        </div>
                      </div>
                      <div className='Forget_Password mt-4'>
                        <div className="inputs_wrap d-flex justify-content-between log_inputs">
                          <Form.Group className="position-relative" controlId="formBasicPassword">
                            <img src={lock} className="frnt_ic" alt="" />
                            <Form.Control type={!visibility1 ? 'password' : 'text'} autoComplete="off" className="rnd grey" placeholder="Choose new password" onChange={(e) => setPassword(e.target.value)} required />
                            {!visibility1 && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility1(true) }}><BsEyeSlash /></div>}
                            {visibility1 && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility1(false) }}><BsEye /></div>}
                            {/* <img className='view_pass' src={eye} alt="" /> */}
                          </Form.Group>
                          <Form.Group className="position-relative" controlId="formBasicPassword">
                            <img src={lock} className="frnt_ic" alt="" />
                            <Form.Control type={!visibility2 ? 'password' : 'text'} className="rnd grey" placeholder="Confirm password" autoComplete="off" onChange={(e) => setConfirm_Password(e.target.value)} required />
                            {!visibility2 && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility2(true) }}><BsEyeSlash /></div>}
                            {visibility2 && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility2(false) }}><BsEye /></div>}
                            {/* <img className='view_pass' src={eye} alt="" /> */}
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    <Col lg="12" className='forget_password_btn mb-5'>
                      <div className="stepFooter ">
                        <Button type="submit" className='w-100' variant='primary'>Submit</Button>
                      </div>
                    </Col>
                  </div>
                </Col>
                <Col lg="6" className="">
                  <div className="left-side">
                    <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721378348137forgotrtimg.svg"} className='w-100' alt="" />
                    <h2 className="mt-3 text-center">We are here to <span className='txt_bold'>help</span></h2>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Container >
      </div >
      <DbFooter />
    </>
  )
}

export default UserForgetPassword