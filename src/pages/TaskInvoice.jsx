import { Card, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import audioic from "../assets/images/audimg.svg";
import audioicon from "../assets/images/audio-icon.svg";
import calendericn from "../assets/images/calendarnic.svg";
import cameraic from "../assets/images/camera.svg";
import celebrity from "../assets/images/celebrity.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import pdfic from "../assets/images/pdfic.svg";
import docsic from "../assets/images/docsic.svg";
import prslogo from "../assets/images/presshop_new_logo.png";
import reuters from "../assets/images/reuters.png";
import shared from "../assets/images/share.png";
import videoic from "../assets/images/video.svg";
import stripeLogo from "../assets/images/stripe.png";
import contentVideo from "../assets/images/contentVideo.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import {formatAmountInMillion} from "../component/commonFunction"
const moment = require("moment");

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";

import DbFooter from "../component/DbFooter";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { UserDetails } from "../component/Utils";
import { useDarkMode } from "../context/DarkModeContext";
import {
  appliedPromoodeValue,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";

const TaskInvoice = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [taskData, setTaskData] = useState({});
  const [taskDataType, setTaskDataType] = useState("");

  const [promoCode, setPromoCode] = useState({
    value: "",
    code: "",
    show: false,
    error: "",
    off: "",
  });

  const { profileData } = useDarkMode();
  const param = useParams();
  const user = profileData;
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const taskContentId = searchParams.get("taskContentId");

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/getuploadedContentbyHoppers?_id=${param.id}&contentId=${taskContentId}`
      );
      setData(resp.data.data[0]);
      setTaskData(resp.data.data[0]);
      setTaskDataType(resp.data.data[0].type);

      setData(resp.data.data[0]?.task_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID();
  }, []);

  const claculatedFun = (amount) => {
    let val = +amount / 5;
    return val;
  };

  const paymentintents = async (curr) => {
    const amount_paid_for_payment =
      (+(taskDataType == "image"
        ? data?.hopper_photo_price
        : taskDataType == "video"
        ? data?.hopper_videos_price
        : taskDataType == "audio"
        ? data?.hopper_interview_price
        : 0) *
        100) /
      120;
    const obj1 = {
      image_id: param.id,
      customer_id: UserDetails.stripe_customer_id,
      amount:
        +data?.chatdata?.amount ||
        data?.content?.original_ask_price ||
        amount_paid_for_payment,
      type: "task",
      task_id: taskData.task_id._id,
      original_ask_price: +(taskDataType == "image"
        ? data?.hopper_photo_price
        : taskDataType == "video"
        ? data?.hopper_videos_price
        : taskDataType == "audio"
        ? data?.hopper_interview_price
        : 0),
      offer: false,
      is_charity: data?.content?.is_charity,
      charity: data?.content?.charity,
      description: data?.heading,
    };

    setLoading(true);
    try {
      const obj2 = {
        type: "uploaded_content",
        task_id: taskData?.task_id?._id,
        product_id: param?.id,
        amount_paid: amount_paid_for_payment,
        commission:
          +(taskDataType == "image"
            ? data?.hopper_photo_price
            : taskDataType == "video"
            ? data?.hopper_videos_price
            : taskDataType == "audio"
            ? data?.hopper_interview_price
            : 0) / 5,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);
      obj1.application_fee = resp1?.data?.data;
      obj1.stripe_account_id =
        resp1?.data?.stripe_account_id || data?.content?.stripe_account_id;

      if (promoCode.code) {
        obj1.coupon = promoCode?.code;
      }

      const resp = await Post("mediahouse/createPayment", obj1);
      setLoading(false);
      window.open(resp?.data?.url, "_blank");
    } catch (error) {
      setLoading(false);
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  function capitaliseLetterPromocode(value) {
    let result = "";
    if (value) {
      const data = value.trim().split("");
      for (let ele of data) {
        if (isNaN(ele) && typeof ele === "string") {
          result += ele.toUpperCase();
        } else {
          result += ele;
        }
      }

      return result;
    }
  }

  const checkPromoCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let promocodeValue = capitaliseLetterPromocode(promoCode.value);
      const resp = await Post("mediahouse/checkPromocode", {
        code: promocodeValue,
      });
      setPromoCode({
        ...promoCode,
        code: resp?.data?.data?.code,
        off: resp?.data?.data?.percent_off,
        show: false,
      });
      successToasterFun("Promocode applied successfully");
      setLoading(false);
    } catch (error) {
      setPromoCode({ ...promoCode, error: error?.response?.data?.message });
      successToasterFun(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("focus", () => {
      ContentByID();
    });
    return () =>
      window.removeEventListener("focus", () => {
        ContentByID();
      });
  }, []);

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
              <Row className="me-2">
                <Col md={12} className="dash-tabs-wrap pe-0">
                  <div className="dash-tabs invoice-lft">
                    <Row>
                      <Col md={6}>
                        <div className="prs-logo">
                          <img src={prslogo} alt="" />
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
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="text-end trans-id">
                          <p>
                            <span>
                              {" "}
                              <img src={calendericn} alt="" />{" "}
                            </span>
                            <span>{moment().format("DD MMM YYYY")}</span>
                          </p>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="ads-card">
                          <p className="from">From</p>

                          <h4>Presshop Media UK Limited</h4>
                          <p>
                            167-169, Great Portland Street, <br />
                            London, W1W 5PF
                          </p>
                          <p>Company # 13522872</p>
                          <p> VAT # 450 5678 83</p>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="ads-card">
                          <div className="myflex">
                            <span>
                              <p className="from">To</p>

                              <h4>{user?.company_name}</h4>
                            </span>

                            <span className="reuters">
                              <img src={user?.profile_image} alt="" />
                            </span>
                          </div>
                          <p>
                            {
                              user?.office_details?.[0]?.address
                                ?.complete_address
                            }{" "}
                            <br />
                            {user?.office_details?.[0]?.address?.pincode}
                          </p>
                          <p>Company # {user?.company_number}</p>
                          <p> VAT # {user?.company_vat}</p>
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
                                      <th className="text-center">Licence</th>
                                      <th className="text-center">Category</th>
                                      <th style={{ textAlign: "right" }}>
                                        Amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      <tr>
                                        <td
                                          className="content_img_td"
                                          onClick={() => {
                                            navigate(
                                              `/Feeddetail/content/${data?.content?._id}`
                                            );
                                          }}
                                        >
                                          <div className="tbl_cont_wrp">
                                            {data?.content[0]?.media_type ===
                                            "image" ? (
                                              <img
                                                src={
                                                  data?.content[0]?.watermark
                                                }
                                                className="cntnt-img"
                                                alt="img"
                                              />
                                            ) : data?.content[0]?.media_type ===
                                              "video" ? (
                                              <img
                                                src={
                                                  data?.content?.[0]?.thumbnail
                                                }
                                                className="cntnt-img"
                                              />
                                            ) : data?.content?.content[0]
                                                ?.media_type === "audio" ? (
                                              <img
                                                src={audioic}
                                                className="cntnt-img"
                                              />
                                            ) : data?.content[0]?.media_type ===
                                              "pdf" ? (
                                              <img
                                                src={docsic}
                                                className="cntnt-img"
                                              />
                                            ) : null}
                                            <span className="cont_count">
                                              {data?.content?.length || 0}
                                            </span>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="desc">
                                            <p>{data?.heading}</p>
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img
                                              src={watchic}
                                              className="icn_time"
                                            />
                                            {moment(data?.createdAt).format(
                                              "h:mm:A"
                                            )}
                                          </p>
                                          <p className="timedate">
                                            <img
                                              src={calendar}
                                              className="icn_time"
                                            />
                                            {moment(data?.createdAt).format(
                                              "DD MMM YYYY"
                                            )}
                                          </p>
                                        </td>

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.content[0]?.media_type ==
                                              "image"
                                                ? "Photo"
                                                : data?.content[0]
                                                    ?.media_type == "audio"
                                                ? "Audio"
                                                : data?.content[0]
                                                    ?.media_type == "video"
                                                ? "Video"
                                                : data?.content[0]
                                                    ?.media_type == "pdf"
                                                ? "Pdf"
                                                : "Scan"
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content[0]?.media_type ==
                                                "image"
                                                  ? cameraic
                                                  : data?.content[0]
                                                      ?.media_type == "audio"
                                                  ? audioicon
                                                  : data?.content[0]
                                                      ?.media_type == "pdf"
                                                  ? docsic
                                                  : data?.content[0]
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
                                            title={
                                              data?.type == "shared"
                                                ? "Shared"
                                                : "Exclusive"
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content?.type == "shared"
                                                  ? shared
                                                  : exclusiveic
                                              }
                                              className="tbl_ic"
                                              alt="camera"
                                            />
                                          </Tooltip>
                                        </td>

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              taskData?.category_details?.[0]
                                                ?.name
                                            }
                                          >
                                            <img
                                              src={
                                                taskData?.category_details?.[0]
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
                                            {`£${formatAmountInMillion(
                                              taskDataType == "image"
                                                ? data?.hopper_photo_price
                                                : taskDataType == "video"
                                                ? data?.hopper_videos_price
                                                : taskDataType == "audio"
                                                ? data?.hopper_interview_price
                                                : ""
                                            )}`}
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
                                        <b>Amount</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {formatAmountInMillion(
                                          taskDataType == "image"
                                            ? data?.hopper_photo_price
                                            : taskDataType == "video"
                                            ? data?.hopper_videos_price
                                            : taskDataType == "audio"
                                            ? data?.hopper_interview_price
                                            : ""
                                        )}
                                      </span>
                                    </div>

                                    {!promoCode?.code ? (
                                      <div
                                        className="sub-items justify-content-end"
                                        onClick={() =>
                                          setPromoCode({
                                            ...promoCode,
                                            show: !promoCode.show,
                                            error: "",
                                            code: "",
                                            off: "",
                                          })
                                        }
                                      >
                                        <span className="promo-cde">
                                          <b>
                                            {" "}
                                            Unlock savings! Enter your Promo
                                            Code here
                                          </b>
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="sub-items">
                                        <span>
                                          {" "}
                                          <b>Apply Promocode</b>{" "}
                                        </span>
                                        <span>{promoCode?.code}</span>
                                      </div>
                                    )}

                                    {promoCode.show ? (
                                      <>
                                        <form
                                          className="add-coupon"
                                          onSubmit={(e) => checkPromoCode(e)}
                                        >
                                          <InputGroup className="input-cupn">
                                            <Form.Control
                                              placeholder="Promo Code"
                                              aria-label="Recipient's username"
                                              aria-describedby="basic-addon2"
                                              onChange={(e) =>
                                                setPromoCode({
                                                  ...promoCode,
                                                  value: e.target.value,
                                                  error: "",
                                                  code: "",
                                                  off: "",
                                                })
                                              }
                                            />
                                            <span
                                              className="button-apply clickable"
                                              onClick={(e) => checkPromoCode(e)}
                                            >
                                              Apply
                                            </span>
                                          </InputGroup>
                                        </form>
                                      </>
                                    ) : null}

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Subtotal</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              taskDataType == "image"
                                                ? data?.hopper_photo_price
                                                : taskDataType == "video"
                                                ? data?.hopper_videos_price
                                                : taskDataType == "audio"
                                                ? data?.hopper_interview_price
                                                : 0
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0,
                                                promoCode.off
                                              )
                                            )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>VAT 20%</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              +(taskDataType == "image"
                                                ? data?.hopper_photo_price
                                                : taskDataType == "video"
                                                ? data?.hopper_videos_price
                                                : taskDataType == "audio"
                                                ? data?.hopper_interview_price
                                                : 0) / 5
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0),
                                                promoCode.off
                                              ) / 5
                                            )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Total</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              +(taskDataType == "image"
                                                ? data?.hopper_photo_price
                                                : taskDataType == "video"
                                                ? data?.hopper_videos_price
                                                : taskDataType == "audio"
                                                ? data?.hopper_interview_price
                                                : 0) +
                                                +(taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0) /
                                                  5
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0),
                                                promoCode.off
                                              ) +
                                                appliedPromoodeValue(
                                                  +(taskDataType == "image"
                                                    ? data?.hopper_photo_price
                                                    : taskDataType == "video"
                                                    ? data?.hopper_videos_price
                                                    : taskDataType == "audio"
                                                    ? data?.hopper_interview_price
                                                    : 0),
                                                  promoCode.off
                                                ) /
                                                  5
                                            )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Paid</b>{" "}
                                      </span>
                                      <span>£0</span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Balance due</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                              +(taskDataType == "image"
                                                ? data?.hopper_photo_price
                                                : taskDataType == "video"
                                                ? data?.hopper_videos_price
                                                : taskDataType == "audio"
                                                ? data?.hopper_interview_price
                                                : 0) +
                                                +(taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0) /
                                                  5
                                            )
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(taskDataType == "image"
                                                  ? data?.hopper_photo_price
                                                  : taskDataType == "video"
                                                  ? data?.hopper_videos_price
                                                  : taskDataType == "audio"
                                                  ? data?.hopper_interview_price
                                                  : 0),
                                                promoCode.off
                                              ) +
                                                appliedPromoodeValue(
                                                  +(taskDataType == "image"
                                                    ? data?.hopper_photo_price
                                                    : taskDataType == "video"
                                                    ? data?.hopper_videos_price
                                                    : taskDataType == "audio"
                                                    ? data?.hopper_interview_price
                                                    : 0),
                                                  promoCode.off
                                                ) /
                                                  5
                                            )}
                                      </span>
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
          <div className="pymnt-smry">
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col md={4}>
                <h4>Payment summary</h4>
                <p>
                  Payment of{" "}
                  <b>
                    £
                    {!promoCode?.off
                      ? formatAmountInMillion(
                          +(taskDataType == "image"
                            ? data?.hopper_photo_price
                            : taskDataType == "video"
                            ? data?.hopper_videos_price
                            : taskDataType == "audio"
                            ? data?.hopper_interview_price
                            : 0) +
                            +(taskDataType == "image"
                              ? data?.hopper_photo_price
                              : taskDataType == "video"
                              ? data?.hopper_videos_price
                              : taskDataType == "audio"
                              ? data?.hopper_interview_price
                              : 0) /
                              5
                        )
                      : formatAmountInMillion(
                          appliedPromoodeValue(
                            +(taskDataType == "image"
                              ? data?.hopper_photo_price
                              : taskDataType == "video"
                              ? data?.hopper_videos_price
                              : taskDataType == "audio"
                              ? data?.hopper_interview_price
                              : 0),
                            promoCode.off
                          ) +
                            appliedPromoodeValue(
                              +(taskDataType == "image"
                                ? data?.hopper_photo_price
                                : taskDataType == "video"
                                ? data?.hopper_videos_price
                                : taskDataType == "audio"
                                ? data?.hopper_interview_price
                                : 0),
                              promoCode.off
                            ) /
                              5
                        )}{" "}
                    (inc VAT){" "}
                  </b>{" "}
                  to Presshop Media UK Limited towards purchase of content
                  listed in the invoice particulars
                </p>
              </Col>

              <Col md={4}>
                <Button
                  variant=""
                  className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                  onClick={() => paymentintents(data)}
                >
                  <span>
                    Pay £
                    {!promoCode?.off
                      ? formatAmountInMillion(
                          +(taskDataType == "image"
                            ? data?.hopper_photo_price
                            : taskDataType == "video"
                            ? data?.hopper_videos_price
                            : taskDataType == "audio"
                            ? data?.hopper_interview_price
                            : 0) +
                            +(taskDataType == "image"
                              ? data?.hopper_photo_price
                              : taskDataType == "video"
                              ? data?.hopper_videos_price
                              : taskDataType == "audio"
                              ? data?.hopper_interview_price
                              : 0) /
                              5
                        )
                      : formatAmountInMillion(
                          appliedPromoodeValue(
                            +(taskDataType == "image"
                              ? data?.hopper_photo_price
                              : taskDataType == "video"
                              ? data?.hopper_videos_price
                              : taskDataType == "audio"
                              ? data?.hopper_interview_price
                              : 0),
                            promoCode.off
                          ) +
                            appliedPromoodeValue(
                              +(taskDataType == "image"
                                ? data?.hopper_photo_price
                                : taskDataType == "video"
                                ? data?.hopper_videos_price
                                : taskDataType == "audio"
                                ? data?.hopper_interview_price
                                : 0),
                              promoCode.off
                            ) /
                              5
                        )}
                  </span>
                </Button>
              </Col>
            </Row>

            <p className="pls-rfr">
              Please refer to{" "}
              <b
                onClick={() => navigate("/terms-and-conditions")}
                style={{ cursor: "pointer" }}
              >
                terms and conditions.
              </b>{" "}
              If you have any question regarding the invoice, please{" "}
              <b
                onClick={() => navigate("/contact-us-post")}
                style={{ cursor: "pointer" }}
              >
                contact
              </b>{" "}
              our helpful teams who are available 24x7 to assist you. Thank you
            </p>

            <p className="end-stripe">
              <span>Payment securely processed by</span>
              <span>
                <img src={stripeLogo} alt="" />
              </span>
            </p>
          </div>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default TaskInvoice;
