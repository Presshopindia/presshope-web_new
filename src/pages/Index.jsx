import React from 'react'
import HeaderN from "../component/HeaderN"
import DashBoardCard from "../component/card/DashBoardCard"
import DashBoardCardList from "../component/card/DashBoardCardList"
import DashBoardTabCards from "../component/card/DashBoardTabCards"
import DashBoardPayment from "../component/card/DashBoardPayment"
import imgs from "../assets/images/LogoBlack1.png";
import img1 from "../assets/images/img1.jpeg";
import img2 from "../assets/images/img2.webp";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import imgl2 from "../assets/images/img4.webp";
import imgl3 from "../assets/images/profile.png";
import imgl4 from "../assets/images/profile.webp";
import imgl5 from "../assets/images/img1.jpeg";
import imgtab1 from "../assets/images/img1.jpeg";
import imgtab2 from "../assets/images/img4.webp";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BsArrowRight } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const DashBoardN = () => {
  return (
    <>
      <HeaderN />
      <div className="page-wrap">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="gap">
                <Col md={4} className="mb-0 p-0 w-fit">
                  <DashBoardCard cardhead={"34"} ccontent={"Current chats"} imgs={imgs} img1={img1} img2={img2} />
                </Col>
                <Col md={4} className="mb-0 p-0 w-fit">
                  <DashBoardCard cardhead={"8"} ccontent={"Content under negotiation"} imgs={imgs} img1={img1} img2={img2} />
                </Col>
                <Col md={4} className="mb-0 p-0 w-fit">
                  <DashBoardCard cardhead={"7"} ccontent={"Favourite content"} imgs={imgs} img1={img1} img2={img2} />
                </Col>
                <Col md={4} className="mb-0 p-0 w-fit">
                  <DashBoardCard cardhead={"198"} ccontent={"Total purchases"} imgs={imgs} img1={img1} img2={img2} />
                </Col>
                <Col md={4} className="mb-0 p-0 w-fit">
                  <DashBoardCard cardhead={"45"} ccontent={"Tasks broadcasted"} imgs={imgs} img1={img1} img2={img2} />
                </Col>
                <Col md={4} className="mb-0 p-0 w-fit invest-card">
                  <DashBoardCard cardhead={"£21,500"} ccontent={"Invested"} imgs={imgs} img1={img1} img2={img2} arrow={"View Details"} />
                </Col>

                <Col md={12} className="dash-tabs-wrap">
                  <div className="dash-tabs">
                    <a href="#" className="view-all-link text-danger"> View all 13 <BsArrowRight /> </a>
                    <Tabs
                      defaultActiveKey="auction"
                      id="uncontrolled-tab-example"
                      className="mb-3 tbs"
                    >
                      <Tab eventKey="auction" title="Auction" defaultActiveKey="auction" className=" show">
                        <div className="tab-data active">
                          <DashBoardTabCards imgtab={imgtab1} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                          <DashBoardTabCards imgtab={imgtab2} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                        </div>
                      </Tab>
                      <Tab eventKey="exclusive" title="Exclusive">
                        <DashBoardTabCards imgtab={imgtab2} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                        <DashBoardTabCards imgtab={imgtab1} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                      </Tab>
                      <Tab eventKey="shared" title="Shared">
                        <DashBoardTabCards imgtab={imgtab1} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                        <DashBoardTabCards imgtab={imgtab2} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard2={"2h:32m"} tabcard3={"£890"} />
                      </Tab>
                    </Tabs>
                  </div>
                </Col>

                <Col md={12} className="dash-tabs-wrap">
                  <div className="dash-tabs">
                    <div className="card-heading">Payments to be Made</div>
                    <a href="#" className="view-all-link text-danger"> View all 8<BsArrowRight /> </a>
                    <DashBoardPayment imgtab={imgtab1} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard3={"pseudonymous"} paying={"Pay £890"} />

                    <DashBoardPayment imgtab={imgtab2} tabcarddata={"In political crosshairs U.S. Supreme Court weighs abortion and guns"} tabcard3={"mrpopular"} paying={"Pay £500"} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="p-0">
              <div className="right-cards">
                <Row>
                  <Col md={8} className="p-0">
                    <Card className="dash-top-cards">
                      <CardContent className="dash-c-body rev">
                        <div className="d-flex mb-3 justify-content-between align-items-center">
                          <Typography variant="body2" className="review-txt card-head-txt mb-0">
                            Ratings & reviews
                            <br />
                          </Typography>
                          <div className="card-imgs-wrap">
                            <span><BsArrowRight /></span>
                          </div>
                        </div>
                        <div className="review-in d-flex">
                          <Typography
                            className="rating-txt mb-0"
                            gutterBottom
                          >
                            4.4
                          </Typography>
                          <div className="ic-txt-wrap">
                            <div className="star-icons mb-2">
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                            </div>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom className="rating-count mb-0"
                            >
                              89 Reviews
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                  <Col md={4} className="gap-padding">
                    <Card className="dash-top-cards add-br d-flex align-items-center justify-content-center">
                      <CardContent className="dash-c-body rev">
                        <div className="broadcast">
                          <Typography className="mb-3 text-center"
                          >
                            <span>+</span>
                          </Typography>
                          <Typography className="mb-0 text-center"
                          >
                            Broadcast task
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                  <Col md={12} className="list-card-wrap">
                    <Card className="dash-top-cards listing">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3">
                          <Typography variant="body2" className="review-txt card-head-txt mb-0">
                            Ratings & reviews
                            <br />
                          </Typography>
                        </div>
                        <div className="scrolling">
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl1} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl2} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl3} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl4} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl5} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl1} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl3} />
                          <DashBoardCardList listcard1={"Sed efficiture, libero sit amet mollis dictum, elit orci daplbus mi"} listcard2={"12:36, 10.12.2021"} imgl={imgl} />
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div >
    </>

  )
}

export default DashBoardN