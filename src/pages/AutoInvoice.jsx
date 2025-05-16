import { Card, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import contentCamera from "../assets/images/contentCamera.svg";
import interviewic from "../assets/images/interview.svg";
// import {formatAmountInMillion} from "../component/commonFunction"
const moment = require("moment");

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import DbFooter from "../component/DbFooter";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { UserDetails } from "../component/Utils";
import { Post } from "../services/user.services";
import { useDarkMode } from "../context/DarkModeContext";
import {
  appliedPromoodeValue,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
import { toast } from "react-toastify";

const AutoInvoice = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [promoCode, setPromoCode] = useState({
    value: "",
    code: "",
    show: false,
    error: "",
    off: "",
  });

  console.log("promoCode", promoCode)
  const { profileData } = useDarkMode();
  const user = profileData;

  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/view/published/content`, {
        id: id,
      });
      setLoading(false);
      setData(resp.data);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID();
  }, []);

  const claculatedFun = (amount) => {
    // let val = (20 * (+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price))) / 100;
    let val = +amount / 5;
    return val;
  };

  const paymentintents = async (curr) => {
    console.log(UserDetails, "hello payment  ", UserDetails);
    console.log(UserDetails, "hello payment data ", data);
    console.log("payment_content", curr);
    const obj1 = {
      image_id: curr?.content?._id,
      customer_id: UserDetails.stripe_customer_id,
      // amount: +(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price),
      amount:
        +data?.chatdata?.amount ||
        data?.content?.original_ask_price ||
        +(data?.chatdata?.amount
          ? data?.chatdata?.amount
          : data?.content?.ask_price),
      type: curr.hasOwnProperty("content") ? "content" : "task",
      original_ask_price: data?.content?.original_ask_price,
      offer: data?.chatdata?.amount || promoCode?.code ? true : false,
      is_charity: data?.content?.is_charity,
      charity: data?.content?.charity,
      description: data?.content?.heading
    };

    setLoading(true);
    try {
      const obj2 = {
        type: "content",
        product_id: curr?.content?._id,
        amount_paid:
          +data?.chatdata?.amount ||
          data?.content?.original_ask_price ||
          +(data?.chatdata?.amount
            ? data?.chatdata?.amount
            : data?.content?.ask_price),
        commission:
          +(data?.chatdata?.amount || data?.content?.original_ask_price) / 5,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);
      obj1.application_fee = resp1?.data?.data;
      // obj1.stripe_account_id = data?.content?.is_charity
      //   ? data?.content?.stripe_account_id
      //   : resp1?.data?.stripe_account_id;
      obj1.stripe_account_id =
        resp1?.data?.stripe_account_id || data?.content?.stripe_account_id;

      // Add coupon code
      if (promoCode.code) {
        obj1.coupon = promoCode.code;
        obj1.promocodePercentOff = promoCode.off,
          obj1.promocodeValue = promoCode.off,
          obj1.amount = appliedPromoodeValue(+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price), promoCode.off)
      }

      const resp = await Post("mediahouse/createPayment", obj1);
      setLoading(false);
      window.open(resp.data.url, "_blank");
    } catch (error) {
      setLoading(false);
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  function capitaliseLetterPromocode(value) {
    let result = "";
    if (value) {
      const data = value.trim().split("");
      console.log(data);
      for (let ele of data) {
        // Check if the character is not a number using isNaN()
        if (isNaN(ele) && typeof ele === "string") {
          // Convert non-numeric characters to uppercase
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
      // console.log("promocodeValue",promocodeValue);
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
    if (
      data &&
      data?.content?.purchased_mediahouse.find(
        (el) => el === JSON.parse(localStorage.getItem("user"))?._id
      )
    ) {
      navigate("/");
      window.location.reload();
    }
  }, [data, navigate]);

  useEffect(() => {
    window.addEventListener("focus", () => {
      ContentByID();
    });
    return () =>
      window.removeEventListener("focus", () => {
        ContentByID();
      });
  }, []);
  
  const getMediaType = (type) => {
    const mediaType = data?.content?.content?.filter(
      (item) =>
        item.media_type === type
    );
    return mediaType?.length || 0;
  }

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
                          {/* <p>Invoice # PH 672321</p> */}
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
                        <div className="ads-card invoiceToCard">
                          <div className="myflex">
                            <span>
                              <p className="from">To</p>

                              <h4>{user?.company_name || user?.media_house_id?.company_name}</h4>
                            </span>

                            <span className="reuters">
                              <img src={user?.profile_image || user?.media_house_id?.profile_image} alt="" />
                            </span>
                          </div>
                          <p>
                            {user?.office_details?.[0]?.address?.complete_address || user?.media_house_id?.office_details?.[0]?.address?.complete_address}
                            {" "}
                            <br />
                            {user?.office_details?.[0]?.address?.pincode || user?.media_house_id?.office_details?.[0]?.address?.pincode}
                          </p>
                          <p>Company # {user?.company_number || user?.media_house_id?.company_number}</p>
                          <p> VAT # {user?.company_vat || user?.media_house_id?.company_vat}</p>
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
                                        <td className="content_img_td position-relative add-icons-box" onClick={() => {
                                          navigate(
                                            `/Feeddetail/content/${data?.content?._id}`
                                          );
                                        }}>
                                          <div className="tbl_cont_wrp cnt_online_img noGrid">
                                            <div className="paymentToBeMadeImgContent">
                                              {data?.content?.content[0]
                                                ?.media_type === "image" ? (
                                                <img
                                                  src={process.env.REACT_APP_CONTENT_MEDIA + 
                                                    data?.content?.content[0]
                                                      ?.media
                                                  }
                                                  className="cntnt-img"
                                                  alt="img"
                                                />
                                              ) : data?.content?.content[0]
                                                ?.media_type === "video" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_THUMBNAIL +
                                                    data?.content?.content?.[0]
                                                      ?.media
                                                  }
                                                  className="cntnt-img"
                                                />
                                              ) : data?.content?.content[0]
                                                ?.media_type === "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="content_img"
                                                />
                                              ) : data?.content?.content[0]
                                                ?.media_type === "pdf" ? (
                                                <img
                                                  src={docsic}
                                                  className="cntnt-img"
                                                />
                                              ) : null}
                                            </div>
                                          </div>
                                          <div className="tableContentTypeIcons">
                                            <div className="post_icns_cstm_wrp camera-ico">
                                              <div className="post_itm_icns dtl_icns">
                                                <span className="count">{data?.content?.content?.length || 0}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="desc">
                                            <p>{data?.content?.heading}</p>
                                          </div>
                                        </td>
                                        <td className="timedate_wrap">
                                          <p className="timedate">
                                            <img
                                              src={watchic}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.content?.createdAt
                                            ).format("h:mm:A")}
                                          </p>
                                          <p className="timedate">
                                            <img
                                              src={calendar}
                                              className="icn_time"
                                            />
                                            {moment(
                                              data?.content?.createdAt
                                            ).format("DD MMM YYYY")}
                                          </p>
                                        </td>

                                        {/* <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.content?.content[0]
                                                ?.media_type == "image"
                                                ? "Photo"
                                                : data?.content?.content[0]
                                                  ?.media_type == "audio"
                                                  ? "Audio"
                                                  : data?.content?.content[0]
                                                    ?.media_type == "video"
                                                    ? "Video"
                                                    : data?.content?.content[0]
                                                      ?.media_type == "pdf"
                                                      ? "Pdf"
                                                      : "Scan"
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content?.content[0]
                                                  ?.media_type == "image"
                                                  ? cameraic
                                                  : data?.content?.content[0]
                                                    ?.media_type == "audio"
                                                    ? audioicon
                                                    : data?.content?.content[0]
                                                      ?.media_type == "pdf"
                                                      ? docsic
                                                      : data?.content?.content[0]
                                                        ?.media_type == "video"
                                                        ? videoic
                                                        : null
                                              }
                                              className="tbl_ic"
                                              alt="camera"
                                            />
                                          </Tooltip>
                                        </td> */}
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

                                        <td className="text-center">
                                          <Tooltip
                                            title={
                                              data?.content?.type == "shared"
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
                                              data?.content?.category_id?.name
                                            }
                                          >
                                            <img
                                              src={
                                                data?.content?.category_id?.icon
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
                                              data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price
                                            )}`}
                                          </p>
                                        </td>
                                      </tr>
                                    }
                                  </tbody>
                                </table>

                                <div className="tble-subtotal">
                                  <div className="subtotal-list">
                                    {/* <div className="sub-items">
                                      <span> <b> Subtotal</b> </span>
                                      <span>£{formatAmountInMillion(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>VAT @20%</b> </span>
                                      <span>{`£${formatAmountInMillion(claculatedFun())}`}</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Total</b> </span>
                                      <span><b>{`£${formatAmountInMillion((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)) + claculatedFun())}`}</b></span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Paid</b> </span>
                                      <span>£0</span>
                                    </div>

                                    <div className="sub-items">
                                      <span> <b>Balance due</b> </span>
                                      <span className={`${promoCode.off ? "price-cut" : ""}`}><b>{`£${formatAmountInMillion((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)) + claculatedFun())}`}</b></span>
                                    </div>

                                    <div className="sub-items justify-content-end" onClick={() => setPromoCode({ ...promoCode, show: !promoCode.show, error: "", code: "", off: "" })}>
                                      <span className="promo-cde">Promo Code</span>
                                    </div>
                                    {
                                      promoCode.show ?
                                        <>
                                          <form className="add-coupon" onSubmit={(e) => checkPromoCode(e)}>
                                            <InputGroup className="input-cupn">
                                              <Form.Control
                                                placeholder="Promo Code"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onChange={(e) => setPromoCode({ ...promoCode, value: e.target.value, error: "", code: "", off: "" })}
                                              />
                                              <span className="button-apply clickable" onClick={(e) => checkPromoCode(e)}>
                                                Apply
                                              </span>
                                            </InputGroup>
                                          </form>
                                        </>
                                        :
                                        null
                                    }
                                    {
                                      promoCode.off && promoCode.show ? <div className="sub-items">
                                        <span> <b>Total</b> </span>
                                        <span><b>£{formatAmountInMillion(appliedPromoodeValue(((+(data?.chatdata?.amount ? data?.chatdata?.amount : data?.content?.ask_price)) + claculatedFun()), promoCode.off))}</b></span>
                                      </div> : null
                                    } */}
                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Amount</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {formatAmountInMillion(
                                          data?.chatdata?.amount
                                            ? data?.chatdata?.amount
                                            : data?.content?.ask_price
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
                                          {/* Promo Code */}
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
                                          <b>PromoCode discount </b>{" "}
                                        </span>
                                        <span>£{promoCode?.off}</span>
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
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price)
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
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
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) / 5
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
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
                                      {/* {`£${formatAmountInMillion(
                                        data?.amount
                                      )}`} */}
                                      <span>
                                        {/* {!promoCode?.off
                                          ? formatAmountInMillion(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price)
                                             +
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) /
                                              5)
                                          : formatAmountInMillion(
                                              appliedPromoodeValue(
                                                +(data?.chatdata?.amount
                                                  ? data?.chatdata?.amount
                                                  : data?.content?.ask_price),
                                                promoCode.off
                                              ) +
                                                appliedPromoodeValue(
                                                  +(data?.chatdata?.amount
                                                    ? data?.chatdata?.amount
                                                    : data?.content?.ask_price),
                                                  promoCode.off
                                                ) /
                                                  5
                                            )} */}
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) +
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) /
                                            5
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
                                              promoCode.off
                                            ) +
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
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
                                      {/* <span>£118</span> */}
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
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) +
                                            +(data?.chatdata?.amount
                                              ? data?.chatdata?.amount
                                              : data?.content?.ask_price) /
                                            5
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
                                              promoCode.off
                                            ) +
                                            appliedPromoodeValue(
                                              +(data?.chatdata?.amount
                                                ? data?.chatdata?.amount
                                                : data?.content?.ask_price),
                                              promoCode.off
                                            ) /
                                            5
                                          )}
                                      </span>
                                      {/* <span>£0</span> */}
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
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price) +
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price) /
                        5
                      )
                      : formatAmountInMillion(
                        appliedPromoodeValue(
                          +(data?.chatdata?.amount
                            ? data?.chatdata?.amount
                            : data?.content?.ask_price),
                          promoCode.off
                        ) +
                        appliedPromoodeValue(
                          +(data?.chatdata?.amount
                            ? data?.chatdata?.amount
                            : data?.content?.ask_price),
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
                {/* {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />} */}
                <Button
                  variant=""
                  className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                  onClick={() => {
                    if (profileData?._id === "6825d50ab94e4615313fcabc") {
                      paymentintents(data)
                    } else {
                      toast.error("Buying is disabled in demo mode. This is curated content and not available for sale")
                    }
                  }}
                >
                  <span>
                    Pay £
                    {!promoCode?.off
                      ? formatAmountInMillion(
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price) +
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price) /
                        5
                      )
                      : formatAmountInMillion(
                        appliedPromoodeValue(
                          +(data?.chatdata?.amount
                            ? data?.chatdata?.amount
                            : data?.content?.ask_price),
                          promoCode.off
                        ) +
                        appliedPromoodeValue(
                          +(data?.chatdata?.amount
                            ? data?.chatdata?.amount
                            : data?.content?.ask_price),
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
            <TopSearchesTipsCard dashboard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default AutoInvoice;
