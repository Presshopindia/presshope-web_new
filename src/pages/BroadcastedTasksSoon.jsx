import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import DashBoardCardList from "../component/card/DashBoardCardList";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import imgl from "../assets/images/img1.jpeg";
import imgl1 from "../assets/images/img3.jpg";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import interviewic from "../assets/images/interview.svg";
import BroadcastedTrackings from "../pages/BroadcastedTrackings";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import {
  Card,
  TextField,
  CardActions,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  BsArrowDown,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
} from "react-icons/bs";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import {
  Modal,
  Button,
  Form,
  Tab,
  Tabs,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AddBroadcastTask from "./AddBroadcastTask";
import DbFooter from "../component/DbFooter";
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import { Get } from "../services/user.services";
import lvrask from "../assets/images/location.png";
import io from "socket.io-client";
import moment from "moment";
import ContentSourcedTF from "../component/Sortfilters/Task/ContentSourced";
import BroadcastedTaskTF from "../component/Sortfilters/Task/BroadcastedTask";
import Loader from "../component/Loader";
import { formatAmountInMillion } from "../component/commonFunction";
import { initStateOfSortFilterPurchasedContent } from "../component/staticData";
import { AiFillCaretDown } from "react-icons/ai";
import ReportPurchasedSourced from "../component/Sortfilters/Dashboard/ReportPurchasedSourced";
import TaskImage from "../assets/images/Contentdetail/contentbg.png";
import StarImage from "../assets/images/star.svg";
import Camera from "../assets/images/typeCam.svg";
import SmallImage from "../assets/images/imgn6.jpg";
import football from "../assets/images/football.png";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLocation } from "react-icons/gr";

import TopFilterComn from "../component/Sortfilters/Content/TopFilterComn";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

//const socket = io.connect("https://betazone.promaticstechnologies.com:3005");
const BroadcastedTasksSoon = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState();
  const [uploadedContent, setUploadedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [openreportPurchased, setOpenReportPurchased] = useState(false);

  const [sortFilterPurchasedContent, setSortFilterPurchasedContent] = useState(
    initStateOfSortFilterPurchasedContent
  );

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const parsedSortField = query.get("sortField") || "";
    const parsedSortValue = query.get("sortValue") || "";
    const parsedTimeRangeStart = query.get("timeRangeStart") || "";
    const parsedTimeRangeEnd = query.get("timeRangeEnd") || "";
    const parsedFavContent = query.get("favContent") === "true";
    const parsedType = query.getAll("type") || [];
    const parsedCategory = query.getAll("category") || [];
    const parsedChange = query.get("change") || false;

    setSortFilterPurchasedContent({
      sortField: parsedSortField,
      sortValue: parsedSortValue,
      timeRange: {
        start: parsedTimeRangeStart,
        end: parsedTimeRangeEnd,
      },
      favContent: parsedFavContent,
      type: parsedType,
      category: parsedCategory,
      change: parsedChange,
    });

    window.scrollTo(0, 0);
  }, []);

  // content sourced from tasks-
  const [contentSourcedTaskValue, setContentSourcedTaskValue] = useState("");
  const handleContentRangeTimeValues = (values) => {
    // console.log("contentSourcedTaskValue", values)
    setContentSourcedTaskValue(values);
  };
  const [filter, setFilter] = useState({
    content_sourced: false,
  });

  // console.log("contentSourcedTaskValue", contentSourcedTaskValue);
  const closeFilters = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      content_sourced: false,
    }));
  };

  const Statistics = async () => {
    const resp = await Get(`mediaHouse/tasks/count `);
    setStats(resp.data);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const Navigate = (type) => {
    navigate(`/task-tables/${type}`);
  };

  const ContentSourced = async (name, param) => {
    try {
      setLoading(true);
      const resp = await Get(
        `mediaHouse/getuploadedContentbyHoppers?limit=20&${sortFilterPurchasedContent?.sortField}=${sortFilterPurchasedContent?.sortValue}&favContent=${sortFilterPurchasedContent?.favContent}&category=${sortFilterPurchasedContent?.category}`
      );
      if (resp) {
        setUploadedContent(resp.data.data);
        setOpenReportPurchased(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  useEffect(() => {
    Statistics();
  }, [show]);

  useEffect(() => {
    ContentSourced();
  }, [query.get("change")]);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div className="dimensions">{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = new Date("2024-10-20T00:00:00Z").getTime() / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="bg-color">
        <div className="soon-cntent">
          <p>
            <span>Hang in there!</span>
            <br />
            We are building our community of Hoppers.
            <br />
            Soon, you will be able to broadcast multiple tasks from your
            desktop, <br /> and source content directly from thousands of our
            users!
          </p>
          <h2>Launching soon</h2>
          <div className="App countdown_timer">
            <CountdownCircleTimer
              {...timerProps}
              colors="#7E2E84"
              duration={daysDuration}
              initialRemainingTime={remainingTime}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#D14081"
              duration={daySeconds}
              initialRemainingTime={remainingTime % daySeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#EF798A"
              duration={hourSeconds}
              initialRemainingTime={remainingTime % hourSeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime(
                    "minutes",
                    getTimeMinutes(hourSeconds - elapsedTime)
                  )}
                </span>
              )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              {...timerProps}
              colors="#218380"
              duration={minuteSeconds}
              initialRemainingTime={remainingTime % minuteSeconds}
              onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > 0,
              })}
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("seconds", getTimeSeconds(elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
          </div>
        </div>
        <div className="page-wrap task_pg">
          <Container fluid>
            <Row className="dashboardStat_cards">
              <Col md={3} className="p-0 mb-0 custm-crd-wdth">
                <Card className="dash-top-cards tsk">
                  <Link to="/task-tables/liveTasks">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="sortFilter_actions">
                          <svg
                            className="me-0"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 6.15625H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 10.8438H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.21631 6.15625V15.5312"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {stats?.live_tasks_details?.count}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        {/* <span className="text-pink">Live</span> */}
                        Live tasks
                      </Typography>
                      <div className="content_stat">
                        {/* {stats?.live_tasks_details?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />
                              {(
                                stats?.live_tasks_details?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />
                              {(
                                stats?.live_tasks_details?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs yesterday</span> */}
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {stats?.live_tasks_details?.task &&
                          stats?.live_tasks_details?.task
                            ?.filter((el) => el.content.length !== 0)
                            .slice(0, 3)
                            .map((curr, index) => {
                              const Content =
                                curr.content[0] &&
                                (curr.content[0]?.media_type === "video"
                                  ? curr.content[0]?.thumbnail ||
                                  process.env.REACT_APP_CONTENT_MEDIA +
                                  curr.content[0]?.thumbnail
                                  : curr.content[0]?.media_type === "audio"
                                    ? audioic
                                    : curr.content[0]?.media ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                    curr.content[0]?.media);

                              // Conditionally render the img element only if Content is available
                              return Content ? (
                                <img
                                  src={Content}
                                  className="card-img"
                                  key={index}
                                  alt={`Image ${index}`}
                                />
                              ) : null;
                            })}
                        <span onClick={() => Navigate("liveTasks")}>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Link>
                </Card>
              </Col>
              <Col md={3} className="p-0 mb-0 custm-crd-wdth">
                <Link to="/dashboard-tables/broadcasted_task">
                  <Card className="dash-top-cards tsk">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="sortFilter_actions">
                          <svg
                            className="me-0"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 6.15625H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 10.8438H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.21631 6.15625V15.5312"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {stats?.broad_casted_tasks_details?.count}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Broadcasted tasks
                      </Typography>
                      {/* <div className="content_stat">
                          {stats?.broad_casted_tasks_details?.type ===
                          "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />
                              {(
                                stats?.broad_casted_tasks_details?.percentage ||
                                0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />
                              {(
                                stats?.broad_casted_tasks_details?.percentage ||
                                0
                              )?.toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs last month</span>
                        </div> */}
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {stats?.broad_casted_tasks_details?.task &&
                          stats?.broad_casted_tasks_details?.task
                            ?.filter((el) => el.content.length != 0)
                            ?.slice(0, 3)
                            ?.map((curr, index) => {
                              const Content = curr.content[0]
                                ? curr.content[0]?.media_type === "video"
                                  ? process.env.REACT_APP_CONTENT_MEDIA +
                                  curr.content[0]?.thumbnail
                                  : curr.content[0]?.media_type === "audio"
                                    ? audioic
                                    : curr.content[0]?.media
                                : null;

                              // Conditionally render the img element only if Content is available
                              return Content ? (
                                <img
                                  src={Content}
                                  className="card-img"
                                  key={index}
                                  alt={`Image ${index}`}
                                />
                              ) : null;
                            })}
                        <span
                          onClick={() =>
                            navigate("/dashboard-tables/broadcasted_task")
                          }
                        >
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="p-0 mb-0 custm-crd-wdth">
                <Link to="/task-tables/content-sourced">
                  <Card className="dash-top-cards tsk">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="sortFilter_actions">
                          <svg
                            className="me-0"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 6.15625H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 10.8438H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.21631 6.15625V15.5312"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {stats?.sourced_content_from_tasks?.count || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      ></Typography>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {stats?.sourced_content_from_tasks?.task
                          ?.slice(0, 3)
                          .map((curr, index) => {
                            return (
                              <div key={index}>
                                {curr?.type === "image" ? (
                                  <img
                                    src={
                                      curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.imageAndVideo
                                    }
                                    className="card-img"
                                    alt={`Image ${index}`}
                                  />
                                ) : curr?.type === "audio" ? (
                                  <img
                                    src={audioic}
                                    className="card-img"
                                    alt={`Audio ${index}`}
                                  />
                                ) : curr?.type === "video" ? (
                                  <img
                                    src={
                                      curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.thumbnail
                                    }
                                    alt={`Video ${index}`}
                                  />
                                ) : null}
                              </div>
                            );
                          })}

                        <span onClick={() => Navigate("content-sourced")}>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="p-0 mb-0 custm-crd-wdth">
                <Link to="/task-tables/total-fund-invested">
                  <Card className="dash-top-cards tsk">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="sortFilter_actions">
                          <svg
                            className="me-0"
                            width="20"
                            height="17"
                            viewBox="0 0 20 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 6.15625H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.747559 10.8438H19.4976"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M6.21631 6.15625V15.5312"
                              stroke="black"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          £
                          {formatAmountInMillion(
                            stats?.total_fund_invested?.count
                          )}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Total funds invested
                      </Typography>
                      {/* <div className="content_stat">
                          {stats?.total_fund_invested?.type === "increase" ? (
                            <span className="stat_up">
                              <BsArrowUp />{" "}
                              {(
                                stats?.total_fund_invested?.percentage || 0
                              )?.toFixed(2)}
                              %
                            </span>
                          ) : (
                            <span className="stat_down">
                              <BsArrowDown />{" "}
                              {(
                                stats?.total_fund_invested?.percentage || 0
                              ).toFixed(2)}
                              %
                            </span>
                          )}
                          <span>vs last month</span>
                        </div> */}
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {stats?.total_fund_invested?.data
                          ?.slice(0, 3)
                          .map((curr, index) => {
                            return (
                              <div key={index}>
                                {curr?.type === "image" ? (
                                  <img
                                    src={
                                      curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.imageAndVideo
                                    }
                                    className="card-img"
                                    alt={`Image ${index}`}
                                  />
                                ) : curr?.type === "audio" ? (
                                  <img
                                    src={audioic}
                                    className="card-img"
                                    alt={`Audio ${index}`}
                                  />
                                ) : curr?.type === "video" ? (
                                  <img
                                    src={
                                      curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.thumbnail
                                    }
                                    alt={`Video ${index}`}
                                  />
                                ) : null}
                              </div>
                            );
                          })}

                        <span onClick={() => Navigate("content-sourced")}>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="mb-4 ps-0 custm-crd-wdth">
                <Card className="dash-top-cards h-100 add-br d-flex align-items-center me-0 justify-content-center">
                  <CardContent className="dash-c-body rev">
                    <div className="broadcast">
                      <Typography className="mb-3 text-center d-flex justify-content-center align-items-center">
                        <span className="clickable" onClick={handleShow}>
                          +
                        </span>
                      </Typography>
                      <Typography className="mb-0 text-center txt_bold">
                        Broadcast task
                      </Typography>
                    </div>
                  </CardContent>
                  {show && <AddBroadcastTask isOpen={show} show={handleShow} />}
                </Card>
              </Col>
            </Row>

            <Row className="tracker-task">
              <Col md={4} className="mb-0">
                <BroadcastedTrackings show={show} />
              </Col>
              <Col md={8} className="pe-0">
                {/* <div className="right-cards">
                <Row>
                  <Col
                    md={12}
                    className="list-card-wrap broadcasted_uploads tsk_list_wrp pt-0"
                  >
                    <Card className="dash-top-cards listing mb-0 me-0">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
                          <Typography
                            variant="body2"
                            className="review-txt card-head-txt mb-0"
                          >
                            Content uploaded from tasks
                          </Typography>
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenReportPurchased(true);
                              }}
                            >
                              Sort <AiFillCaretDown />
                            </button>
                            {openreportPurchased && (
                              <ReportPurchasedSourced
                                shaEx={true}
                                closeSortComponent={() =>
                                  setOpenReportPurchased(false)
                                }
                                setSortFilterPurchasedContent={setSortFilterPurchasedContent}
                                sortFilterPurchasedContent={sortFilterPurchasedContent}
                                url="/broadcasted-taks"
                              />
                            )}
                          </div>
                        </div>
                        <div className="scrolling">
                          {uploadedContent?.map((curr) => {
                            return (
                              <DashBoardCardList
                                contentDetail={curr?._id}
                                listcard1={curr.task_id.heading}
                                listcard2={moment(
                                  curr.createdAt
                                ).format("hh:mm a, DD MMM YYY")}
                                reviewType={
                                  curr?.type === "video" ? contentVideo : curr?.type === "image" ? contentCamera : interviewic
                                }
                                imgl={
                                  curr?.type === "image" ?
                                    curr.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr.imageAndVideo
                                    : curr?.type === "video" ?
                                      curr.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr.videothubnail
                                      : curr?.type === "audio" ? audioic : null
                                }
                              />
                            );
                          })}
                        </div>
                      </CardContent>
                      <div className="d-flex justify-content-end tsk_link_wrp">
                        <Link
                          className="view_all_link"
                          to={"/Uploaded-Content/uploaded"}
                        >
                          View all <BsArrowRight className="text-pink" />
                        </Link>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div> */}
                <div className="top-bar">
                  <Row>
                    <Col sm={12}>
                      <div className="feedPreviews d-flex justify-content-between broadcast-heading ">
                        <h2>Uploaded content</h2>
                        <div className="sorting_wrap d-flex">
                          <div className="feedSorting me-4">
                            <div className="fltrs_prnt top_fltr">
                              <p className="lbl_fltr">Filter</p>
                              <button
                                className="sortTrigger"
                                onClick={() => {
                                  setOpenFilterComponent(true);
                                }}
                              >
                                Filter <AiFillCaretDown />
                              </button>
                              {openFilterComponent && (
                                <TopFilterComn
                                  closeFilterComponent={
                                    handleCloseFilterComponent
                                  }
                                // feedMultiFilter={handleMultiFilter}
                                />
                              )}
                            </div>
                          </div>
                          <div className="feedSorting">
                            <div className="fltrs_prnt top_fltr">
                              <p className="lbl_fltr">Sort</p>
                              <button
                                className="sortTrigger"
                                onClick={() => {
                                  setOpenSortComponent(true);
                                }}
                              >
                                Sort <AiFillCaretDown />
                              </button>
                              {openSortComponent && (
                                <Fundsinvested
                                  closeSortComponent={handleCloseSortComponent}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row className="custm-crds">
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="homeFeedCard feed_single_crd photo-resize">
                      <CardContent className="homeFeed_body clickable">
                        <div className="feedImgTag">
                          <div className="tags_prnt iflex">
                            <div className="post_itm_icns">
                              <p className="count"></p>
                              <img
                                className="feedMediaType iconBg"
                                src={Camera}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="feedImgContainer">
                            <img className="feedMedia" src={TaskImage} alt="" />
                            <div className="backgroundOverlay"></div>
                          </div>
                          <div className="z_index_high">
                            <img
                              className="iconBg favCont"
                              src={StarImage}
                              alt=""
                            />
                          </div>
                          <div className="z_index_high">
                            <div className="iconBg favCont upload-icn">
                              <svg
                                width="31"
                                height="30"
                                viewBox="0 0 31 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 2.5H7.15316C7.37715 2.5 7.57421 2.64798 7.63667 2.8631L9.13911 8.03819M9.13911 8.03819L11.9571 17.7445C12.0195 17.9597 12.2166 18.1076 12.4406 18.1076H24.7597C24.9907 18.1076 25.1921 17.9504 25.2481 17.7263L27.5137 8.66378C27.5932 8.34601 27.3528 8.03819 27.0253 8.03819H9.13911ZM14.0764 21.1285C15.6057 21.2675 16.7328 22.62 16.5937 24.1493C16.4679 25.5339 15.461 26.5408 14.0764 26.6667C12.5471 26.8057 11.1946 25.6786 11.0556 24.1493C10.9045 22.4878 12.4149 20.9774 14.0764 21.1285ZM23.6424 21.1285C25.1717 21.2675 26.2988 22.62 26.1597 24.1493C26.0338 25.5339 25.027 26.5408 23.6424 26.6667C22.113 26.8057 20.7606 25.6786 20.6215 24.1493C20.4705 22.4878 21.9809 20.9774 23.6424 21.1285Z"
                                  stroke="white"
                                  stroke-width="1.96354"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="feedContent_wrap">
                          <div className="contentAcuthor_type align-items-center d-flex flex-wrap justify-content-between">
                            <div className="authorType">
                              <img src={SmallImage} alt="" />
                              <span className="authName">driftclick</span>
                            </div>
                            <div className="content_type">
                              <img src={football} alt="" />
                              <span className="typeOfContent">Sports</span>
                            </div>
                          </div>
                          <Typography
                            variant="body2"
                            className="card-head-txt mb-2"
                          >
                            Sed efficitur, libero sit amet mollis dictum, elit
                            orci dapibus mi
                            <br />
                          </Typography>
                          <div className="feed_dateTime">
                            <small className="feedTime">
                              <MdOutlineWatchLater />
                              12:36 PM, 10 Oct 2022
                            </small>
                            <small className="feedLocation">
                              <GrLocation />
                              Grenfell Tower, London
                            </small>
                          </div>
                        </div>
                      </CardContent>
                      <CardActions className="dash-c-foot feedFooter justify-content-between">
                        <Link to="/viewDetail" className="red_font">
                          View task
                        </Link>
                        <Button variant="primary" className="contentPrice_btn">
                          £350
                        </Button>
                      </CardActions>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="mt-4">
              <TopSearchesTipsCard />
            </div>
          </Container>
        </div>
      </div>
      <DbFooter />
    </>
  );
};

export default BroadcastedTasksSoon;
