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
import crimeic from "../assets/images/sortIcons/crime.svg";
import hprimg1 from "../assets/images/avatars/usrimg1.svg";
import hprimg2 from "../assets/images/avatars/usrimg2.svg";
import hprimg3 from "../assets/images/avatars/usrimg3.svg";
import contentic from "../assets/images/content.svg";
import taskic from "../assets/images/task.svg";
import Fundsinvested from "./Sortfilters/Dashboard/Fundsinvested";
import BroadcastedTask from "./Sortfilters/Dashboard/BroadcastedTask";
import Purchasedcontent from "./Sortfilters/Dashboard/PurchasedCont";
import audimgsm from "../assets/images/audimgsmall.svg";
import docsic from "../assets/images/docsic.svg";
import Loader from "./Loader";
import { formatAmountInMillion, receiveLastTwoDigits } from "./commonFunction";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationComp } from "./Pagination";
import { AiFillCaretDown } from "react-icons/ai";
import BroadCastedFilter from "./Sortfilters/Dashboard/BroadcastedFilters";
import BroadCastedSort from "./Sortfilters/Dashboard/BroadcastedSort";
import FundsinvestedFilter from "./Sortfilters/Dashboard/FundsinvestedFilter";

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
        setDatadata(res?.data?.total_fund_invested?.data);
        if (param?.type == "broadcasted_task") {
          setContentOnlineTotalPage(
            Math.ceil(
              res?.data?.broad_casted_tasks_details?.count / contentOnlineLimit
            )
          );
        } else if (param?.type == "fund_invested") {
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
    } catch (error) {}
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
        `mediaHouse/Content/Count?limit=${contentOnlineLimit}&offset=${
          (contentOnlinePage - 1) * contentOnlineLimit
        }&${
          filterSortField ? `${filterSortField}=${filterSortValue || ""}` : ""
        }&month=${month ? month : ""}&year=${
          year ? year : ""
        }&allQuery=${encodeURIComponent(JSON.stringify(allFilterdataToSend))}`
      );
      if (resp) {
        if (param?.type == "content_purchased_online") {
          setContentOnlineTotalPage(
            Math.ceil(resp?.data?.content_online?.count / contentOnlineLimit)
          );
        }
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
    } catch (error) {}
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
                {param.type === "fund_invested" ? (
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
                                  // feedMultiFilter={handleMultiFilter}
                                />
                              )}
                            </div>
                          </div>
                          {/* <div className="fltrs_prnt">
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
                              />
                            )}
                          </div> */}

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
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th className="loc_th">Location</th>
                              <th>Nett price paid</th>
                              <th>VAT paid</th>
                              <th>Total funds invested</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataset?.map((data, index) => {
                              const contentArray =
                                data?.content_ids[0]?.content;
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

                              const paidAmount =
                                formatAmountInMillion(
                                  data?.content_ids?.[0]?.Vat?.find(
                                    (el) =>
                                      el?.purchased_mediahouse_id ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )?.amount
                                ) || data?.amount_paid;
                              const askPrice =
                                formatAmountInMillion(
                                  data?.content_ids?.[0]?.Vat?.find(
                                    (el) =>
                                      el?.purchased_mediahouse_id ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ?._id
                                  )?.amount_without_Vat
                                ) || data?.amount - data?.Vat;
                              const vat =
                                (+paidAmount - +askPrice) % 1 > 0
                                  ? (+paidAmount - +askPrice).toFixed(1)
                                  : +paidAmount - +askPrice;

                              // console.log("fund investment ------->   ------>  ",data?.Vat,index,vat,vatcal,askPrice,paidAmount)

                              return (
                                <tr
                                  className="clickable"
                                  onClick={() =>
                                    navigate(
                                      data?.type === "content"
                                        ? `/purchased-content-detail/${data?._id}`
                                        : `task-details/${data?._id}`
                                    )
                                  }
                                >
                                  <td className="content_img_td position-relative add-icons-box">
                                    <Link>
                                      <div className="tbl_cont_wrp">
                                        <img
                                          src={
                                            data?.content_ids[0]?.content[0]
                                              ?.media_type == "image"
                                              ? data?.content_ids[0]?.content[0]
                                                  ?.watermark ||
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                  data?.content_ids[0]
                                                    ?.content[0]?.media
                                              : data?.content_ids[0]?.content[0]
                                                  ?.media_type == "video"
                                              ? data?.content_ids[0]?.content[0]
                                                  ?.watermark ||
                                                process.env
                                                  .REACT_APP_CONTENT_MEDIA +
                                                  data?.content_ids[0]
                                                    ?.content[0]?.thumbnail
                                              : data?.content_ids[0]?.content[0]
                                                  ?.media_type == "audio"
                                              ? audimgsm
                                              : data?.content_ids[0]?.content[0]
                                                  ?.media_type == "pdf" || "doc"
                                              ? docsic
                                              : null
                                          }
                                          className="content_img"
                                        />
                                        {/* <span className="cont_count">
                                          {data?.content_ids[0]?.content
                                            .length || 0}
                                        </span> */}
                                      </div>
                                      <div className="tableContentTypeIcons">
                                        {image.length > 0 && (
                                          <div class="post_icns_cstm_wrp camera-ico">
                                            <div class="post_itm_icns dtl_icns">
                                              <span class="count">
                                                {image.length}
                                              </span>
                                              <img
                                                class="feedMediaType iconBg"
                                                src={cameraic}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {video.length > 0 && (
                                          <div class="post_icns_cstm_wrp video-ico">
                                            <div class="post_itm_icns dtl_icns">
                                              <span class="count">
                                                {video.length}
                                              </span>
                                              <img
                                                class="feedMediaType iconBg"
                                                src={videoic}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                        {audio.length > 0 && (
                                          <div class="post_icns_cstm_wrp audio-ico">
                                            <div class="post_itm_icns dtl_icns">
                                              <span class="count">
                                                {audio.length}
                                              </span>
                                              <img
                                                class="feedMediaType iconBg"
                                                src={interviewic}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </Link>
                                  </td>

                                  <td className="timedate_wrap">
                                    <p className="timedate">
                                      <img src={watchic} className="icn_time" />
                                      {moment(
                                        // data?.content_ids[0]?.createdAt
                                        data?.createdAt
                                      ).format("hh:mm A")}
                                    </p>
                                    <p className="timedate">
                                      <img
                                        src={calendar}
                                        className="icn_time"
                                      />
                                      {moment(data?.createdAt).format(
                                        "DD MMM, YYYY"
                                      )}
                                    </p>
                                  </td>
                                  <td className="description_td">
                                    <p className="desc_ht">
                                      {data?.content_ids?.[0]?.heading}
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
                                    {data?.content_ids?.[0]?.Vat?.find(
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
                                        data?.content_ids[0]?.category_ids[0]
                                          ?.name
                                      }
                                    >
                                      <img
                                        src={
                                          data?.content_ids[0]?.category_ids[0]
                                            ?.icon
                                        }
                                        alt="Exclusive"
                                        className="icn"
                                      />
                                    </Tooltip>
                                  </td>

                                  <td>{data?.content_ids[0]?.location}</td>
                                  <td>£{askPrice}</td>
                                  {/* <td>£{vat=="NaN"?data?.Vat:vat}</td> */}
                                  <td>£{formatAmountInMillion(data?.Vat)}</td>

                                  <td>£{paidAmount}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {dataset?.length > 0 && (
                          <PaginationComp
                            totalPage={contentOnlineTotalPage}
                            path="dashboard-tables/fund_invested"
                            type="fav"
                            setPage={setContentOnlinePage}
                            page={contentOnlinePage}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ) : param.type === "broadcasted_task" ? (
                  <Card className="tbl_crd">
                    <div className="">
                      <div
                        className="d-flex justify-content-between align-items-center tbl_hdr"
                        px="20px"
                        mb="10px"
                      >
                        <Typography className="tbl_hdng">
                          Broadcasted Tasks
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
                            {data?.broad_casted_tasks_details &&
                              data?.broad_casted_tasks_details?.task.map(
                                (curr) => {
                                  console.log("all map data ===>", curr);
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
                                      onClick={() =>
                                        navigate(
                                          `/broadcasted-taks/${curr?._id}`
                                        )
                                      }
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
                                          <div className="tableContentTypeIcons">
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
                ) : (
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
                              <th className="">Content purchased online</th>
                              <th>Time & date</th>
                              <th className="tsk_dlts">Heading</th>
                              <th className="tbl_icn_th">Type</th>
                              <th className="tbl_icn_th licnc">License</th>
                              <th className="tbl_icn_th catgr">Category</th>
                              <th>Location</th>
                              <th>Published by</th>
                              <th>
                                Published price
                                {/* (inc VAT) */}
                              </th>
                              <th>
                                Amount paid
                                {/* (inc VAT) */}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contentOnline &&
                              contentOnline?.task.map((curr, index) => {
                                const media_house_id = curr?.media_house_id;

                                const contentArray = curr?.content_id?.content;
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
                                  curr?.content_id && curr.content_id.content[0]
                                    ? curr.content_id.content[0].media_type ===
                                      "video"
                                      ? process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content_id?.content?.[0]
                                          ?.thumbnail
                                      : curr.content_id.content[0]
                                          .media_type === "audio"
                                      ? audimgsm
                                      : curr.content_id.content[0]
                                          .media_type === "image"
                                      ? curr.content_id.content[0].watermark ||
                                        process.env.REACT_APP_CONTENT_MEDIA +
                                          curr.content_id.content[0].media
                                      : curr.content_id.content[0]
                                          .media_type === "doc"
                                      ? docsic
                                      : null
                                    : null;

                                // const askingPrice = curr?.content_id?.Vat?.find(
                                //   (el) =>
                                //     el?.purchased_mediahouse_id ==
                                //     JSON.parse(localStorage.getItem("user"))
                                //       ?._id
                                // )?.amount_without_Vat;
                                // ask_price
                                const askingPrice = curr?.content_id?.ask_price;

                                //

                                const purchasedTime =
                                  curr?.content_id?.Vat?.find(
                                    (el) =>
                                      el?.purchased_mediahouse_id ==
                                      media_house_id
                                  )?.purchased_time;

                                console.log("purchasedTime", purchasedTime);
                                // const paidPrice = +curr?.content_id?.Vat?.find(
                                //   (el) =>
                                //     el?.purchased_mediahouse_id ==
                                //     JSON.parse(localStorage.getItem("user"))
                                //       ?._id
                                // )?.amount;
                                const paidPrice =
                                  +curr?.content_id?.amount_paid;
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
                                      <Link>
                                        <div className="tbl_cont_wrp cnt_online_img noGrid">
                                          <img
                                            src={contentSource}
                                            className="content_img"
                                          />
                                          {/* <span className="cont_count">
                                            {curr?.content_id &&
                                              `${curr?.content_id?.content?.length}`}
                                          </span> */}
                                        </div>
                                        <div className="tableContentTypeIcons">
                                          {image.length > 0 && (
                                            <div class="post_icns_cstm_wrp camera-ico">
                                              <div class="post_itm_icns dtl_icns">
                                                <span class="count">
                                                  {image.length}
                                                </span>
                                                <img
                                                  class="feedMediaType iconBg"
                                                  src={cameraic}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          )}
                                          {video.length > 0 && (
                                            <div class="post_icns_cstm_wrp video-ico">
                                              <div class="post_itm_icns dtl_icns">
                                                <span class="count">
                                                  {video.length}
                                                </span>
                                                <img
                                                  class="feedMediaType iconBg"
                                                  src={videoic}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          )}
                                          {audio.length > 0 && (
                                            <div class="post_icns_cstm_wrp audio-ico">
                                              <div class="post_itm_icns dtl_icns">
                                                <span class="count">
                                                  {audio.length}
                                                </span>
                                                <img
                                                  class="feedMediaType iconBg"
                                                  src={interviewic}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          )}
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
                                          // curr?.content_id?.purchasedTime
                                          purchasedTime
                                        ).format(`hh:mm A`)}
                                      </p>
                                      <p className="timedate">
                                        <img
                                          src={calendar}
                                          className="icn_time"
                                        />
                                        {moment(
                                          // curr?.content_id?.purchasedTime
                                          purchasedTime
                                        ).format(`DD MMM YYYY`)}
                                      </p>
                                    </td>
                                    <td className="description_td">
                                      <p className="desc_ht">
                                        {curr?.content_id?.heading}
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
                                      {curr?.content_id?.Vat?.find((el) => {
                                        const user = JSON.parse(
                                          localStorage.getItem("user")
                                        );
                                        const idToCompare =
                                          user.role === "MediaHouse"
                                            ? user._id
                                            : user.mediaHouseId;
                                        return (
                                          el?.purchased_mediahouse_id ===
                                          idToCompare
                                        );
                                        // el?.purchased_mediahouse_id ==
                                        // JSON.parse(
                                        //   localStorage.getItem("user").role=="user"?localStorage.getItem("user").media_house_id:localStorage.getItem("user")._id
                                        // )?._id
                                      })?.purchased_content_type == "shared" ? (
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
                                          curr.content_id?.category_id?.name
                                        }
                                      >
                                        <img
                                          src={
                                            curr.content_id?.category_id?.icon
                                          }
                                          alt="shared"
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
                                            curr?.content_id?.hopper_id
                                              .avatar_id?.avatar
                                          }
                                          alt="Hopper"
                                          className="big_img"
                                        />
                                        <p className="hpr_nme">
                                          {curr?.content_id &&
                                            curr?.content_id?.hopper_id
                                              ?.user_name}
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      {/* £{formatAmountInMillion((askingPrice + curr.Vat))} */}
                                      £{formatAmountInMillion(askingPrice)}
                                    </td>
                                    <td>
                                      {console.log(
                                        "current_amount --->   ---->",
                                        index,
                                        curr.amount,
                                        curr.Vat
                                      )}
                                      £
                                      {formatAmountInMillion(
                                        +(curr?.amount - curr.Vat).toFixed(2)
                                      )}
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
