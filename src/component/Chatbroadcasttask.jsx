import React, { memo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import list from "../assets/images/list.svg";
import locationn from "../assets/images/location.svg";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import { MdMyLocation, MdDateRange } from "react-icons/md";
import { BsPeople, BsArrowRight } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Typography } from "@mui/material";
import { Get } from "../services/user.services";
import moment from "moment/moment";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Timer from "../component/Timer";
import Loader from "../component/Loader";
import bullseye from "../assets/images/bullseye.svg";
import calendaric from "../assets/images/calendarnic.svg";
import timeic from "../assets/images/watch.svg";
import { formatAmountInMillion } from "./commonFunction";
import audioic from "../assets/images/audimg.svg";

const Chatbroadcasttask = (props) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

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
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle geolocation retrieval
    async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null); // Clear any previous errors
          },
          function (error) {
            setError(error.message);
            console.error("Error getting geolocation:", error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
  }, []);

  const LiveTasks = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/live/expired/tasks?status=live`);
      setLiveTasks(resp.data.tasks);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const TaskDetails = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/live/expired/tasks?status=live&id=${(props.id && props.id) || ""
        }`
      );
      setDeadline(resp.data.tasks.deadline_date);
      setTaskDetails(resp.data.tasks);
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
    LiveTasks();
  }, [props.show]);

  useEffect(() => {
    TaskDetails();
  }, [props.id]);

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="trackingList_wrap cht_tsk_trck">
        <div className="cht_tsk_rw d-flex">
          <div className="ps-0 pe-01 chat_loc_wp">
            <div className="bTask_list_card">
              <div className="taskcard_body ps-0 pe-0 pb-0">
                <div className="mapInput mapView position-relative">
                  <GoogleMap
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    center={{
                      lat: taskDetails?.address_location?.coordinates[0]
                        ? taskDetails?.address_location?.coordinates[0]
                        : latitude,
                      lng: taskDetails?.address_location?.coordinates[1]
                        ? taskDetails?.address_location?.coordinates[1]
                        : longitude,
                    }}
                    zoom={8}
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                  >
                    {taskDetails?.address_location?.coordinates && (
                      <Marker
                        position={{
                          lat: taskDetails?.address_location?.coordinates[0],
                          lng: taskDetails?.address_location?.coordinates[1],
                        }}
                      />
                    )}
                  </GoogleMap>
                  <div className="hopper_content">
                    <span className="me-4">
                      <MdMyLocation />{" "}
                      {taskDetails.hasOwnProperty("accepted_by")
                        ? taskDetails?.accepted_by?.length === 0 ||
                          taskDetails?.accepted_by?.length === 1
                          ? `${taskDetails?.accepted_by?.length} Hopper tasked`
                          : `${taskDetails?.accepted_by?.length} Hoppers tasked`
                        : `${0} Hopper tasked`}{" "}
                    </span>
                    <span>
                      <BiPlay /> {taskDetails?.content?.length || 0} Content
                      uploaded
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cht_tsk_wp">
            <div className="taskDetail_wrap pe-0">
              {/* <h2 className='dashCard-heading'>Task details</h2> */}
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
                  <Row className="justify-content-between rw_gp_5">
                    <Col md={6} className="">
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
                    <Col md={6} className="">
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
                    <Col md={6} className="timer_lft">
                      <Timer className="tsk_dlt_icns" deadline={deadline} />
                    </Col>
                  </Row>
                </div>
                <div className="taskInfo_card">
                  <label>Price offered</label>
                  <Row className="mt-2">
                    <Col md={6}>
                      <div className="priceOffer_wrap">
                        <div className="type_price justify-content-between">
                          <label className="txt_lt">Photo</label>
                          <span
                            className={
                              taskDetails?.need_photos
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_photos === true
                              ? "£ " + formatAmountInMillion(taskDetails?.photo_price)
                              : "-"}
                          </span>
                        </div>
                        <div className="type_price justify-content-between">
                          <label className="txt_lt">Interview</label>
                          <span
                            className={
                              taskDetails?.need_interview
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_interview === true
                              ? "£ " + formatAmountInMillion(taskDetails?.interview_price)
                              : "-"}
                          </span>
                        </div>
                        <div className="type_price justify-content-between">
                          <label className="txt_lt">Video</label>
                          <span
                            className={
                              taskDetails?.need_videos
                                ? "sm-tiles prc_cstm"
                                : "sm-tiles"
                            }
                          >
                            {taskDetails?.need_videos === true
                              ? "£ " + formatAmountInMillion(taskDetails?.videos_price)
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                      <div
                        className="taskUploads_media clickable"
                        onClick={() =>
                          navigate(`/hopper-task-content/${taskDetails?._id}`)
                        }
                      >
                        {
                          console.log("taskDetails", taskDetails)
                        }
                        <div className="mediaWrap uploaded_mda">
                          {taskDetails?.content?.slice(0, 3)?.map((el, index) => {
                            return (
                              el?.media_type === "image" ? <img key={index} src={el?.watermark} alt="" /> : <div className="card-imgs-wrap"><img className="card-img" key={index} src={audioic} alt="" /></div>
                            );
                          })}
                        </div>
                        <Link
                          className="text-dark"
                          to={`/Uploaded-Content/${taskDetails?._id}`}
                        >
                          <small className="font-bold view_tsk_link">
                            View all uploaded content{" "}
                          </small>
                          <BsArrowRight className="text-pink float-end me-2" />
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Chatbroadcasttask);
