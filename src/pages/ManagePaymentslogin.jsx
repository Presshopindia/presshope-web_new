import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from '../component/HeaderN';
import loginimg from "../assets/images/login-images/manage_payment_methods.svg";
import { Post } from '../services/user.services';
import { toast } from 'react-toastify';
import user from "../assets/images/user.svg";
import lock from "../assets/images/sortIcons/lock.svg";
import eye from "../assets/images/sortIcons/custom.svg";
import Footerlandingpage from "../component/Footerlandingpage";
import { BsEyeSlash, BsEye, BsArrowLeft } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TopSearchesTipsCard from '../component/card/TopSearchesTipsCard';

const ManagePaymentslogin = () => {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [visibility, setVisibility] = useState(false)

    const Credentials = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const Submit = async (e) => {
        e.preventDefault()
        try {

            const auth = getAuth();
            const obj = {
                email: credentials.email,
                password: credentials.password
            }

            const resp = await Post("auth/loginMediaHouse", obj)
            if (resp.status === 200) {
                navigate("/manage-payment-method")
                // toast.success("Login Successfully")
                localStorage.setItem("token", resp.data.token)
                localStorage.setItem("id", resp.data.user._id)
                localStorage.setItem("user", JSON.stringify(resp.data.user))
                signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                    .then((userCredential) => {
                        // Signed in successfully
                        const user = userCredential.user;
                        // console.log(user, '<------------userCredential.user')
                    })
                    .catch((error) => {
                        // Handle errors here
                    });
            }
        }
        catch (error) {
            // toast.error(error.response.data.errors.msg)
        }
    }

    return (
        <>
            <HeaderN />
            <div className="login-page post_faq_pg">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0 position-relative">
                            <Col lg="6" className="p-0">
                                <div className="left-side bg-white cstm_ht">
                                    <Link className='back_link'><BsArrowLeft className='text-pink' onClick={() => window.history.back()} /> Back </Link>
                                    <div className="pg_heading">
                                        <h1>Manage payment methods</h1>
                                    </div>
                                    <div className="log_txt">
                                        <Typography variant="body2">
                                            Please view and update your preferred payment methods below.
                                        </Typography>
                                        <Typography variant="body2">
                                            Payment methods can <span className="txt_mdm">only</span> be updated, and changed by the company administrator for safety and security reasons</Typography>
                                        <Typography variant="body2" className="mb-0">
                                            If you face any trouble, please <a href="/contact-us" className="link">contact</a> our experienced team who are available 24x7, 365 days of the year, to help and assist. Thank you
                                        </Typography>
                                    </div>

                                    <div className="mng_pmnt_loginputs">
                                        <p className='pg_sub_hdng'>Enter administrator password to proceed</p>
                                        <Form onSubmit={Submit}>
                                            <div className="inputs_wrap d-flex justify-content-between log_inputs">
                                                <Row>
                                                    <Col md={6}>

                                                        <Form.Group className="position-relative" controlId="formBasicPassword">
                                                            <img src={lock} className="frnt_ic" alt="" />
                                                            <Form.Control type={!visibility ? 'password' : 'text'} required className="rnd grey" placeholder="Enter password *" value={credentials.password} name='password' onChange={Credentials} />
                                                            {!visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(true) }}><BsEyeSlash /></div>}
                                                            {visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(false) }}><BsEye /></div>}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="position-relative" controlId="formBasicPassword">
                                                            <img src={lock} className="frnt_ic" alt="" />
                                                            <Form.Control type={!visibility ? 'password' : 'text'} required className="rnd grey" placeholder="Confirm password *" value={credentials.password} name='password' onChange={Credentials} />
                                                            {!visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(true) }}><BsEyeSlash /></div>}
                                                            {visibility && <div color='#000' className="pass_ic_wrap" onClick={() => { setVisibility(false) }}><BsEye /></div>}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Button variant="" type="submit" className="theme-btn custom-ab mb-4 w-100 sm_btn">
                                                <span>
                                                    Submit
                                                </span>
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6 pos_stick">
                                <div className="right-side position-relative">
                                    <div className="tri"></div>
                                    <div className="circle"></div>
                                    <div className="big_circle"></div>
                                    <div className="">
                                        <img src={loginimg} alt="" />
                                    </div>
                                    <div className="right_txt">
                                        <p>Payments made <span className="txt_bld">safe & easy</span> with Stripe</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div >
                </Container >
            </div >
            <Footerlandingpage />
        </>
    )
}

export default ManagePaymentslogin