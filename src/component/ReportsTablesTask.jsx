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
import contimg1 from "../assets/images/Contentdetail/content3.png";
import contimg2 from "../assets/images/Contentdetail/contentbg.png";
import contimg3 from "../assets/images/Contentdetail/contentimg2.png";
import watchic from "../assets/images/watch.svg";
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import share from "../assets/images/share.png";
import { BsChevronDown } from "react-icons/bs";
import Loader from "./Loader";
import {
  accountTotalFundInvestedContentPurchase,
  formatAmountInMillion,
  monthlyIncreasingOrder,
  trendPercentageFun,
} from "./commonFunction";

const ReportsTablesTask = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [detail, setDetails] = useState();
  // reports card
  const getDetails = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/reportTaskCount`);
      // console.log(res, `<----this is a response of report task coutn`)
      if (res) {
        setDetails(res?.data);
        setLoading(false);
      }
    } catch (er) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // task broadcast today
  const [broadcastTaskToday, setBroadCastTaskToday] = useState([]);

  const Task_broadCast_today = async () => {
    setLoading(true);
    try {
      let res;
      if (params?.type == "total_fund_invested_today") {
        res = await Get(
          `mediahouse/taskPurchasedOnlinesummaryforReport?yearly=yearly`
        );
      } else {
        res = await Get(`mediahouse/taskPurchasedOnlinesummaryforReport`);
      }
      if (res) {
        setBroadCastTaskToday(res?.data?.response);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  //  total fund invested
  const [totalDetail, setTotalDetail] = useState([]);
  const totalData = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const resp = await Get(
        `mediahouse/taskPurchasedOnlinesummary?${paramName}=${param}`
      );
      if (resp) {
        const increasingOrderData = monthlyIncreasingOrder(
          resp?.data?.response
        );
        const newData = increasingOrderData?.map((el, index) => {
          let trend = {};
          if (index === 0) {
            trend = {
              percent: "0 %",
              sign: "+",
            };
          } else {
            trend = trendPercentageFun(
              increasingOrderData[index - 1]?.content_id?.length,
              increasingOrderData[index]?.content_id?.length
            );
          }

          return {
            ...el,
            percent: `${trend.percent} %`,
            sign: trend.sign,
          };
        });

        setTotalDetail(accountTotalFundInvestedContentPurchase(newData));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //location of task
  const [location, setLocation] = useState([]);
  const get_location = async (param) => {
    const paramName = param;
    setLoading(true);
    try {
      const res = await Get(`mediaHouse/reportlocation?${paramName}=${param}`);
      if (res) {
        setLocation(res?.data?.data?.data);
        setLoading(false);
      }
    } catch (errr) {
      setLoading(false);
    }
  };
  useEffect(() => {
    Task_broadCast_today();
    totalData();
    get_location();
  }, []);

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

  const handleChangeSort = async (e) => {
    try {
      const type = e.target.name;
      const param = e.target.value;
      if (type === "fund_invested_summary") {
        totalData(param);
      } else if (type === "content_sourced_from_summary") {
        totalData(param);
      } else if (type === "task_summary") {
        totalData(param);
      } else if (type === "task_location") {
        get_location();
      } else if (type === "content_type") {
        totalData(param);
      } else if (type === "task_categories") {
        get_location(param);
      }
    } catch (error) {}
  };

  function myFunction(start, end) {
    const currentDate = new Date(start);
    const examDate = new Date(end);

    if (isNaN(currentDate) || isNaN(examDate)) {
      return "Invalid date input";
    }

    const timeDifference = currentDate - examDate;
    const diffInMilliseconds = Math.abs(timeDifference);

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    let sign = "";
    if (timeDifference > 0) {
      sign = "+";
    } else {
      sign = "-";
    }

    return {
      sign: sign,
      time: `${sign} ${" "} ${days}:${hours}:${minutes}`,
    };
  }

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link
                  className="back_link mb-3"
                  onClick={() => window.history.back()}
                >
                  <BsArrowLeft className="text-pink" /> Back{" "}
                </Link>
              </div>

              <div className="tbl_wrap_cmn">
                {params?.type === "task_broadcasted_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Broadcasted tasks today
                        </Typography>

                        <div className="fltrs_prnt">
                          <Button
                            className="sort_btn"
                            onClick={() => {
                              setOpenRecentActivity(true);
                            }}
                          >
                            Sort
                            <BsChevronDown />
                          </Button>
                          {/* {openRecentActivity && (
                            <RecentActivityDF
                              active={recentActivityState}
                              setActive={setRecentActivityState}
                              handleCloseRecentActivity={() =>
                                setOpenRecentActivity(false)
                              }
                              closeRecentActivity={handleCloseRecentActivity}
                              recentActivityValues={handleRecentActivityValue}
                            />
                          )} */}
                        </div>
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
                              <th className="cntent_srcd_th">
                                Content uploaded from task
                              </th>
                              <th className="time_th">Broadcasted time</th>
                              <th className="time_th">Deadline</th>
                              <th className="time_th">Purchase time</th>
                              <th>Location</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.task_broadcasted_today?.livetask
                              ?.sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              ?.map((curr) => {
                                const Audio = curr?.data?.filter(
                                  (item) => item?.type === "audio"
                                );
                                const Video = curr?.data?.filter(
                                  (item) => item?.type === "video"
                                );
                                const Image = curr?.data?.filter(
                                  (item) => item?.type === "image"
                                );

                                return (
                                  <tr
                                    onClick={() =>
                                      navigate(`/broadcasted-taks/${curr?._id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.content_details?.length == 0 ? (
                                          <div className="mapInput1 td_mp1">
                                            <style>
                                              {`
                                                  .gm-style > div:first-child {
                                                  cursor: pointer !important;
                                                }
                                              `}
                                            </style>
                                            <GoogleMap
                                              googleMapsApiKey={
                                                process.env
                                                  .REACT_APP_GOOGLE_MAPS_API_KEY
                                              }
                                              center={{
                                                lat: curr?.address_location
                                                  ?.coordinates[0],
                                                lng: curr?.address_location
                                                  ?.coordinates[1],
                                              }}
                                              zoom={7}
                                              mapContainerStyle={{
                                                height: "58px",
                                                width: "58px",
                                                borderRadius: "12px",
                                              }}
                                              options={{
                                                disableDefaultUI: true,
                                                mapTypeControl: false,
                                                streetViewControl: false,
                                              }}
                                            >
                                              <Marker
                                                key={curr._id}
                                                position={{
                                                  lat: curr?.address_location
                                                    ?.coordinates[0],
                                                  lng: curr?.address_location
                                                    ?.coordinates[1],
                                                }}
                                              />
                                            </GoogleMap>
                                          </div>
                                        ) : (
                                          <>
                                            {curr?.content_details[0]?.type ===
                                            "image" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.content_details[0]
                                                    ?.imageAndVideo
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.content_details[0]
                                                ?.type === "video" ? (
                                              <img
                                                src={
                                                  process.env
                                                    .REACT_APP_UPLOADED_CONTENT +
                                                  curr?.content_details[0]
                                                    ?.thumbnail
                                                }
                                                className="content_img"
                                              />
                                            ) : curr?.content_details[0]
                                                ?.type === "audio" ? (
                                              <img
                                                src={interviewic}
                                                className="content_img"
                                              />
                                            ) : null}
                                          </>
                                        )}
                                        <span className="cont_count">
                                          {curr?.content_details?.length}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.deadline_date).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.deadline_date).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {curr?.totalfund_invested?.length > 0
                                          ? moment(curr?.updatedAt).format(
                                              `hh:mm A`
                                            )
                                          : ""}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {curr?.totalfund_invested?.length > 0
                                          ? moment(curr?.updatedAt).format(
                                              `DD MMM YYYY`
                                            )
                                          : ""}
                                      </p>
                                    </td>
                                    <td>{curr?.location}</td>
                                    <td className="description_td">
                                      <p className="desc_ht">{curr?.heading}</p>
                                    </td>
                                    <td className="text-center">
                                      {curr?.need_photos && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {curr?.need_interview && (
                                        <Tooltip title="Interview">
                                          <img
                                            src={interviewic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {curr?.need_videos && (
                                        <Tooltip title="Video">
                                          <img
                                            src={videoic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.category_id?.name}>
                                        <img
                                          src={curr?.category_id?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>
                                      {curr?.content_details?.length > 0 && (
                                        <div className="hpr_dt">
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.content_details?.[0]
                                                ?.hopper_id?.avatar_id?.avatar
                                            }
                                            alt="Hopper"
                                            className="big_img"
                                          />
                                          <p className="hpr_nme">
                                            <span className="txt_light">
                                              {
                                                curr?.content_details?.[0]
                                                  ?.hopper_id?.user_name
                                              }
                                            </span>
                                          </p>
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {curr?.totalfund_invested?.length > 0
                                        ? `£${formatAmountInMillion(
                                            +curr?.totalfund_invested?.[0]
                                          )}`
                                        : "No fund invested "}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "content_sourced_task" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased from tasks today
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
                              <th className="cntent_srcd_th">
                                Content purchased from task
                              </th>
                              <th className="time_th">Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.today_content_sourced_from_task?.task?.map(
                              (curr) => {
                                const Audio = curr?.data?.filter(
                                  (item) => item?.type === "audio"
                                );
                                const Video = curr?.data?.filter(
                                  (item) => item?.type === "video"
                                );
                                const Image = curr?.data?.filter(
                                  (item) => item?.type === "image"
                                );
                                return (
                                  <tr
                                    onClick={() =>
                                      navigate(
                                        `/sourced-content-detail/${curr?._id}`
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <Link>
                                      <td className="content_img_td">
                                        <div className="tbl_cont_wrp">
                                          {curr?.type === "image" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_UPLOADED_CONTENT +
                                                curr?.imageAndVideo
                                              }
                                              className="content_img"
                                            />
                                          ) : curr?.type === "video" ? (
                                            <img
                                              src={
                                                process.env
                                                  .REACT_APP_UPLOADED_CONTENT +
                                                curr?.thumbnail
                                              }
                                              className="content_img"
                                            />
                                          ) : curr?.type === "audio" ? (
                                            <img
                                              src={interviewic}
                                              className="content_img"
                                            />
                                          ) : null}
                                          <span className="cont_count">
                                            {curr?.data?.length}
                                          </span>
                                        </div>
                                      </td>
                                    </Link>

                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>

                                    <td className="description_td">
                                      <p className="desc_ht">
                                        {curr?.task_id?.task_description}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={curr?.task_id?.category_id?.name}
                                      >
                                        <img
                                          src={curr?.task_id?.category_id?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.task_id?.location}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.hopper_details
                                              ?.avatar_details[0]?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {curr?.hopper_details?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        +curr?.task_id?.totalfund_invested[0]
                                      ) || 0}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "total_content_sourced_today" ? (
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
                              <th className="">Content purcahsed from task</th>
                              <th>Period</th>
                              <th>Total funds invested</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail?.map((curr, index) => {
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
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[curr?._id?.month - 1]}{" "}
                                      {curr?._id?.year}
                                    </p>
                                  </td>
                                  <td>
                                    £{formatAmountInMillion(+curr?.total_price)}
                                  </td>
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
                ) : params?.type === "funds_invested_today" ? (
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
                              <th className="cntent_srcd_th">
                                Content purchased from task
                              </th>
                              <th className="time_th">Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              <th>Uploaded by</th>
                              <th>Nett price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.today_content_sourced_from_task?.task?.map(
                              (curr) => {
                                const Audio = curr?.data?.filter(
                                  (item) => item?.type === "audio"
                                );
                                const Video = curr?.data?.filter(
                                  (item) => item?.type === "video"
                                );
                                const Image = curr?.data?.filter(
                                  (item) => item?.type === "image"
                                );

                                return (
                                  <tr
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      navigate(
                                        `/sourced-content-detail/${curr?._id}`
                                      )
                                    }
                                  >
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.type === "image" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.imageAndVideo
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.type === "video" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.type === "audio" ? (
                                          <img
                                            src={interviewic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">
                                          {curr?.data?.length}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht">
                                        {curr?.task_id?.task_description}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={curr?.task_id?.category_id?.name}
                                      >
                                        <img
                                          src={curr?.task_id?.category_id?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.task_id?.location}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.hopper_details
                                              ?.avatar_details[0]?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {curr?.hopper_details?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      £
                                      {curr
                                        ? formatAmountInMillion(
                                            +(
                                              curr?.task_id
                                                ?.totalfund_invested[0] -
                                              curr?.task_id?.Vat[0]
                                            )
                                          ) || 0
                                        : 0}
                                    </td>
                                    <td>
                                      £
                                      {curr
                                        ? formatAmountInMillion(
                                            +curr?.task_id?.Vat[0]
                                          )
                                        : 0}
                                    </td>
                                    <td>
                                      £
                                      {curr
                                        ? formatAmountInMillion(
                                            +curr?.task_id
                                              ?.totalfund_invested[0]
                                          )
                                        : 0}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
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
                              <th className="">Content purchased from task</th>
                              <th>Period</th>
                              <th>Nett price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
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
                                        +(
                                          curr?.total_price - curr?.total_vat ||
                                          0
                                        )
                                      )}
                                    </td>
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        +(curr?.total_vat || 0)
                                      )}
                                    </td>
                                    <td>
                                      £
                                      {formatAmountInMillion(
                                        +(curr?.total_price || 0)
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
                ) : params?.type === "deadline_met" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Deadline Met
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
                              <th className="cntent_srcd_th">
                                Broadcasted tasks
                              </th>
                              <th className="tsk_dlts">Task details</th>
                              <th>Broadcasted time</th>
                              <th>Deadline</th>
                              <th>Content uploaded time</th>
                              <th>Delay (+/-)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.deadline_met &&
                              detail?.deadline_met?.data
                                ?.sort(
                                  (a, b) =>
                                    new Date(b?.createdAt) -
                                    new Date(a?.createdAt)
                                )
                                ?.map((curr) => {
                                  return (
                                    <tr
                                      className="clickable"
                                      onClick={() =>
                                        navigate(
                                          `/broadcasted-taks/${curr?._id}`
                                        )
                                      }
                                    >
                                      <td className="content_img_td">
                                        <div className="mapInput td_mp">
                                          <style>
                                            {`
                                            .gm-style > div:first-child {
                                            cursor: pointer !important;
                                          }
                                        `}
                                          </style>
                                          <GoogleMap
                                            googleMapsApiKey={
                                              process.env
                                                .REACT_APP_GOOGLE_MAPS_API_KEY
                                            }
                                            center={{
                                              lat: curr?.address_location
                                                ?.coordinates[0],
                                              lng: curr?.address_location
                                                ?.coordinates[1],
                                            }}
                                            zoom={7}
                                            mapContainerStyle={{
                                              height: "120%",
                                              width: "100%",
                                            }}
                                            options={{
                                              disableDefaultUI: true,
                                              mapTypeControl: false,
                                              streetViewControl: false,
                                            }}
                                          >
                                            <Marker
                                              key={curr._id}
                                              position={{
                                                lat: curr?.address_location
                                                  ?.coordinates[0],
                                                lng: curr?.address_location
                                                  ?.coordinates[1],
                                              }}
                                            />
                                          </GoogleMap>
                                        </div>
                                      </td>
                                      <td className="description_td">
                                        <p className="desc_ht mb-0">
                                          {curr?.task_description}
                                        </p>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img
                                            src={watchic}
                                            className="icn_time"
                                          />
                                          {moment(curr?.createdAt).format(
                                            `hh:mm A`
                                          )}
                                        </p>
                                        <p className="timedate">
                                          <img
                                            src={calendar}
                                            className="icn_time"
                                          />
                                          {moment(curr?.createdAt).format(
                                            `DD MMM YYYY`
                                          )}
                                        </p>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img
                                            src={watchic}
                                            className="icn_time"
                                          />
                                          {moment(curr?.deadline_date).format(
                                            `hh:mm A`
                                          )}
                                        </p>
                                        <p className="timedate">
                                          <img
                                            src={calendar}
                                            className="icn_time"
                                          />
                                          {moment(curr?.deadline_date).format(
                                            `DD MMM YYYY`
                                          )}
                                        </p>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img
                                            src={watchic}
                                            className="icn_time"
                                          />
                                          {curr?.content_details[0]?.createdAt
                                            ? moment(
                                                curr?.content_details[0]
                                                  ?.createdAt
                                              ).format("hh:mm a")
                                            : ""}
                                        </p>
                                        <p className="timedate">
                                          <img
                                            src={calendar}
                                            className="icn_time"
                                          />
                                          {curr?.content_details[0]?.createdAt
                                            ? moment(
                                                curr?.content_details[0]
                                                  ?.createdAt
                                              ).format("DD MMM, YYYY")
                                            : ""}
                                        </p>
                                      </td>
                                      <td className="timedate_wrap">
                                        <p className="timedate">
                                          <img
                                            src={watchic}
                                            className="icn_time"
                                          />
                                          {curr?.deadline_date &&
                                            curr?.content_details[0]
                                              ?.createdAt && (
                                              <span
                                                className={`${
                                                  myFunction(
                                                    curr?.deadline_date,
                                                    curr?.content_details[0]
                                                      ?.createdAt
                                                  )?.sign == "+"
                                                    ? "text-green"
                                                    : "text-red"
                                                } txt_mdm`}
                                              >
                                                {
                                                  myFunction(
                                                    curr?.deadline_date,
                                                    curr?.content_details[0]
                                                      ?.createdAt
                                                  )?.time
                                                }
                                              </span>
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
                ) : params?.type === "task_categories" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task categories
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
                                Content purchased <br /> from task
                              </th>
                              <th>Period</th>
                              <th>Business</th>
                              <th>Political</th>
                              <th>Crime</th>
                              <th>Fashion</th>
                              <th>Other</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              location
                            )?.map((curr) => {
                              const other = curr?.task_details?.filter(
                                (item) =>
                                  item?.category_details?.name !== "Crime" &&
                                  item?.category_details?.name !== "Business" &&
                                  item?.category_details?.name !==
                                    "Political" &&
                                  item?.category_details?.name !== "Fashion"
                              );
                              const Bussines = curr?.task_details?.filter(
                                (item) =>
                                  item?.category_details?.name === "Business"
                              );
                              const Political = curr?.task_details?.filter(
                                (item) =>
                                  item?.category_details?.name === "Political"
                              );
                              const Crime = curr?.task_details?.filter(
                                (item) =>
                                  item?.category_details?.name === "Crime"
                              );
                              const Fashion = curr?.task_details?.filter(
                                (item) =>
                                  item?.category_details?.name === "Fashion"
                              );
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
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[curr?._id?.month - 1]}{" "}
                                      {curr?._id?.year}
                                    </p>
                                  </td>
                                  <td>{(Bussines && Bussines?.length) || 0}</td>
                                  <td>
                                    {(Political && Political?.length) || 0}
                                  </td>
                                  <td>{(Crime && Crime?.length) || 0}</td>
                                  <td>{(Fashion && Fashion?.length) || 0}</td>
                                  <td>{(other && other?.length) || 0}</td>
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
                              <th className="">
                                Content purchased <br /> from task
                              </th>
                              <th>Period</th>
                              <th>Photos</th>
                              <th>Videos</th>
                              <th>Interviews</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              totalDetail
                            )?.map((curr) => {
                              const Audio = curr?.content_id?.filter(
                                (item) => item?.type === "audio"
                              );
                              const Video = curr?.content_id?.filter(
                                (item) => item?.type === "video"
                              );
                              const Images = curr?.content_id?.filter(
                                (item) => item?.type === "image"
                              );

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
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[curr?._id?.month - 1]}{" "}
                                      {curr?._id?.year}
                                    </p>
                                  </td>
                                  <td>{(Images && Images?.length) || 0}</td>
                                  <td>{(Video && Video?.length) || 0}</td>
                                  <td>{(Audio && Audio?.length) || 0}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "task_location" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task location
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
                              <th className="">
                                Content purchased <br /> from task
                              </th>
                              <th>Period</th>
                              <th>North</th>
                              <th>South</th>
                              <th>East</th>
                              <th>West</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              location
                            )?.map((curr) => {
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
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[curr?._id?.month - 1]}{" "}
                                      {curr?._id?.year}
                                    </p>
                                  </td>
                                  <td>{curr?.north}</td>
                                  <td>{curr?.south}</td>
                                  <td>{curr?.east}</td>
                                  <td>{curr?.west}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : params?.type === "task_summary" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Task summary
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
                              <th className="">Content purchased from task</th>
                              <th>Period</th>
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              totalDetail
                            )?.map((curr) => {
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
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {months[curr?._id?.month - 1]}{" "}
                                      {curr?._id?.year}
                                    </p>
                                  </td>
                                  <td>{curr?.volume || 0}</td>
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
                              name="content_sourced_from_summary"
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
                              <th className="">
                                Content purchased <br /> from task
                              </th>
                              <th>Period</th>
                              <th>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalDetail &&
                              totalDetail.map((curr) => {
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
                              <th className="">Content purchased from tasks</th>
                              <th>Period</th>
                              <th>Funds Invested </th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountTotalFundInvestedContentPurchase(
                              totalDetail
                            )?.map((curr) => {
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
                                      +(curr?.total_price || 0)
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
                ) : params?.type === "total_fund_invested_today" ? (
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
                          className="common_table"
                        >
                          <thead>
                            <tr>
                              <th className="cntent_srcd_th">
                                Content purchased from task
                              </th>
                              <th className="time_th">Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              <th>Uploaded by</th>
                              <th>Nett Price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail?.total_content_sourced_from_task?.task?.map(
                              (curr) => {
                                return (
                                  <tr
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      navigate(
                                        `/sourced-content-detail/${curr?._id}`
                                      )
                                    }
                                  >
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        {curr?.type === "image" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.imageAndVideo
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.type === "video" ? (
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.thumbnail
                                            }
                                            className="content_img"
                                          />
                                        ) : curr?.type === "audio" ? (
                                          <img
                                            src={interviewic}
                                            className="content_img"
                                          />
                                        ) : null}
                                        <span className="cont_count">{1}</span>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `hh:mm A`
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          `DD MMM YYYY`
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht">
                                        {curr?.task_id?.task_description}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      {curr?.type == "audio" && (
                                        <Tooltip title="Interview">
                                          <img
                                            src={interviewic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}{" "}
                                      {curr?.type == "video" && (
                                        <Tooltip title="Video">
                                          <img
                                            src={videoic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      {curr?.type == "image" && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={curr?.task_id?.category_id?.name}
                                      >
                                        <img
                                          src={curr?.task_id?.category_id?.icon}
                                          alt="Exclusive"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.task_id?.location}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr?.hopper_details
                                              ?.avatar_details?.[0]?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {curr?.hopper_details?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      £{" "}
                                      {curr
                                        ? formatAmountInMillion(
                                            +(
                                              curr?.task_id
                                                ?.totalfund_invested[0] -
                                              curr?.task_id?.Vat[0]
                                            )
                                          ) || 0
                                        : 0}
                                    </td>
                                    <td>
                                      £
                                      {curr
                                        ? formatAmountInMillion(
                                            +curr?.task_id?.Vat[0]
                                          )
                                        : 0}
                                    </td>
                                    <td>
                                      £
                                      {curr
                                        ? formatAmountInMillion(
                                            +curr?.task_id
                                              ?.totalfund_invested[0]
                                          )
                                        : 0}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
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

export default memo(ReportsTablesTask);
