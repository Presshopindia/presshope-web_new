import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from 'react-icons/bs';
import { Link } from "react-router-dom";
import obSuccess from "../assets/images/obsuccess.jpg";

import ReactPlayer from 'react-player';
import videothum from "../assets/images/vthumbnail.png";
import videothum2 from "../assets/images/vthumnail2.png";
import Footerlandingpage from '../component/Footerlandingpage';
import { Get } from '../services/user.services';
import LoginHeader from '../component/LoginHeader';
import { Checkbox, FormControlLabel } from '@mui/material';
import InviteUsers from '../component/InviteUsers';


const Success = () => {
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const AdminDetails = JSON.parse(localStorage.getItem("OnboardDetails"))
  const Designation = JSON.parse(localStorage.getItem("designation"))

  const [tutorials, setTutorials] = useState()

  const GetTutorials = async () => {
    const resp = await Get(`mediaHouse/getGenralMgmt?videos=videos`)
    setTutorials(resp.data.status)
  }

  useEffect(() => {
    GetTutorials()
  }, [])

  return (
    <>
      <LoginHeader />
      <div className="page-wrap login-page p-0">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success">
            <Row className="row-w-m m-0">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className='onboardMain'>

                    <div className="onboardIntro sign_section border-bottom-0">
                      <h1 className="mb-0 position-relative">Hi {AdminDetails?.AdminName ? AdminDetails?.AdminName : ""}
                        <Badge className='admin_badge' text="dark">
                          Admin
                        </Badge>{' '}</h1>

                      <div className="onboardStep b_border top_txt">
                        <p>Thank you for completing your onboarding as an administrator with <span className='txt-success'>PressHop.</span> Please check your official inbox for our verification email sent on <span className='txt-success-link'><Link>{AdminDetails?.AdminEmail ? AdminDetails?.AdminEmail : ""}.</Link></span></p>
                        <p>If you still haven't received our activation email, please <span className='txt-success-link'><Link to={"/all-tutorials"}>click here</Link></span> to resend another mail, if you continue facing any further problems, please contact us, and we will take care of this right away for you.</p>
                        <p>Meanwhile, you can view our <span className='txt-success-link'><Link to={"/all-tutorials"}>online tutorials</Link></span> to experience the amazing features of our marketplace, or check out our <span className='txt-success-link'><Link to={"/faq-post"}>FAQs</Link></span> for any questions that you may have. Additionally, you can send an <span className='txt-success-link'><Link to={"mailto:presshop@mailinator.com"}>email</Link></span>  if you have any questions. We are available 24x7 to assist. Cheers!</p>
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
                    <Col lg="12">
                      <div className='dashCard-heading'>
                        <p><span className='txt-success'>You're in control!</span> New users need your invite to join <span className='txt-success'>PressHop. </span>Send an activitation link now and build your team!</p>
                        <Button
                          variant=""
                          className="theme-btn custom-ab mb-4 w-100 sm_btn"
                          onClick={() => setShowInviteUserModal(true)}
                        >
                          <span>Invite New Users</span>
                        </Button>
                      </div>
                    </Col>
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
      <InviteUsers
        show={showInviteUserModal}
        setShow={setShowInviteUserModal}
        name={AdminDetails?.AdminName}
        email={AdminDetails?.AdminEmail}
        company_name={AdminDetails?.CompanyName}
        designation={Designation?.name}
        adminId={AdminDetails?.UserId}
        activationLink={`${process.env.REACT_APP_FRONTEND_URL}user-onboard-request/${AdminDetails?.UserId}`}
      />
      <Footerlandingpage />
    </>
  )
}

export default Success