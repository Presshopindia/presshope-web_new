import React, { useEffect, useState } from 'react';
import DbFooter from "../../component/DbFooter";
import { Container, Row, Col } from "react-bootstrap";
import tandcimg from "../../assets/images/tandcimg.png";
import { Button, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import Header from '../../component/Header';
import { BsArrowLeft } from 'react-icons/bs';
import html2pdf from 'html2pdf.js';
import Loader from '../../component/Loader';
import { Get } from '../../services/user.services';
import moment from 'moment';
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';

const PostTandc = () => {

    const [loading, setLoading] = useState(false);
    const [cmsData, setCmsData] = useState("");

    useEffect(() => {
        window?.scrollTo(0, 0);
    }, []);

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
                margin: [4, 10],
                filename: 'Presshop Terms & Conditions.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            })
            .from(printContent)
            .save();
    };

    const getCMS = async () => {
        try {
            setLoading(true);
            const cms = await Promise.all([Get("mediaHouse/getGenralMgmt?legal=legal")]);
            //   console.log('cms---', cms)
            setCmsData(cms);
            setLoading(false);
        }
        catch (error) {
            //   console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCMS();
    }, [])

    //   , Get("mediaHouse/getGenralMgmt?privacy_policy=privacy_policy")

    return (
        <>
            {
                loading && <Loader />
            }
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
                                                <h1 className="mb-0 pg_hdng">Legal T&Cs</h1>
                                                <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, document.body.scrollHeight)}><FaRegArrowAltCircleDown className='text-pink' /></Link></Tooltip>
                                            </div>
                                            <span className="txt_updated">Updated on {moment(cmsData?.[0]?.data?.updatedAt)?.format("DD MMMM, YYYY")}</span>
                                            <div className="onboardStep b_border top_txt">
                                                <p>Please read and accept our legal terms & conditions  and content licensing agreement to proceed.</p>
                                                {/* <p>If you have any questions, and would like to have a quick chat have with our helpful team members, kindly <a className="link"> contact us</a>. Thanks!
                                                </p> */}
                                            </div>
                                        </div>
                                        {/* <div className="onboardStep upload_docs">
                                            <div className="onboardStep b_border top_txt tandc_txt mb-4">
                                                <p className="sub_h">Terms and Conditions</p>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h mb-3">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h mb-3">What & Why</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="onboardStep b_border top_txt mb-4">
                                                <p className="sub_h">Content licensing</p>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h">What & Why</p>
                                                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                                <div className="txt_tandc">
                                                    <p className="sub_sub_h mb-3">What & Why</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className='onboardMain' id="print-content" dangerouslySetInnerHTML={{ __html: cmsData[0]?.data?.status?.description || "" }}>
                                    </div>
                                    <div className="d-flex justify-content-between tandc_btns">
                                        <Button className='w-100' variant='secondary' onClick={handlePdfDownloadClick}>Download</Button>
                                        <Button className='w-100 theme_btn' variant='primary' onClick={handlePrintClick}>Print</Button>
                                        <Tooltip title="Down"><Link className='back_link' onClick={() => window.scrollTo(0, 0)}><FaRegArrowAltCircleUp className='text-pink' /></Link></Tooltip>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className="">
                                <div className="left-side right-side text-center position-relative">
                                    <div className="tri"></div>
                                    <div className="circle"></div>
                                    <div className="big_circle"></div>
                                    <img src={tandcimg} alt="" />
                                    <h2>View, chat, negotiate, and buy <span className="txt_bld">content</span> instantly</h2>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            <DbFooter />
        </>
    )
}

export default PostTandc
