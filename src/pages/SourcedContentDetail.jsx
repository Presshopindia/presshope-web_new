import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import account from "../assets/images/piggy.svg";
import code from "../assets/images/code.svg";
import bank from "../assets/images/bank.svg";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import sharedic from "../assets/images/shared.svg";
import audioic from "../assets/images/audimg.svg";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsArrowLeft, BsChevronDown } from "react-icons/bs";
import feedcontimg from "../assets/images/imgn6.jpg";
import { AiOutlineStar } from "react-icons/ai";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import Loader from "../component/Loader";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import contentimg from "../assets/images/Contentdetail/content3.png";
import favic from "../assets/images/favouritestar.svg";
import videoic from "../assets/images/video.svg";
import interviewic from "../assets/images/interview.svg";
import cameraic from "../assets/images/camera.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import favic from "../assets/images/star.svg";
// import cameraic from "../assets/images/camera.svg";
// import interviewic from "../assets/images/interview.svg";
// import videoic from "../assets/images/video.svg";
import { Pagination } from "swiper";
import { formatAmountInMillion } from "../component/commonFunction";

const SourcedContentDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState();
  const [taskId, setTaskId] = useState(null);

  const getTransactionDetails = async () => {
    setLoading(true);
    try {
      const res = await Post(`mediahouse/getSourcedContentbytask`, { _id: id });
      if (res) {
        setTransactionDetails(res?.data?.data[0]);
        setTaskId(res?.data?.data[0]?.task_id?._id)
        setLoading(false);
      }
    } catch (er) {
      // console.log(er, `<------erors`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionDetails();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <Link className="back_link" onClick={() => history.back()}>
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                  </div>
                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="post_itm_icns dtl_icns">
                            <span>1</span>
                            <img
                              className="feedMediaType iconBg"
                              src={transactionDetails?.type === "audio" ? interviewic : transactionDetails?.type === "video" ? videoic : cameraic}
                              alt=""
                            />
                          </div>
                          {/* <img src={data ? (data.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].thumbnail : (data?.paid_status === "paid" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].media : data.content[0].watermark)) : (fav?.content_id.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].thumbnail : process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].media)} alt="" /> */}
                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation
                            pagination={{ clickable: true }}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            nested={true}
                          >
                            {

                              transactionDetails?.type === "image" ?
                                <SwiperSlide>
                                  <img src={transactionDetails?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + transactionDetails?.imageAndVideo} className="sld_cont"></img>
                                </SwiperSlide>

                                : transactionDetails?.type === "video" ?
                                  <SwiperSlide>
                                    <video id="video-element" className="sld_cont" controls>
                                      <source src={process.env.REACT_APP_UPLOADED_CONTENT + transactionDetails?.imageAndVideo} type="video/mp4" />
                                    </video>
                                  </SwiperSlide>
                                  : transactionDetails?.type === "audio" ?
                                    <SwiperSlide>
                                      <img src={audioic} className="aud_icn" />
                                      <audio id="audio-element" className="sld_cont" controls>
                                        <source src={process.env.REACT_APP_UPLOADED_CONTENT + transactionDetails?.imageAndVideo} type="audio/mpeg" />
                                      </audio>
                                    </SwiperSlide>
                                    : null
                            }
                          </Swiper>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {transactionDetails?.task_id?.heading}
                            </h1>
                            <p className="feed_descrptn">
                              {transactionDetails?.task_id?.task_description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info trnsc_info_crd">
                        <CardContent className="card-content sourcedContentInfo">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography> Content info</Typography>
                              {transactionDetails?.task_id?.is_favourite ===
                                true && (
                                  <div className="favourite">
                                    <AiOutlineStar />
                                    <span>Favourite</span>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      transactionDetails?.hopper_details?.avatar_details?.avatar
                                    }
                                    alt=""
                                  />
                                  <span className="hpr_nme">
                                    {transactionDetails?.hopper_details?.user_name}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />
                                    {transactionDetails?.type === "content" ? (
                                      <div>
                                        {
                                          transactionDetails?.content_id
                                            ?.location
                                        }
                                      </div>
                                    ) : (
                                      <div>
                                        {transactionDetails?.task_id?.location}
                                      </div>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  {transactionDetails?.type === "content" ? (
                                    <span>
                                      <MdOutlineWatchLater />
                                      {moment(
                                        transactionDetails?.createdAt).format(`hh:mm A, DD MMMM YYYY`)}
                                    </span>
                                  ) : (
                                    <span>
                                      <MdOutlineWatchLater />{" "}
                                      {moment(
                                        transactionDetails?.createdAt
                                      ).format(`hh:mm A, DD MMMM YYYY`)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>

                                <div className="">
                                <img
                                    src={transactionDetails?.category_details?.icon}
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {transactionDetails?.category_details?.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot cont-info-actions d-flex justify-content-between align-items-center">
                              <span className="greyBtn">
                                £{formatAmountInMillion(+(transactionDetails?.amount_paid))}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div className="transactionDetail_wrap mb-5">
                  <h3 className="card_headings">Transaction details</h3>
                  <Row>
                    <Col md={4}>
                      <div className="invoice_summary">
                        <h5 className="transaction_hdngs">Invoice Summary</h5>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Transaction ID</h6>
                            <h6>{transactionDetails?._id}</h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice number</h6>
                            <h6>{transactionDetails?.transictions?.invoiceNumber}</h6>
                          </div>
                        </div>
                        <hr />
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice from</h6>
                            <h6>
                              {transactionDetails?.purchased_publication_details?.company_name}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Invoice date </h6>
                            <h6>
                              {moment(transactionDetails?.createdAt).format(
                                `DD MMMM YYYY`
                              )}
                            </h6>
                          </div>
                        </div>
                        <hr />
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Amount</h6>
                            <h6>
                              £
                              {transactionDetails?.transictions?.amount - transactionDetails?.transictions?.Vat || 0}
                            </h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>VAT 20%</h6>
                            <h6>£{transactionDetails?.transictions?.Vat || 0}</h6>
                          </div>
                        </div>
                        <div className="transactional_detail">
                          <div className="single_tranInfo">
                            <h6>Total amount paid</h6>
                            <h6>£{transactionDetails?.transictions?.amount || 0}</h6>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={8}>
                      <div className="paymentBank_summary invoice_summary h-100">
                        <Row>
                          <Col md={6}>
                            <div className="payment_summary">
                              <h5 className="transaction_hdngs">
                                Payment Summary
                              </h5>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Payment date</h6>
                                  <h6>
                                    {moment(
                                      transactionDetails?.payment_detail[0]?.purchased_time
                                    ).format(`DD MMMM YYYY`)}
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Payment time</h6>
                                  <h6>
                                    {moment(
                                      transactionDetails?.payment_detail[0]?.purchased_time
                                    ).format(`hh:mm A`)}
                                  </h6>
                                </div>
                              </div>
                              <hr />

                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Paid to</h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details?.office_details?.company_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Address </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.office_details?.address
                                    }
                                  </h6>
                                </div>
                              </div>
                              <hr />
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>Company number</h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.office_details?.company_number
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>VAT number</h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.office_details?.company_vat
                                    }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="banking_summary">
                              <h5 className="transaction_hdngs">
                                Banking Summary
                              </h5>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={bank} alt="" />
                                    </span>
                                    Payee bank
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.bank_details?.bank_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={code} alt="" />
                                    </span>
                                    Sort Code{" "}
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.bank_details?.sort_code
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={account} alt="" />
                                    </span>
                                    Account number
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.admin_details
                                        ?.bank_details?.account_number
                                    }
                                  </h6>
                                </div>
                              </div>
                              <hr />
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={bank} alt="" />
                                    </span>
                                    Payer bank{" "}
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.purchased_publication_details?.company_bank_details?.bank_name
                                    }
                                  </h6>
                                </div>
                              </div>
                              {/* <hr /> */}
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={code} alt="" />
                                    </span>
                                    Sort Code
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.purchased_publication_details
                                        ?.company_bank_details?.sort_code
                                    }
                                  </h6>
                                </div>
                              </div>
                              <div className="transactional_detail">
                                <div className="single_tranInfo">
                                  <h6>
                                    <span className="icon_trnsctns">
                                      <img src={account} alt="" />
                                    </span>
                                    Account number
                                  </h6>
                                  <h6>
                                    {
                                      transactionDetails?.purchased_publication_details
                                        ?.company_bank_details?.account_number
                                    }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>

      <DbFooter />
    </>
  );
};

export default SourcedContentDetail;
