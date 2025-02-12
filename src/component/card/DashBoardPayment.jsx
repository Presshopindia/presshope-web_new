import * as React from "react";
// import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Row, Button, Col } from "react-bootstrap";
import { UserDetails } from "./../Utils";
import { Get, Post } from "../../services/user.services";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { MdOutlineWatchLater } from "react-icons/md";
import Camera from "../../../src/assets/images/contentCamera.svg"

function DashBoardPayment(props) {
  return (
    <Card className="list-card tabs-wrap mb-3 paymentTBMWrap">
      <CardContent
        className="dash-c-body dash-tabs"
        onClick={() => {
          localStorage.setItem("props", JSON.stringify(props));
        }}
      >
        <div className="list-in tab-card-wrap">
          <Row
            className="align-items-center justify-content-between"
            style={{ cursor: "pointer" }}
          >
            <Col md={5}>
              <div className="d-flex align-items-center payment_camera_icon">
                <div className="paymentToBeMadeImgContent">
                  <img className="list-card-img" src={props.imgtab} alt="1" />
                  {/* <span>2</span> */}
                  <div class="post_icns_cstm_wrp">
                    <div class="post_itm_icns dtl_icns">
                      <span class="count">{props?.imageCount}</span>
                      <img
                        class="feedMediaType iconBg"
                        src={Camera}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
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
            <Col md={2}>
              <div className="d-flex gap-2 align-items-center">
                <img
                  className="list-card-img img2 me-0"
                  src={props.imgtab1}
                  alt="1"
                />
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                  className="usr_nme mb-0 txt-inline"
                >
                  {props.tabcard3}
                </Typography>
              </div>
            </Col>
            <Col md={2}>
              <div className="paying text-right">
                <p className="text-white">
                  <Button className="theme-btn pay_btn_comn">
                    Pay £{props?.paying ?? 0}
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </CardContent>
    </Card>
    // </Elements>
  );
}
export default DashBoardPayment;
