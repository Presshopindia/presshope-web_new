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
import { MdAdd } from 'react-icons/md';
import barclays from '../assets/images/bankLogos/Barclays.png';
import lloyds from '../assets/images/bankLogos/lloyds.svg';
import { FiEdit, FiX } from "react-icons/fi";
import debitL from '../assets/images/bankLogos/debitL.png';
import debitM from '../assets/images/bankLogos/debitM.png';


const ManagePaymentMethod = () => {

    return (
        <>
            <HeaderN />
            <div className="login-page post_faq_pg">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0 position-relative">
                            <Col lg="6" className="p-0">
                                <div className="left-side bg-white cstm_ht">
                                    <Link className='back_link'><BsArrowLeft className='text-pink' /> Back </Link>
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


                                    <div className="transactionList mng_pmnt">
                                        <div className="allBanks log_txt">
                                            <div className="statChartHead align-items-center">
                                                <p className='pg_sub_hdng mb-0'>Banks</p>
                                                <Button variant='primary'><MdAdd className='addFont' /> Add bank</Button>
                                            </div>
                                            <div className="bank_card">
                                                <div className="bankInfo_wrap">
                                                    <img className='bankLogo' src={barclays} alt="" />
                                                    <div className="bankInfo d-flex flex-column">
                                                        <h5 className='addedBank'>Barclays Bank</h5>
                                                        <small className='bankLocatn'>Mayfair, London</small>
                                                    </div>
                                                </div>
                                                <span className='defaultTag'>Default</span>
                                            </div>
                                            <div className="bank_card">
                                                <div className="bankInfo_wrap">
                                                    <img className='bankLogo' src={lloyds} alt="" />
                                                    <div className="bankInfo d-flex flex-column">
                                                        <h5 className='addedBank'>Lloyds Bank</h5>
                                                        <small className='bankLocatn'>Thorn Apple street, London</small>
                                                    </div>
                                                </div>
                                                <div className="bankActions">
                                                    <span className='editBank me-2'>
                                                        <FiEdit />
                                                    </span>
                                                    <span className='removeBank'>
                                                        <FiX />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="allCards log_txt">
                                            <div className="statChartHead align-items-center">
                                                <p className='pg_sub_hdng mb-0'>Cards</p>
                                                <Button variant='primary'><MdAdd className='addFont' /> Add card</Button>
                                            </div>
                                            <div className="debitCard_wrap">
                                                <Row className='justify-content-between'>
                                                    <Col md={4}>
                                                        <img className='dbt_card' src={debitL} alt="" />
                                                    </Col>
                                                    <Col md={4}>
                                                        <img className='dbt_card' src={debitM} alt="" />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="allBanks ">
                                            <div className="statChartHead align-items-center">
                                                <p className='pg_sub_hdng mb-0'>Wallets</p>
                                                <Button variant='primary'><MdAdd className='addFont' /> Add wallet</Button>
                                            </div>
                                            <div className="bank_card">
                                                <div className="bankInfo_wrap">
                                                    <img className='bankLogo' src={barclays} alt="" />
                                                    <div className="bankInfo d-flex flex-column">
                                                        <h5 className='addedBank'>Google pay</h5>
                                                        <small className='bankLocatn'>ID  237634872</small>
                                                    </div>
                                                </div>
                                                <span className='defaultTag'>Default</span>
                                            </div>
                                            <div className="bank_card">
                                                <div className="bankInfo_wrap">
                                                    <img className='bankLogo' src={lloyds} alt="" />
                                                    <div className="bankInfo d-flex flex-column">
                                                        <h5 className='addedBank'>Apple pay</h5>
                                                        <small className='bankLocatn'>ID 783293479</small>
                                                    </div>
                                                </div>
                                                <div className="bankActions">
                                                    <span className='editBank me-2'>
                                                        <FiEdit />
                                                    </span>
                                                    <span className='removeBank'>
                                                        <FiX />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bank_card">
                                                <div className="bankInfo_wrap">
                                                    <img className='bankLogo' src={lloyds} alt="" />
                                                    <div className="bankInfo d-flex flex-column">
                                                        <h5 className='addedBank'>Microsoft pay</h5>
                                                        <small className='bankLocatn'>ID 783293479</small>
                                                    </div>
                                                </div>
                                                <div className="bankActions">
                                                    <span className='editBank me-2'>
                                                        <FiEdit />
                                                    </span>
                                                    <span className='removeBank'>
                                                        <FiX />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <Button variant="" type="submit" className="theme-btn custom-ab mb-4 w-100 sm_btn">
                                            <span>
                                                Save
                                            </span>
                                        </Button>




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

export default ManagePaymentMethod