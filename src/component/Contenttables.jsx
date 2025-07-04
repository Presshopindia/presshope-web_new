import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Card, Typography, Button, Tooltip } from "@mui/material";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
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
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import contimg1 from "../assets/images/Contentdetail/content1.svg";
// import contimg2 from "../assets/images/Contentdetail/content2.svg";
import contimg3 from "../assets/images/Contentdetail/content3.png";
import watchic from "../assets/images/watch.svg";
import NewContentPurchasedOnline from "./Sortfilters/Content/NewContentPurchasedOnlne";
import Loader from "./Loader";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import sharedic from "../assets/images/shared.svg";
import cameraic from "../assets/images/camera.svg";
import crimeic from "../assets/images/sortIcons/crime.svg";
import audioic from "../assets/images/audimg.svg";
import pdfic from "../assets/images/pdfic.svg";
// import audioic from "../assets/images/audimg.svg";
import docsic from "../assets/images/docsic.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import audimgsm from "../assets/images/audimgsmall.svg";
import { formatAmountInMillion } from "./commonFunction";
import { PaginationComp } from "./Pagination";
import { useDarkMode } from "../context/DarkModeContext";
import { AiFillCaretDown } from "react-icons/ai";

const Contenttables = () => {
  const param = useParams();
  const [page, setPage] = useState(1);
  const { profileData } = useDarkMode();
  const [taskDetails, setTaskDetails] = useState();
  const [content_count, setContent_count] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const TaskDetails = async () => {
    const resp = await Get(`mediaHouse/tasks/count`);
    setTaskDetails(resp.data);
  };

  // Content Purchased Online-
  const [openContentPuchased, setOpenContentPuchased] = useState(false);
  const handleCloseContentPurchased = (values) => {
    setOpenContentPuchased(values);
  };

  // Sorting-
  const [sortingField, setSortingField] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [sortingType, setSortingType] = useState("");

  // content purchased online-
  const newContentPurchasedValueHandler = (value) => {
    setSortingField(value.field);
    setSortingValue(value.values);
    setSortingType(value.type);
    // console.log("newContentPurchasedValueHandler", value)
  };

  // Pagination-
  const [contentOnlinePage, setContentOnlinePage] = useState(1);
  const [contentOnlineTotalPage, setContentOnlineTotalPage] = useState(0);
  const [contentOnlineLimit, setContentOnlineLimit] = useState(4);

  const [totalFundDetails, setTotalFundDetails] = useState([]);

  const ContentCount = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * 4;
      const resp = await Get(
        `mediaHouse/Content/Count?limit=${contentOnlineLimit}&offset=${(contentOnlinePage - 1) * contentOnlineLimit
        }${sortingField && sortingField}=${sortingValue && sortingValue}&limit=${4}&offset=${offset}`
      );
      if (resp) {
        setTotalFundDetails(resp?.data?.content_online);
        setContent_count(resp.data);
        setLoading(false);
        if (param?.type == "total_fund_invested") {
          setContentOnlineTotalPage(
            Math.ceil(resp?.data?.content_online?.count / contentOnlineLimit)
          );
        } else if (param?.type == "fund_invested_today" || param?.type == "content_purchased_online_today") {
          setContentOnlineTotalPage(
            Math.ceil(
              resp?.data?.today_fund_invested?.totalCount / contentOnlineLimit
            )
          );
        }
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentCount();
    TaskDetails();
  }, [sortingValue, sortingType, contentOnlinePage, page]);

  const [hopperContri, setHopperContri] = useState([]);
  const HopperContribute = async () => {
    try {
      const obj = {
        content: "hopper_who_contribute",
        limit: contentOnlineLimit,
        offset: (contentOnlinePage - 1) * contentOnlineLimit,
      };
      setLoading(true);
      let resp = await Post("mediaHouse/view/published/content", obj);
      setHopperContri(resp?.data?.content);
      setLoading(false);
      if (param?.type == "hopper") {
        setContentOnlineTotalPage(
          Math.ceil(resp?.data?.count / contentOnlineLimit)
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    HopperContribute();
  }, [contentOnlinePage]);

  const [contentPurchasedFromTask, setContentPurchasedFromTask] = useState(null);

  const ContentPurchasedFromTasks = async (timePeriod = "") => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/content-purchased-from-task", {
        limit: 4,
        offset: (page - 1) * 4,
        timePeriod
      });
      setContentPurchasedFromTask(resp?.data?.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentPurchasedFromTasks(param?.type);
  }, [page]);

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
                  <BsArrowLeft className="text-pink" />
                  Back
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
                        <Typography className="tbl_hdng">Live Tasks</Typography>
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
                                        <Tooltip title="Photo">
                                          {curr.need_photos === true && (
                                            <img
                                              src={camera}
                                              className="icn m_auto"
                                            />
                                          )}
                                        </Tooltip>
                                        <Tooltip title="Interview">
                                          {curr.need_interview === true && (
                                            <img
                                              src={interviewic}
                                              className="icn m_auto"
                                            />
                                          )}
                                        </Tooltip>
                                        <Tooltip title="Video">
                                          {curr.need_videos === true && (
                                            <img
                                              src={videoic}
                                              className="icn m_auto"
                                            />
                                          )}
                                        </Tooltip>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title="celebrity">
                                        <img
                                          src={celebrity}
                                          className="icn m_auto"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td className="">
                                      <div className="type_wrp d-flex flex-column">
                                        {curr.need_photos === true && (
                                          <p className="txt">
                                            £ {curr.photo_price}
                                          </p>
                                        )}
                                        {curr.need_interview === true && (
                                          <p className="txt">
                                            £ {curr.interview_price}
                                          </p>
                                        )}
                                        {curr.need_videos === true && (
                                          <p className="txt">
                                            £ {curr.videos_price}
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
                                  </tr>
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
                              <th>Funds invested</th>
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
                ) : param.type === "favourited_content" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Favourited Content
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Content</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Task Details</th>
                              <th>Type</th>
                              <th>Licence</th>
                              <th>Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content_count?.sourced_content_from_tasks?.task.map(
                              (curr) => {
                                return (
                                  <tr>
                                    <td className="content_img_td">
                                      <div className="tbl_cont_wrp">
                                        <img
                                          src={
                                            curr?.hopper_details
                                              ?.avatar_details[0]?.avatar
                                              ? process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.hopper_details
                                                ?.avatar_details[0]?.avatar
                                              : null
                                          }
                                          className="content_img"
                                        />
                                        <span className="cont_count">+2</span>
                                      </div>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.updatedAt).format(
                                          "hh:mm A"
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.updatedAt).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.task_id?.heading}
                                      </p>
                                    </td>
                                    <td>
                                      <Tooltip title="celebrity">
                                        <img src={celebrity} className="icn" />
                                      </Tooltip>
                                      {curr?.type}
                                    </td>
                                    <td>70</td>
                                    <td>{curr?.task_id?.type}</td>
                                    <td>{curr?.hopper_details?.address}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={hprimg1}
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          Janet Morrison
                                          <br />
                                          <span className="txt_light">
                                            (Pseudonymous)
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>{curr?.amount_paid}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : param.type === "fund_invested_today" || param.type === "content_purchased_online_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          {param.type === "fund_invested_today" ? "Funds invested" : "Content purchased online"} today
                        </Typography>
                        <div className="tbl_rt sorting_wrap d-flex align-items-center">
                          <div className="feedSorting me-4">
                            <div className="fltrs_prnt top_fltr">
                              <p className="lbl_fltr">Filter</p>
                              <button
                                className="sortTrigger"
                                onClick={() => {
                                  // setOpenFilterComponent(true);
                                }}
                              >
                                Filter <AiFillCaretDown />
                              </button>
                              {/* {openFilterComponent && (
                                <FundsinvestedFilter
                                  closeSortComponent={
                                    handleCloseFilterComponent
                                  }
                                  closeFilterComponent={
                                    handleCloseFilterComponent
                                  }
                                  setAllFilterData={setAllFilterData}
                                  allFilterData={allFilterData}
                                />
                              )} */}
                            </div>
                          </div>
                          <div className="feedSorting">
                            <div className="fltrs_prnt top_fltr">
                              <p className="lbl_fltr">Sort</p>
                              <Button
                                className="sort_btn"
                                onClick={() => {
                                  // setOpenFundsInevested(true);
                                }}
                              >
                                Sort
                                <BsChevronDown />
                              </Button>
                              {/* {openFundsInvested && (
                                <Fundsinvested
                                  active={activeState}
                                  setActive={setActiveState}
                                  rangeTimeValues={fundsTimeValuesHandler}
                                  closeSortComponent={handleCloseFundsInvested}
                                  setAllFilterData={setAllFilterData}
                                  allFilterData={allFilterData}
                                />
                              )} */}
                            </div>
                          </div>
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
                              <th className="">Content</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">Licence</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="tsk_dlts">Location</th>
                              {param.type === "content_purchased_online_today" && <th>Purchased by</th>}
                              <th>Published by</th>
                              <th>{param.type === "fund_invested_today" ? "Nett price paid" : "Published price"}</th>
                              {param.type === "fund_invested_today" && <th>VAT paid</th>}
                              {param.type === "content_purchased_online_today" && <th>Discounted price</th>}
                              <th>{param.type === "fund_invested_today" ? "Total funds invested" : "Purchase price"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content_count?.today_fund_invested?.task.map((curr, index) => {
                              const contentArray = curr?.contentDetails?.content;
                              const audio =
                                contentArray?.filter(
                                  (item) => item.media_type === "audio"
                                ) || [];
                              const video =
                                contentArray?.filter(
                                  (item) => item.media_type === "video"
                                ) || [];
                              const image =
                                contentArray?.filter(
                                  (item) => item.media_type === "image"
                                ) || [];
                              const Doc =
                                contentArray?.filter(
                                  (item) => item.media_type === "pdf" || "doc"
                                ) || [];

                              const contentSource =
                                curr?.contentDetails?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.contentDetails?.content[0]?.media
                                  : curr?.contentDetails?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.contentDetails?.content[0]?.media
                                    : curr?.contentDetails?.content[0]?.media_type === "audio" ? audioic
                                      : curr?.contentDetails?.content[0]?.media_type === "doc" ? pdfic
                                        : ""

                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      `/purchased-content-detail/${curr?._id}?page=${contentOnlinePage}`
                                    )
                                  }
                                >
                                  <td className="content_img_td position-relative add-icons-box">
                                    <div className="tbl_cont_wrp">
                                      <img
                                        src={contentSource}
                                        className="content_img"
                                      />
                                    </div>
                                    <div className="tableContentTypeIcons">
                                      <div class="post_icns_cstm_wrp camera-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">{curr?.contentDetails?.content?.length || 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img
                                        src={watchic}
                                        className="icn_time"
                                      />
                                      {moment(
                                        // curr?.content_id?.purchasedTime
                                        curr?.createdAt
                                      ).format(`hh:mm A`)}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        // curr?.content_id?.curr?.updatedAt
                                        curr?.createdAt
                                      ).format(`DD MMM YYYY`)}
                                    </p>
                                  </td>

                                  <td className="description_td">
                                    <p className="desc_ht">
                                      {curr?.contentDetails?.heading}
                                    </p>
                                  </td>

                                  <td className="text-center">
                                    <div className=" d-flex flex-column gap-2">
                                      {image.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn m-auto"
                                          />{" "}
                                        </Tooltip>
                                      )}
                                      {video.length > 0 && (
                                        <Tooltip title="Video">
                                          <img
                                            src={videoic}
                                            alt="Video"
                                            className="icn m-auto"
                                          />
                                        </Tooltip>
                                      )}
                                      {audio.length > 0 && (
                                        <Tooltip title="Audio">
                                          <img
                                            src={interviewic}
                                            alt="Audio"
                                            className="icn m-auto"
                                          />
                                        </Tooltip>
                                      )}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.payment_content_type === "shared" ? "Shared" : "Exclusive"}>
                                      <img
                                        src={curr?.payment_content_type === "shared" ? sharedic : exclusiveic}
                                        alt={curr?.payment_content_type === "shared" ? "Shared" : "Exclusive"}
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip title={curr?.contentDetails?.categoryDetails?.name}>
                                      <img
                                        src={curr?.contentDetails?.categoryDetails?.icon}
                                        alt={curr?.contentDetails?.categoryDetails?.name}
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>

                                  <td>{curr?.contentDetails?.location}</td>
                                  {
                                    param?.type === "content_purchased_online_today" && (
                                      <td>
                                        <div className="hpr_dt">
                                          <img
                                            src={
                                              curr?.purchasedUser?.profile_image
                                            }
                                            alt="Hopper"
                                            className="big_img"
                                          />
                                          <p className="hpr_nme">
                                            {curr?.purchasedUser?.full_name}
                                          </p>
                                        </div>
                                      </td>
                                    )
                                  }
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.hopperDetails?.avatarDetails?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {curr?.hopperDetails?.user_name}
                                      </p>
                                    </div>
                                  </td>
                                  <td>£{formatAmountInMillion(param.type === "fund_invested_today" ? curr?.amount : curr?.published_price)}</td>
                                  {
                                    param.type === "fund_invested_today" && <td>£{formatAmountInMillion(curr?.Vat)}</td>
                                  }
                                  {
                                    param?.type === "content_purchased_online_today" && <td>£{formatAmountInMillion(curr?.discounted_price)}</td>
                                  }
                                  <td>£{formatAmountInMillion(param.type === "fund_invested_today" ? curr?.amount + curr?.Vat : curr?.amount)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {content_count?.today_fund_invested?.task?.length > 0 && (
                          <PaginationComp
                            totalPage={contentOnlineTotalPage}
                            path={`dashboard-tables/${param?.type}`}
                            type="fav"
                            setPage={setContentOnlinePage}
                            page={contentOnlinePage}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : param.type === "content_under_offer" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content under offer
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Content under offer</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th>Type</th>
                              <th>Licence</th>
                              <th>Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content_count?.content_under_offer?.task
                              ?.sort(
                                (a, b) =>
                                  new Date(b.published_time_date) -
                                  new Date(a.published_time_date)
                              )
                              ?.map((curr) => {
                                return (
                                  <tr>
                                    <td className="content_img_td">
                                      <Link
                                        to={`/Feeddetail/content/${curr?._id}`}
                                      >
                                        <div className="tbl_cont_wrp">
                                          {curr?.content
                                            ?.slice(0, 1)
                                            ?.map((curr) => {
                                              return curr?.media_type ===
                                                "image" ? (
                                                <img
                                                  src={
                                                    curr?.watermark
                                                      ? curr?.watermark
                                                      : process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.media
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "video" ? (
                                                <img
                                                  src={
                                                    curr?.watermark
                                                      ? curr?.watermark
                                                      : process.env
                                                        .REACT_APP_CONTENT_MEDIA2 +
                                                      curr?.media
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type === "pdf" ? (
                                                <img
                                                  src={docsic}
                                                  className="content_img"
                                                />
                                              ) : curr?.media_type ===
                                                "audio" ? (
                                                <img
                                                  src={audioic}
                                                  className="content_img"
                                                />
                                              ) : null;
                                            })}

                                          <span className="cont_count">
                                            {curr?.content?.length}
                                          </span>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          "h:mm A"
                                        )}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(curr?.createdAt).format(
                                          "DD MMM, YYYY"
                                        )}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht mb-0">
                                        {curr?.heading}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      <div className="d-flex flex-column gap-2">
                                        {[
                                          ...new Set(
                                            curr?.content?.map(
                                              (el) => el.media_type
                                            )
                                          ),
                                        ]?.map((el) =>
                                          el === "image" ? (
                                            <Tooltip title="Photo">
                                              <img
                                                src={cameraic}
                                                className="icn"
                                              />
                                            </Tooltip>
                                          ) : el === "video" ? (
                                            <Tooltip title="Video">
                                              <img
                                                src={videoic}
                                                className="icn"
                                              />
                                            </Tooltip>
                                          ) : el === "audio" ? (
                                            <Tooltip title="Audio">
                                              <img
                                                src={interviewic}
                                                className="icn"
                                              />
                                            </Tooltip>
                                          ) : el === "pdf" ? (
                                            <Tooltip title="Pdf">
                                              <img
                                                src={docsic}
                                                className="icn"
                                              />
                                            </Tooltip>
                                          ) : null
                                        )}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={
                                          curr?.type === "shared"
                                            ? "Shared"
                                            : "Exclusive"
                                        }
                                      >
                                        <img
                                          src={
                                            curr?.type === "shared"
                                              ? sharedic
                                              : exclusiveic
                                          }
                                          alt="shared"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip title={curr?.category_id?.name}>
                                        <img
                                          src={curr?.category_id?.icon}
                                          alt="shared"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>{curr?.hopper_id?.address}</td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            curr?.hopper_id?.avatar_id?.avatar
                                              ? process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.hopper_id?.avatar_id
                                                ?.avatar
                                              : null
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
                                    <td>{curr?.amount_paid}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ) : param.type === "total_fund_invested" ? (
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
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Contents</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th>Type</th>
                              <th>Licence</th>
                              <th>Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                              <th>20% Vat</th>
                              <th>Total funds invested (inc VAT)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {totalFundDetails?.task?.map((curr) => {
                              const image = curr?.content_id?.content?.filter(
                                (item) => item.media_type === "image"
                              );
                              const audio = curr?.content_id?.content?.filter(
                                (item) => item.media_type === "audio"
                              );
                              const video = curr?.content_id?.content?.filter(
                                (item) => item.media_type === "video"
                              );
                              const doc = curr?.content_id?.content?.filter(
                                (item) => item.media_type === "doc"
                              );
                              const pdf = curr?.content_id?.content?.filter(
                                (item) => item.media_type === "pdf"
                              );
                              let allVat = null;
                              console.log(
                                "all element data --->  --->  ---->",
                                curr
                              );

                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      `/purchased-content-detail/${curr?._id}`
                                    )
                                  }
                                >
                                  <td className="content_img_td position-relative add-icons-box">
                                    {
                                      <div className="tbl_cont_wrp noGrid">
                                        <img
                                          src={
                                            curr?.content_id?.content[0]
                                              ?.media_type === "image"
                                              ? curr?.content_id?.content[0]
                                                ?.watermark
                                              : curr?.content_id?.content[0]
                                                ?.media_type === "video"
                                                ? curr?.content_id?.content[0]
                                                  ?.watermark
                                                : curr?.content_id?.content[0]
                                                  ?.media_type === "audio"
                                                  ? audioic
                                                  : curr?.content_id?.content[0]
                                                    ?.media_type === "pdf"
                                                    ? docsic
                                                    : null
                                          }
                                          className="content_img"
                                        />
                                        {/* <span className="cont_count">
                                          {curr?.content_id?.content?.length}
                                        </span> */}
                                      </div>
                                    }
                                    <div className="tableContentTypeIcons">
                                      <div class="post_icns_cstm_wrp camera-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">1</span>
                                          <img
                                            class="feedMediaType iconBg"
                                            src={cameraic}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div class="post_icns_cstm_wrp video-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">1</span>
                                          <img
                                            class="feedMediaType iconBg"
                                            src={videoic}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      {/* <div class="post_icns_cstm_wrp audio-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">
                                            1
                                          </span>
                                          <img
                                            class="feedMediaType iconBg"
                                            src={interviewic}
                                            alt=""
                                          />
                                        </div>
                                      </div> */}
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        curr?.content_id?.createdAt
                                      ).format("hh:mm A")}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(
                                        curr?.content_id?.createdAt
                                      ).format("DD MMM, YYYY")}
                                    </p>
                                  </td>

                                  <td className="description_td">
                                    <p className="desc_ht mb-0 word_ellips">
                                      {curr?.content_id?.heading}
                                    </p>
                                  </td>

                                  <td className="text-center">
                                    <div className="">
                                      {image && image.length > 0 && (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />{" "}
                                        </Tooltip>
                                      )}
                                      {image && image.length > 0 && <br />}

                                      {video && video.length > 0 && (
                                        <Tooltip title="Video">
                                          {" "}
                                          <img
                                            src={videoic}
                                            alt="Video"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      <br />
                                      {audio && audio.length > 0 && (
                                        <Tooltip title="Audio">
                                          <img
                                            src={interviewic}
                                            alt="Audio"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      {pdf && pdf.length > 0 && (
                                        <Tooltip title="Pdf">
                                          <img
                                            src={docsic}
                                            alt="Pdf"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                      {doc && doc.length > 0 && (
                                        <Tooltip title="Doc">
                                          <img
                                            src={docsic}
                                            alt="Doc"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      )}
                                    </div>
                                  </td>

                                  <td className="text-center">
                                    {curr?.content_id?.Vat?.find(
                                      (el) =>
                                        el?.purchased_mediahouse_id ==
                                        JSON.parse(localStorage.getItem("user"))
                                          ?._id
                                    )?.purchased_content_type == "shared" ? (
                                      <Tooltip title="Shared">
                                        <img
                                          src={sharedic}
                                          alt="shared"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Exclusive">
                                        <img
                                          src={exclusiveic}
                                          alt="exclusiveic"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.content_id?.category_id?.name
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.content_id?.category_id?.icon
                                        }
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.content_id?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          process.env.REACT_APP_AVATAR_IMAGE +
                                          curr?.content_id?.hopper_id.avatar_id
                                            ?.avatar
                                        }
                                        alt="Hopper"
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {/* <br /> */}
                                        <span className="txt_light">
                                          {curr?.content_id &&
                                            curr?.content_id?.hopper_id
                                              ?.user_name}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  {/* <td>£ {formatAmountInMillion(+(curr?.content_id?.Vat?.find((el) => el?.purchased_mediahouse_id == JSON.parse(localStorage.getItem("user"))?._id)?.amount)) || 0}</td> */}
                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      +(curr?.amount - curr?.Vat ?? 0)
                                    )}
                                  </td>

                                  <td>
                                    £{formatAmountInMillion(+(curr?.Vat ?? 0))}
                                  </td>
                                  <td>
                                    £
                                    {formatAmountInMillion(
                                      +(curr?.amount ?? 0)
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {totalFundDetails?.task?.length > 0 && (
                          <PaginationComp
                            totalPage={contentOnlineTotalPage}
                            path="content-tables/total_fund_invested"
                            type="fav"
                            setPage={setContentOnlinePage}
                            page={contentOnlinePage}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (param.type == "content_sourced_from_task" || param.type == "content_sourced_from_task_funds_invested") ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          {
                            param.type == "content_sourced_from_task_funds_invested" ? "Total funds invested" : "Content purchased from tasks"
                          }
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Uploaded content</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="text-center">Type</th>
                              <th className="text-center">Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              {
                                param.type == "content_sourced_from_task_funds_invested" && <th>VAT paid</th>
                              }
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentPurchasedFromTask?.data?.map((curr) => {
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(`/purchased-task-content-detail/${curr?._id}`)
                                  }
                                >
                                  <td className="content_img_td position-relative add-icons-box">
                                    <div className="tbl_cont_wrp">
                                      <img
                                        src={
                                          (curr?.purchased_task_content?.[0]?.type === "image" || curr?.purchased_task_content?.[0]?.type === "video") ? curr?.purchased_task_content?.[0]?.videothubnail : audioic
                                        }
                                        className="content_img"
                                      />
                                    </div>
                                    <div className="tableContentTypeIcons">
                                      <div class="post_icns_cstm_wrp camera-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">{curr?.purchased_task_content?.length || 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img
                                        src={watchic}
                                        className="icn_time"
                                      />
                                      {moment(curr?.createdAt).format(
                                        "h:mm A"
                                      )}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(curr?.createdAt).format(
                                        "DD MMM, YYYY"
                                      )}
                                    </p>
                                  </td>
                                  <td className="description_td">
                                    <p className="desc_ht mb-0">
                                      {curr?.taskDetails?.heading}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.purchased_task_content?.[0]?.type === "image"
                                          ? "Photo"
                                          : curr?.purchased_task_content?.[0]?.type === "video"
                                            ? "Video"
                                            : "Interview"
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.purchased_task_content?.[0]?.type === "image"
                                            ? cameraic
                                            : curr?.purchased_task_content?.[0]?.type === "video"
                                              ? videoic
                                              : curr?.purchased_task_content?.[0]?.type === "audio"
                                                ? interviewic
                                                : null
                                        }
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={curr?.taskDetails?.categoryDetails?.name}
                                    >
                                      <img
                                        src={curr?.taskDetails?.categoryDetails?.icon}
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.taskDetails?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          curr?.hopperDetails?.avatarDetails
                                            ?.avatar
                                            ? process.env
                                              .REACT_APP_AVATAR_IMAGE +
                                            curr?.hopperDetails
                                              ?.avatarDetails?.avatar
                                            : null
                                        }
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {curr?.hopperDetails?.user_name}
                                      </p>
                                    </div>
                                  </td>
                                  {
                                    param.type == "content_sourced_from_task_funds_invested" && <td>£{formatAmountInMillion(
                                      +curr?.Vat
                                    )}</td>
                                  }
                                  <td>
                                    £{formatAmountInMillion(
                                      (curr?.amount + curr?.Vat) || 0
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {contentPurchasedFromTask?.totalCount > 0 && (
                          <PaginationComp
                            totalPage={Math.ceil(contentPurchasedFromTask?.totalCount / 4)}
                            path={`content-tables/${param?.type}`}
                            setPage={setPage}
                            page={page}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (param.type == "content_sourced_from_task_today" || param.type == "content_sourced_from_task_funds_invested_today") ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          {
                            param.type == "content_sourced_from_task_funds_invested_today" ? "Total funds invested today" : "Content purchased from tasks today"
                          }
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Uploaded content</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="text-center">Type</th>
                              <th className="text-center">Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              {
                                param.type == "content_sourced_from_task_funds_invested_today" && <th>VAT paid</th>
                              }
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentPurchasedFromTask?.data?.map((curr) => {
                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(`/purchased-task-content-detail/${curr?._id}`)
                                  }
                                >
                                  <td className="content_img_td position-relative add-icons-box">
                                    <div className="tbl_cont_wrp">
                                      <img
                                        src={
                                          (curr?.purchased_task_content?.[0]?.type === "image" || curr?.purchased_task_content?.[0]?.type === "video") ? curr?.purchased_task_content?.[0]?.videothubnail : audioic
                                        }
                                        className="content_img"
                                      />
                                    </div>
                                    <div className="tableContentTypeIcons">
                                      <div class="post_icns_cstm_wrp camera-ico">
                                        <div class="post_itm_icns dtl_icns">
                                          <span class="count">{curr?.purchased_task_content?.length || 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img
                                        src={watchic}
                                        className="icn_time"
                                      />
                                      {moment(curr?.createdAt).format(
                                        "h:mm A"
                                      )}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(curr?.createdAt).format(
                                        "DD MMM, YYYY"
                                      )}
                                    </p>
                                  </td>
                                  <td className="description_td">
                                    <p className="desc_ht mb-0">
                                      {curr?.taskDetails?.heading}
                                    </p>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={
                                        curr?.purchased_task_content?.[0]?.type === "image"
                                          ? "Photo"
                                          : curr?.purchased_task_content?.[0]?.type === "video"
                                            ? "Video"
                                            : "Interview"
                                      }
                                    >
                                      <img
                                        src={
                                          curr?.purchased_task_content?.[0]?.type === "image"
                                            ? cameraic
                                            : curr?.purchased_task_content?.[0]?.type === "video"
                                              ? videoic
                                              : curr?.purchased_task_content?.[0]?.type === "audio"
                                                ? interviewic
                                                : null
                                        }
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td className="text-center">
                                    <Tooltip
                                      title={curr?.taskDetails?.categoryDetails?.name}
                                    >
                                      <img
                                        src={curr?.taskDetails?.categoryDetails?.icon}
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>
                                  <td>{curr?.taskDetails?.location}</td>
                                  <td>
                                    <div className="hpr_dt">
                                      <img
                                        src={
                                          curr?.hopperDetails?.avatarDetails
                                            ?.avatar
                                            ? process.env
                                              .REACT_APP_AVATAR_IMAGE +
                                            curr?.hopperDetails
                                              ?.avatarDetails?.avatar
                                            : null
                                        }
                                        className="big_img"
                                      />
                                      <p className="hpr_nme">
                                        {curr?.hopperDetails?.user_name}
                                      </p>
                                    </div>
                                  </td>
                                  {
                                    param.type == "content_sourced_from_task_funds_invested_today" && <td>£{formatAmountInMillion(
                                      +curr?.Vat
                                    )}</td>
                                  }
                                  <td>
                                    £{formatAmountInMillion(
                                      (curr?.amount + curr?.Vat) || 0
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {contentPurchasedFromTask?.totalCount > 0 && (
                          <PaginationComp
                            totalPage={Math.ceil(contentPurchasedFromTask?.totalCount / 4)}
                            path={`content-tables/${param?.type}`}
                            setPage={setPage}
                            page={page}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : param.type === "content_purchased_online" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Content purchased online
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
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
                              <th className="">Content purchased</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th>Type</th>
                              <th>Licence</th>
                              <th>Category</th>
                              <th>Location</th>
                              <th>Uploaded by</th>
                              <th>Funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {content_count?.content_online?.task
                              ?.map((curr) => {
                                const contentArray = curr?.contentDetails?.content;
                                const audio =
                                  contentArray?.filter(
                                    (item) => item.media_type === "audio"
                                  ) || [];
                                const video =
                                  contentArray?.filter(
                                    (item) => item.media_type === "video"
                                  ) || [];
                                const image =
                                  contentArray?.filter(
                                    (item) => item.media_type === "image"
                                  ) || [];
                                const Doc =
                                  contentArray?.filter(
                                    (item) => item.media_type === "pdf" || "doc"
                                  ) || [];

                                const contentSource =
                                  curr?.contentDetails && curr.contentDetails.content[0]
                                    ? curr.contentDetails.content[0].media_type ===
                                      "video"
                                      ? curr.contentDetails.content[0].watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.contentDetails.content[0].thumbnail
                                      : curr.contentDetails.content[0]
                                        .media_type === "audio"
                                        ? audimgsm
                                        : curr.contentDetails.content[0]
                                          .media_type === "image"
                                          ? curr.contentDetails.content[0].watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA +
                                          curr.contentDetails.content[0].media
                                          : curr.contentDetails.content[0]
                                            .media_type === "doc"
                                            ? docsic
                                            : null
                                    : null;

                                return (
                                  <tr>
                                    <td className="content_img_td">
                                      <Link
                                        to={`/purchased-content-detail/${curr?._id}`}
                                      >
                                        <div className="tbl_cont_wrp">
                                          <img
                                            src={contentSource}
                                            className="content_img"
                                          />
                                          <span className="cont_count">
                                            {curr?.contentDetails?.content?.length || 0}
                                          </span>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className="timedate_wrap">
                                      <p className="timedate">
                                        <img
                                          src={watchic}
                                          className="icn_time"
                                        />
                                        {moment(
                                          curr?.updatedAt
                                        ).format("h:mm A")}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(
                                          curr?.updatedAt
                                        ).format("DD MMM, YYYY")}
                                      </p>
                                    </td>
                                    <td className="description_td ">
                                      <p className="desc_ht mb-0 word_ellips">
                                        {curr?.contentDetails?.heading}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      <div className=" d-flex gap-2 flex-column">
                                        {image.length > 0 && (
                                          <Tooltip title="Photo">
                                            <img
                                              src={cameraic}
                                              alt="Photo"
                                              className="icn m-auto"
                                            />{" "}
                                          </Tooltip>
                                        )}
                                        {video.length > 0 && (
                                          <Tooltip title="Video">
                                            <img
                                              src={videoic}
                                              alt="Video"
                                              className="icn m-auto"
                                            />
                                          </Tooltip>
                                        )}
                                        {audio.length > 0 && (
                                          <Tooltip title="Audio">
                                            <img
                                              src={interviewic}
                                              alt="Audio"
                                              className="icn m-auto"
                                            />
                                          </Tooltip>
                                        )}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={
                                          curr?.purchased_content_type === "shared"
                                            ? "Shared"
                                            : "Exclusive"
                                        }
                                      >
                                        <img
                                          src={
                                            curr?.purchased_content_type === "shared"
                                              ? sharedic
                                              : exclusiveic
                                          }
                                          alt="shared"
                                          className="icn"
                                        />
                                      </Tooltip>
                                    </td>
                                    <td className="text-center">
                                      {curr?.contentDetails?.categoryDetails?.name}
                                    </td>
                                    <td>
                                      {curr?.contentDetails?.location}
                                    </td>
                                    <td>
                                      <div className="hpr_dt">
                                        <img
                                          src={
                                            curr?.hopperDetails
                                              ?.avatarDetails?.avatar
                                              ? process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.hopperDetails
                                                ?.avatarDetails?.avatar
                                              : null
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          {
                                            curr?.hopperDetails
                                              ?.user_name
                                          }
                                        </p>
                                      </div>
                                    </td>
                                    <td>{curr?.amount}</td>
                                  </tr>
                                );
                              })}
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
                          Hoppers who have contributed
                        </Typography>
                        <div className="tbl_rt">
                          <div className="fltrs_prnt">
                            <Button
                              className="sort_btn"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </Button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="fix_ht_table">
                        <table
                          width="100%"
                          mx="20px"
                          variant="simple"
                          className="common_table hprs_usd les_colm hopper-cnt"
                        >
                          <thead>
                            <tr>
                              <th className="">Hopper</th>
                              <th className="text-left">Published content</th>
                              <th className="text-center">Number of content</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hopperContri
                              ?.filter((el) => el._id != null)
                              ?.map((el) => {

                                let audio = [];
                                let video = [];
                                let image = [];
                                let doc = [];

                                el?.data.forEach((item) => {
                                  const contentArray = item.content;

                                  audio = [
                                    ...audio,
                                    ...(contentArray?.filter(
                                      (item) => item.media_type === "audio"
                                    ) || []),
                                  ];

                                  video = [
                                    ...video,
                                    ...(contentArray?.filter(
                                      (item) => item.media_type === "video"
                                    ) || []),
                                  ];

                                  image = [
                                    ...image,
                                    ...(contentArray?.filter(
                                      (item) => item.media_type === "image"
                                    ) || []),
                                  ];

                                  doc = [
                                    ...doc,
                                    ...(contentArray?.filter(
                                      (item) =>
                                        item.media_type === "pdf" ||
                                        item.media_type === "doc"
                                    ) || []),
                                  ];
                                });

                                return (
                                  <tr
                                    className="clickable"
                                    onClick={() =>
                                      navigate(
                                        `/hopper-content/${el?._id?._id}`
                                      )
                                    }
                                  >
                                    <td>
                                      <div className="hpr_dt hopper_table hopper-image">
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            el?._id?.avatar_id?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          <span className="txt_light">
                                            {el?._id?.user_name}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td className="content_wrap more_contnt_wrap">
                                      <div className="content_imgs_wrap align-items-start">
                                        <div className="content_imgs hoppers-imagessss">
                                          {el?.data?.slice(0, 4).map((curr) => {
                                            return curr?.content?.[0]
                                              ?.media_type === "image" ? (
                                              <img
                                                src={
                                                  curr?.content?.[0]
                                                    ?.watermark ||
                                                  process.env
                                                    .REACT_APP_CONTENT_MEDIA +
                                                  curr?.content?.[0]?.media
                                                }
                                                className="content_img"
                                              />
                                            ) : (
                                              ""
                                            );
                                          })}
                                        </div>
                                        <div className="content_imgs align-items-center">
                                          <BsEye />
                                          <span className="text-pink txt_mdm">
                                            View content
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className=" d-flex gap-2 flex-column">
                                        {image.length > 0 && (
                                          <Tooltip title="Photo">
                                            <img
                                              src={cameraic}
                                              alt="Photo"
                                              className="icn m-auto margin-right-8"
                                            /> <span className="txt_bld ms-2">{image?.length < 10 ? `0${image?.length}` : image?.length}</span>
                                          </Tooltip>
                                        )}
                                        {video.length > 0 && (
                                          <Tooltip title="Video">
                                            <img
                                              src={videoic}
                                              alt="Video"
                                              className="icn m-auto margin-right-8"
                                            /> <span className="txt_bld ms-2">{video?.length < 10 ? `0${video?.length}` : video?.length}</span>
                                          </Tooltip>
                                        )}
                                        {audio.length > 0 && (
                                          <Tooltip title="Audio">
                                            <img
                                              src={interviewic}
                                              alt="Audio"
                                              className="icn m-auto margin-right-8"
                                            /> <span className="txt_bld ms-2">{audio?.length < 10 ? `0${audio?.length}` : audio?.length}</span>
                                          </Tooltip>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        {hopperContri?.length > 0 && (
                          <PaginationComp
                            totalPage={contentOnlineTotalPage}
                            path="content-tables/hopper"
                            type="fav"
                            setPage={setContentOnlinePage}
                            page={contentOnlinePage}
                          />
                        )}
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

export default memo(Contenttables);
