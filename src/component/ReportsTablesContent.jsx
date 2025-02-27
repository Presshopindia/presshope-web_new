import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Card, Typography, Button, Tooltip } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsEye,
} from "react-icons/bs";
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
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import contimg1 from "../assets/images/Contentdetail/content1.svg";
// import contimg2 from "../assets/images/Contentdetail/content2.svg";
import contimg3 from "../assets/images/Contentdetail/content3.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import share from "../assets/images/share.png";
// import audioic from "../assets/images/audimgsmall.svg";
import audioic from "../assets/images/audimg.svg";

import Loader from "./Loader";
import {
  accountTotalFundInvestedContentPurchase,
  formatAmountInMillion,
  monthlyDecreasingOrder,
  monthlyDecreasingOrderForContentType,
  monthlyIncreasingOrder,
  receiveLastTwoDigits,
  trendPercentageFun,
} from "./commonFunction";

const ReportsTablesContent = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();
  const [vatData, setVat] = useState();
  const params = useParams();
  const navigate = useNavigate();

  // console.log(params, `<----these are from content `)

  const getVatSummary = async (paramName, param) => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/vatforaccount`);
      if (res) {
        setVat(res?.data?.response);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getDetailData = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediaHouse/report/count`);
      if (res) {
        setData(res?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [categories, setCategories] = useState();
  const getCategories = async (param) => {
    const paramName = param;
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/report/content/category?${paramName}=${param}`
      );
      setCategories(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [contentType, setContentType] = useState();
  const getContentType = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/reportContentTypePeriodWise`);
      setContentType(monthlyDecreasingOrderForContentType(resp?.data?.result));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [location, setLocation] = useState();
  const getLocation = async (param) => {
    const paramName = param;
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/report/content/location?${paramName}=${param}`
      );

      console.log("location12345",resp?.data?.data)
      setLocation(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [purchaseContent, setPuchaseContent] = useState();

  const ContentPurchaseOnlineSummary = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const res = await Get(`mediaHouse/contentPurchasedOnlinesummary`);
      if (res) {
        const increaseingOrder = monthlyIncreasingOrder(res?.data?.response);
        console.log("Increasing Order", increaseingOrder);

        const newData = increaseingOrder?.map((el, index) => {
          let trend = {};
          if (index === 0) {
            trend = {
              percent: "0 %",
              sign: "+",
            };
          } else {
            trend = trendPercentageFun(
              increaseingOrder[index - 1]?.volume,
              increaseingOrder[index]?.volume
            );
          }

          return {
            ...el,
            percent: `${trend.percent} %`,
            sign: trend.sign,
          };
        });

        setPuchaseContent(monthlyDecreasingOrder(newData));

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [splitC, setSplitC] = useState();
  const getSplitContent = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/reportSplit?${paramName}=${param}`);
      if (resp) {
        setSplitC(resp?.data?.data?.data);
        console.log(resp?.data?.data?.data, `<---this is split content`)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailData();
    getCategories();
    getContentType();
    getLocation();
    ContentPurchaseOnlineSummary();
    getSplitContent();
    // getSplitType()
  }, []);

  useEffect(() => {
    if (params.type === "content_purchase_volume_moment") {
      ContentPurchaseOnlineSummary("yearly", "yearly");
    }
  }, []);

  useEffect(() => {
    if (
      params.type === "total_fund_invested" ||
      params.type === "fund_invested_summary" ||
      params.type === "vat_invested_details"
    ) {
      getVatSummary("yearly", "yearly");
    }
  }, []);

  const handleChangeSort = async (e) => {
    try {
      const type = e.target.name;
      const param = e.target.value;

      // console.log(type, `<====this is typpe`)

      if (type === "fund_invested_summary") {
        // getVatSummary(param)
      } else if (type === "content_sourced_from_task_summary") {
        ContentPurchaseOnlineSummary(param);
      } else if (type === "content_location") {
        getLocation(param);
      } else if (type === "content_split") {
        getSplitContent(param);
      } else if (type === "content_type") {
        getContentType(param);
      } else if (type === "content_categories") {
        getCategories(param);
      } else if (type === "content_sourced_from_task_summary") {
        ContentPurchaseOnlineSummary(param);
      } else {
        null;
      }
    } catch (error) {}
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [contentCategoryData, setContentCategoryData] = useState(null);
  const getContentCategory = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/reportContentCategoryPeriodWise`);
      if (resp) {
        setContentCategoryData(resp?.data?.result);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContentCategory();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link onClick={() => history.back()} className="back_link mb-3">
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>
              <div className="tbl_wrap_cmn">
                {params?.type === "content_purchased_online_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased online today
                        </Typography>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="">
                                Content purchased online today
                              </th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Location</th>
                              <th>Published by</th>
                              {/* <th>Asking price</th> */}
                              <th>Published price</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.content_online?.task
                              ?.sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              ?.map((curr) => {
                                const Audio = curr?.content?.filter(
                                  (item) => item?.media_type === "audio"
                                );
                                const Video = curr?.content?.filter(
                                  (item) => item?.media_type === "video"
                                );
                                const Image = curr?.content?.filter(
                                  (item) => item?.media_type === "image"
                                );

                                const purchasedPublication=curr?.purchased_publication
                                const purchasedContentDate=curr?.Vat.find((ele)=>ele.purchased_mediahouse_id==purchasedPublication)?.purchased_time
                                    // console.log("purchasedContentDate",purchasedContentDate)
                                return (
                                  <tr
                                    className="clickable"
                                    onClick={() =>
                                      navigate(
                                        `/purchased-content-detail/${curr?.transaction_id}`
                                      )
                                    }
                                  >
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.content[0].media_type ===
                                        "image" ? (
                                          <img
                                            src={
                                              curr?.content[0]?.watermark ||
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                                curr?.content[0]?.media
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.content[0].media_type ===
                                          "video" ? (
                                          <img
                                            src={
                                              curr?.content[0]?.watermark ||
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                                curr?.content[0]?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.content[0].media_type ===
                                          "audio" ? (
                                          <img
                                            src={audioic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">
                                          {curr?.content?.length}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(purchasedContentDate).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(purchasedContentDate).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.heading}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      {Image && Image.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {Audio && Audio.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={interviewic}
                                            alt="Audio"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {Video && Video.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={videoic}
                                            alt="Video"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={
                                          !curr?.IsExclusive
                                            ? "Shared"
                                            : "Exclusive"
                                        }
                                      >
                                        {curr?.IsExclusive ? (
                                          <img
                                            src={exclusiveic}
                                            alt="Exclusive"
                                            className="icn"
                                          />
                                        ) : (
                                          <img
                                            src={share}
                                            alt="shared"
                                            className="icn"
                                          />
                                        )}
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.category_id?.name}>
                                        {
                                          <img
                                            src={curr?.category_id?.icon}
                                            alt="Exclusive"
                                            className="icn"
                                          />
                                        }
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.location}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.hopper_id?.avatar_id?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {curr?.hopper_id?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        curr?.Vat?.find(
                                          (el) =>
                                            el?.purchased_mediahouse_id ==
                                            JSON.parse(
                                              localStorage.getItem("user")
                                            )?._id
                                        )?.amount_without_Vat
                                      ) || curr?.amount - curr?.Vat}
                                    </td>
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        curr?.Vat?.find(
                                          (el) =>
                                            el?.purchased_mediahouse_id ==
                                            JSON.parse(
                                              localStorage.getItem("user")
                                            )?._id
                                        )?.amount
                                      ) || curr?.amount_paid}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_avg_price" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content average price
                        </Typography>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="">Content purchased online</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Location</th>
                              <th>Published by</th>
                              <th>Average price </th>
                              <th>Amount paid (ex VAT)</th>
                              {/* <th>Total Amount paid (inc VAT)</th> */}
                              {/* <th>Trend</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {data?.average_content_price?.task?.map((curr) => {
                              const Audio = curr?.content?.filter(
                                (item) => item?.media_type === "audio"
                              );
                              const Video = curr?.content?.filter(
                                (item) => item?.media_type === "video"
                              );
                              const Image = curr?.content?.filter(
                                (item) => item?.media_type === "image"
                              );
                              const paidPrice =
                                curr?.Vat?.find(
                                  (el) =>
                                    el?.purchased_mediahouse_id ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )?.amount_without_Vat ||
                                curr?.amount - curr?.Vat;
                              const averagePrice =
                                +curr?.Vat?.find(
                                  (el) =>
                                    el?.purchased_mediahouse_id ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )?.amount || curr?.amount_paid;
                                   

                                
                                const purchasedPublication=curr?.purchased_publication
                                const purchasedContentDate=curr?.Vat.find((ele)=>ele.purchased_mediahouse_id==purchasedPublication)?.purchased_time
                                    console.log("purchasedContentDatepurchasedContentDate",purchasedContentDate)
                              return (
                                <tr
                                  onClick={() =>
                                    navigate(
                                      `/purchased-content-detail/${curr?.transaction_id}`
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <td className="content_img_td">
                                    <div className="tbl_cont_wrp">
                                      {curr?.content[0]?.media_type ===
                                      "image" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.content[0]?.media
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.content[0]?.media_type ===
                                        "video" ? (
                                        <img
                                          src={
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.content[0]?.thumbnail
                                          }
                                          className="content_img"
                                        />
                                      ) : curr?.content[0]?.media_type ===
                                        "audio" ? (
                                        <img
                                          src={audioic}
                                          className="content_img"
                                        />
                                      ) : null}
                                      <span className="cont_count">
                                        {curr?.content?.length}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(purchasedContentDate).format(
                                        `hh:mm A`
                                      )}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(purchasedContentDate).format(
                                        `DD MMM YYYY`
                                      )}
                                    </p>
                                  </td>
                                  <td className="description_td">
                                    <p className="desc_ht mb-0">
                                      {curr?.heading}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    {Image && Image.length > 0 && (
                                      <Tooltip title="Photo">
                                        <img
                                          src={cameraic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    {Image && Image.length > 0 && <br />}
                                    {Video && Video.length > 0 && (
                                      <Tooltip title="Video">
                                        <img
                                          src={videoic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    <br />
                                    {Audio && Audio.length > 0 && (
                                      <Tooltip title="Audio">
                                        <img
                                          src={interviewic}
                                          alt="Photo"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                    <br />
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.Vat?.find(
                                          (el) =>
                                            el.purchased_mediahouse_id ==
                                            JSON.parse(
                                              localStorage.getItem("user")
                                            )?._id
                                        )?.purchased_content_type == "shared"
                                          ? "Shared"
                                          : "Exclusive"
                                      }
                                    >
                                      {curr?.Vat?.find(
                                        (el) =>
                                          el.purchased_mediahouse_id ==
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          )?._id
                                      )?.purchased_content_type == "shared" ? (
                                        <img
                                          src={share}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      ) : (
                                        <img
                                          src={exclusiveic}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      )}
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.category_id?.name}>
                                      {
                                        <img
                                          src={curr?.category_id?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      }
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.hopper_id?.avatar_id?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        <span className="txt_light">
                                          {curr?.hopper_id?.user_name}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      paidPrice / curr?.content?.length
                                    )}
                                  </td>
                                  <td>£{formatAmountInMillion(paidPrice)}</td>
                                  {/* <td>
                                    £{formatAmountInMillion(averagePrice)}
                                  </td> */}
                                  {/* <td>£{formatAmountInMillion(averagePrice)}</td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_purchase_volume_moment" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased online volume movement
                        </Typography>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th>Period</th>
                              <th>Content purchased online volume</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseContent?.map((curr) => {
                              return (
                                <tr className="clickable">
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
                                  <td>{curr?.volume}</td>
                                  <td className="">
                                    <p className="">
                                      {curr?.sign == "Increase" ? (
                                        <span className="stat_up trend_success">
                                          <BsArrowUp />
                                          {curr?.percent}
                                        </span>
                                      ) : curr?.sign == "Decrease" ? (
                                        <span className="stat_down trend_danger">
                                          <BsArrowDown />
                                          {curr?.percent}
                                        </span>
                                      ) : (
                                        "0 %"
                                      )}
                                    </p>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "fund_invested_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Funds invested today
                        </Typography>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="">Content purchased online</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Location</th>
                              <th>Published by</th>
                              <th>Nett price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.today_fund_invested &&
                              data?.today_fund_invested?.task?.map((curr) => {
                                const Audio = curr?.content?.filter(
                                  (item) => item?.media_type === "audio"
                                );
                                const Video = curr?.content?.filter(
                                  (item) => item?.media_type === "video"
                                );
                                const Image = curr?.content?.filter(
                                  (item) => item?.media_type === "image"
                                );
                                const paidAmount =
                                  formatAmountInMillion(
                                    curr?.Vat?.find(
                                      (el) =>
                                        el?.purchased_mediahouse_id ==
                                        JSON.parse(localStorage.getItem("user"))
                                          ?._id
                                    )?.amount
                                  ) || curr?.amount_paid;
                                const askPrice =
                                  formatAmountInMillion(
                                    curr?.Vat?.find(
                                      (el) =>
                                        el?.purchased_mediahouse_id ==
                                        JSON.parse(localStorage.getItem("user"))
                                          ?._id
                                    )?.amount_without_Vat
                                  ) || curr?.amount - curr?.Vat;
                                // const vat = (+paidAmount - askPrice).toFixed(2);
                              let  vat=((curr?.Vat?.find(
                                  (el) =>
                                    el?.purchased_mediahouse_id ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )?.amount)|| curr?.amount_paid)  -   
                                (( curr?.Vat?.find(
                                  (el) =>
                                    el?.purchased_mediahouse_id ==
                                    JSON.parse(localStorage.getItem("user"))
                                      ?._id
                                )?.amount_without_Vat
                              ) || curr?.amount - curr?.Vat)
                                       

                                  const purchasedPublication=curr?.purchased_publication
                                const purchasedContentDate=curr?.Vat.find((ele)=>ele.purchased_mediahouse_id==purchasedPublication)?.purchased_time
                                    console.log("purchasedContentDateonline",moment(purchasedContentDate).format(
                                          `DD MMM YYYY`
                                        ))

                                return (
                                  <tr
                                    className="clickable"
                                    onClick={() =>
                                      navigate(
                                        `/purchased-content-detail/${curr?.transaction_id}`
                                      )
                                    }
                                  >
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.content[0]?.media_type ===
                                        "image" ? (
                                          <img
                                            src={
                                              curr?.content[0]?.watermark ||
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                                curr?.content[0]?.media
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.content[0]?.media_type ===
                                          "video" ? (
                                          <img
                                            src={
                                              curr?.content[0]?.watermark ||
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                                curr?.content[0]?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.content[0]?.media_type ===
                                          "audio" ? (
                                          <img
                                            src={audioic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">
                                          {curr?.content?.length}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(purchasedContentDate).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(purchasedContentDate).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.heading}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      {Image && Image.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {Audio && Audio.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={interviewic}
                                            alt="Audio"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {Video && Video.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={videoic}
                                            alt="Video"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={
                                          !curr?.IsExclusive
                                            ? "Shared"
                                            : "Exclusive"
                                        }
                                      >
                                        {!curr?.IsExclusive ? (
                                          <img
                                            src={share}
                                            alt="Exclusive"
                                            className="icn"
                                          />
                                        ) : (
                                          <img
                                            src={exclusiveic}
                                            alt="Exclusive"
                                            className="icn"
                                          />
                                        )}
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.category_id?.name}>
                                        <img
                                          src={curr?.category_id?.icon}
                                          alt={curr?.category_id?.name}
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.location}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.hopper_id?.avatar_id?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {curr?.hopper_id?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>£{askPrice}</td>
                                    <td>£{formatAmountInMillion(vat || 0)}</td>
                                    <td>£{paidAmount}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "total_fund_invested" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Total funds invested
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
                            {accountTotalFundInvestedContentPurchase(
                              vatData
                            )?.map((curr) => {
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                        : `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                    )
                                  }
                                >
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content_id[0] &&
                                          curr?.content_id[0]?.content?.map(
                                            (curr) => {
                                              return curr?.media_type ===
                                                "image" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.media
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "video" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.thumbnail
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="content_img"
                                                />
                                              ) : null;
                                            }
                                          )}
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
                                  <td>
                                    {months[curr?._id?.month - 1]}{" "}
                                    {curr?._id?.year}
                                  </td>

                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      +(curr?.total_price - curr?.total_vat) ||
                                        0
                                    )}
                                  </td>
                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      +curr?.total_vat || 0
                                    )}
                                  </td>
                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      +curr?.total_price || 0
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_categories" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content categories
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
                              <th>Business</th>
                              <th>Political</th>
                              <th>Crime</th>
                              <th>Fashion</th>
                              <th>Other</th>
                            </tr>
                          </thead>

                          <tbody>
                            {contentCategoryData && contentCategoryData
                              ?.sort((a, b) => b.month - a.month)
                              ?.map((value) => {
                                console.log("allvalue",value);
                                const businessCount = value?.categories?.find(
                                  (el) => el?.category_id == "Business"
                                );
                                const politicalCount = value?.categories?.find(
                                  (el) => el?.category_id == "Political"
                                );
                                const crimeCount = value?.categories?.find(
                                  (el) => el?.category_id == "Crime"
                                );
                                const fashionCount = value?.categories?.find(
                                  (el) => el?.category_id == "Fashion"
                                );
                                const other = value?.categories?.filter(
                                  (el) =>
                                    el?.category_id != "Fashion" ||
                                    el?.category_id != "Crime" ||
                                    el?.category_id != "Political" ||
                                    el?.category_id != "Business"
                                );

                                const otherCount = other?.reduce(
                                  (accumulator, currentValue) => {
                                    return (
                                      accumulator + currentValue?.content_count
                                    );
                                  },
                                  0
                                );

                                return (
                                  <tr
                                    className="clickable"
                                    onClick={() =>
                                      navigate(
                                        data?.type === "task"
                                          ? `/dashboard-tables/content_purchased_online?month=${
                                              months[value?.month - 1]
                                            }&year=${value?.year}`
                                          : `/dashboard-tables/content_purchased_online?month=${
                                              months[value?.month - 1]
                                            }&year=${value?.year}`
                                      )
                                    }
                                  >
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {value?.content?.slice(0,5)?.map((el) =>{
                                          
                                          {console.log("allelementimage",el)}
                                          return(
                                            el?.content?.[0]?.media_type ===
                                            "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_CONTENT_MEDIA +
                                                  el?.content?.[0]?.media
                                                }
                                                className="content_img"
                                              />
                                            ) : el?.content?.[0]?.media_type ===
                                              "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_CONTENT_MEDIA +
                                                  el?.content?.[0]?.thumbnail
                                                }
                                                className="content_img"
                                              />
                                            ) : el?.content?.[0]?.media_type ===
                                              "audio" ? (
                                              <img
                                                src={audioic}
                                                className="content_img"
                                              />
                                            ) : null
                                          )})}
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
                                        {months[value.month - 1]} {value?.year}
                                      </p>
                                    </td>
                                    <td>{businessCount?.content_count || 0}</td>
                                    <td>
                                      {politicalCount?.content_count || 0}
                                    </td>
                                    <td>{crimeCount?.content_count || 0}</td>
                                    <td>{fashionCount?.content_count || 0}</td>
                                    <td>{otherCount || 0}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_type" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content type
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
                              <th>Photos</th>
                              <th>Videos</th>
                              <th>Audio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentType?.map((value) => {

                              // const totalImages=[]
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/content_purchased_online?month=${
                                            months[value?.month - 1]
                                          }&year=${value?.year}`
                                        : `/dashboard-tables/content_purchased_online?month=${
                                            months[value?.month - 1]
                                          }&year=${value?.year}`
                                    )
                                  }
                                >
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {value?.content?.slice(0,5).map((el) =>
                                          el?.content?.[0]?.media_type ===
                                          "image" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                el?.content?.[0]?.media
                                              }
                                              className="content_img"
                                            />
                                          ) : el?.content?.[0]?.media_type ===
                                            "video" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                el?.content?.[0]?.thumbnail
                                              }
                                              className="content_img"
                                            />
                                          ) : el?.content?.[0]?.media_type ===
                                            "audio" ? (
                                            <img
                                              src={audioic}
                                              className="content_img"
                                            />
                                          ) : null
                                        )}
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
                                      {months[value?.month - 1]} {value?.year}
                                    </p>
                                  </td>
                                  <td>{value?.image_count}</td>
                                  <td>{value?.video_count}</td>
                                  <td>{value?.audio_count}</td>
                                </tr>
                              );
                            })}
                            {console.log("ContentType", contentType)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_split" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content split
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
                              <th>Shared</th>
                              <th>Exclusive</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              splitC
                            )?.map((curr) => {

                              
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/content_purchased_online?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                        : `/dashboard-tables/content_purchased_online?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                    )
                                  }
                                >
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content_id
                                          ?.slice(0,5)
                                          ?.map((el) => {
                                            const mediaUrl =
                                              el?.content[0]?.media_type ===
                                              "image"
                                                ? process.env
                                                    .REACT_APP_CONTENT_MEDIA +
                                                  el?.content[0]?.media
                                                : el?.content[0]?.media_type ===
                                                  "video"
                                                ? process.env
                                                    .REACT_APP_CONTENT_MEDIA +
                                                  el?.content[0]?.thumbnail
                                                : el?.content[0]?.media_type ===
                                                  "audio"
                                                ? audioic
                                                : null;

                                            return mediaUrl ? (
                                              <img
                                                src={mediaUrl}
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
                                  <td>{curr?.shared}</td>
                                  <td>{curr?.exclusive}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_location" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content location
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
                              <th>North</th>
                              <th>South</th>
                              <th>East</th>
                              <th>West</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              location?.data
                            )?.map((value) => {
                              console.log(
                                "months",
                                months[value?._id?.month - 1]
                              );
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/content_purchased_online?month=${
                                            months[value?._id?.month - 1]
                                          }&year=${value?.year}`
                                        : `/dashboard-tables/content_purchased_online?month=${
                                            months[value?._id?.month - 1]
                                          }&year=${value?._id?.year}`
                                    )
                                  }
                                >
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">

                                    <div className="content_imgs">
                                        {value?.content_id?.slice(0,5).map((el) =>
                                          el?.content?.[0]?.media_type ===
                                          "image" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                el?.content?.[0]?.media
                                              }
                                              className="content_img"
                                            />
                                          ) : el?.content?.[0]?.media_type ===
                                            "video" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                el?.content?.[0]?.thumbnail
                                              }
                                              className="content_img"
                                            />
                                          ) : el?.content?.[0]?.media_type ===
                                            "audio" ? (
                                            <img
                                              src={audioic}
                                              className="content_img"
                                            />
                                          ) : null
                                        )}
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


                                      {/* <div className="content_imgs">
                                        {value?.content_id?.content?.map(
                                          (curr) => {
                                            return (
                                              <>
                                                {curr?.media_type ===
                                                "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.media
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "video" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.thumbnail
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "audio" ? (
                                                  <img
                                                    src={audioic}
                                                    className="content_img"
                                                  />
                                                ) : null}
                                              </>
                                            );
                                          }
                                        )}
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
                                      </div> */}
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[value?._id?.month - 1]}{" "}
                                      {value?._id?.year}
                                    </p>
                                  </td>
                                  <td>{location?.north}</td>
                                  <td>{location?.south}</td>
                                  <td>{location?.east}</td>
                                  <td>{location?.west}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_purchased_summary" ? (
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
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseContent?.map((curr) => {     
                              return (
                                <tr className="clickable" onClick={()=>{navigate(`/dashboard-tables/content_purchased_online?month=${months[curr?._id?.month - 1]}&year=${curr?._id?.year}`)}}>
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content_id[0] &&
                                          curr?.content_id[0]?.content?.map(
                                            (curr) => {
                                              return curr?.media_type ===
                                                "image" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.media
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "video" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.thumbnail
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="content_img"
                                                />
                                              ) : null;
                                            }
                                          )}
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
                                  <td>{curr?.volume}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_sourced_from_task_summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased from tasks summary
                        </Typography>
                        <div className="tbl_rt">
                          <Form.Group className="globalSort">
                            <Form.Select
                              name="content_sourced_from_task_summary"
                              onChange={handleChangeSort}
                            >
                              <option value="daily">Daily</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </Form.Select>
                          </Form.Group>
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
                              <th className="">Content purchased from tasks</th>
                              <th>Period</th>
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseContent?.map((curr) => {
                              return (
                                <tr className="clickable">
                                  <td className="content_wrap more_contnt_wrap">
                                    <div className="content_imgs_wrap">
                                      <div className="content_imgs">
                                        {curr?.content_id[0] &&
                                          curr?.content_id[0]?.content?.map(
                                            (curr) => {
                                              return curr?.media_type ===
                                                "image" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.media
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "video" ? (
                                                <img
                                                  src={
                                                    process.env
                                                      .REACT_APP_CONTENT_MEDIA +
                                                    curr?.thumbnail
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="content_img"
                                                />
                                              ) : null;
                                            }
                                          )}
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
                                  <td>£{curr?.volume}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "fund_invested_summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Funds invested summary
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
                              <th>Periods</th>
                              <th>Funds Invested </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vatData &&
                              vatData.map((curr) => {
                                return (
                                  <tr className="clickable" onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                        : `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                    )
                                  }>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id[0] &&
                                            curr?.content_id[0]?.content?.map(
                                              (curr) => {
                                                return curr?.media_type ===
                                                  "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.media
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "video" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.thumbnail
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "audio" ? (
                                                  <img
                                                    src={audioic}
                                                    className="content_img"
                                                  />
                                                ) : null;
                                              }
                                            )}

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
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        +curr?.total_price || 0
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "vat_invested_details" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Vat details
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
                              <th>Periods</th>
                              <th>20% Vat </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vatData?.map((curr) => {
                                return (
                                  <tr className="clickable" onClick={() =>
                                    navigate(
                                      data?.type === "task"
                                        ? `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                        : `/dashboard-tables/fund_invested?month=${
                                            months[curr?._id?.month - 1]
                                          }&year=${curr?._id?.year}`
                                    )
                                  }>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap">
                                        <div className="content_imgs">
                                          {curr?.content_id[0] &&
                                            curr?.content_id[0]?.content?.map(
                                              (curr) => {
                                                return curr?.media_type ===
                                                  "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.media
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "video" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.thumbnail
                                                    }
                                                    className="content_img"
                                                  />
                                                ) : curr?.media_type ===
                                                  "audio" ? (
                                                  <img
                                                    src={audioic}
                                                    className="content_img"
                                                  />
                                                ) : null;
                                              }
                                            )}

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
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        +curr?.total_vat || 0
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(ReportsTablesContent);
