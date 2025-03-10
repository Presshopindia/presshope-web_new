import { Card, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
// import Logo from "../assets/images/dashboard_logo.png";
import Logo from "../assets/images/presshopinvoice.png";
import logo from "../assets/images/presshop_new_logo.png";
import logoDark from "../assets/images/footerlogoDarkMode.png";

// presshopinvoice
import { Link, useNavigate, useParams } from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import audioicon from "../assets/images/audio-icon.svg";
import calendericn from "../assets/images/calendarnic.svg";
import cameraic from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import pdfic from "../assets/images/pdfic.svg";
import docsic from "../assets/images/docsic.svg";
import reuters from "../assets/images/reuters.png";
import shared from "../assets/images/share.png";
import videoic from "../assets/images/video.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";
const moment = require("moment");

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import DbFooter from "../component/DbFooter";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { UserDetails } from "../component/Utils";
import { Get, Post } from "../services/user.services";
import { useDarkMode } from "../context/DarkModeContext";
import { formatAmountInMillion } from "../component/commonFunction";

const Invoice = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getInvoiceDetail = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/getallinvoiseforMediahouse?id=${id}`);
      setLoading(false);
      setData(resp.data.resp);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoiceDetail();
  }, []);

  const claculatedFun = () => {
    let val = (20 * data?.ask_price) / 100;
    return val;
  };

  const handleInvoiveDownload = async () => {
    if (!data.invoice_id) {
      return;
    }

    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/download-invoice?invoiceId=${data.invoice_id}`);
      setLoading(false);
      window.open(resp.data.data, "_blank");
    } catch (error) {
      setLoading(false);
    }
  }

  const { profileData } = useDarkMode();
  const userData = profileData;

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap rtng_page">
        <div className="feedContent_header">
          <Link
            onClick={() => window.history.back()}
            className="back_link mb-3"
          >
            <BsArrowLeft className="text-pink" /> Back{" "}
          </Link>
        </div>
        <Container fluid>
          <Row>
            <Col md={12}>
              <Row className="">
                <Col md={12} className="dash-tabs-wrap pe-0">
                  <div className="dash-tabs invoice-lft">
                    <Row>
                      <Col md={6}>
                        <div className="ftr-left">
                          <img
                            src={logo}
                            alt="PressHop"
                            className="footer-logo"
                          />
                          {/* <img
                            src={logoDark}
                            alt="PressHop"
                            className="footer-logo darkLogo"
                          /> */}
                        </div>

                        {/* <div className="prs-logo">
                          <img src={Logo}   style={{ width: '200px', height: '200px' }} alt="" />
                        </div> */}
                      </Col>

                      <Col md={6}>
                        <div className="text-end invce-num">
                          <h1 className="">Invoice</h1>
                          {/* <p>
                            <span> <img src={calendericn} alt="" /> </span>
                            <span>{moment().format('DD MMM YYYY')}</span>

                          </p> */}
                        </div>
                      </Col>
                    </Row>

                    <hr />
                    <Row className="cs-mr">
                      <Col md={6}>
                        <div className="invoice-text">
                          <p>Invoice # {data?.invoiceNumber}</p>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end trans-id">
                          <p>
                            <span>
                              {" "}
                              <img src={calendericn} alt="" />{" "}
                            </span>
                            <span>
                              {moment(data?.createdAt).format("DD MMM YYYY")}
                            </span>
                          </p>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="ads-card">
                          <div className="myflex">
                            <span>
                              <p className="from">From</p>

                              <h4>Presshop Media UK Limited</h4>
                            </span>

                            <span className="reuters">
                            </span>
                          </div>
                          <p>
                            167-169, Great Portland Street, <br />
                            London, W1W 5PF
                          </p>
                          <p>
                            Company # 13522872
                          </p>
                          <p> VAT # 450 5678 83</p>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="ads-card">
                          <div className="myflex">
                            <span>
                              <p className="from">To</p>

                              <h4>{data?.media_house_id?.company_name}</h4>
                            </span>

                            <span className="reuters">
                              <img
                                src={data?.media_house_id?.profile_image}
                                alt=""
                              />
                            </span>
                          </div>
                          <p>
                            {
                              data?.media_house_id?.office_details?.[0]?.address
                                ?.complete_address
                            }{" "}
                            <br />
                            {
                              data?.media_house_id?.office_details?.[0]?.address
                                ?.pincode
                            }
                          </p>
                          <p>
                            Company # {data?.media_house_id?.company_number}
                          </p>
                          <p> VAT # {data?.media_house_id?.company_vat}</p>
                        </div>
                      </Col>
                    </Row>

                    <div className="transactionBank_wrap trns_tbl mt-25">
                      <Row>
                        <Col md={12}>
                          <Card className="tbl_crd bg_grey">
                            <div className="">
                              <div
                                className="d-flex justify-content-start"
                                px="20px"
                                mb="10px"
                              >
                                <Typography className="tbl_hdng">
                                  Invoice details
                                </Typography>
                              </div>

                              <div className="fix_ht_table ">
                                <table
                                  width="100%"
                                  mx="20px"
                                  variant="simple"
                                  className="common_table"
                                >
                                  <thead>
                                    <tr>
                                      <th className="cnt_prchsd_th">Content</th>
                                      <th>Heading</th>
                                      <th className="text-nowrap">
                                        Time & date
                                      </th>
                                      <th className="text-center">Type</th>
                                      <th className="text-center">License</th>
                                      <th className="text-center">Category</th>
                                      <th style={{ textAlign: "right" }}>
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      <tr>
                                        <td className="content_img_td position-relative add-icons-box">
                                          <Link
                                            to={`/purchased-content-detail/${id}`}
                                          >
                                            <div className="tbl_cont_wrp">
                                              {data?.content_id?.content[0]
                                                ?.media_type === "image" ? (
                                                <img
                                                  src={
                                                    data?.content_id?.content[0]
                                                      ?.watermark
                                                  }
                                                  className="cntnt-img"
                                                  alt="img"
                                                />
                                              ) : data?.content_id?.content[0]
                                                ?.media_type === "video" ? (
                                                <img
                                                  src={
                                                    data.content[0].watermark ||
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    data.content[0].thumbnail
                                                  }
                                                  className="cntnt-img"
                                                />
                                              ) : data?.content_id?.content[0]
                                                ?.media_type === "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="cntnt-img"
                                                />
                                              ) : data?.content_id?.content[0]
                                                ?.media_type === "pdf" ? (
                                                <img
                                                  src={docsic}
                                                  className="cntnt-img"
                                                />
                                              ) : null}
                                              {/* <span className="cont_count">
                                                {data?.content_id?.content
                                                  ?.length || 0}
                                              </span> */}
                                            </div>
                                            <div className="tableContentTypeIcons">
                                              {/* {imageCount > 0 && ( */}
                                              <div class="post_icns_cstm_wrp camera-ico">
                                                <div class="post_itm_icns dtl_icns">
                                                  <span class="count">
                                                    {/* {imageCount} */}1
                                                  </span>
                                                  <img
                                                    class="feedMediaType iconBg"
                                                    src={cameraic}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                              {/* )}
                                              {videoCount > 0 && ( */}
                                              <div class="post_icns_cstm_wrp video-ico">
                                                <div class="post_itm_icns dtl_icns">
                                                  <span class="count">
                                                    {/* {videoCount} */}1
                                                  </span>
                                                  <img
                                                    class="feedMediaType iconBg"
                                                    src={videoic}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                              {/* )} */}
                                              {/* <div class="post_icns_cstm_wrp audio-ico">
                                                  <div class="post_itm_icns dtl_icns">
                                                    <span class="count">
                                                      1
                                                    </span>
                                                    <img
                                                      class="feedMediaType iconBg"
                                                      src={interviewic}
                                                      alt=""
                                                    />
                                                  </div>
                                                </div> */}
                                            </div>
                                          </Link>
                                        </td>
                                        <td>
                                          <div className="desc">
                                            <p>{data?.content_id?.heading}</p>
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img
                                              src={watchic}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.content_id?.createdAt
                                            ).format("h:mm:A")}
                                          </p>
                                          <p className="timedate">
                                            <img
                                              src={calendar}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.content_id?.createdAt
                                            ).format("DD MMM YYYY")}
                                          </p>
                                        </td>

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.content_id?.content[0]
                                                ?.media_type == "image"
                                                ? "Photo"
                                                : data?.content_id?.content[0]
                                                  ?.media_type == "Audio"
                                                  ? audioicon
                                                  : data?.content_id?.content[0]
                                                    ?.media_type == "Pdf"
                                                    ? "Pdf"
                                                    : data?.content_id?.content[0]
                                                      ?.media_type == "Video"
                                                      ? "Video"
                                                      : "Scan"
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content_id?.content[0]
                                                  ?.media_type == "image"
                                                  ? cameraic
                                                  : data?.content_id?.content[0]
                                                    ?.media_type == "audio"
                                                    ? audioicon
                                                    : data?.content_id?.content[0]
                                                      ?.media_type == "pdf"
                                                      ? docsic
                                                      : data?.content_id?.content[0]
                                                        ?.media_type == "video"
                                                        ? videoic
                                                        : null
                                              }
                                              className="tbl_ic"
                                              alt="camera"
                                            />
                                          </Tooltip>
                                        </td>

                                        <td className="text-center">
                                          <Tooltip
                                            title={data?.payment_content_type === "shared" ? "Shared" : "Exclusive"}
                                          >
                                            <img
                                              src={data?.payment_content_type === "shared" ? shared : exclusiveic}
                                              className="tbl_ic"
                                              alt="camera"
                                            />
                                          </Tooltip>
                                        </td>

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.content_id?.category_id
                                                ?.name
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content_id?.category_id
                                                  ?.icon
                                              }
                                              className="tbl_ic"
                                              alt="Content category"
                                            />
                                          </Tooltip>
                                        </td>

                                        <td>
                                          <p
                                            className="ttl_prc "
                                            style={{
                                              textAlign: "right",
                                              marginRight: "5px",
                                            }}
                                          >
                                            {`£${formatAmountInMillion(data?.original_Vatamount + data?.original_ask_price)}`}
                                          </p>
                                        </td>
                                      </tr>
                                    }
                                  </tbody>
                                </table>

                                <div className="tble-subtotal">
                                  <div className="subtotal-list">
                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b> Subtotal</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {formatAmountInMillion(
                                          data?.amount -
                                          (data?.Vat ||
                                            data?.original_Vatamount)
                                        )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>VAT @20%</b>{" "}
                                      </span>
                                      <span>{`£${formatAmountInMillion(
                                        data?.Vat || data?.original_Vatamount
                                      )}`}</span>
                                    </div>

                                    <div className="sub-items amountBold">
                                      <span>
                                        {" "}
                                        <b>Total</b>{" "}
                                      </span>
                                      <span>{`£${formatAmountInMillion(
                                        data?.amount
                                      )}`}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Paid</b>{" "}
                                      </span>

                                      <span>{`£${formatAmountInMillion(
                                        data?.amount
                                      )}`}</span>
                                      {/* <span>£118</span> */}
                                    </div>

                                    <div className="sub-items amountBold">
                                      <span>
                                        {" "}
                                        <b>Balance due</b>{" "}
                                      </span>
                                      {/* <span>£{
                                        !promoCode?.off ?
                                          (+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)) + ((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)) / 5)
                                          :
                                          (appliedPromoodeValue((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)), promoCode.off) + (appliedPromoodeValue((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)), promoCode.off) / 5))
                                      }</span> */}
                                      <span>£0</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="download-invoice-container transactionBank_wrap trns_tbl me-4">
                <Button
                  className="theme-btn custom-ab mb-4 mt-2 py-3  sm_btn download-invoice-btn"
                  onClick={handleInvoiveDownload}
                >
                  Download Invoice
                </Button>
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

export default Invoice;
