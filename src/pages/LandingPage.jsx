import React, { useEffect, useRef, useState } from "react";
// import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Navigation } from "swiper";
import access1 from "../assets/images/access1.png";
import access2 from "../assets/images/access2.png";
import access3 from "../assets/images/access3.png";
import access4 from "../assets/images/access4.png";
import accessMain from "../assets/images/accessCenter.png";
import appOpt1 from "../assets/images/appOpt1.png";
import appOpt2 from "../assets/images/appOpt2.png";
import appOpt3 from "../assets/images/appOpt3.png";
import cel from "../assets/images/cel.svg";
import dailymail from "../assets/images/dailymail.png";
import deliverFast from "../assets/images/deliverFast.png";
import feedDetail from "../assets/images/feedDetail.png";
import flutter from "../assets/images/flutter.png";
import genContent from "../assets/images/genContent.png";
import guar from "../assets/images/guar.png";
import homeLeftFaq from "../assets/images/homeLeftFaq.png";
import mapView from "../assets/images/mapView.png";
import marketApp from "../assets/images/marketApp.png";
import marketPlaceDemo from "../assets/images/marketPlaceDemo.png";
import pizza from "../assets/images/pizza.svg";
import telegraph from "../assets/images/telegraph.png";
import times from "../assets/images/times.png";
import viewFeed from "../assets/images/viewFeed.png";
import Footerlandingpage from "../component/Footerlandingpage";
import HeaderN from "../component/HeaderN";

import { BiPlay, BiSearch } from "react-icons/bi";
import { BsCheckSquare, BsPlay } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GrReactjs } from "react-icons/gr";
import { HiArrowNarrowDown } from "react-icons/hi";
import { MdAccessTime, MdOutlineFlashOn } from "react-icons/md";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import chat from "../assets/images/chat.svg";
import live from "../assets/images/live.svg";
import payment from "../assets/images/payment.svg";
import strict from "../assets/images/strict.svg";
import task from "../assets/images/task.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import DbFooter from "../component/DbFooter";
import HeaderNPost from "../component/HeaderNPost";
import { Get } from "../services/user.services";
import { useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.getItem("token");
  const [faqs, setFaqs] = useState([]);
  const [faqSearch, setFaqSearch] = useState("");
  const [queryObject, setqueryObject] = useState({});
  const [activeHeader, setActiveHeader] = useState("");
  const navigate = useNavigate();
  const mylocation = useLocation();

  // const params = new URLSearchParams(mylocation?.search);
  console.log("myLocation", queryObject);
  const targetRefs = {
    div1: useRef(null),
    div2: useRef(null),
    div3: useRef(null),
    div4: useRef(null),
    div5: useRef(null),
  };

  const scrollToDiv = (divName) => {
    console.log("divname", divName);
    setActiveHeader(divName);
    targetRefs[divName].current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const params = new URLSearchParams(mylocation.search);
    const queryObject1 = {};
    console.log("keyVal", params.name);
    for (const [key, value] of params.entries()) {
      queryObject1[key] = value;
    }
    // Object.keys(object1).length
    if (Object.keys(queryObject1).length > 0) {
      setActiveHeader(queryObject1?.q);
      console.log("queryObject1?.q", (queryObject1?.q).toString());
      scrollToDiv((queryObject1?.q).toString());
    }

    setqueryObject(queryObject1);
  }, [mylocation]);
  // console.log("queryObject123",queryObject)
  useEffect(() => {
    if (queryObject?.q) {
      scrollToDiv(queryObject?.q);
    }
  }, [queryObject]);
  const FAQ = async () => {
    // console.log(faqSearch);
    const resp = await Get(
      `mediaHouse/getGenralMgmt?faq=faq&search=${faqSearch}`
    );
    setFaqs(resp.data.status);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    FAQ();
  }, [faqSearch]);

  return (
    <>
      {!token ? (
        <HeaderN
          scrollToDiv={scrollToDiv}
          activeHeader={activeHeader}
          Navigate={navigate}
        />
      ) : (
        <HeaderNPost
          scrollToDiv={scrollToDiv}
          activeHeader={activeHeader}
          Navigate={navigate}
        />
      )}
      <div className="landingWrap">
        <section className="newsDelivered" ref={targetRefs.div1}>
          <Container fluid>
            <Row>
              <Col lg={6} className="p-0">
                <div className="newsDeliverText position-relative">
                  <p className="hdng_txt">
                    News delivered straight to your desktop
                  </p>
                  <p className="landing_cstm_txt">
                  PressHop is an easy-to-use platform that connects the public
                    directly with the press.
                  </p>
                  <p className="landing_cstm_txt cstm_mb">
                    By using the PressHop App, users (we call them Hoppers) can
                    shoot pics, videos, etc they see around themselves in their
                    everyday lives, and can sell the content directly to the
                    press at the click of a button. Registered local &
                    international publications, can also broadcast multiple
                    tasks, and instantly reach out to thousands of our
                    registered Hoppers across the UK to source live content.
                  </p>
                  <div className="newsDeliverFeatures">
                    <Row className="m-0">
                      <Col md={4} className="p-0">
                        <FormControlLabel
                          className="landing_checks"
                          control={<Checkbox defaultChecked />}
                          label="Access instant news from thousands of Users"
                        />
                      </Col>
                      <Col md={4} className="p-0">
                        <FormControlLabel
                          className="landing_checks"
                          control={<Checkbox defaultChecked />}
                          label="Strictly verified for authenticity"
                        />
                      </Col>
                      <Col md={4} className="p-0">
                        <FormControlLabel
                          className="landing_checks"
                          control={<Checkbox defaultChecked />}
                          label="Exclusive & syndicated content"
                        />
                      </Col>
                    </Row>
                  </div>
                  <h6 className="text-center font-bold lndg_join_txt">
                    Join our 100+ growing tribe
                  </h6>
                  <Swiper
                    className="mySwiper mt-0 logos_swiper"
                    modules={[Navigation]}
                    slidesPerView={4}
                    navigation
                    // onSlideChange={() => console.log("slide change")}
                    from={1}
                    minDistanceForAction={0.1}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: "left",
                      nextPos: "right",
                      nextTitle: "",
                      prevTitle: "",
                      dotsWrapperStyle: {},
                      nextTitleStyle: {
                        color: "#AAAAAA",
                        fontSize: 20,
                        fontWeight: "500",
                      },
                    }}
                  >
                    <SwiperSlide>
                      <img src={dailymail} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={times} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={guar} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={telegraph} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={guar} alt="" />
                    </SwiperSlide>
                  </Swiper>
                  <span className="addtnshape yellowRect"></span>
                </div>
              </Col>
              <Col lg={6} className="bg-grey p-0">
                <div className="text-end newsDeliveryRight mt-3">
                  <img src={deliverFast} className="bannerImg" alt="" />
                  <span className="addtnshape redCircle"></span>
                  <span className="addtnshape blueTri"></span>
                  <span className="addtnshape greenCircle"></span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="marketplaceApp" ref={targetRefs.div2}>
          <Container fluid>
            <Row>
              <Col lg={6} className="bg-grey p-0">
                <div className="homeMarket s2_top_wrap">
                  <Row>
                    <Col md={6} className="">
                      <img
                        className="marketTemp"
                        src={marketPlaceDemo}
                        alt=""
                      />
                    </Col>
                    <Col md={6} className="">
                      <p className="lndg_sub_hd text-end">Marketplace</p>
                      <p className="mb-1 text-end lndg_desc">
                        Built using <GrReactjs /> React JS
                      </p>
                      <p className="text-end lndg_desc">by Meta</p>
                    </Col>
                  </Row>
                </div>
                <div className="webMarketOptnWrap">
                  <Row>
                    <Col lg={4}>
                      <div className="marketOption">
                        <img className="img-fluid" src={viewFeed} alt="" />
                        <div className="marketOptionText webOptionText">
                          <p className="min_heading">
                            View live feed
                            <img src={cel} alt="" />
                          </p>
                          <p className="mb-0">
                            Publications can access news-worthy pics, videos,
                            recordings, and scans uploaded by our users on the
                            platform. All published content is time and date
                            stamped, and verified for authenticity.
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="marketOption">
                        <img className="img-fluid" src={mapView} alt="" />
                        <div className="marketOptionText webOptionText">
                          <p className="min_heading">
                            Track live tasks
                            <img src={pizza} alt="" />
                          </p>
                          <p>
                            Publications can broadcast tasks to the users, and
                            source instant content within a 5 mile radius of the
                            incident they wish to cover. All live tracks can be
                            tracked on the platform
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="marketOption">
                        <img className="img-fluid" src={feedDetail} alt="" />
                        <div className="marketOptionText webOptionText">
                          <p className="min_heading">
                            Chat, review & buy
                            <img src={cel} alt="" />
                          </p>
                          <p className="mb-0">
                            Publications can externally chat with users, and
                            internally with their teams. This function enables
                            publications to review, negotiate, discuss, and then
                            decide on the purchase of the content
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="martketActn viewDemo mt-4 text-end">
                    <Button
                      className="btn_bld"
                      variant="secondary"
                      onClick={() => navigate("/all-tutorials")}
                    >
                      <BsPlay className="me-1" /> View Demo
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="p-0">
                <div className="homeMarket">
                  <Row>
                    <Col md={4}>
                      <p className="lndg_sub_hd">App</p>
                      <p className="mb-1 lndg_desc">
                        Built using <img src={flutter} alt="" /> Flutter
                      </p>
                      <p className="lndg_desc">by Google</p>
                    </Col>
                    <Col md={8}>
                      <img
                        src={marketApp}
                        className="marketTemp marketTempApp img-fluid"
                        alt=""
                      />
                    </Col>
                  </Row>
                </div>
                <div className="appOptionWrap">
                  <div className="appmarket_wrap">
                    <div className="appmarketCard">
                      <Row>
                        <Col sm={2}>
                          <img className="img-fluid" src={appOpt1} alt="" />
                        </Col>
                        <Col sm={10} className="ps-0">
                          <div className="marketOptionText">
                            <p className="min_heading">Shoot content & sell</p>
                            <p className="mb-0">
                              Users can take pics, videos, scan documents or
                              record conversations of incidents they see in
                              their everyday lives, and sell the content
                              anonymously to the registered publications.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="appmarketCard">
                      <Row>
                        <Col sm={2}>
                          <img className="img-fluid" src={appOpt2} alt="" />
                        </Col>
                        <Col sm={10} className="ps-0">
                          <div className="marketOptionText">
                            <p className="min_heading">
                              Accept tasks from the press
                            </p>
                            <p className="mb-0">
                              Once tasks are broadcasted by the publications,
                              all registered users (within a 5 mile radius of
                              the incident), can accept the task and upload
                              instant pics, videos & interviews for the
                              publication
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="appmarketCard">
                      <Row>
                        <Col sm={2}>
                          <img className="img-fluid" src={appOpt3} alt="" />
                        </Col>
                        <Col sm={10} className="ps-0">
                          <div className="marketOptionText">
                            <p className="min_heading">
                              View real-time reports
                            </p>
                            <p className="mb-0">
                              Similar to the platform, the App helps each user
                              to keep a complete track of their earnings,
                              payments due to them, and their transactions.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="martketActn mt-4 text-end">
                    <a
                      href="https://drive.google.com/file/d/1KaGYZh_3jtkicJ3mVxmJ8nnj_ZhHBrD1/view?usp=sharing"
                      download
                    >
                      <Button className="btn_bld" variant="primary">
                        <HiArrowNarrowDown className="me-1" /> Download App
                      </Button>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="sourceContentWrap" ref={targetRefs.div3}>
          <Container fluid>
            <Row>
              <Col lg={6} className="p-0">
                <div className="contentSourceText position-relative">
                  <h2 className="">
                    Source instant content from thousands of users across the UK
                  </h2>
                  <div className="taskAssignViewFeed">
                    <Row>
                      <Col md={6}>
                        <Accordion>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="0"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <img src={task} alt="" />
                                  <h6>Assign tasks to multiple Users</h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                Similar to Uber, registered publications can now
                                broadcast multiple tasks for shooting pics,
                                videos or taking interviews and instantly access
                                thousands of our registered Hoppers within a 5
                                mile radius of the task location. On accepting
                                the task, our Hoppers can shoot and upload
                                content on the app, and sell it directly to the
                                publications.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="1"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <img src={live} alt="" />
                                  <h6>View live reports</h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                Through PressHop, publications can access live,
                                periodical reports that help them take more
                                informed decisions. They can view detailed and
                                up-to-date reports on content purchased, and
                                also view LIVE tasks broadcasted to the Hoppers.
                                Publications can seamlessly keep track of funds
                                invested by them, pending payments to be made,
                                manage invoices, and VAT details.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="3"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <img src={strict} alt="" />
                                  <h6>
                                    Strict 3 level content verification process
                                  </h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                Prior to the content being published on our
                                marketplace, each content undergoes a mandatory
                                3 level verification process through the
                                efficient use of AI tech and our trained human
                                team members. This verification process is
                                critical, as it ensures that only authentic and
                                real content is uploaded on PressHop at all
                                times.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                        </Accordion>
                      </Col>
                      <Col md={6}>
                        <Accordion>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="0"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <MdAccessTime />
                                  <h6>View user generated feed 24x7</h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                Change from user generated to live, instant feed
                                - Publications can access a steady flow of
                                genuine, news-worthy pics, videos, recordings &
                                scans uploaded by users 24x7 all across London.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="1"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <img src={chat} alt="Chat" />
                                  <h6>Chat with users, and your team</h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                Publications can instantly chat with the Hoppers
                                on our platform, discuss, negotiate, and buy the
                                content. Since PressHop is a multi user, multi
                                office platform, publications can also chat
                                internally across offices with other team
                                members.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                          <div className="genuineTaskCard">
                            <Accordion.Item
                              className="sourceG_accrd"
                              eventKey="2"
                            >
                              <Accordion.Header>
                                <div className="contentTaskInfo">
                                  <img src={payment} alt="Payment" />
                                  <h6>Secure online payment with Stripe</h6>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                For all content that our publications buy on
                                PressHop, they can pay the Hoppers directly and
                                safely through the platform. Payments can be
                                made by debit /credit cards, bank transfers,
                                PayPal, and Google Pay, using the Stripe payment
                                gateway. Once the payment is received, the
                                PressHop watermark on the content is
                                automatically removed, allowing the publication
                                to use the content exclusively or on a shared
                                basis.
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                        </Accordion>
                      </Col>
                    </Row>
                    <div className="newsDeliverFeatures mt-4">
                      <Row>
                        <Col md={4} className="pe-0">
                          <FormControlLabel
                            className="landing_checks"
                            control={<Checkbox defaultChecked />}
                            label="FREE to use, and will remain free forever"
                          />
                        </Col>
                        <Col md={4} className="p-0">
                          <FormControlLabel
                            className="landing_checks"
                            control={<Checkbox defaultChecked />}
                            label="Multi user function across offices"
                          />
                        </Col>
                        <Col md={4} className="ps-0">
                          <FormControlLabel
                            className="landing_checks"
                            control={<Checkbox defaultChecked />}
                            label="Collaborate with teams to view, discuss, and buy content"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="contentTaskAction mt-5 text-end">
                    <a href="/onboard">
                      <Button variant="primary">
                        <BsCheckSquare className="me-1" />
                        Onboard Now
                      </Button>
                    </a>
                  </div>
                  <span className="grn_tri pos_abs"></span>
                </div>
              </Col>
              <Col md={6} className="bg-grey p-0">
                <div className="genuineContentImg text-end position-relative">
                  <img
                    className="img-fluid sourceGenuineImg"
                    src={genContent}
                    alt=""
                  />
                  <span className="addtnshape redCircle"></span>
                  {/* <span className='addtnshape blueTri'></span> */}
                  <span className="gr_crcl pos_abs"></span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          className="accessUptoDateWrap position-relative bg-grey"
          ref={targetRefs.div4}
        >
          <Container fluid className="p-0">
            <Row>
              <Col sm={12} className="p-0">
                <div className="accessAccurate">
                  <Row className="justify-content-center">
                    <Col md={6} sm={8}>
                      <h2 className="lndg_sub_hd">
                        Access accurate, up-to-date business and financial
                        reports
                      </h2>
                      <p className="lndg_desc_txt">
                        Use our advanced tech platform to view, track, and
                        monitor reports related to broadcasted tasks, content
                        purchased, invoices, payment transactions, VAT paid, and
                        more
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm={3} className="d-flex justify-content-end p-0">
                      <div className="accessReportPart leftAccess">
                        <div className="imgCaption">
                          <img src={access1} className="access1Img" alt="" />
                          <span className="captionText">
                            <RiMoneyPoundBoxFill className="me-1" />
                            Track funds invested, pending payments to be made,
                            and your VAT summary
                          </span>
                        </div>
                        <div className="imgCaption">
                          <img src={access2} className="access2Img" alt="" />
                          <span className="captionText">
                            <MdOutlineFlashOn className="me-1" />
                            View live tasks broadcasted, and content sourced
                            from users
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6} className="text-center">
                      <div className="accessReportPart cntr_img">
                        <img src={accessMain} className="access3Img" alt="" />
                      </div>
                    </Col>
                    <Col sm={3} className="d-flex justify-content-start p-0">
                      <div className="accessReportPart text-end">
                        <div className="imgCaption">
                          <img src={access3} className="access1Img" alt="" />
                          <span className="captionText">
                            <BiSearch className="me-1" />
                            Drill down to individual transactions where needed
                          </span>
                        </div>
                        <div className="imgCaption">
                          <img src={access4} className="access2Img" alt="" />
                          <span className="captionText">
                            <BiPlay className="me-1" />
                            View content uploaded for sale, and purchased from
                            users
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
          <span className="shape yl_crcl pos_abs"></span>
          <span className="shape yl_crcl_md pos_abs"></span>
          <span className="shape bl_crcl pos_abs"></span>
          <span className="shape redcrcl pos_abs"></span>
          <span className="shape bl_tri pos_abs"></span>
        </section>
        <section className="homeFAQwrap" ref={targetRefs.div5}>
          <Container fluid>
            <Row>
              <Col sm={5} className="ps-0">
                <div className="homeFaqleft">
                  <img src={homeLeftFaq} className="faqImg" alt="" />
                </div>
              </Col>
              <Col sm={7} className="pt-4">
                <div className="faqSearchList">
                  <form action="">
                    <div className="form-group mx-1 position-relative">
                      <FiSearch className="searchIcon" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search answers to most common questions"
                        onChange={(e) => setFaqSearch(e.target.value)}
                      />
                    </div>
                  </form>
                  <div className="homeFaqCard">
                    <Accordion defaultActiveKey="0">
                      {faqs &&
                        faqs.map((item, index) => {
                          return (
                            <Accordion.Item eventKey={index} key={index}>
                              <Accordion.Header>
                                <span className="questnTag">Q</span>
                                {item.ques}
                              </Accordion.Header>
                              <Accordion.Body>{item.ans}</Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                    </Accordion>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <span className="shape yl_crcl pos_abs"></span>
          <span className="shape yl_crcl_md pos_abs"></span>
          {/* <span className="shape bl_crcl pos_abs"></span> */}
          <span className="shape redcrcl pos_abs"></span>
          <span className="shape bl_tri pos_abs"></span>
        </section>
        {!token ? (
          <Footerlandingpage scrollToDiv={scrollToDiv} />
        ) : (
          <DbFooter scrollToDiv={scrollToDiv} />
        )}
      </div>
    </>
  );
};

export default LandingPage;
