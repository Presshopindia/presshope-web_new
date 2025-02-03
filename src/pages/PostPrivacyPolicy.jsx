import React, { useEffect, useState } from 'react';
import DbFooter from '../component/DbFooter';
import { Container, Row, Col } from "react-bootstrap";
import tandcimg from "../assets/images/login-images/post_tandc.png";
import { Button, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import Header from '../component/Header';
import { BsArrowLeft } from 'react-icons/bs';
import { Get } from '../services/user.services';
import moment from 'moment/moment';
import html2pdf from 'html2pdf.js';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';

const PostPrivacyPolicy = () => {

    const [privacy, setPrivacy] = useState()

    useEffect(() => {
        window?.scrollTo(0, 0);
    }, []);

    const PrivacyPolicy = async () => {
        const resp = await Get(`mediaHouse/getGenralMgmt?privacy_policy=privacy_policy`)
        setPrivacy(resp.data.status)
        // console.log(resp, "<-----------mediaHouse/getGenralMgmt?privacy_policy=privacy_policy")
    }

    const handlePrintClick = () => {
        const printContent = document.getElementById('print-content');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
        document.body.appendChild(iframe);
        const iframeWindow = iframe.contentWindow;
        const printWindow = iframeWindow || iframe.contentDocument || iframe;

        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        document.body.removeChild(iframe);
    };

    const handlePdfDownloadClick = () => {
        const printContent = document.getElementById('print-content');
        html2pdf()
            .set({
                margin: [10, 10],
                filename: 'Presshop Privacy Policy.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            })
            .from(printContent)
            .save();
    };

    useEffect(() => {
        PrivacyPolicy()
    }, [])

    return (
        <>
            <Header />
            <div className="page-wrap login-page p-0 post-tandc_page">
                <Container fluid className="pdng">
                    <div className="log-wrap">
                        <Row className="row-w-m m-0">
                            <Col lg="6" className="bg-white p-0">
                                <div className="login_stepsWrap left-pdng post_lgn">
                                    <Link className='back_link' onClick={() => window.history.back()}><BsArrowLeft className='text-pink' /> Back </Link>
                                    <div className='onboardMain' id="print-content">
                                        <div className="onboardIntro sign_section post">
                                            <div className='d-flex justify-content-between'>
                                                <h1 className="mb-0 pg_hdng">Privacy Policy</h1>
                                                <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, document.body.scrollHeight)}><FaRegArrowAltCircleDown className='text-pink' /></Link></Tooltip>
                                            </div>
                                            <span className="txt_updated">Updated on {moment(privacy?.updatedAt).format("DD MMMM, YYYY")}</span>
                                            <div className="onboardStep b_border top_txt">
                                                <p>Please find our privacy policy listed below. If you have any questions, and would like to have a quick chat have with our helpful team members, kindly <Link className="link" to={"/contact-us-post"}> contact us</Link>. Thanks!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="onboardStep upload_docs">
                                            <div className="onboardStep b_border top_txt mb-4">
                                                <div className="txt_tandc" dangerouslySetInnerHTML={{ __html: privacy?.description }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between tandc_btns">
                                        <Button className='w-100' variant='secondary' onClick={handlePdfDownloadClick}>Download</Button>
                                        <Button className='w-100 theme_btn' variant='primary' onClick={handlePrintClick}>Print</Button>
                                        <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, 0)}><FaRegArrowAltCircleUp className='text-pink' /></Link></Tooltip>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className="">
                                <div className="right-side text-center position-relative">
                                    <div className="tri"></div>
                                    <div className="circle"></div>
                                    <div className="big_circle"></div>
                                    <img src={tandcimg} alt="" className="rt_img_bg" />
                                    <h2>Source <span className="txt_bld">authentic content</span> from millions of users</h2>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container >
            </div >
            <DbFooter />
        </>
    )
}

export default PostPrivacyPolicy
