import React, { memo, useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
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
// import audioic from "../assets/images/audio-icon.svg";
import audioic from "../assets/images/audimg.svg";

import sharedic from "../assets/images/shared.svg";
import watch from "../assets/images/watch.svg";
import calendar from "../assets/images/calendar.svg";
import usric from "../assets/images/menu-icons/user.svg";
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
import cameraic from "../assets/images/camera.svg";
import exclusiveic from "../assets/images/exclusive.svg";
import locationPin from "../assets/images/locationPin.png";
import Fundsinvested from "./Sortfilters/Dashboard/Fundsinvested";
import Purchasedcontent from "./Sortfilters/Dashboard/PurchasedCont";
import audimgsm from "../assets/images/audimgsmall.svg";
import docsic from "../assets/images/docsic.svg";
import Loader from "./Loader";
import { formatAmountInMillion } from "./commonFunction";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationComp } from "./Pagination";
import { AiFillCaretDown } from "react-icons/ai";
import BroadCastedFilter from "./Sortfilters/Dashboard/BroadcastedFilters";
import BroadCastedSort from "./Sortfilters/Dashboard/BroadcastedSort";
import FundsinvestedFilter from "./Sortfilters/Dashboard/FundsinvestedFilter";
import { toast } from "react-toastify";

const DashboardTables = () => {
  const navigate = useNavigate();

  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [dataset, setDatadata] = useState([]);
  const [activeState, setActiveState] = useState("");
  const [allFilterData, setAllFilterData] = useState({
    filterdata: [],
    allcategoryData: [],
    category: [],
    sortData: "",
    price_range1: "",
    price_range2: "",
    location_search: "",
    toggle_filter: false,
    toggle_sort: false,
  });

  // setAllFilterData
  // Content Purchased Online-
  const [openContentPuchased, setOpenContentPuchased] = useState(false);
  const handleCloseContentPurchased = (values) => {
    setOpenContentPuchased(values);
    setAllFilterData((prev) => {
      return {
        ...prev,
        toggle_filter: true,
        toggle_sort: true,
      };
    });
  };

  // Broadcast task-
  const [openBroadcastTask, setOpenBroadcastTask] = useState(false);
  const handleCloseBroadcastTask = (values) => {
    setOpenBroadcastTask(values);
  };

  // Funds Invested-
  const [openFundsInvested, setOpenFundsInevested] = useState(false);
  const handleCloseFundsInvested = (values) => {
    setOpenFundsInevested(values);
  };

  const [filterSortField, setFilterSortField] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [filterType, setFilterType] = useState("");

  // Funds Time Value Handler-
  const fundsTimeValuesHandler = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
    setFilterType(value.type);
  };

  // Content Purchased Value Handler
  const handlePurchasedContentValue = (value) => {
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
  };

  // Broadcast Value Handler-
  const handleBroadcastValue = (value) => {
    // console.log("handleFavouriteComponentValues", value)
    setFilterSortField(value.field);
    setFilterSortValue(value.values);
    setFilterType(value.type);
  };

  // Pagination-
  const [contentOnlinePage, setContentOnlinePage] = useState(1);
  const [contentOnlineTotalPage, setContentOnlineTotalPage] = useState(0);
  const [contentOnlineLimit, setContentOnlineLimit] = useState(4);
  const queryParams = new URLSearchParams(window.location.search);
  const month = queryParams.get("month");
  const year = queryParams.get("year");

  const getData = async () => {
    try {
      const res = await Post(`mediaHouse/dashboard/Count`, {
        [filterSortField]: filterSortValue,
        ...(month ? { monthly: month } : {}),
        ...(month ? { type: "content_purchased_online" } : {}),
        ...(year ? { year: year } : {}),
        type: "content_purchased_online",
        limit: contentOnlineLimit,
        offset: (contentOnlinePage - 1) * contentOnlineLimit,
        allQuery: allFilterData,
        broadcasted_task_today: param?.type === "broadcasted_task_today" ? true : false,
      });
      const category = await Get("mediaHouse/getCategoryType?type=content");
      setAllFilterData({
        ...allFilterData,
        allcategoryData: category?.data?.data,
      });
      if (res) {
        setData(res?.data);
        setAllFilterData({
          ...allFilterData,
          istotalFund: false,
          toggle_filter: false,
          toggle_sort: false,

          // allcategoryData: category?.data?.data,
        });
        console.log(
          "all task data ---> ----> ----->",
          res?.data?.broad_casted_tasks_details?.task
        );
        if (param?.type == "broadcasted_task") {
          setContentOnlineTotalPage(
            Math.ceil(
              res?.data?.broad_casted_tasks_details?.count / contentOnlineLimit
            )
          );
        } else if (param?.type == "fund_invested" || param?.type === "content_average_price") {
          setContentOnlineTotalPage(
            Math.ceil(
              res?.data?.total_fund_invested?.count / contentOnlineLimit
            )
          );
          setAllFilterData({
            ...allFilterData,
            istotalFund: false,
            filterdata: [],
            category: [],
            sortData: "",
            price_range1: "",
            price_range2: "",
            location_search: "",
            toggle_filter: false,
            toggle_sort: false,

            // allcategoryData: category?.data?.data,
          });
        }
      }
    } catch (error) { }
  };

  useEffect(() => {
    getData();
    //  const a ="2023-08-19T08:29:33.118Z"
    //  console.log(moment(a).format("DD MMM, YYYY"))
  }, [filterSortValue, contentOnlinePage]);
  useEffect(() => {
    console.log(
      "all jhfjfhkjhfksdjhfkjdfhdkjsh--->",
      allFilterData?.istotalFund
    );
    if (allFilterData.istotalFund) {
      getData();
    }
  }, [allFilterData.istotalFund]);

  // data for Content purchased online

  const [contentOnline, setContentOnline] = useState();

  const getDetailData = async () => {
    try {
      setLoading(true);
      const allFilterdataToSend = { ...allFilterData };

      delete allFilterdataToSend.allcategoryData;
      const resp = await Get(
        `mediaHouse/Content/Count?limit=${contentOnlineLimit}&offset=${(contentOnlinePage - 1) * contentOnlineLimit
        }&${filterSortField ? `${filterSortField}=${filterSortValue || ""}` : ""
        }&month=${month ? month : ""}&year=${year ? year : ""
        }&allQuery=${encodeURIComponent(JSON.stringify(allFilterdataToSend))}`
      );
      if (resp) {
        if (param?.type == "content_purchased_online") {
          setContentOnlineTotalPage(
            Math.ceil(resp?.data?.content_online?.count / contentOnlineLimit)
          );
        }
        setDatadata(resp?.data?.content_online?.task);
        setContentOnline(resp?.data?.content_online);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDetailData();
    setAllFilterData((prev) => {
      return {
        ...prev,
        toggle_filter: false,
        toggle_sort: false,
      };
    });
  }, [filterSortValue, contentOnlinePage, allFilterData?.toggle_filter]);
  const currentlocation = useLocation();
  useEffect(() => {
    // console.log("Current Location:", currentlocation);
    sessionStorage.setItem(
      "lastPageWithQuery",
      `${currentlocation.pathname}${currentlocation.search}`
    );
  }, [currentlocation.pathname, currentlocation.search]);

  const Navigate = () => {
    navigate(`/published-content`);
    // console.log('test')
  };

  // Purchased content
  const purchasedContent = async () => {
    try {
      const resp = await Post(`mediaHouse/getContensLists`);
      if (resp) {
        // console.log(resp, `<---this is purchased contetn`)
      }
    } catch (error) { }
  };

  useEffect(() => {
    purchasedContent();
  }, []);

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
      <Header />
      <div className="page-wrap feed-detail tasktables_wrap dshbrd_tables">
        <Container fluid className="p-0">
          <Row>
            <Col md={12}>
              <div className="">
                <Link className="back_link mb-3">
                  <Link
                    className="back_link mb-3"
                    onClick={() => history.back()}
                  >
                    <BsArrowLeft className="text-pink" /> Back{" "}
                  </Link>
                </Link>
              </div>
              <div className="tbl_wrap_cmn">
                {param.type === "fund_invested" || param?.type === "content_average_price" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          {
                            param?.type === "content_average_price" ? "Content average price" : "Total funds invested"
                          }
                        </Typography>
                        <div className="tbl_rt sorting_wrap d-flex align-items-center">
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
                              )}
                            </div>
                          </div>
                          <div className="feedSorting">
                            <div className="fltrs_prnt top_fltr">
                              <p className="lbl_fltr">Sort</p>
                              <Button
                                className="sort_btn"
                                onClick={() => {
                                  setOpenFundsInevested(true);
                                }}
                              >
                                Sort
                                <BsChevronDown />
                              </Button>
                              {openFundsInvested && (
                                <Fundsinvested
                                  active={activeState}
                                  setActive={setActiveState}
                                  rangeTimeValues={fundsTimeValuesHandler}
                                  closeSortComponent={handleCloseFundsInvested}
                                  setAllFilterData={setAllFilterData}
                                  allFilterData={allFilterData}
                                />
                              )}
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
                              <th>Published by</th>
                              {
                                param?.type === "content_average_price" && (
                                  <>
                                    <th>Average price</th>
                                    <th>Amount paid (ex VAT)</th>
                                  </>
                                )
                              }
                              {
                                param?.type !== "content_average_price" && (
                                  <>
                                    <th>Nett price paid</th>
                                    <th>VAT paid</th>
                                    <th>Total funds invested</th>
                                  </>
                                )
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {contentOnline?.task.map((curr, index) => {
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
                                  {
                                    param?.type === "content_average_price" && (
                                      <>
                                        <td>£{formatAmountInMillion(curr?.amount / curr?.contentDetails?.content?.length || 0)}</td>
                                        <td>£{formatAmountInMillion(curr?.amount)}</td>
                                      </>
                                    )
                                  }
                                  {
                                    param?.type !== "content_average_price" && (
                                      <>
                                        <td>£{formatAmountInMillion(curr?.amount)}</td>
                                        <td>£{formatAmountInMillion(curr?.Vat)}</td>
                                        <td>£{formatAmountInMillion(curr?.amount + curr?.Vat)}</td>
                                      </>
                                    )
                                  }
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {dataset?.length > 0 && (
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
                ) : param.type === "broadcasted_task" || param.type === "broadcasted_task_today" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          {param.type === "broadcasted_task_today" ? "Broadcasted tasks today" : "Broadcasted tasks"}
                        </Typography>
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
                                <BroadCastedFilter
                                  closeBroadcastTask={
                                    handleCloseFilterComponent
                                  }
                                  setAllFilterData={setAllFilterData}
                                  allFilterData={allFilterData}
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
                                <BroadCastedSort
                                  closeSortComponent={handleCloseSortComponent}
                                  allFilterData={allFilterData}
                                  setAllFilterData={setAllFilterData}
                                />
                              )}
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
                              <th className="">Broadcasted tasks</th>
                              <th className="time_th">Broadcasted time</th>
                              <th className="time_th">Deadline</th>
                              <th className="time_th">Purchase time</th>
                              <th className="loc_th">Location</th>
                              <th className="tsk_dlts">Task details</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Uploaded by</th>
                              <th>Amount paid</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.broad_casted_tasks_details?.task?.map(
                              (curr) => {
                                let imageCount = 0;
                                let audioCount = 0;
                                let videoCount = 0;
                                curr?.content.forEach((ele, indx) => {
                                  if (ele?.media_type == "image") {
                                    imageCount++;
                                  } else if (ele.media_type == "video") {
                                    videoCount++;
                                  } else if (ele.media_type == "audio") {
                                    audioCount++;
                                  }
                                });
                                return (
                                  <tr
                                    onClick={() =>  {
                                      if ( curr?.content?.length === 0 ) {
                                        toast.success("No content found")
                                      } else if ( curr?.content?.length > 0 && new Date(curr?.deadline_date) < new Date() ) {
                                        navigate(`/hopper-task-content/${curr?._id}`)
                                      } else {
                                        navigate(`/task?task_ids=${curr?._id}`)
                                      }
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <td className="content_img_td position-relative add-icons-box">
                                      <Link>
                                        <div className="tbl_cont_wrp cnt_online_img noGrid">
                                          {curr?.content.length === 0 ? (
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
                                                    lat: curr
                                                      ?.address_location
                                                      ?.coordinates[0],
                                                    lng: curr
                                                      ?.address_location
                                                      ?.coordinates[1],
                                                  }}
                                                  icon={{
                                                    url: locationPin,
                                                    scaledSize: new window.google.maps.Size(30, 30), // Size of pin (Width, Height)
                                                  }}
                                                />
                                              </GoogleMap>
                                            </div>
                                          ) : (
                                            <div className="tbl_cont_wrp">
                                              {curr?.content[0]
                                                ?.media_type === "image" ? (
                                                <img
                                                  src={
                                                    curr?.content?.[0]
                                                      ?.watermark
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.content?.[0]
                                                ?.media_type === "video" ? (
                                                <img
                                                  src={
                                                    curr?.content[0]
                                                      ?.thumbnail
                                                  }
                                                  className="content_img"
                                                />
                                              ) : curr?.content?.[0]
                                                ?.media_type === "audio" ? (
                                                audioic
                                              ) : (
                                                ""
                                              )}
                                              {/* <span className="cont_count">
                                                  {curr?.content.length}
                                                </span> */}
                                            </div>
                                          )}
                                        </div>
                                        {/* <div className="tableContentTypeIcons">
                                            {imageCount > 0 && (
                                              <div class="post_icns_cstm_wrp camera-ico">
                                                <div class="post_itm_icns dtl_icns">
                                                  <span class="count">
                                                    {imageCount}
                                                  </span>
                                                  <img
                                                    class="feedMediaType iconBg"
                                                    src={cameraic}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            )}
                                            {videoCount > 0 && (
                                              <div class="post_icns_cstm_wrp video-ico">
                                                <div class="post_itm_icns dtl_icns">
                                                  <span class="count">
                                                    {videoCount}
                                                  </span>
                                                  <img
                                                    class="feedMediaType iconBg"
                                                    src={videoic}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            )}
                                            <div class="post_icns_cstm_wrp audio-ico">
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
                                                </div> 
                                          </div> */}
                                      </Link>
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
                                    <td>
                                      <p className="desc_ht">
                                        {curr?.location}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht">
                                        {curr?.task_description}
                                      </p>
                                    </td>

                                    <td className="text-center">
                                      {curr?.need_photos === true ? (
                                        <Tooltip title="Photo">
                                          <img
                                            src={cameraic}
                                            alt="Photo"
                                            className="icn"
                                          />{" "}
                                        </Tooltip>
                                      ) : (
                                        ""
                                      )}
                                      <br />
                                      {curr?.need_videos === true ? (
                                        <Tooltip title="Video">
                                          <img
                                            src={videoic}
                                            alt="Video"
                                            className="icn"
                                          />{" "}
                                        </Tooltip>
                                      ) : (
                                        ""
                                      )}
                                      <br />
                                      {curr?.need_interview === true ? (
                                        <Tooltip title="Interview">
                                          <img
                                            src={interviewic}
                                            alt="Interview"
                                            className="icn"
                                          />
                                        </Tooltip>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Tooltip
                                        title={curr?.category_id?.name}
                                      >
                                        <img
                                          className="icn"
                                          src={curr?.category_id?.icon}
                                        />
                                      </Tooltip>
                                    </td>
                                    <td>
                                      {curr?.content?.length > 0 && (
                                        <div className="hpr_dt">
                                          <img
                                            src={
                                              process.env
                                                .REACT_APP_AVATAR_IMAGE +
                                              curr?.completed_by?.[0]
                                                ?.avatar_id?.avatar
                                            }
                                            alt="Hopper"
                                            className="big_img"
                                          />
                                          <p className="hpr_nme">
                                            <span className="txt_light">
                                              {
                                                curr?.completed_by?.[0]
                                                  ?.user_name
                                              }
                                            </span>
                                          </p>
                                        </div>
                                      )}
                                    </td>
                                    <td>
                                      {curr?.totalfund_invested?.length > 0
                                        ? formatAmountInMillion(
                                          +curr?.totalfund_invested?.[0]
                                        )
                                        : "No fund invested "}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                        {data?.broad_casted_tasks_details?.task?.length > 0 && (
                          <PaginationComp
                            totalPage={contentOnlineTotalPage}
                            path="dashboard-tables/broadcasted_task"
                            type="fav"
                            setPage={setContentOnlinePage}
                            page={contentOnlinePage}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (<Card className="tbl_crd">
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
                            <Purchasedcontent
                              closeContentPurchased={
                                handleCloseContentPurchased
                              }
                              setAllFilterData={setAllFilterData}
                              allFilterData={allFilterData}
                              rangeTimeValuesPurchasedContent={
                                handlePurchasedContentValue
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
                            <th className="tsk_dlts">Heading</th>
                            <th className="tbl_icn_th">Type</th>
                            <th className="tbl_icn_th licnc">Licence</th>
                            <th className="tbl_icn_th catgr">Category</th>
                            <th>Location</th>
                            <th>Purchased by</th>
                            <th>Published by</th>
                            <th>Published price</th>
                            <th>Discounted Price</th>
                            <th>Negotiated Price</th>
                            <th>Purchase price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contentOnline?.task.map((curr) => {
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
                                        <span class="count">{curr?.contentDetails.content?.length || 0}</span>
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
                                <td>
                                  £{formatAmountInMillion(curr?.published_price || 0)}
                                </td>
                                <td>
                                  £{curr?.discount_type !== "discounted" ? formatAmountInMillion(curr?.discounted_price || 0) : 0}
                                </td>
                                <td>
                                  £{curr?.discount_type === "discounted" ? formatAmountInMillion(curr?.discounted_price || 0) : 0}
                                </td>
                                <td>
                                  £{formatAmountInMillion(curr?.amount)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {contentOnline?.task?.length > 0 && (
                        <PaginationComp
                          totalPage={contentOnlineTotalPage}
                          path="dashboard-tables/content_purchased_online"
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

export default memo(DashboardTables);
