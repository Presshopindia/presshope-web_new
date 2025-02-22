import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import list from "../assets/images/list.svg";
import locationn from "../assets/images/location.svg";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import { MdMyLocation, MdDateRange } from "react-icons/md";
import { BsPeople, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Typography } from "@mui/material";
import { Get } from "../services/user.services";
import moment from "moment/moment";
import audioic from "../assets/images/audio-icon.svg";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Timer from "../component/Timer";
import Loader from "../component/Loader";
import bullseye from "../assets/images/bullseye.svg";
import calendaric from "../assets/images/calendarnic.svg";
import timeic from "../assets/images/watch.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import { AiFillCaretDown } from "react-icons/ai";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";

const BroadcastedTrackings = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const [liveTasks, setLiveTasks] = useState();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("map");
  const [taskDetails, setTaskDetails] = useState({
    deadline_date: "",
  });
  const [deadline, setDeadline] = useState();
  const [markers, setMarkers] = useState({
    positions: [],
  });

  useEffect(() => {
    setTaskDetails(props?.viewTask?.taskDetails);
  }, [props?.viewTask?.open])
  const [location, setLocation] = useState([]);
  const LiveTasks = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/live/expired/tasks?status=live`);
      if (resp) {
        console.log("all listed tasked---> ==>", resp);
        localStorage.setItem("live_taskId", resp?.data?.tasks[0]?._id);
      }
      setLiveTasks(resp.data.tasks);
      resp?.data?.tasks?.map((item) => {
        markers.positions.push({
          lat: item.address_location.coordinates[0],
          lng: item.address_location.coordinates[1],
          id: item._id,
        });
      });
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const TaskDetails = async (id) => {
    setLoading(true);
    // localStorage.setItem("live_taskId", resp[0]?._id);
    const liveId = localStorage.getItem("live_taskId");
    try {
      console.log("chakalalalalal");
      const resp = await Get(
        `mediaHouse/live/expired/tasks?status=live&id=${id || liveId || param?.id
        }`
      );
      setDeadline(resp.data?.tasks?.deadline_date);
      setTaskDetails(resp?.data?.tasks);
      console.log(resp?.data?.tasks, `<---this is a task details`);
      if (resp) {
        setLocation(resp.data.tasks.address_location.coordinates);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function switchTaskView() {
    var mapView = document.querySelector(".mapView");
    var mapBtn = document.querySelector(".mapButton");
    var listBtn = document.querySelector(".listButton");
    var listView = document.querySelector(".listView_task_wrap");
    if (mapView.style.display !== "none") {
      mapView.style.display = "none";
      listView.style.display = "block";
      mapBtn.style.display = "block";
      listBtn.style.display = "none";
    } else {
      mapView.style.display = "block";
      listView.style.display = "none";
      mapBtn.style.display = "none";
      listBtn.style.display = "block";
    }
  }

  const markerSize = {
    width: 30,
    height: 30,
  };

  useEffect(() => {
    if (param.id) {
      window.scrollTo(0, 650);
    }
    LiveTasks();
    TaskDetails();
  }, [props.show]);

  const [openSortComponent, setOpenSortComponent] = useState(false);
  const [openFilterComponent, setOpenFilterComponent] = useState(false);

  const handleCloseFilterComponent = (values) => {
    setOpenFilterComponent(values);
  };

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  return (
    <>
      {loading && <Loader />}
      {param.id && (
        <div className="">
          <Link
            className="back_link mb-3"
            onClick={() => {
              window.history.back();
            }}
          >
            <BsArrowLeft className="text-pink" /> Back{" "}
          </Link>
        </div>
      )}
      <div className="trackingList_wrap">
        <Row>
          <Col md={6} className="ps-0 pe-1">
            <div className="bTask_list_card">
              <div className="taskcard_headr d-flex justify-content-between align-items-center mb-13">
                {
                  props?.viewTask?.open ? <div className="clickable" onClick={() => props?.setViewTask({...props?.viewTask, open: false })}><BsArrowLeft className="text-pink " /> <span>Back</span></div> : null
                }
                <h2 className="dashCard-heading">
                  <span className="text-pink">Live</span> tracking
                </h2>
                <div className="changeview_sort d-flex align-items-center gap-4">
                  <img src={locationn} alt="view map" />
                  <div className="feedSorting">
                    <div className="fltrs_prnt top_fltr">
                      <button
                        className="sortTrigger"
                        // onClick={() => {
                        //   setOpenSortComponent(true);
                        // }}
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
              <div className="taskcard_body ps-0 pe-1 pb-0">
                {
                  props?.viewTask?.open ? (
                    <div className="mapInput mapView position-relative">
                      <GoogleMap
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                        center={{
                          lat: props?.viewTask?.taskDetails?.address_location?.coordinates[0]
                            ? props?.viewTask?.taskDetails?.address_location?.coordinates[0]
                            : markers?.positions[markers?.positions?.length - 1]
                              ?.lat,
                          lng: props?.viewTask?.taskDetails?.address_location?.coordinates[0]
                            ? props?.viewTask?.taskDetails?.address_location?.coordinates[1]
                            : markers?.positions[markers?.positions?.length - 1]
                              ?.lng,
                        }}
                        zoom={8}
                        mapContainerStyle={{ height: "400px", width: "100%" }}
                      >
                        {markers.positions.map((marker) => (
                          <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => TaskDetails(marker.id)}
                          />
                        ))}
                      </GoogleMap>
                      <div className="hopper_content">
                        <span className="me-4">

                          <MdMyLocation />{" "}
                          {props?.viewTask?.taskDetails.hasOwnProperty("accepted_by")
                            ? props?.viewTask?.taskDetails?.accepted_by?.length === 0 ||
                              props?.viewTask?.taskDetails?.accepted_by?.length === 1
                              ? `${props?.viewTask?.taskDetails?.accepted_by?.length} Hopper tasked`
                              : `${props?.viewTask?.taskDetails?.accepted_by?.length} Hoppers tasked`
                            : `${0} Hopper tasked`}{" "}
                        </span>
                        <span>
                          <BiPlay /> {props?.viewTask?.taskDetails?.content?.length || 0} Content
                          uploaded
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="list_view_wrap">
                      {liveTasks &&
                        liveTasks.map((curr) => {
                          return (
                            <div className="listView_task">
                              <div className="mapInput">
                                <GoogleMap
                                  googleMapsApiKey={
                                    process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                                  }
                                  center={{
                                    lat: curr?.address_location?.coordinates[0],
                                    lng: curr?.address_location?.coordinates[1],
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
                                      lat: curr?.address_location?.coordinates[0],
                                      lng: curr?.address_location?.coordinates[1],
                                    }}
                                  />
                                </GoogleMap>
                              </div>
                              <div className="listTask-detail w-100">
                                <h6 className="tsk_lft_desc">{curr?.heading}</h6>
                                <div className="listTask_action d-flex justify-content-between">
                                  <div className="d-flex flex-column">
                                    <span className="time_info d-flex align-items-center lft_tme">
                                      <BiTimeFive />
                                      <Typography className="font-12">
                                        {moment(curr?.deadline_date).format(
                                          "hh:mm A, DD.MM.YYYY"
                                        )}
                                      </Typography>
                                    </span>
                                    <span className="time_info d-flex align-items-center lft_tme">
                                      <img src={bullseye} alt="Hoppers" />
                                      <Typography className="font-12">
                                        {curr?.accepted_by?.length || 0} Hoppers
                                        tasked
                                      </Typography>
                                    </span>
                                  </div>
                                  <Link
                                    to={`/task?taskId=${curr?._id}`}
                                  >
                                    <Button
                                      variant="primary"
                                      className="sm-btn"
                                      onClick={() => props?.setViewTask({ open: true, taskDetails: curr })}
                                    >
                                      View
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )
                }
                <div className="listView_task_wrap">
                  {liveTasks &&
                    liveTasks.map((curr) => {
                      return (
                        <div className="listView_task">
                          <div className="mapInput">
                          </div>
                          <div className="listTask-detail w-100">
                            <h6 className="tsk_lft_desc">
                              {curr.task_description}
                            </h6>
                            <div className="listTask_action d-flex justify-content-between">
                              <div className="d-flex flex-column">
                                <span className="time_info d-flex align-items-center lft_tme">
                                  <BiTimeFive />
                                  <Typography className="font-12">
                                    {moment(curr.deadline_date).format(
                                      "hh:mm A, DD.MM.YYYY"
                                    )}
                                  </Typography>
                                </span>
                                <span className="time_info d-flex align-items-center lft_tme">
                                  <img src={bullseye} alt="Hoppers" />
                                  <Typography className="font-12">
                                    {curr?.accepted_by?.length || 0} Hoppers
                                    tasked
                                  </Typography>
                                </span>
                              </div>
                              <Link>
                                <Button
                                  variant="primary"
                                  className="sm-btn"
                                  onClick={() => TaskDetails(curr?._id)}
                                >
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} className="ps-0 pe-1">
            <div className="taskDetail_wrap pe-1">
              <h2 className="dashCard-heading">Task details</h2>
              <div className="singleTask_detail sngl_wrp">
                <div className="taskInfo_card">
                  <label>Task</label>
                  <div className="taskSingle_info">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.58901 0.693055L14.6514 2.94108C16.11 3.5846 16.11 4.64855 14.6514 5.29206L9.58901 7.54009C9.01414 7.79749 8.07031 7.79749 7.49543 7.54009L2.43309 5.29206C0.974451 4.64855 0.974451 3.5846 2.43309 2.94108L7.49543 0.693055C8.07031 0.435648 9.01414 0.435648 9.58901 0.693055Z"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 7.62598C1 8.34672 1.54056 9.179 2.20123 9.47073L8.02722 12.062C8.47339 12.2593 8.97962 12.2593 9.41721 12.062L15.2432 9.47073C15.9039 9.179 16.4444 8.34672 16.4444 7.62598"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 11.916C1 12.714 1.47191 13.4347 2.20123 13.7608L8.02722 16.352C8.47339 16.5493 8.97962 16.5493 9.41721 16.352L15.2432 13.7608C15.9725 13.4347 16.4444 12.714 16.4444 11.916"
                        stroke="#7D8D8B"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>{taskDetails?.task_description}</p>
                  </div>
                </div>
                <div className="taskInfo_card">
                  <Row className="justify-content-between price-wrapper">
                    <Col md={6} >
                      <div className="timeSlots_tiles">
                        <label>Date</label>
                        <span className="sm-tiles">
                          <img
                            className="tsk_dlt_icns"
                            src={calendaric}
                            alt="date"
                          />
                          {moment(taskDetails?.deadline_date).format(
                            "DD/MM/YYYY"
                          ) !== "Invalid date"
                            ? " " +
                            moment(taskDetails?.deadline_date).format(
                              "DD/MM/YYYY"
                            )
                            : "dd/mm/yyyy"}
                        </span>
                      </div>
                    </Col>
                    <Col md={6} >
                      <div className="timeSlots_tiles">
                        <label>Deadline</label>
                        <span className="sm-tiles">
                          <img
                            className="tsk_dlt_icns"
                            src={timeic}
                            alt="time"
                          />
                          {moment(taskDetails?.deadline_date).format(
                            "hh:mm A"
                          ) !== "Invalid date"
                            ? " " +
                            moment(taskDetails?.deadline_date).format(
                              "hh:mm A"
                            )
                            : " 00:00 AM"}
                        </span>
                      </div>
                    </Col>
                    {/* <Col md={4} className="timer_lft">
                      <Timer className="tsk_dlt_icns" deadline={deadline} />
                    </Col> */}
                  </Row>
                </div>
                <div className="taskInfo_card">
                  <div className="row d-flex justify-content-between price-wrapper">
                    <div className="col-md-6">
                      <label>Price offered</label>
                    </div>
                    <div className="col-md-6">
                      <label>Chat</label>
                    </div>
                  </div>
                  <Row className="mt-2">
                    <Col md={6}>
                      <div className="priceOffer_wrap">
                        <div className="type_price justify-content-start gap-3">
                          <label className="txt_lt">Photo</label>
                          <span
                            className={
                              taskDetails?.need_photos === true
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_photos === true
                              ? "£" +
                              formatAmountInMillion(
                                taskDetails?.hopper_photo_price
                              )
                              : "-"}
                          </span>
                        </div>
                        <div className="type_price justify-content-start gap-3">
                          <label className="txt_lt">Interview</label>
                          <span
                            className={
                              taskDetails?.need_interview === true
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_interview === true
                              ? "£" +
                              formatAmountInMillion(
                                taskDetails?.hopper_interview_price
                              )
                              : "-"}
                          </span>
                        </div>
                        <div className="type_price justify-content-start gap-3">
                          <label className="txt_lt">Video</label>
                          <span
                            className={
                              taskDetails?.need_videos === true
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_videos === true
                              ? "£ " +
                              formatAmountInMillion(
                                taskDetails?.hopper_videos_price
                              )
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end mt-4">
                      <div
                        className="taskUploads_media clickable"
                        onClick={() =>
                          taskDetails?.content?.length > 0 &&
                          navigate(`/Uploaded-Content/uploaded`)
                        }
                      >
                        {/* <div className="mediaWrap uploaded_mda">
                          {taskDetails?.content &&
                            taskDetails?.content.map((curr) => {
                              if (curr?.media_type === "image")
                                return <img src={curr?.watermark} alt="" />;
                              if (curr?.media_type === "video")
                                return (
                                  <img
                                    src={
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      curr?.thumbnail
                                    }
                                    alt=""
                                  />
                                );
                            })}
                        </div> */}
                        <Link
                          className="text-dark"
                          to={"/Uploaded-Content/uploaded"}
                        >
                          <small className="font-bold">
                            View all uploaded content{" "}
                          </small>
                          <BsArrowRight className="text-pink float-end me-2 mt-1" />
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BroadcastedTrackings;
