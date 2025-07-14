import { Card, FormControl, FormControlLabel, FormGroup, FormLabel, Switch, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import task from "../assets/images/task.svg";
import watchic from "../assets/images/watch.svg";
import Header from "../component/Header";
import deleteIcon from "../assets/images/delete-icon.svg";
import interviewic from "../assets/images/interview.svg";
const moment = require("moment");

import { Button, Col, Container, Row } from "react-bootstrap";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import DbFooter from "../component/DbFooter";
import calendar from "../assets/images/calendar.svg";
import Loader from "../component/Loader";
import { Get, Post } from "../services/user.services";
import { useDarkMode } from "../context/DarkModeContext";
import {
  appliedPromoodeValue,
  totalAmountAfterPromocodeAndVat,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Basket = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState({
    totalAmount: 0,
    amountWithVat: 0,
  });
  const [promoCode, setPromoCode] = useState({
    value: "",
    code: "",
    show: false,
    error: "",
    off: "",
  });

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const initialChecked = query.get("checked") === "true";

  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    // Update query param
    const updatedQuery = new URLSearchParams(location.search);
    updatedQuery.set("checked", newChecked);
    navigate(`?${updatedQuery.toString()}`, { replace: true });
  };

  // Sync state with URL if query changes outside (optional)
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setChecked(query.get("checked") === "true");
  }, [location.search]);

  const { setCartCount, profileData } = useDarkMode();
  const user = profileData;
  const navigate = useNavigate();

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);
      setCartCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  const BasketData = async () => {
    setLoading(true);
    try {
      const resp = await Post(`mediaHouse/getBasketData`, { type: checked ? "task" : "content" });
      setData(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("focus", () => {
      getCountOfBasketItems();
      BasketData();
    });
    return () =>
      window.removeEventListener("focus", () => {
        getCountOfBasketItems();
        BasketData();
      });
  }, [checked]);

  const paymentintents = async (data) => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/createPaymentforBasket", {
        type: checked ? "task" : "content",
        coupon: promoCode.value,
        promocodePercentOff: promoCode?.off ? promoCode?.off : 0
      });
      setLoading(false);
      window.open(resp.data.url, "_blank");
    } catch (error) {
      setLoading(false);
      successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  const handleRemoveBasketItems = async (element) => {
    try {
      setLoading(true);
      let object = {
        content_id: element?.type === "task" ? [element?.contentDetails?._id] : element?.contentDetails?._id,
        type: element?.type
      };
      const res = await Post(`mediaHouse/addToBasket`, object);
      if (res) {
        getCountOfBasketItems();
        setLoading(false);
        setData((prev) => {
          const udpatedData = [...prev]?.filter((item) => item?._id !== element?._id);
          return udpatedData;
        })
        successToasterFun("Content removed from Basket");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function capitaliseLetterPromocode(value) {
    let result = "";
    if (value) {
      const data = value.trim().split("");
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

  useEffect(() => {
    BasketData();
  }, [checked]);

  function calculateTotalAmount(data) {
    try {
      let sum = 0;
      if (!data || !Array.isArray(data)) return;

      data.forEach((value) => {
        if (value?.type === "uploaded_content") {
          let priceOfTaskUploaded = 0;
          if (value?.contentDetails?.type === "image") {
            priceOfTaskUploaded = value?.contentDetails?.taskDetails?.hopper_photo_price || 0;
          } else if (value?.contentDetails?.type === "video") {
            priceOfTaskUploaded = value?.contentDetails?.taskDetails?.hopper_videos_price || 0;
          } else if (value?.contentDetails?.type === "audio") {
            priceOfTaskUploaded = value?.contentDetails?.taskDetails?.hopper_interview_price || 0;
          }
          sum += priceOfTaskUploaded;
        } else {
          const askingPrice = value?.amount || 0;
          sum += askingPrice;
        }
      });

      let vatAmount = sum * 0.2; // 20% VAT
      let amountWithVat = sum + vatAmount;

      setTotalAmount({
        totalAmount: sum,
        amountWithVat: amountWithVat,
        vatAmount: vatAmount
      });
    } catch (error) {
      console.log("Error calculating total amount:", error);
    }
  }
  // Add this useEffect to calculate total amount when data changes
  useEffect(() => {
    if (data) {
      calculateTotalAmount(data);
    }
  }, [data]);

  const getMediaType = (type) => {
    if (!data) return 0;

    // Check if we're working with the current item in the loop
    const currentItem = el => {
      if (el.type === "content") {
        // For content type, check the content array
        return el.contentDetails?.content?.filter(item => item.media_type === type).length || 0;
      } else if (el.type === "task") {
        // For uploaded_content type, check if the type matches
        return el.contentDetails?.type === type ? 1 : 0;
      }
      return 0;
    };

    // Return the function to be used in the rendering context
    return currentItem;
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
              <Row className="">
                <Col md={12} className="dash-tabs-wrap pe-0">
                  <div className="dash-tabs invoice-lft">
                    <Row>
                      <Col md={6}>
                        <div className="d-flex">
                          <div className="prs-logo">
                            <img src={prslogo} alt="" />
                          </div>
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
                        <div className="invoice-text"></div>
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
                            167-169, Great Portland Street, <br /> London, W1W 5PF
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
                                <FormControl component="fieldset" variant="standard">
                                  <FormGroup>
                                    <FormControlLabel
                                      color="black"
                                      control={
                                        <Switch checked={checked} onChange={handleChange} name="gilad" />
                                      }
                                      label="Task"
                                    />
                                  </FormGroup>
                                </FormControl>
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
                                      <th className="text-nowrap">Time & date</th>
                                      <th className="text-center">Type</th>
                                      <th className="text-center">Licence</th>
                                      <th className="text-center">Category</th>
                                      <th className="text-center">
                                        Sale amount
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data?.map((el, i) => {

                                      return (
                                        <tr key={i} className="clickable" onClick={() => {
                                          navigate(el?.type === "content" ? `/Feeddetail/content/${el?.contentDetails?._id}` : `/content-details/${el?.taskDetails?._id}?hopper_id=${el?.hopperDetails?._id}`);
                                        }}>
                                          <td className="content_img_td position-relative add-icons-box clickable">
                                            <div className="tbl_cont_wrp cnt_online_img noGrid">
                                              <div className="paymentToBeMadeImgContent basket-content">
                                                {el?.type === "content" ? (
                                                  el?.contentDetails?.content[0]
                                                    ?.media_type === "image" ? (
                                                    <img
                                                      src={
                                                        process.env.REACT_APP_CONTENT_MEDIA + el?.contentDetails?.content[0]?.media
                                                      }
                                                      className="cntnt-img"
                                                      alt="img"
                                                    />
                                                  ) : el?.contentDetails?.content[0]?.media_type === "video" ? (
                                                    <img
                                                      src={process.env.REACT_APP_THUMBNAIL + el?.contentDetails?.content[0].media
                                                      }
                                                      className="cntnt-img"
                                                    />
                                                  ) : el?.contentDetails?.content[0]
                                                    ?.media_type === "audio" ? (
                                                    <img
                                                      src={audioic}
                                                      className="content_img"
                                                    />
                                                  ) : el?.contentDetails?.content[0]
                                                    ?.media_type === "pdf" ? (
                                                    <img
                                                      src={docsic}
                                                      className="cntnt-img"
                                                    />
                                                  ) : null
                                                ) : (el?.contentDetails?.type === "image" || el?.contentDetails?.type === "video") ? (
                                                  <img
                                                    src={el?.contentDetails?.videothubnail}
                                                    className="cntnt-img"
                                                    alt="img"
                                                  />
                                                ) : <img
                                                  src={audioic}
                                                  className="cntnt-img"
                                                />}
                                                <img onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleRemoveBasketItems(el);
                                                }} src={deleteIcon} alt="delete icon" />
                                              </div>
                                            </div>
                                            <div className="tableContentTypeIcons">
                                              <div className="post_icns_cstm_wrp camera-ico">
                                                <div className="post_itm_icns dtl_icns">
                                                  <span className="count">{el?.type === "content" ? el?.contentDetails?.content?.length : 1}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="desc">
                                              <p>
                                                {el?.contentDetails?.heading || el?.taskDetails?.heading}
                                              </p>
                                            </div>
                                          </td>
                                          <td className="timedate_wrap">
                                            <p className="timedate">
                                              <img
                                                src={watchic}
                                                className="icn_time"
                                              />
                                              {moment(el?.createdAt).format("h:mm:A")}
                                            </p>
                                            <p className="timedate">
                                              <img
                                                src={calendar}
                                                className="icn_time"
                                              />
                                              {moment(el?.createdAt).format("DD MMM YYYY")}
                                            </p>
                                          </td>

                                          <td className="text-center">
                                            <div className="">
                                              {getMediaType("image")(el) ? (
                                                <Tooltip title="Photo">
                                                  <img
                                                    src={cameraic}
                                                    alt="Photo"
                                                    className="icn"
                                                  />{" "}
                                                  <br />
                                                </Tooltip>
                                              ) : null}
                                              {getMediaType("video")(el) ? (
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
                                              {getMediaType("audio")(el) ? (
                                                <Tooltip title="Audio">
                                                  <img
                                                    src={interviewic}
                                                    alt="Audio"
                                                    className="icn"
                                                  />
                                                </Tooltip>
                                              ) : null}
                                              {getMediaType("pdf")(el) ? (
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
                                            {
                                              el?.type === "content" ? <Tooltip
                                                title={el?.contentDetails?.type === "shared" ? "Shared" : "Exclusive"}
                                              >
                                                <img
                                                  src={el?.contentDetails?.type === "shared" ? shared : exclusiveic}
                                                  className="tbl_ic"
                                                  alt="camera"
                                                />
                                              </Tooltip> : <Tooltip
                                                title="Task"
                                              >
                                                <img
                                                  src={task}
                                                  className="tbl_ic"
                                                  alt="camera"
                                                />
                                              </Tooltip>
                                            }
                                          </td>

                                          <td className="text-center">
                                            {/* content */}
                                            <Tooltip
                                              title={
                                                el?.categoryDetails
                                                  ?.name
                                              }
                                            >
                                              <img
                                                src={
                                                  el?.categoryDetails
                                                    ?.icon
                                                }
                                                alt={el?.categoryDetails
                                                  ?.name}
                                                className="icn"
                                              />
                                            </Tooltip>
                                          </td>

                                          <td>
                                            <p
                                              className="ttl_prc "
                                              style={{
                                                textAlign: "center",
                                              }}
                                            >
                                              £{formatAmountInMillion(el?.amount)}
                                            </p>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>

                                <div className="tble-subtotal custm-tble-subtotal">
                                  <div className="subtotal-list">
                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Amount</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {formatAmountInMillion(
                                          totalAmount?.totalAmount ?? 0
                                        )}
                                      </span>
                                    </div>

                                    {/* offeradded */}
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
                                        <span> Promo Code discount </span>
                                        <span>
                                          {/* {promoCode?.off} */}
                                          -£
                                          {formatAmountInMillion(
                                            (totalAmount?.totalAmount *
                                              promoCode?.off) /
                                            100 ?? 0
                                          )}
                                        </span>
                                      </div>
                                    )}

                                    {promoCode.show && !checked ? (
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
                                        <b> Subtotal</b>{" "}
                                      </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                            totalAmount?.totalAmount ?? 0
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(
                                                totalAmount?.totalAmount ?? 0
                                              ),
                                              promoCode.off
                                            )
                                          )}
                                      </span>
                                    </div>

                                    <div className="sub-items">
                                      <span> VAT @20% </span>
                                      <span>
                                        £
                                        {!promoCode?.off
                                          ? formatAmountInMillion(
                                            totalAmount?.vatAmount ?? 0
                                          )
                                          : formatAmountInMillion(
                                            appliedPromoodeValue(
                                              +(
                                                totalAmount?.totalAmount ?? 0
                                              ),
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
                                            totalAmount?.amountWithVat ?? 0
                                          )
                                          : formatAmountInMillion(
                                            totalAmountAfterPromocodeAndVat(
                                              +(
                                                totalAmount?.totalAmount ?? 0
                                              ),
                                              promoCode.off
                                            )
                                          )}
                                      </span>
                                      {/* <span>
                                        <b>
                                          £
                                          {formatAmountInMillion(
                                            totalAmount?.amountWithVat ?? 0
                                          )}
                                        </b>
                                      </span> */}
                                    </div>

                                    <div className="sub-items">
                                      <span> Paid </span>
                                      <span>£0</span>
                                    </div>

                                    <div className="sub-items">
                                      <span>
                                        {" "}
                                        <b>Balance due</b>{" "}
                                      </span>
                                      <span>
                                        <b>
                                          £
                                          {!promoCode?.off
                                            ? formatAmountInMillion(
                                              totalAmount?.amountWithVat ?? 0
                                            )
                                            : formatAmountInMillion(
                                              totalAmountAfterPromocodeAndVat(
                                                +(
                                                  totalAmount?.totalAmount ??
                                                  0
                                                ),
                                                promoCode.off
                                              )
                                            )}
                                          {/* {formatAmountInMillion(
                                            totalAmount?.totalAmount ?? 0
                                          )} */}
                                        </b>

                                        {/* <b>{`£${formatAmountInMillion(
                                          +(data?.chatdata?.amount
                                            ? data?.chatdata?.amount
                                            : data?.content?.ask_price)
                                        )}`}</b> */}
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
            <div
              className="paywrap"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Col md={12}>
                  <h4>Payment summary</h4>
                  <p>
                    Payment of{" "}
                    <b>
                      {/* £{formatAmountInMillion(totalAmount?.totalAmount ?? 0)}{" "} */}
                      £
                      {!promoCode?.off
                        ? formatAmountInMillion(totalAmount?.amountWithVat ?? 0)
                        : formatAmountInMillion(
                          totalAmountAfterPromocodeAndVat(
                            +(totalAmount?.totalAmount ?? 0),
                            promoCode.off
                          )
                        )}{" "}
                      {/* {formatAmountInMillion(
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price)
                      )}{" "} */}
                      (inc VAT){" "}
                    </b>{" "}
                    to Presshop Media UK Limited towards purchase of content
                    listed in the invoice particulars
                  </p>
                </Col>
              </Row>
              <div
                className="actn-btn"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="btn-basket">
                  <Button
                    variant=""
                    className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                    onClick={() => {
                      navigate("/published-content");
                    }}
                  >
                    <span>Add more content</span>
                  </Button>
                </div>

                <div className="btn-pay" md={2}>
                  <Button
                    variant=""
                    className="theme-btn custom-ab mb-4 mt-2 w-100 sm_btn"
                    onClick={() => paymentintents(data)}
                  >
                    <span>
                      Pay £
                      {!promoCode?.off
                        ? formatAmountInMillion(totalAmount?.amountWithVat ?? 0)
                        : formatAmountInMillion(
                          totalAmountAfterPromocodeAndVat(
                            +(totalAmount?.totalAmount ?? 0),
                            promoCode.off
                          )
                        )}{" "}
                      {/* {formatAmountInMillion(totalAmount?.amountWithVat ?? 0)} */}
                      {/* {`£${formatAmountInMillion(
                        +(data?.chatdata?.amount
                          ? data?.chatdata?.amount
                          : data?.content?.ask_price)
                      )}`} */}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
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

export default Basket;
