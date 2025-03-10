import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Row } from "react-bootstrap";
import HeaderN from "../component/HeaderN";
// import 'react-phone-number-input/style.css';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from "react-router-dom";
import obSuccess from "../assets/images/obsuccess.jpg";

import ReactPlayer from 'react-player';
import videothum from "../assets/images/vthumbnail.png";
import videothum2 from "../assets/images/vthumnail2.png";
import Footerlandingpage from '../component/Footerlandingpage';
import { Get } from '../services/user.services';
import LoginHeader from '../component/LoginHeader';


const Success = () => {

  const AdminDetails = JSON.parse(localStorage.getItem("OnboardDetails"))

  const [tutorials, setTutorials] = useState()

  const GetTutorials = async () => {
    const resp = await Get(`mediaHouse/getGenralMgmt?videos=videos`)
    // console.log(resp, "<--------resp")
    setTutorials(resp.data.status)
  }

  useEffect(() => {
    GetTutorials()
  }, [])

  return (
    <>
      {/* {console.log(AdminDetails, ",---------AdminDetails")} */}
      {/* <HeaderN /> */}
      {/* <HeaderN scrollToDiv={scrollToDiv} activeHeader={activeHeader} Navigate={navigate}/> */}
      <LoginHeader />


      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success">
            <Row className="row-w-m m-0">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className='onboardMain'>

                    <div className="onboardIntro sign_section border-bottom-0">
                      <h1 className="mb-0 position-relative">Thanks, {AdminDetails?.AdminName ? AdminDetails?.AdminName : ""}
                        <Badge className='admin_badge' text="dark">
                          Admin
                        </Badge>{' '}</h1>

                      <div className="onboardStep b_border top_txt">
                        <p>Thank you for completing your onboarding as an administrator with <span className='txt-success'>PressHop.</span> Please check your official inbox for our verification email sent on <span className='txt-success-link'><Link>{AdminDetails?.AdminEmail ? AdminDetails?.AdminEmail : ""}.</Link></span> Click the link to activate your free account, and let's jump straight in to explore our marketplace.</p>
                        <p>You can view our <span className='txt-success-link'><Link to={"/all-tutorials"}>online tutorials</Link></span> to experience the amazing features of our marketplace, or check out our <span className='txt-success-link'><Link to={"/faq-post"}>FAQs</Link></span> for any questions that you may have. Additionally, you can send an <span className='txt-success-link'><Link to={"mailto:presshop@mailinator.com"}>email</Link></span>  if you have any questions. We are available 24x7 to assist. Cheers!</p>
                        {/* <p>If you still haven't still received our activation email, please <span className='txt-success-link'><Link>click here</Link></span> to resend another mail. If you continue facing any further problems, please contact us, and we will take care of this right away for you. Thanks! </p> */}
                      </div>
                    </div>
                    <div className='onboardIntro_success_info border-0'>
                      <Row className='row-w-m m-0 justify-content-between'>
                        <Col lg={5} className='bg-white p-0 ' >
                          <div className="player-wrapper player-wrapper ttr_vd_item">
                            <ReactPlayer
                              className='react-player'
                              url={tutorials && tutorials[0]?.video}
                              width='100%'
                              height='100%'
                              controls
                              poster={videothum}
                            />
                          </div>
                        </Col>
                        <Col lg={5} className='bg-white p-0'>
                          <div className="player-wrapper player-wrapper ttr_vd_item">
                            <ReactPlayer
                              className='react-player'
                              url={tutorials && tutorials[1]?.video}
                              width='100%'
                              height='100%'
                              controls
                              poster={videothum2}
                            />
                          </div>
                        </Col>
                      </Row>

                    </div>
                    <Col lg="12">
                      <div className='dashCard-heading d-flex justify-content-end'>
                        <Link className="view-all" to={'/all-tutorials'}> View all <BsArrowRight className='text-danger ms-1' /> </Link>
                      </div>
                    </Col>

                    {/* <div className="stepFooter d-flex justify-content-evenly">
                                                <Button onClick={handleBack}>Back</Button>
                                                <Button className='' variant='primary' onClick={handleNext}>Next</Button>
                                            </div> */}
                  </div>
                </div>
              </Col>
              <Col lg="6" className="">
                <div className="left-side">
                  <img src={obSuccess} className='w-100' alt="" />
                  <h2 className="mt-3 text-center">Let’s deliver the <span className='txt-success text-bold'>news</span>  to <br /> you</h2>
                </div>
              </Col>
            </Row>
          </div>
        </Container >
      </div >
      <Footerlandingpage />
    </>
  )
}

export default Success