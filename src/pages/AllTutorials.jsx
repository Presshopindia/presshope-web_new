import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeaderN from "../component/HeaderN";
// import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";

import ReactPlayer from "react-player";
import allttrls from "../assets/images/login-images/all-tutorials.svg";
import videothum from "../assets/images/vthumbnail.png";
import Footerlandingpage from "../component/Footerlandingpage";
import { Get } from "../services/user.services";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { BsArrowLeft } from 'react-icons/bs';
import LoginHeader from "../component/LoginHeader";

const Success = () => {
  const [tutorials, setTutorials] = useState();
  const token = localStorage.getItem("token");

  const GetTutorials = async () => {
    const resp = await Get(`mediaHouse/getGenralMgmt?videos=videos`)
    setTutorials(resp.data.status)
  }

  useEffect(() => {
    GetTutorials()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* <LoginHeader /> */}
      {token ? <Header /> : 
      <LoginHeader/>
      }
      <div className="page-wrap login-page p-0 all_ttrls_page">
        <Container fluid className="pdng">
          <div className="log-wrap onboar_success">
            <Row className="row-w-m m-0">
              <Col lg="6" className="bg-white p-0">
                <div className="login_stepsWrap left-pdng">
                  <div className="onboardMain">
                  <Link className='back_link mb-2' onClick={() => window.history.back()}><BsArrowLeft className='text-pink' /> Back </Link>
                    <div className="onboardIntro sign_section border-bottom-0">
                      <div className="onboardStep top_txt ttl_tp_txt">
                        <p>
                          Grab a cuppa tea, and have a look at our handy videos.
                          We have tried to include a selection of videos that
                          explains our amazing features, and what makes our
                          plateform the simplest way to source use generated
                          content across the UK. If you would like to speak to
                          one of our team members to understand more, please
                          <span className="txt-success-link">
                            <Link to={token ? "/contact-us-post" : "/contact-us"}> contact us </Link>
                          </span>
                          and we will be very happy to explain
                        </p>
                      </div>
                    </div>
                    <div className="onboardIntro_success_info border-0">
                      <Row className="row-w-m m-0 ttrl_vds_rw justify-content-between">
                        {tutorials && tutorials.map((curr, index) => {
                          return (
                            <div className="bg-white ttrl_vd_sngl_wrp p-0">
                              <div className="player-wrapper ttr_vd_item">
                                <ReactPlayer
                                  className="react-player ttrl_vdo"
                                  url={curr.video}
                                  width="100%"
                                  height="100%"
                                  controls
                                  poster={videothum}
                                />
                                <p className="ttr_vd_desc">
                                  {curr?.description}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="6" className="">
                <div className="left-side right-side text-center position-relative">
                  <div className="tri"></div>
                  <div className="circle"></div>
                  <div className="big_circle"></div>
                  <img src={allttrls} className="" alt="" />
                  <Row className="justify-content-center">
                    <Col md={10}>
                      <p className="rt_btm_txt mt-3 text-center">
                        Check our online{" "}
                        <span className="txt-success text-bold">videos</span> to
                        see what this fuss is all about!
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {
        token ? <DbFooter /> : <Footerlandingpage />
      }
    </>
  );
};

export default Success;
