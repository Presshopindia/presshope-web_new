import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
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

const Tasktables = () => {
  const param = useParams();
  const [taskDetails, setTaskDetails] = useState();

  const TaskDetails = async () => {
    const resp = await Get(`mediaHouse/tasks/count`);
    // console.log(resp, "<----------resp")
    setTaskDetails(resp.data);
  };

  useEffect(() => {
    TaskDetails();
  }, []);

  return (
    <>
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link>
                  <BsArrowLeft
                    className="text-pink"
                    onClick={() => window.history.back()}
                  />{" "}
                  Back{" "}
                </Link>
              </div>
              <div className="tbl_wrap_cmn">
                {param.type === "liveTasks" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">Live tasks</Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Daily</span>
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
                              <th className="brdcstd_tsk_th">
                                Broadcasted tasks
                              </th>
                              <th className="time_date_th">
                                Broadcasted time & date
                              </th>
                              <th className="desc_th">Task details</th>
                              <th className="location_th">Location</th>
                              <th className="type_th">Type</th>
                              <th className="catgr_th">Category</th>
                              <th className="price_th">Price offered</th>
                              <th className="time_date_th">Deadline</th>
                              <th className="trend_th">Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {taskDetails?.live_tasks_details?.task.map(
                              (curr) => {
                                return (
                                  <tr>
                                    <td className="content_img_td">
                                      <div className="mapInput td_mp">
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
                                      {/* <img src={locationimg} className="content_img" /> */}
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watch} className="icn_time" />
                                        {moment(curr.createdAt).format(
                                          "hh:mm A"
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr.createdAt).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr.task_description}
                                      </p>
                                    </td>
                                    <td className="address_wrap">
                                      {curr.location}
                                    </td>
                                    <td className="text-center">
                                      <div className="type_wrp d-flex flex-column align-items-center">
                                        {curr.need_photos === true && (
                                          <img
                                            src={camera}
                                            className="icn m_auto"
                                          />
                                        )}
                                        {curr.need_interview === true && (
                                          <img
                                            src={interviewic}
                                            className="icn m_auto"
                                          />
                                        )}
                                        {curr.need_videos === true && (
                                          <img
                                            src={videoic}
                                            className="icn m_auto"
                                          />
                                        )}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <img
                                        src={celebrity}
                                        className="icn m_auto"
                                      />
                                    </td>
                                    <td className="">
                                      <div className="type_wrp d-flex flex-column">
                                        {curr.need_photos === true && (
                                          <p className="txt">
                                            £ {curr?.hopper_photo_price}
                                          </p>
                                        )}
                                        {curr.need_interview === true && (
                                          <p className="txt">
                                            £ {curr?.hopper_interview_price}
                                          </p>
                                        )}
                                        {curr.need_videos === true && (
                                          <p className="txt">
                                            £ {curr?.hopper_videos_price}
                                          </p>
                                        )}
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img src={watch} className="icn_time" />
                                        {moment(curr.deadline_date).format(
                                          "hh:mm A"
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr.deadline_date).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </p>
                                    </td>
                                    <td className="">
                                      <p className="trend_success">
                                        <BsArrowUp />
                                        50%
                                      </p>
                                    </td>
                                  </tr>
                                  // <tr>
                                  //   <td className="content_img_td">
                                  //     <img src={locationimg} className="content_img" />
                                  //   </td>
                                  //   <td className="timedate_wrap">
                                  //     <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                                  //     <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
                                  //   </td>
                                  //   <td className="description_td">
                                  //     This is description text This is This description text description text. Sample Text for...
                                  //   </td>
                                  //   <td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</td>
                                  //   <td className="text-center">
                                  //     <div className="type_wrp d-flex flex-column align-items-center">
                                  //       <img src={camera} className="icn m_auto" />
                                  //       <img src={interviewic} className="icn m_auto" />
                                  //       <img src={videoic} className="icn m_auto" />
                                  //     </div>
                                  //   </td>
                                  //   <td className="text-center">
                                  //     <img src={celebrity} className="icn m_auto" />
                                  //   </td>
                                  //   <td className="">
                                  //     <div className="type_wrp d-flex flex-column">
                                  //       <p className='txt'>
                                  //         £ 120
                                  //       </p>
                                  //       <p className='txt'>
                                  //         £ 300
                                  //       </p>
                                  //       <p className='txt'>
                                  //         £ 500
                                  //       </p>
                                  //     </div>
                                  //   </td>
                                  //   <td className="timedate_wrap">
                                  //     <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                                  //     <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
                                  //   </td>
                                  //   <td className="">
                                  //     <p className="trend_danger"><BsArrowDown />10%</p>
                                  //   </td>
                                  // </tr>
                                  // <tr>
                                  //   <td className="content_img_td">
                                  //     <img src={locationimg} className="content_img" />
                                  //   </td>
                                  //   <td className="timedate_wrap">
                                  //     <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                                  //     <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
                                  //   </td>
                                  //   <td className="description_td">
                                  //     This is description text This is This description text description text. Sample Text for...
                                  //   </td>
                                  //   <td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</td>
                                  //   <td className="text-center">
                                  //     <img src={videoic} className="icn m_auto" />
                                  //   </td>
                                  //   <td className="text-center">
                                  //     <img src={celebrity} className="icn m_auto" />
                                  //   </td>
                                  //   <td className="">
                                  //     £ 700
                                  //   </td>
                                  //   <td className="timedate_wrap">
                                  //     <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                                  //     <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
                                  //   </td>
                                  //   <td className="">
                                  //     <p className="trend_success"><BsArrowUp />25%</p>
                                  //   </td>
                                  // </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : param.type === "Broadcasted" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Broadcasted tasks
                        </Typography>
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Monthly</span>
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
                              <th className="">Broadcasted tasks</th>
                              <th>Period</th>
                              <th>Number of tasks</th>
                              <th>Funds Invested</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  March 2023
                                </p>
                              </td>
                              <td>70</td>
                              <td>£ 700</td>
                              <td>
                                <p className="trend_success">
                                  <BsArrowUp />
                                  50%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  February 2023
                                </p>
                              </td>
                              <td className="description_td">45</td>
                              <td className="description_td">£ 120</td>
                              <td className="">
                                <p className="trend_danger">
                                  <BsArrowDown />
                                  10%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  February 2023
                                </p>
                              </td>
                              <td className="description_td">110</td>
                              <td>£ 1,750</td>
                              <td className="">
                                <p className="trend_success">
                                  <BsArrowUp />
                                  25%
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : (
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
                        <div className="tbl_rt">
                          <span className="tbl_rt_txt">Monthly</span>
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
                              <th className="">Broadcasted tasks</th>
                              <th>Period</th>
                              <th>Number of tasks</th>
                              <th>Funds Invested</th>
                              <th>Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  March 2023
                                </p>
                              </td>
                              <td>70</td>
                              <td>£ 700</td>
                              <td>
                                <p className="trend_success">
                                  <BsArrowUp />
                                  50%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  February 2023
                                </p>
                              </td>
                              <td className="description_td">45</td>
                              <td className="description_td">£ 120</td>
                              <td className="">
                                <p className="trend_danger">
                                  <BsArrowDown />
                                  10%
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="content_img_td">
                                <img
                                  src={locationimg}
                                  className="content_img"
                                />
                              </td>
                              <td className="timedate_wrap">
                                <p className="timedate">
                                  <img src={calendar} className="icn_time" />
                                  February 2023
                                </p>
                              </td>
                              <td className="description_td">110</td>
                              <td>£ 1,750</td>
                              <td className="">
                                <p className="trend_success">
                                  <BsArrowUp />
                                  25%
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(Tasktables);
