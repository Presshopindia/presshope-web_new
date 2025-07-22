import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import list from "../assets/images/list.svg";
import locationn from "../assets/images/location.svg";
import { Form, Row, Col, Card } from "react-bootstrap";
import { Button, CardContent } from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import { MdMyLocation, MdDateRange, MdOutlineWatchLater } from "react-icons/md";
import { BsPeople, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Typography } from "@mui/material";
import { Get } from "../services/user.services";
import moment from "moment/moment";
import audioicimg from "../assets/images/audimg.svg";

import ListIcon from "../assets/images/list_icon.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Timer from "../component/Timer";
import Loader from "../component/Loader";
import bullseye from "../assets/images/bullseye.svg";
import calendaric from "../assets/images/calendarnic.svg";
import timeic from "../assets/images/watch.svg";
import { formatAmountInMillion } from "../component/commonFunction";
import { AiFillCaretDown } from "react-icons/ai";
import Fundsinvested from "../component/Sortfilters/Dashboard/Fundsinvested";
import locationPin from "../assets/images/locationPin.png";
import gps from "../assets/images/gps.png";

const BroadcastedTrackings = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const [liveTasks, setLiveTasks] = useState();
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    deadline_date: "",
  });

  useEffect(() => {
    setTaskDetails(props?.viewTask?.taskDetails);
  }, [props?.viewTask?.open]);

  const LiveTasks = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/getLiveTask`);
      setLiveTasks(resp.data.task);
      if (props?.viewTask?.taskId) {
        const liveTask = resp?.data?.task?.find((el) => el._id === props?.viewTask?.taskId);
        props?.setViewTask({ open: true, taskDetails: liveTask, taskId: props?.viewTask?.taskId })
      } else {
        const liveTask = resp?.data?.task?.[0];
        setTaskDetails(liveTask)
        props?.TaskDetails(resp?.data?.task?.[0]?._id);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const TaskDetails = async (id) => {
    setLoading(true);
    const liveId = localStorage.getItem("live_taskId");
    try {
      const resp = await Get(
        `mediaHouse/live/expired/tasks?status=live&id=${id || liveId || param?.id
        }`
      );
      setTaskDetails(resp?.data?.tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (param.id) {
      window.scrollTo(0, 650);
    }
    LiveTasks();
    TaskDetails();
  }, []);

  const [openSortComponent, setOpenSortComponent] = useState(false);

  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [deadlineTime, setDeadlineTime] = useState("");

  useEffect(() => {
    if (taskDetails?.deadline_date) {
      // Set the deadline time format
      setDeadlineTime(moment(taskDetails.deadline_date).format("hh:mm A"));

      // Calculate time remaining
      const calculateTimeRemaining = () => {
        const now = moment();
        const deadline = moment(taskDetails.deadline_date);

        if (deadline.isBefore(now)) {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const duration = moment.duration(deadline.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours()) % 24;
        const minutes = Math.floor(duration.asMinutes()) % 60;
        const seconds = Math.floor(duration.asSeconds()) % 60;

        setTimeRemaining({ days, hours, minutes, seconds });
      };

      // Initial calculation
      calculateTimeRemaining();

      // Update every second
      const timer = setInterval(calculateTimeRemaining, 1000);

      return () => clearInterval(timer);
    }
  }, [taskDetails?.deadline_date]);

  return (
    <>
      {loading && <Loader />}
      {param.id && (
        <div className="bold">
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
                  props?.viewTask?.open ? <div className="clickable bold" onClick={() => {
                    if (props?.viewTask?.taskId) {
                      window.history.back();
                    } else {
                      props?.setViewTask({ ...props?.viewTask, open: false })
                    }
                  }}><BsArrowLeft className="text-pink " /> <span>Back</span></div> : null
                }
                <h2 className="dashCard-heading">
                  <span className="text-pink">Live</span> tracking
                </h2>
                <div className="changeview_sort d-flex align-items-center gap-4">
                  {
                    props?.viewTask?.open ? (
                      <img src={ListIcon} onClick={() => props?.setViewTask({ ...props?.viewTask, open: false })} className="clickable" alt="view map" />
                    ) : (
                      <img src={locationn} onClick={() => props?.setViewTask({ open: true, taskDetails: taskDetails })} className="clickable" alt="view map" />
                    )
                  }
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
                          lat: props?.viewTask?.taskDetails?.address_location?.coordinates[0],
                          lng: props?.viewTask?.taskDetails?.address_location?.coordinates[1],
                        }}
                        zoom={8}
                        mapContainerStyle={{ height: "400px", width: "100%" }}
                      >
                        {/* {markers.positions.map((marker) => (
                          <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => TaskDetails(marker.id)}
                          />
                        ))} */}
                        <Marker
                          position={{
                            lat: props?.viewTask?.taskDetails?.address_location?.coordinates[0],
                            lng: props?.viewTask?.taskDetails?.address_location?.coordinates[1],
                          }}
                          icon={{
                            url: locationPin,
                            scaledSize: new window.google.maps.Size(50, 50), // Size of pin (Width, Height)
                          }}
                        />
                      </GoogleMap>
                      <div className="hopper_content">
                        <span className="me-4">

                          <MdMyLocation />{" "}
                          {props?.viewTask?.taskDetails?.hasOwnProperty("accepted_by")
                            ? props?.viewTask?.taskDetails?.accepted_by?.length === 0 ||
                              props?.viewTask?.taskDetails?.accepted_by?.length === 1
                              ? `${props?.viewTask?.taskDetails?.accepted_by?.length} Hopper tasked`
                              : `${props?.viewTask?.taskDetails?.accepted_by?.length} Hoppers tasked`
                            : `${0} Hopper tasked`}{" "}
                        </span>
                        <span>
                          <BiPlay /> {props?.viewTask?.taskDetails?.contentSize} Content
                          uploaded
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="list_view_wrap singleTask_detail">
                      <label className="mb-13">List View</label>
                      <div className="scroll-wrap">
                        {liveTasks?.map((curr, i) => {
                          return (
                            <div
                              className="listView_task clickable"
                              key={curr?._id}
                              style={{
                                background: props?.viewTask?.taskDetails?._id == curr?._id ? "#f3f5f4" : ''
                              }}
                              onClick={() => {
                                navigate(`/task?taskId=${curr?._id}`);
                                props?.setViewTask({ open: true, taskDetails: curr })
                                props?.TaskDetails(curr?._id)
                              }}
                            >
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
                                    icon={{
                                      url: locationPin,
                                      scaledSize: new window.google.maps.Size(30, 30), // Size of pin (Width, Height)
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
                                        {moment(curr?.createdAt).format(
                                          "hh:mm A, DD.MM.YYYY"
                                        )}
                                      </Typography>
                                    </span>
                                    <span className="time_info d-flex align-items-center lft_tme">
                                      <img src={bullseye} alt="Hoppers" />
                                      <Typography className="font-12">
                                        {curr?.accepted_by?.length || 0} {curr?.accepted_by?.length > 1 ? "Hoppers " : "Hopper "}
                                        tasked
                                      </Typography>
                                    </span>
                                  </div>
                                  <Button
                                    variant="primary"
                                    className="sm-btn"
                                    onClick={() => {
                                      props?.setViewTask({ open: true, taskDetails: curr })
                                      props?.TaskDetails(curr?._id)
                                    }}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>

                          );
                        })}
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </Col>
          <Col md={6} className="ps-0 pe-1">
            <div className="bTask_list_card">
              <div className="taskcard_headr d-flex justify-content-between align-items-center mb-13">
                <h2 className="dashCard-heading">
                  Task Details
                </h2>
              </div>
              <div className="taskcard_body ps-0 pe-1 pb-0">
                <div className="list_view_wrap singleTask_detail">
                  <div className="taskInfo_card mb-1">
                    <label>Task</label>
                    <div className="taskSingle_info taskInfo_card_gray addnewdesign_location">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.58901 0.693055L14.6514 2.94108C16.11 3.5846 16.11 4.64855 14.6514 5.29206L9.58901 7.54009C9.01414 7.79749 8.07031 7.79749 7.49543 7.54009L2.43309 5.29206C0.974451 4.64855 0.974451 3.5846 2.43309 2.94108L7.49543 0.693055C8.07031 0.435648 9.01414 0.435648 9.58901 0.693055Z"
                          stroke="#000000"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1 7.62598C1 8.34672 1.54056 9.179 2.20123 9.47073L8.02722 12.062C8.47339 12.2593 8.97962 12.2593 9.41721 12.062L15.2432 9.47073C15.9039 9.179 16.4444 8.34672 16.4444 7.62598"
                          stroke="#000000"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1 11.916C1 12.714 1.47191 13.4347 2.20123 13.7608L8.02722 16.352C8.47339 16.5493 8.97962 16.5493 9.41721 16.352L15.2432 13.7608C15.9725 13.4347 16.4444 12.714 16.4444 11.916"
                          stroke="#000000"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {/* <p>
                      Take pics, videos and interviews of Rishi Sunak's budget speech at Number 10...
                    </p> */}
                      <p>{taskDetails?.task_description}</p>
                    </div>
                  </div>

                  <div className="taskInfo_card mb-1">
                    <label>Location</label>
                    <div className="taskSingle_info taskInfo_card_gray addnewdesign_location">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"></path></svg>
                      <p>{taskDetails?.location}</p>
                    </div>
                  </div>
                  <div className="taskInfo_card mb-1">
                    <Row className="justify-content-between price-wrapper">
                      <Col md={6} >
                        <div className="timeSlots_tiles">
                          <label>Time and Date</label>
                          <span className="sm-tiles   taskInfo_card_gray addnewdesign_location_input">
                            <img
                              className="tsk_dlt_icns mx-2"
                              src={calendaric}
                              alt="date"
                            />
                            <span>
                              {moment(taskDetails?.createdAt).format(
                                "hh:mm A, DD MMM YYYY"
                              ) !== "Invalid date"
                                ? " " +
                                moment(taskDetails?.createdAt).format(
                                  "hh:mm A, DD MMM YYYY"
                                )
                                : "dd/mm/yyyy"}
                            </span>
                          </span>
                        </div>
                      </Col>
                      <Col md={6} >
                        <div className="timeSlots_tiles ">
                          <label>Accepted by</label>
                          <span className="sm-tiles taskInfo_card_gray addnewdesign_location_input">
                            <img
                              className="tsk_dlt_icns mx-2"
                              src={gps}
                              alt="time"
                            />
                            {taskDetails?.accepted_by?.length && taskDetails?.accepted_by?.length > 0 ? `${taskDetails?.accepted_by?.length} ${taskDetails?.accepted_by?.length <= 1 ? 'Hopper' : 'Hoppers'}` : '0 Hopper'}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="taskInfo_card">
                    <div className="row d-flex justify-content-between price-wrapper">
                      <div className="col-md-6">
                        <label>Price offered</label>
                      </div>
                      <div className="col-md-6">
                        <label>Deadline</label>
                      </div>
                    </div>
                    <Row className="mt-2">
                      <Col md={12}>
                        <div className="Deadline-cardflex ">
                          <div className="priceOffer_wrap w-50">
                            <div className="type_price justify-content-between  gap-3  pe-3">
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
                            <div className="type_price justify-content-between  gap-3  pe-3">
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
                            <div className="type_price justify-content-between  gap-3  pe-3">
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
                          <div className="w-50 ps-3">
                            <div className="Deadline-card">
                              <div className="Deadline-card-top py-4">
                                <p className="mb-2">
                                  Time remaining
                                </p>
                                <h5>
                                  {timeRemaining.days > 0
                                    ? `${timeRemaining.days}d:${timeRemaining.hours.toString().padStart(2, '0')}h:${timeRemaining.minutes.toString().padStart(2, '0')}m`
                                    : timeRemaining.hours > 0
                                      ? `${timeRemaining.hours.toString().padStart(2, '0')}h:${timeRemaining.minutes.toString().padStart(2, '0')}m`
                                      : `${timeRemaining.minutes.toString().padStart(2, '0')}m:${timeRemaining.seconds.toString().padStart(2, '0')}s`
                                  }
                                </h5>
                              </div>
                              <div className="Deadline-card-bottom p-2">
                                Deadline {deadlineTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-20">
          <div className="feedPreviews d-flex justify-content-between broadcast-heading align-items-center new-task-upload-head-padding">
            <h2 className="mb-0">Content uploaded for selected tasks</h2>
          </div>
          <Card className="dash-top-cards listing rt_crd rcnt_actvt mb-0 h-100">
            <div className='list-in d-flex align-items-start gap-2 list-card-wrap flex-wrap p-0'>
              {props?.newUploadedContent?.map((curr) => <Link to={`/content-details/${curr?.content[0]?.task_id?._id}?hopper_id=${curr?.content[0]?.uploaded_by?._id}`}>
                <img className="list-card-img light-gray-bg" src={
                  curr?.content[0]?.type === "image"
                    ? curr?.content[0]?.videothubnail ||
                    process.env.REACT_APP_UPLOADED_CONTENT +
                    curr?.content[0]?.imageAndVideo
                    : curr?.content[0]?.type === "video"
                      ? curr?.content[0]?.videothubnail ||
                      process.env.REACT_APP_UPLOADED_CONTENT +
                      curr?.content[0]?.videothubnail
                      : curr?.content[0]?.type === "audio"
                        ? audioicimg
                        : null
                } />
              </Link>)}
            </div>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default BroadcastedTrackings;
