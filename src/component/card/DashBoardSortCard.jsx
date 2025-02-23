import * as React from "react";
// import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MdOutlineWatchLater } from "react-icons/md";
import { Row, Button, Col } from 'react-bootstrap';
import PostIconsWrapper from "../PostIconComponents/PostIconsWrapper";

function DashBoardSortCard(props) {
    return (
        <Card className={`Sort_list-card mb-3 ${props?.before_discount_value ? "cntnt-spc-offr" : ""}`}>
            <CardContent className="dash-c-body dash-tabs">
                <div className="list-in tab-card-wrap">
                    <Row className="align-items-center">
                        {/* <Col md={4}> */}
                        <div className="Card_Wrapper d-flex align-items-center flex-column">
                            <img className="list_card_img_top" src={props.imgtab} alt="1" />
                            <div className="commonContentIconsWrap review_content_wrap d-flex justify-content-between align-content-center">
                                {/* <span className="rateView-type_icons">
                                            <span className="volCount">1</span>
                                            <img className="" src={props.reviewType} />
                                            </span> */}
                                <PostIconsWrapper
                                    images={props?.contentDetails?.image_count}
                                    video={props?.contentDetails?.video_count}
                                    audio={props?.contentDetails?.audio_count}
                                />
                                <span className="rateView-type dflt"><img className="" src={props.reviewTypetwo} /></span>
                            </div>
                            <div className=" d-flex align-items-start flex-column px-2">
                                <Typography variant="body2" className="tab-card-txt_sort mb-1 ellips_with">
                                    {props.tabcarddata}
                                    <br />
                                </Typography>
                                <Row className={`align-items-center ${props?.before_discount_value ? "gap-1" : "gap-4"} mb-1`}>
                                    <Col md={props?.before_discount_value ? 12 : 4}>
                                        <div className="bid-txt">
                                            <span className="feedtype_icon_Sort">
                                                <img src={props.feedIcon} alt="" />
                                                <Typography variant="body2" className="small_bid_txt">
                                                    {props.feedType}
                                                </Typography>
                                            </span>
                                        </div>
                                    </Col>
                                    {/* New work */}
                                    {
                                        props?.before_discount_value && <Col md={5}>
                                            <div className="buyFeed_opt text-center ms-0">
                                                <span className="btn-offer">£{props?.before_discount_value}</span>
                                            </div>
                                        </Col>
                                    }
                                    <Col md={props?.before_discount_value ? 6 : 4}>
                                        <div className="buyFeed_opt text-center ms-0">
                                            <Button className="theme-btn-small">
                                                £{props.tabcard3}
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* </Col> */}

                    </Row>
                </div>

            </CardContent>
        </Card>

    );
}
export default DashBoardSortCard;
