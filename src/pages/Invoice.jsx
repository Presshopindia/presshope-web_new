import { Card, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import logo from "../assets/images/presshop_new_logo.png";
import html2pdf from "html2pdf.js";

// presshopinvoice
import { Link, useNavigate, useParams } from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import calendericn from "../assets/images/calendarnic.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import docsic from "../assets/images/docsic.svg";
import interviewic from "../assets/images/interview.svg";
import shared from "../assets/images/share.png";
import videoic from "../assets/images/video.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import DbFooter from "../component/DbFooter";

import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { Get } from "../services/user.services";
import { formatAmountInMillion } from "../component/commonFunction";
import moment from "moment";

const Invoice = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const [contentImage, setContentImage] = useState("");

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

  const getMediaType = (type) => {
    const mediaType = data?.type === "content" ? data?.content_id?.content?.filter(
      (item) =>
        item.media_type === type
    ) : data?.purchased_task_content?.filter(
      (item) =>
        item.type === type
    );
    return mediaType?.length || 0;
  }

  function getPreviewSrc(data) {
    if (!data) return null;

    if (data.type === "content") {
      const mediaObj = data?.content_id?.content?.[0];
      if (!mediaObj) return null;

      switch (mediaObj.media_type) {
        case "image":
          return {media: process.env.REACT_APP_CONTENT_MEDIA + mediaObj.media, mediaVal: mediaObj.media, mediType: mediaObj.media_type};
        case "video":
          return {media: process.env.REACT_APP_THUMBNAIL + mediaObj.media, mediaVal: mediaObj.media, mediType: mediaObj.media_type};
        case "audio":
          return {media: audioic, mediaVal: audioic, mediType: mediaObj.media_type};
        case "pdf":
          return {media: docsic, mediaVal: docsic, mediType: mediaObj.media_type};
        default:
          return {media: audioic, mediaVal: audioic, mediType: mediaObj.media_type};
      }
    }

    const purchased = data?.purchased_task_content?.[0];
    if (!purchased) return null;

    
    if (["image", "video"].includes(purchased.type)) {
      return {media: purchased.videothubnail, mediaVal: purchased.videothubnail, mediType: purchased.type};
    }
    return {media: audioic, mediaVal: audioic, mediType: "audio"};
  }

  const previewSrc = useMemo(() => getPreviewSrc(data), [data]);


  const handleDownload = () => {
    const element = invoiceRef.current;

    const opt = {
      margin: 0,
      filename: new Date().getTime() + "_invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    if (previewSrc?.media && (previewSrc?.mediType === "image" || previewSrc?.mediType === "video")) {
      setContentImage(`${process.env.REACT_APP_BASE_URL}mediaHouse/proxy?path=${previewSrc?.media}`)
    } else {
      setContentImage(previewSrc?.media);
    }
  }, [previewSrc?.media, contentImage, data]);

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
                  <div className="dash-tabs invoice-lft" ref={invoiceRef} id="invoice-section">
                    <Row>
                      <Col md={6}>
                        <div className="ftr-left">
                          <img
                            src={logo}
                            alt="PressHop"
                            className="footer-logo"
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end invce-num">
                          <h1 className="">Invoice</h1>
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
                                      {
                                        data?.type === "content" && (
                                          <th className="text-center">Licence</th>
                                        )
                                      }
                                      <th className="text-center">Category</th>
                                      <th style={{ textAlign: "right" }}>
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      <tr>
                                        <td className="content_img_td position-relative add-icons-box clickable" onClick={() => {
                                          navigate(data?.type === "content" ? `/purchased-content-detail/${id}` : `/purchased-task-content-detail/${id}`);
                                        }}>
                                          <div className="tbl_cont_wrp cnt_online_img noGrid">
                                            <div className="paymentToBeMadeImgContent">
                                              <img
                                                src={contentImage}
                                                className="cntnt-img"
                                                crossOrigin="anonymous"
                                                alt="img"
                                              />
                                            </div>
                                          </div>
                                          <div className="tableContentTypeIcons">
                                            <div className="post_icns_cstm_wrp camera-ico">
                                              <div className="post_itm_icns dtl_icns">
                                                <span className="count">{data?.type === "content" ? data?.content_id?.content?.length : data?.type === "task_content" ? data?.purchased_task_content?.length : 0}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="desc">
                                            <p>{data?.type === "content" ? data?.content_id?.heading : data?.task_id?.heading}</p>
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img
                                              src={watchic}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.createdAt
                                            ).format("h:mm:A")}
                                          </p>
                                          <p className="timedate">
                                            <img
                                              src={calendar}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.createdAt
                                            ).format("DD MMM YYYY")}
                                          </p>
                                        </td>

                                        <td className="text-center">
                                          <div className="">
                                            {getMediaType("image") ? (
                                              <Tooltip title="Photo">
                                                <img
                                                  src={cameraic}
                                                  alt="Photo"
                                                  className="icn"
                                                />{" "}
                                                <br />
                                              </Tooltip>
                                            ) : null}
                                            {getMediaType("video") ? (
                                              <Tooltip title="Video">
                                                {" "}
                                                <img
                                                  src={videoic}
                                                  alt="Video"
                                                  className="icn"
                                                />
                                                <br />
                                              </Tooltip>
                                            ) : null}
                                            {getMediaType("audio") ? (
                                              <Tooltip title="Audio">
                                                <img
                                                  src={interviewic}
                                                  alt="Audio"
                                                  className="icn"
                                                />
                                              </Tooltip>
                                            ) : null}
                                            {getMediaType("pdf") ? (
                                              <Tooltip title="Pdf">
                                                <img
                                                  src={docsic}
                                                  alt="Pdf"
                                                  className="icn"
                                                />
                                              </Tooltip>
                                            ) : null}
                                          </div>
                                        </td>

                                        {
                                          data?.type === "content" && (
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
                                          )
                                        }

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.type === "content" ? data?.content_id?.category_id
                                                ?.name : data?.task_id?.category_id?.name
                                            }
                                          >
                                            <img
                                              src={
                                                data?.type === "content" ? `${process.env.REACT_APP_BASE_URL}mediaHouse/proxy?path=${data?.content_id?.category_id?.icon}` : `${process.env.REACT_APP_BASE_URL}mediaHouse/proxy?path=${data?.task_id?.category_id?.icon}`
                                              }
                                              crossOrigin="anonymous"
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
                                            {`£${formatAmountInMillion(data?.amount || 0)}`}
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
                                        {formatAmountInMillion(data?.amount || 0)}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>VAT @20%</b>{" "}
                                      </span>
                                      <span>{`£${formatAmountInMillion(data?.Vat || 0)}`}</span>
                                    </div>

                                    <div className="sub-items amountBold">
                                      <span>
                                        {" "}
                                        <b>Total</b>{" "}
                                      </span>
                                      <span>{`£${formatAmountInMillion((data?.amount + data?.Vat) || 0)}`}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Paid</b>{" "}
                                      </span>

                                      <span>{`£${formatAmountInMillion((data?.amount + data?.Vat) || 0)}`}</span>
                                    </div>

                                    <div className="sub-items amountBold">
                                      <span>
                                        {" "}
                                        <b>Balance due</b>{" "}
                                      </span>
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
          <div className="download-invoice-container">
            <div className="dash-tabs-wrap text-end col-md-12">
              <div className="">
                <Button
                  className="theme-btn custom-ab mb-4 mt-2 sm_btn download-invoice-btn"
                  onClick={handleDownload}
                >
                  Download Invoice
                </Button>
              </div>
            </div>

          </div>
          <div className="mt-0">
            <TopSearchesTipsCard dashboard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Invoice;
