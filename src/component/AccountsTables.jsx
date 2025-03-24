import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Card, Typography, Button } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsEye,
} from "react-icons/bs";
import audioic from "../assets/images/audimgsmall.svg";
import watch from "../assets/images/watch.svg";
import calendar from "../assets/images/calendar.svg";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import camera from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import idimg from "../assets/images/celebrity.svg";
import Header from "./Header";
import locationimg from "../assets/images/locationimg.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";
import { Get } from "../services/user.services";
import moment from "moment/moment";
import contimg1 from "../assets/images/Contentdetail/contentimg2.png";
import contimg2 from "../assets/images/Contentdetail/content3.png";
import contimg3 from "../assets/images/Contentdetail/contentbg.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import Loader from "./Loader";
import { accountTotalFundInvestedContentPurchase, formatAmountInMillion } from "./commonFunction";

const AccountsTables = () => {
  const [detail, setDetails] = useState()
  const [vatData, setVat] = useState()
  const [purchaseContent, setPurchaseContent] = useState()
  const [task_purchaseContent, setTask_PurchaseContent] = useState()
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const getVatSummary = async () => {
    try {
      const res = await Get(`mediahouse/paymenttobemade`);
      if (res) {
        setVat(res?.data)
      }
    } catch (error) {
    }
  }

  const getContentPurchaseSummary = async () => {
    try {
      const res = await Get(`mediahouse/contentPurchasedOnlinesummary`)
      const totalFundInvested = await Get(`mediahouse/taskPurchasedOnlinesummary`);
      if (res) {
        setTask_PurchaseContent(totalFundInvested?.data?.response)
        const newData = accountTotalFundInvestedContentPurchase(res?.data?.response)
        setPurchaseContent(newData)
      }

    } catch (error) {

    }
  }


  const ReportCount = async () => {
    try {
      setLoading(true)
      const resp = await Get(`mediahouse/Account/count`);
      if (resp) {
        setDetails(resp.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [totalDetail, setTotalDetail] = useState([]);
  const totalData = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const resp = await Get(`mediahouse/taskPurchasedOnlinesummary?${paramName}=${param}`);
      setTotalDetail(accountTotalFundInvestedContentPurchase(resp?.data?.response));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ReportCount()
    getVatSummary()
    getContentPurchaseSummary()
    totalData()
  }, [])

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link className="back_link mb-3" onClick={() => window.history.back()}>
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>

              <div className="tbl_wrap_cmn">
                {param.type === "total_content_purchase" ?
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Total contents purchased online
                        </Typography>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table les_colm"
                        >
                          <thead>
                            <tr>
                              <th className="">Content purchased online</th>
                              <th>Purchased date</th>
                              <th>Net price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail && detail?.content_online?.task?.sort((a, b) => {
                              const timeA = new Date(
                                a?.content_id?.Vat?.find((el) => el.purchased_mediahouse_id === JSON.parse(localStorage.getItem("user"))?._id)?.purchased_time
                              );
                              const timeB = new Date(
                                b?.content_id?.Vat?.find((el) => el.purchased_mediahouse_id === JSON.parse(localStorage.getItem("user"))?._id)?.purchased_time
                              );
                              return timeB - timeA;
                            })?.map((curr) => {
                              return (
                                <tr className="clickable" onClick={() => navigate(`/purchased-content-detail/${curr?._id}`)} >
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content_id?.content && curr?.content_id?.content?.map((curr) => {
                                          return (
                                            curr?.media_type === "image" ? <img src={curr?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                              : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                  : null
                                          )
                                        })}

                                        <span className="arrow_span">
                                          <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                            ></path>
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={calendar} className="icn_time" />
                                      {moment(curr?.content_id?.Vat?.find((el) => el.purchased_mediahouse_id == JSON.parse(localStorage.getItem("user"))?._id)?.purchased_time)?.format("DD MMM YYYY")}
                                    </p>
                                  </td>
                                  <td>£{formatAmountInMillion(curr?.amount - (curr?.Vat || curr?.original_Vatamount))}</td>
                                  <td>£{formatAmountInMillion((curr?.Vat || curr?.original_Vatamount))}</td>
                                  <td>£{formatAmountInMillion(curr?.amount)}</td>
                                </tr>
                              )
                            })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card> : param.type === "total_funds" ?


                    <Card className="tbl_crd">
                      <div className="">
                        <div
                          className="d-flex justify-content-between align-items-center tbl_hdr"
                          px="20px"
                          mb="10px"
                        >
                          <Typography className="tbl_hdng">
                            Total funds invested for content purchased online
                          </Typography>
                        </div>
                        <div className="fix_ht_table">
                          <table
                            width="100%"
                            mx="20px"
                            variant="simple"
                            className="common_table les_colm"
                          >
                            <thead>
                              <tr>
                                <th className="">Content purchased online</th>
                                <th>Period</th>
                                <th>Nett price paid</th>
                                <th>VAT paid</th>
                                <th>Total funds invested</th>
                              </tr>
                            </thead>
                            <tbody>
                              {purchaseContent?.map((curr) => {
                                return (
                                  <tr className="clickable">
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id[0] && curr?.content_id[0]?.content?.slice(0, 5).map((curr) => {
                                            return (
                                              curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                  : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                    : null
                                            )
                                          })}

                                          <span className="arrow_span">
                                            <svg
                                              stroke="currentColor"
                                              fill="currentColor"
                                              stroke-width="0"
                                              viewBox="0 0 16 16"
                                              height="1em"
                                              width="1em"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={calendar} className="icn_time" />
                                        {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                      </p>
                                    </td>
                                    <td>£{formatAmountInMillion(curr?.total_price - curr?.total_vat || 0)}</td>
                                    <td>£{formatAmountInMillion(curr?.total_vat || 0)}</td>
                                    <td>£{formatAmountInMillion(curr?.total_price || 0)}</td>
                                  </tr>

                                )
                              })

                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card> : param.type === "total_content" ?

                      <Card className="tbl_crd">
                        <div className="">
                          <div
                            className="d-flex justify-content-between align-items-center tbl_hdr"
                            px="20px"
                            mb="10px"
                          >
                            <Typography className="tbl_hdng">
                              Total content purchased from tasks
                            </Typography>
                          </div>
                          <div className="fix_ht_table">
                            <table
                              width="100%"
                              mx="20px"
                              variant="simple"
                              className="common_table les_colm"
                            >
                              <thead>
                                <tr>
                                  <th className="">Content uploaded from tasks</th>
                                  <th>Period</th>
                                  <th>Total funds invested</th>
                                </tr>
                              </thead>
                              <tbody>

                                {totalDetail?.map((curr, index) => {
                                  return (
                                    <tr className="clickable" >
                                      <td className="content_wrap more_contnt_wrap">
                                        <div className="content_imgs_wrap">
                                          <div className="content_imgs">
                                            {curr?.content_id.map((curr) => {
                                              return curr?.type === "image" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_UPLOADED_CONTENT +
                                                    curr?.imageAndVideo
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.type === "audio" ? (
                                                <img
                                                  src={interviewic}
                                                  className="content_img"
                                                />
                                              ) : curr?.type === "video" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_UPLOADED_CONTENT +
                                                    curr?.videothubnail
                                                  }
                                                  className="content_img"
                                                />
                                              ) : null;
                                            })}
                                            <span className="arrow_span">
                                              <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                ></path>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img
                                            src={calendar}
                                            className="icn_time"
                                          />
                                          {months[curr?._id?.month - 1]}{" "}
                                          {curr?._id?.year}
                                        </p>
                                      </td>
                                      <td>£{formatAmountInMillion(+(curr?.total_price))}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Card> : param.type === "total_funds_sourced" ?

                        <Card className="tbl_crd">
                          <div className="">
                            <div
                              className="d-flex justify-content-between align-items-center tbl_hdr"
                              px="20px"
                              mb="10px"
                            >
                              <Typography className="tbl_hdng">
                                Total funds invested for content purchased from task
                              </Typography>
                            </div>
                            <div className="fix_ht_table">
                              <table
                                width="100%"
                                mx="20px"
                                variant="simple"
                                className="common_table les_colm"
                              >
                                <thead>
                                  <tr>
                                    <th className="">Content uploaded from tasks</th>
                                    <th>Period</th>
                                    <th>Nett price paid</th>
                                    <th>VAT paid</th>
                                    <th>Total funds invested</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {task_purchaseContent?.map((curr) => {
                                    return (
                                      <tr className="clickable">
                                        <td className="content_wrap more_contnt_wrap">
                                          <div className="content_imgs_wrap">
                                            <div className="content_imgs">
                                              {curr?.content_id.map((curr) => {
                                                return curr?.type === "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_UPLOADED_CONTENT +
                                                      curr?.imageAndVideo
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.type === "audio" ? (
                                                  <img
                                                    src={interviewic}
                                                    className="content_img"
                                                  />
                                                ) : curr?.type === "video" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_UPLOADED_CONTENT +
                                                      curr?.videothubnail
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : null;
                                              })}
                                              <span className="arrow_span">
                                                <svg
                                                  stroke="currentColor"
                                                  fill="currentColor"
                                                  stroke-width="0"
                                                  viewBox="0 0 16 16"
                                                  height="1em"
                                                  width="1em"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    fill-rule="evenodd"
                                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                  ></path>
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img src={calendar} className="icn_time" />
                                            {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                          </p>
                                        </td>
                                        <td>£{formatAmountInMillion((curr?.total_price - curr?.total_vat) || 0)}</td>
                                        <td>£{formatAmountInMillion((curr?.total_vat) || 0)}</td>
                                        <td>£{formatAmountInMillion((curr?.total_price) || 0)}</td>
                                      </tr>

                                    )
                                  })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Card> : param.type === "pending_payments" ?

                          <Card className="tbl_crd">
                            <div className="">
                              <div
                                className="d-flex justify-content-between align-items-center tbl_hdr"
                                px="20px"
                                mb="10px"
                              >
                                <Typography className="tbl_hdng">
                                  Pending payments
                                </Typography>
                              </div>
                              <div className="fix_ht_table">
                                <table
                                  width="100%"
                                  mx="20px"
                                  variant="simple"
                                  className="common_table les_colm">
                                  <thead>
                                    <tr>
                                      <th className="">Content</th>
                                      <th>Time & date</th>
                                      <th>Net price payable</th>
                                      <th>VAT payable</th>
                                      <th>Total funds payable</th>
                                      <th>CTA</th>
                                    </tr>
                                  </thead>
                                  <tbody>

                                    {
                                      vatData && vatData?.data?.map((curr) => {
                                        const contentSource =
                                          curr && curr.content[0]
                                            ? curr.content[0].media_type ===
                                              "video"
                                              ? curr.content[0].watermark ||
                                              process.env.REACT_APP_CONTENT_MEDIA +
                                              curr.content[0].thumbnail
                                              : curr.content[0]
                                                .media_type === "audio"
                                                ? audioic
                                                : curr.content[0]
                                                  .media_type === "image"
                                                  ? curr.content[0].watermark ||
                                                  process.env.REACT_APP_CONTENT_MEDIA +
                                                  curr.content[0].media
                                                  : curr.content[0]
                                                    .media_type === "doc"
                                                    ? docsic
                                                    : null
                                            : null;

                                        return (
                                          <tr className="clickable" onClick={() => navigate(`/auto-invoice/${curr?._id}`)}>
                                            <td className="content_img_td position-relative add-icons-box">
                                              <div className="tbl_cont_wrp cnt_online_img noGrid">
                                                <div className="paymentToBeMadeImgContent">
                                                  <img
                                                    src={contentSource}
                                                    className="content_img"
                                                  />
                                                </div>
                                              </div>
                                              <div className="tableContentTypeIcons">
                                                <div class="post_icns_cstm_wrp camera-ico">
                                                  <div class="post_itm_icns dtl_icns">
                                                    <span class="count">{curr?.content?.length || 0}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img src={calendar} className="icn_time" />
                                                {`${moment(curr?.createdAt).format("DD MMM YYYY")}`}
                                                <br />
                                                {moment(curr?.createdAt).format("hh:mm A")}
                                              </p>
                                            </td>
                                            <td>£{formatAmountInMillion(+(vatData?.chatdata?.find((el) => el?.image_id == curr?._id)?.amount || 0))}</td>
                                            <td>£{formatAmountInMillion((20 * (+(vatData?.chatdata?.find((el) => el?.image_id == curr?._id)?.amount))) / 100)}</td>
                                            <td>£{formatAmountInMillion((+(vatData?.chatdata?.find((el) => el?.image_id == curr?._id)?.amount || 0)) + (+(20 * (+(vatData?.chatdata?.find((el) => el?.image_id == curr?._id)?.amount))) / 100))}</td>
                                            <td><span className="payPending" onClick={() => navigate(`/auto-invoice/${curr?.id}`)}>Pay</span></td>
                                          </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Card> : param.type === "content_purchase_online" ?

                            <Card className="tbl_crd">
                              <div className="">
                                <div
                                  className="d-flex justify-content-between align-items-center tbl_hdr"
                                  px="20px"
                                  mb="10px"
                                >
                                  <Typography className="tbl_hdng">
                                    Content purchased online summary
                                  </Typography>
                                  <div className="tbl_rt">
                                  </div>
                                </div>
                                <div className="fix_ht_table">
                                  <table
                                    width="100%"
                                    mx="20px"
                                    variant="simple"
                                    className="common_table les_colm"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="">Content</th>
                                        <th>Period</th>
                                        <th>Volume</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                      {purchaseContent && purchaseContent.map((curr) => {
                                        return (
                                          <tr className="clickable">
                                            <td className="content_wrap more_contnt_wrap">
                                              <div className="content_imgs_wrap">
                                                <div className="content_imgs">
                                                  {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                    return (
                                                      curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                        : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                          : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                            : null
                                                    )
                                                  })}

                                                  <span className="arrow_span">
                                                    <svg
                                                      stroke="currentColor"
                                                      fill="currentColor"
                                                      stroke-width="0"
                                                      viewBox="0 0 16 16"
                                                      height="1em"
                                                      width="1em"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        fill-rule="evenodd"
                                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                      ></path>
                                                    </svg>
                                                  </span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="timedate_wrap">
                                              <p className="timedate">
                                                <img src={calendar} className="icn_time" />
                                                {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                              </p>
                                            </td>
                                            <td>{curr?.volume}</td>
                                          </tr>

                                        )
                                      })
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Card> : param.type === "vat-data" ?

                              <Card className="tbl_crd">
                                <div className="">
                                  <div
                                    className="d-flex justify-content-between align-items-center tbl_hdr"
                                    px="20px"
                                    mb="10px"
                                  >
                                    <Typography className="tbl_hdng">VAT summary</Typography>
                                    <div className="tbl_rt">
                                    </div>
                                  </div>
                                  <div className="fix_ht_table">
                                    <table
                                      width="100%"
                                      mx="20px"
                                      variant="simple"
                                      className="common_table les_colm"
                                    >
                                      <thead>
                                        <tr>
                                          <th className="">Content</th>
                                          <th>Period</th>
                                          <th>Nett price paid</th>
                                          <th>VAT paid</th>
                                          <th>Total funds invested</th>
                                        </tr>
                                      </thead>
                                      <tbody>

                                        {vatData && vatData?.data?.map((curr) => {
                                          return (
                                            <tr className="clickable">
                                              <td className="content_wrap more_contnt_wrap">
                                                <div className="content_imgs_wrap">
                                                  <div className="content_imgs">
                                                    {curr?.content_id[0] && curr?.content_id[0]?.content?.map((curr) => {
                                                      return (
                                                        curr?.media_type === "image" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} className="content_img" />
                                                          : curr?.media_type === "video" ? <img src={process.env.REACT_APP_CONTENT_MEDIA + curr?.thumbnail} className="content_img" />
                                                            : curr?.media_type === "audio" ? <img src={audioic} className="content_img" />
                                                              : null
                                                      )
                                                    })}

                                                    <span className="arrow_span">
                                                      <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        stroke-width="0"
                                                        viewBox="0 0 16 16"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          fill-rule="evenodd"
                                                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                        ></path>
                                                      </svg>
                                                    </span>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="timedate_wrap">
                                                <p className="timedate">
                                                  <img src={calendar} className="icn_time" />
                                                  {months[curr?._id?.month - 1]}  {curr?._id?.year}
                                                </p>
                                              </td>
                                              <td>£{((curr?.total_price - curr?.total_vat) || 0).toFixed(2)}</td>
                                              <td>£{((curr?.total_vat) || 0).toFixed(2)}</td>
                                              <td>£{((curr?.total_price) || 0).toFixed(2)}</td>

                                            </tr>

                                          )
                                        })
                                        }
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </Card> : null}

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(AccountsTables);
