import * as React from "react";
// import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Camera from "../../../src/assets/images/contentCamera.svg";

function DashBoardTabCards(props) {
  const navigate = useNavigate();

  return (
    <>
      <Card className="exclusive_shrd_wrap list-card tabs-wrap mb-3">
        <CardContent
          className="dash-c-body dash-tabs"
          onClick={() => navigate(props.lnkto)}
        >
          <div className="list-in tab-card-wrap">
            <Row className="align-items-center">
              <Col md={props?.before_discount_value ? 5 : 5}>
                <div className="d-flex align-items-center payment_camera_icon cntent_card_icon">
                  {props.image_type === "audio" ? (
                    <div div className="cstm_icn_wrpr">
                      <img
                        className="w-80 me-0"
                        src={props.imgtab}
                        alt="1"
                      />
                    </div>
                  ) : (
                    <img className="list-card-img" src={props.imgtab} alt="1" />
                  )}
                  {/* <div class="post_icns_cstm_wrp">
                    <div class="post_itm_icns dtl_icns">
                      <span class="count">{props.imgcount}</span>
                      <img class="feedMediaType iconBg" src={Camera} alt="" />
                    </div>
                  </div> */}
                  <div className=" d-flex align-items-center">
                    <Typography variant="body2" className="tab-card-txt mb-2">
                      {props.tabcarddata}
                      <br />
                    </Typography>
                  </div>
                </div>
              </Col>
              {props.tabcard2 && (
                <Col md={3}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="crd_time mb-0 watch-ic"
                  >
                    <MdOutlineWatchLater />
                    {props.tabcard2}
                  </Typography>
                </Col>
              )}
              {props.tabcard4 && (
                <Col md={3}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="crd_time mb-0 watch-ic"
                  >
                    <MdOutlineWatchLater />
                    {props.tabcard4}
                  </Typography>
                </Col>
              )}
              {/* <Col>
                                <div className=" bid-txt">
                                    <span className="feedtype_icon"
                                        style={{
                                            "fontFamily": 'AirbnbMedium',
                                            "color": '#7D8D8B'
                                        }}
                                    >
                                        <img src={props.feedIcon} alt="" />
                                        {props.feedType}
                                    </span>
                                </div>
                            </Col> */}
              <Col md={2}>
                <div className="d-flex gap-2 align-items-center">
                  <img
                    className="list-card-img img2 me-0"
                    src={props?.imgtab1}
                    alt="1"
                  />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    className="usr_nme mb-0 txt-inline"
                  >
                    {props?.tabcard5}
                  </Typography>
                </div>
              </Col>
              {props?.before_discount_value ? (
                <Col md={2}>
                  <div className={`buyFeed_opt text-center btn-grp`}>
                    <span className="contentPrice_text dash-cntnt-price">
                      £{props?.before_discount_value}
                    </span>
                    <Button className="theme-btn">{props.tabcard3}</Button>
                  </div>
                </Col>
              ) : (
                <Col>
                  <div className="buyFeed_opt text-center">
                    <Button className="theme-btn">{props.tabcard3}</Button>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default DashBoardTabCards;
