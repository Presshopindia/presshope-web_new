import { React, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HeaderN from '../component/HeaderN';
// import loginimg from "../assets/images/login-images/onbrdimg.svg";
import { Checkbox, FormControlLabel, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Footerlandingpage from '../component/Footerlandingpage';
import user from "../assets/images/user.svg";
import mail from "../assets/images/mail.svg";


const OnboardUserN = () => {

    const [modalShow, setModalShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false)
    const [submit, setSubmit] = useState(false)

    return (
        <>
            <HeaderN />
            <div className="login-page sign">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0">
                            <Col lg="6" className="p-0">
                                <div className="left-side bg-white cstm_ht">
                                    <div className="pg_heading">
                                        <h1>Onboard now</h1>
                                    </div>
                                    <div className="log_txt">
                                        <Typography variant="body2 mb-0">
                                            Join our growing tribe, and connect directly with the people. Please add your company, offices, and employee details to register
                                        </Typography>
                                    </div>
                                    <Form>
                                        <div className="walkthr_wrap txt_wrap d-flex align-items-start position-relative">
                                            {submit && !isChecked && < span className='req_inp' style={{ "color": "red" }}>*</span>}
                                            <FormControlLabel className='onbrd_chk' control={<Checkbox />}
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    setIsChecked(e.target.checked)
                                                }}
                                            />
                                            <div className="onboardText log_txt no_border">
                                                <Typography>Are you the administrator? If yes, please check the box to proceed ahead
                                                </Typography>
                                                <Typography variant="body2">
                                                    If you are not the administrator, please enter your details below, and send your onboarding request to your company administrator. Once the administrator onboards, and assigns user rights to you, you can then log onto the <b>presshop</b> platform
                                                </Typography>
                                                <Typography variant="body2" className="mb-0">
                                                    If you have any questions regarding the onboarding process, please <a className="link">chat</a> with our helpful team members, or send us an <a className="link">email</a>
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="adminDetails onboardStep onb_flds sign_section">
                                            <p className='onbrdheading sign_hdng'>User details</p>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4 form-group">
                                                        <img src={user} alt="" />
                                                        <Form.Control type="text" className="" placeholder='Enter first name' name='first_name' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4 form-group">
                                                        <img src={user} alt="" />
                                                        <Form.Control type="text" className="" placeholder='Enter last name' name='last_name' />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className='admn_eml_wrp'>
                                                    <Form.Group className="form-group position-relative w-100">
                                                        <img src={mail} className='eml_inp_icn' alt="" />
                                                        <Form.Control type="email" required className="" placeholder="Enter email id" name='usr_email'
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>

                                        <Button variant="" className="theme-btn theme_btn custom-ab mb-4 w-100">
                                            <span>Onboard Me</span>
                                        </Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="right-side position-relative">
                                    <span className="shape yl_sqr pos-abs"></span>
                                    <span className="shape bl_crcl pos_abs"></span>
                                    <span className='shape gr_tri pos_abs'></span>
                                    <span className='shape rd_crcl pos_abs'></span>
                                    <div className="">
                                        <img src={"https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/1721377753819onbrdimg.svg"} alt="" srcset="" />
                                    </div>
                                    <div className="right_txt">
                                        <p>Let's start delivering  <span className="txt_bld">news</span>
                                        </p>
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

export default OnboardUserN