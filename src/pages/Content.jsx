import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import exclusive from "../assets/images/exclusive.png";
import typeShare from "../assets/images/share.png";
import typeCam from "../assets/images/typeCam.svg";
import typeVideo from "../assets/images/typeVideo.svg";
import taskIcon from "../assets/images/task.svg";
import Header from "../component/Header";
import DashBoardSortCard from "../component/card/DashBoardSortCard";
import DashBoardTabCards from "../component/card/DashBoardTabCards";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import {
  BsArrowRight,
} from "react-icons/bs";
import favic from "../assets/images/star.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
//new//

import typestar from "../assets/images/sortIcons/star.svg";
import DbFooter from "../component/DbFooter";

import { MdOutlineWatchLater } from "react-icons/md";
import audioic from "../assets/images/audimg.svg";
import audioicsm from "../assets/images/audimgsmall.svg";
import typeInterview from "../assets/images/interview.svg";
import Loader from "../component/Loader";
import { Get, Post } from "../services/user.services";
import AddBroadcastTask from "./AddBroadcastTask";
import { formatAmountInMillion, getFavContent, getDeepModifiedContent, getModifiedContent, getTaskContent } from "../component/commonFunction";
import PostIconsWrapper from "../component/PostIconComponents/PostIconsWrapper";
import { DashboardCardInfo } from "../component/DashboardCardInfo";

const ContentPage = () => {
  const [show, setShow] = useState(false);

  const [favouriteContent, setFavouriteContent] = useState([]);
  const [pubContent, setPubContent] = useState([]);
  const [pur_content, setPur_content] = useState([]);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [type, setType] = useState("exclusive");
  const [loading, setLoading] = useState(false);
  const [underOfferContent, setUnderOfferContent] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const Navigate = (type) => {
    navigate(`/content-tables/${type}`);
  };

  const [discount, setDiscount] = useState([]);
  const getUnderOffer = async () => {
    try {
      setLoading(true);
      const res = await Post(`mediahouse/dashboard/Count`);
      setUnderOfferContent(res?.data?.content_under_offer.newdata);

      const res1 = await Post("mediaHouse/view/published/content", {
        isDiscount: true,
        limit: 6,
      });
      setLoading(false);
      setDiscount(res1.data.content);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  const [userId, setUserId] = useState(null);
  const getProfileData = async () => {
    try {
      const data = await Get("mediahouse/getProfile");
      const user_id = data.data.profile.role === "User_mediaHouse" ? data.data.profile.media_house_id._id : data.data.profile._id;
      setUserId(user_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData()
  }, [])


  const handleShow = () => {
    return setShow(!show);
  };

  const PublishedContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/view/published/content", { content: "latest" });

      setPubContent(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const PurchasedContent = async () => {
    setLoading(true);

    try {
      setType(type);
      const resp = await Get(`mediaHouse/purchasedContents?licenseType=${params?.tab1}`);
      setPur_content(resp.data.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const FavouriteContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/favouritesListingNew", {limit: 6});
      setFavouriteContent(resp.data.response.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const UploadedContent = async () => {
    setLoading(true);

    try {
      const resp = await Get("mediaHouse/getuploadedContentbyHoppers");
      setUploadedContent(resp.data.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // socket.disconnect()
    FavouriteContent();
    PublishedContent();
    UploadedContent();
    PurchasedContent();
    getUnderOffer()
  }, [params?.tab1]);

  const [hopperContri, setHopperContri] = useState([]);
  const HopperContribute = async () => {
    try {
      let resp = await Post("mediaHouse/view/published/content", {
        content: "hopper_who_contribute",
      });
      setHopperContri(resp?.data?.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HopperContribute();
  }, []);

  // New work -
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardSort, setDashboardSort] = useState({ type: "" });
  const [dashboardPayload, setDashboardPayload] = useState({
    requestedItems: ["content_purchased_online", "total_fund_invested", "total_fund_invested_today", "content_under_offer", "favourite", "content_purchased_from_task"],
    requestedFilter: {
      favourite: "",
      content_purchased_from_task: "",
      content_under_offer: "",
      total_fund_invested: "",
      content_purchased_online: "",
      total_fund_invested_today: ""
    }
  })

  const DashboardData = async (payload) => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/dashboard-data", payload);
      setDashboardData(resp?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    DashboardData(dashboardPayload);
  }, []);

  const handleApplySorting = async () => {
    DashboardData(dashboardPayload);
    setDashboardSort({ ...dashboardSort, type: "" });
  }

  const handleClearSort = async (payload) => {
    DashboardData(payload)
    setDashboardPayload(payload);
    setDashboardSort({ ...dashboardSort, type: "" });
  }

  const [newUploadedContent, setNewUploadedContent] = useState(null);
  const [contentPurchasedFromTask, setContentPurchasedFromTask] = useState(null);

  const ContentPurchasedFromTasks = async () => {
    try {
      setLoading(true);
      const resp = await Post("mediaHouse/content-purchased-from-task", {
        limit: 2,
      });
      setContentPurchasedFromTask(resp?.data?.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentPurchasedFromTasks();
  }, []);

  const NewUploadedContent = async () => {
    setLoading(true);
    try {
      let resp = await Get(`mediaHouse/getuploadedContentbyHoppers?limit=2&offet=0`)
      setNewUploadedContent(resp?.data?.uploadedContent);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    NewUploadedContent();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="dashboardStat_cards crd_edit_wrap">
                {/* Content Purchase Online */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/dashboard-tables/content_purchased_online"
                    title="Content purchased online"
                    type="content_purchased_online"
                    total={dashboardData?.content?.purchasedOnline?.totalCount}
                    data={getDeepModifiedContent(dashboardData?.content?.purchasedOnline?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.content_purchased_online}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_online: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_online: "" } })}
                  />
                </Col>

                {/* Content Purchased From Task */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/content-tables/content_sourced_from_task"
                    title="Content purchased from tasks"
                    type="content_purchased_from_task"
                    total={dashboardData?.task?.contentPurchasedFromTask?.totalCount}
                    data={getTaskContent(dashboardData?.task?.contentPurchasedFromTask?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.content_purchased_from_task}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_purchased_from_task: "" } })}
                  />
                </Col>

                {/* Favourited Content */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/Favourited-Content"
                    title="Favourited content"
                    type="favourite"
                    total={dashboardData?.content?.favourite?.totalCount}
                    data={getFavContent(dashboardData?.content?.favourite?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.favourite}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, favourite: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, favourite: "" } })}
                  />
                </Col>

                {/* Total fund invested ( today ) */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    showSort={false}
                    path="/content-tables/fund_invested_today"
                    title="Funds invested today (inc VAT)"
                    type="total_fund_invested_today"
                    total={"£" + formatAmountInMillion(dashboardData?.content?.totalFundInvestedToday?.totalAmount + dashboardData?.content?.totalFundInvestedToday?.totalVat || 0)}
                    data={getDeepModifiedContent(dashboardData?.content?.totalFundInvestedToday?.data)}
                  />
                </Col>

                {/* Total Fund Invested */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/dashboard-tables/fund_invested"
                    title="Total funds invested"
                    type="total_fund_invested"
                    total={"£" + formatAmountInMillion(dashboardData?.content?.totalFundInvested?.totalAmount + dashboardData?.content?.totalFundInvested?.totalVat || 0)}
                    data={getDeepModifiedContent(dashboardData?.content?.totalFundInvested?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.total_fund_invested}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, total_fund_invested: "" } })}
                  />
                </Col>

                {/* Content Under Offer */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/Content-Under-Offer"
                    title="Content under offer"
                    type="content_under_offer"
                    total={dashboardData?.content?.contentUnderOffer?.totalCount}
                    data={getModifiedContent(dashboardData?.content?.contentUnderOffer?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.content_under_offer}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_under_offer: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, content_under_offer: "" } })}
                  />
                </Col>

              </Row>
              <Row className="me-2 prchased_cont_wrp excluse_wrap">
                <Col md={12} className="mb-4 dash-tabs-wrap p-0">
                  <div className="dash-tabs prchased_cont_wrp">
                    <div className="dashCard-heading pb-0 d-flex justify-content-between">
                      <div className="sub_hdng_inn">
                        Content purchased online
                      </div>
                      <Link
                        className="view-all-link"
                        to={`/purchased-content/${params?.tab1}`}
                      >
                        {" "}
                        View all <BsArrowRight className="text-danger" />{" "}
                      </Link>
                    </div>
                    <Tabs
                      defaultActiveKey="exclusive"
                      id="uncontrolled-tab-example"
                      className="mb-3 tbs"
                      onSelect={(e) =>
                        navigate(`/content/${e}/${params.tab2}/${params.tab3}`)
                      }
                      activeKey={params?.tab1}
                    >
                      <Tab eventKey="exclusive" title="Exclusive">
                        {pur_content?.map((item) => {
                          return (
                            <Link
                              to={`/purchased-content-detail/${item?._id}`}
                              key={item._id}
                            >
                              <DashBoardTabCards
                                tabcard5={item?.hopperDetails?.user_name}
                                imgtab1={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.hopperDetails?.avatarDetails?.avatar
                                }
                                imgtab={
                                  item?.contentDetails?.content[0]?.media_type === "video"
                                    ? item?.contentDetails?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                    item?.contentDetails?.content[0]?.thumbnail
                                    : item?.contentDetails?.content[0]?.media_type ===
                                      "audio"
                                      ? audioic
                                      : item?.contentDetails?.content[0]?.watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      item?.contentDetails?.content[0]?.media
                                }
                                tabcarddata={item?.contentDetails?.heading}
                                tabcard2={moment(item?.createdAt).format(
                                  "hh:mm A, DD MMM YYYY"
                                )}
                                tabcard3={"£" + formatAmountInMillion(Number(item?.amount + item?.Vat) || 0)}
                              />
                            </Link>
                          );
                        })}
                      </Tab>
                      <Tab eventKey="shared" title="Shared">
                        {pur_content?.map((item) => {
                          return (
                            <Link
                              to={`/purchased-content-detail/${item?._id}`}
                              key={item._id}
                            >
                              <DashBoardTabCards
                                tabcard5={item?.hopperDetails?.user_name}
                                imgtab1={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.hopperDetails?.avatarDetails?.avatar
                                }
                                imgtab={
                                  item?.contentDetails?.content[0]?.media_type === "video"
                                    ? item?.contentDetails?.content[0]?.watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                    item?.contentDetails?.content[0]?.thumbnail
                                    : item?.contentDetails?.content[0]?.media_type ===
                                      "audio"
                                      ? audioic
                                      : item?.contentDetails?.content[0]?.watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      item?.contentDetails?.content[0]?.media
                                }
                                tabcarddata={item?.contentDetails?.heading}
                                tabcard2={moment(item?.createdAt).format(
                                  "hh:mm A, DD MMM YYYY"
                                )}
                                tabcard3={"£" + formatAmountInMillion(Number(item?.amount + item?.Vat) || 0)}
                              />
                            </Link>
                          );
                        })}
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
                <Col md={12} className="dash-tabs-wrap p-0">
                  <div className="dash-tabs srcd_cnt_wrp">
                    <div className="card-heading">
                      Content purchased from tasks
                    </div>
                    <Link className="view-all-link" to={"/Sourced-Content"}>
                      {" "}
                      View all
                      <BsArrowRight className="text-danger" />{" "}
                    </Link>
                    {contentPurchasedFromTask?.data?.map((curr) => {
                      return (
                        <Link to={`/purchased-task-content-detail/${curr._id}`} key={curr?._id}>
                          <DashBoardTabCards
                            imgtab={(curr?.purchased_task_content?.[0]?.type === "image" || curr?.purchased_task_content?.[0]?.type === "video") ? curr?.purchased_task_content?.[0]?.videothubnail : audioic}
                            tabcarddata={curr?.taskDetails?.heading}
                            tabcard2={moment(curr.createdAt).format(
                              "hh:mm a, DD MMM YYYY"
                            )}
                            tabcard3={`£${formatAmountInMillion(curr?.amount + curr?.Vat)}`}
                            image_type={curr?.purchased_task_content?.[0]?.type}
                            feedType={
                              curr.type === "image"
                                ? "Photo"
                                : curr.type === "Video"
                                  ? "Video"
                                  : "Interview"
                            }
                            tabcard5={curr?.hopperDetails?.user_name}
                            imgtab1={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              curr?.hopperDetails?.avatarDetails?.avatar
                            }
                          />
                        </Link>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="pe-0">
              <div className="right-cards">
                <Row className="crd_edit_wrap">
                  <Col md={8} className="p-0">
                    <Card className="dash-top-cards crd_edit">
                      <Link to="/content-tables/hopper">
                        <CardContent className="dash-c-body">
                          <div className="cardCustomHead">
                            <div className="edit_card_sel">
                              <svg
                                width="20"
                                height="17"
                                viewBox="0 0 20 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.747559 1.46875H19.4976V14.75C19.4976 14.9572 19.4152 15.1559 19.2687 15.3024C19.1222 15.4489 18.9235 15.5312 18.7163 15.5312H1.52881C1.32161 15.5312 1.12289 15.4489 0.976382 15.3024C0.829869 15.1559 0.747559 14.9572 0.747559 14.75V1.46875Z"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M0.747559 6.15625H19.4976"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M0.747559 10.8438H19.4976"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.21631 6.15625V15.5312"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <Typography
                              variant="body2"
                              className="card-head-txt mb-2"
                            >
                              {hopperContri?.filter((el) => el._id != null)
                                ?.length || 0}
                            </Typography>
                          </div>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                            className="cardContent_head"
                          >
                            Hoppers who have contributed
                          </Typography>
                          {/* <div className="content_stat">
                            <span className={content_count?.hopper?.type === "increase" ? 'stat_up' : 'stat_down'}>{content_count?.hopper?.type === "increase" ? <BsArrowUp /> : <BsArrowDown />} {content_count?.hopper?.percent ? Math.round(content_count?.hopper?.percent) : 0}%</span>
                            <span>vs last week</span>
                          </div> */}
                        </CardContent>
                        <CardActions className="dash-c-foot pt-0">
                          <div className="card-imgs-wrap">
                            {hopperContri
                              ?.filter((el) => el._id != null)
                              ?.slice(0, 3)
                              ?.map((el) => (
                                <img
                                  src={
                                    process.env.REACT_APP_AVATAR_IMAGE +
                                    el?._id?.avatar_id?.avatar
                                  }
                                  key={el?._id}
                                  className="card-img"
                                  alt={el?._id?.avatar_id?.avatar}
                                />
                              ))}
                            <span>
                              <BsArrowRight
                                onClick={() => Navigate("hopper")}
                              />
                            </span>
                          </div>
                        </CardActions>
                      </Link>
                    </Card>
                  </Col>
                  <Col md={4} className="mb-4 p-0">
                    <Card className="dash-top-cards mb-0 add-br rt_crd d-flex align-items-center justify-content-center ">
                      <CardContent className="dash-c-body rev">
                        <div className="broadcast">
                          <Typography className="mb-3 text-center d-flex justify-content-center">
                            <span
                              className="clickable"
                              onClick={() => {
                                handleShow();
                              }}
                            >
                              +
                            </span>
                            {/* <Tooltip title="Launching soon">
                              <span className="clickable">+</span>
                            </Tooltip> */}
                          </Typography>
                          <Typography className="mb-0 text-center txt_bold text-white">
                            Broadcast task
                          </Typography>
                        </div>
                      </CardContent>
                      {show && (
                        <AddBroadcastTask isOpen={show} show={handleShow} />
                      )}
                    </Card>
                  </Col>
                  <Col md={12} className="list-card-wrap pt-0 pe-0">
                    <Card className="dash-top-cards pblsh_upldtab_wrap rt_crd ">
                      <Tabs
                        defaultActiveKey="published"
                        id="uncontrolled-tab-example"
                        className="mb-3 tbs pblsh_upl_tabs"
                        onSelect={(e) =>
                          navigate(
                            `/content/${params.tab1}/${e}/${params.tab3}`
                          )
                        }
                        activeKey={params?.tab2}
                      >
                        <Tab eventKey="published" title="Published content">
                          {pubContent?.map((curr, index) => {
                            if (index > pubContent.length - 3) {
                              return (
                                <CardContent key={curr?._id} className="dash-c-body rev new_tbs_card">
                                  <Link
                                    to={`/Feeddetail/content/${curr._id}`}
                                  >
                                    <div className="">
                                      <Card className="list-card mb-3 bg_grey">
                                        <CardContent className="dash-c-body">
                                          <div className="list-in d-flex align-items-start">
                                            <div className="rateReview_content">
                                              <div className="commonContentIconsWrap crd_in_icons d-flex justify-content-between">
                                                <PostIconsWrapper
                                                  images={curr?.image_count}
                                                  video={curr?.video_count}
                                                  audio={curr?.audio_count}
                                                />
                                                <span className="rateView-type dflt">
                                                  <img
                                                    className=""
                                                    src={
                                                      curr.favourite_status ===
                                                        "true"
                                                        ? typestar
                                                        : favic
                                                    }
                                                    alt="Fav"
                                                  />
                                                </span>
                                              </div>
                                              <img
                                                className="list-card-img"
                                                src={
                                                  curr?.content[0]
                                                    ?.media_type === "video"
                                                    ? curr?.content[0]?.thumbnail.startsWith(
                                                      "https"
                                                    )
                                                      ? curr?.content[0]
                                                        ?.thumbnail
                                                      : process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.content[0]
                                                        ?.thumbnail
                                                    : // ? process.env
                                                    //     .REACT_APP_CONTENT_MEDIA +
                                                    //   curr?.content[0]
                                                    //     ?.thumbnail
                                                    curr?.content[0]
                                                      ?.media_type ===
                                                      "audio"
                                                      ? audioic
                                                      : process.env
                                                        .REACT_APP_CONTENT_MEDIA +
                                                      curr?.content[0]?.media
                                                }
                                                alt="1"
                                              />
                                            </div>
                                            <div className="list-in-txt mt-1">
                                              <Typography
                                                variant="body2"
                                                className="list-car-txt mb-2 txt_mdm"
                                              >
                                                {curr?.description}
                                                <br />
                                              </Typography>
                                              <Typography
                                                sx={{ fontSize: 12 }}
                                                color="#9DA3A3"
                                                gutterBottom
                                                className="mb-0 txt_mdm d-flex align-items-center gap-1"
                                              >
                                                <MdOutlineWatchLater color="#000" />
                                                {moment(
                                                  curr?.createdAt
                                                ).format(
                                                  "h:mm A, DD MMM YYYY"
                                                )}
                                              </Typography>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </Link>
                                </CardContent>
                              );
                            }
                          })}
                          <div className="view-all_link_wrap d-flex justify-content-end">
                            <Link
                              className="view-all"
                              to={"/published-content"}
                              onClick={localStorage.setItem(
                                "backBtnVisibility",
                                JSON.stringify("backBtn")
                              )}
                            >
                              {" "}
                              View all <BsArrowRight className="text-danger" />{" "}
                            </Link>
                          </div>
                        </Tab>

                        <Tab eventKey="uploaded" title="Uploaded content">
                          {newUploadedContent?.map((item) => {
                            return (
                              <CardContent className="dash-c-body rev new_tbs_card" key={item?._id}>
                                <Link to={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}>
                                  <div className="">
                                    <Card className="list-card mb-3 bg_grey">
                                      <CardContent className="dash-c-body">
                                        <div className="list-in d-flex align-items-center">
                                          <div className="rateReview_content">
                                            <div className="commonContentIconsWrap crd_in_icons d-flex justify-content-between">
                                              <span className="rateView-type dflt cmr">
                                                <span className="volCount">
                                                  {item?.content?.length}
                                                </span>
                                              </span>
                                              {/* <span className="rateView-type dflt">
                                                <img
                                                  className=""
                                                  src={
                                                    item?.content[0]?.favourited ===
                                                      "true"
                                                      ? typestar
                                                      : favic
                                                  }
                                                />
                                              </span> */}
                                            </div>
                                            <img
                                              className="list-card-img"
                                              src={
                                                item?.content[0]?.type === "image"
                                                  ? item?.content[0]?.videothubnail ||
                                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                                  item?.content[0]?.imageAndVideo
                                                  : item?.content[0]?.type === "video"
                                                    ? item?.content[0]?.videothubnail ||
                                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                                    item?.content[0]?.videothubnail
                                                    : item?.content[0]?.type === "audio"
                                                      ? audioic
                                                      : null
                                              }
                                              alt="1"
                                            />
                                          </div>
                                          <div className="list-in-txt">
                                            <Typography
                                              variant="body2"
                                              className="list-car-txt mb-2 txt_mdm"
                                            >
                                              {item?.content[0]?.task_id?.heading}
                                              <br />
                                            </Typography>
                                            <div className="d-flex align-items-center justify-content-between">
                                              <Typography
                                                sx={{ fontSize: 12 }}
                                                color="#9DA3A3"
                                                gutterBottom
                                                className="mb-0 txt_mdm"
                                              >
                                                <MdOutlineWatchLater color="#000" />
                                                {moment(item?.content[0]?.updatedAt).format(" hh:mm A, DD MMM YYYY")}
                                              </Typography>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </Link>
                              </CardContent>
                            );
                          })}
                          <div className="view-all_link_wrap d-flex justify-content-end">
                            <Link
                              className="view-all"
                              to={"/hopper-task-content/all"}
                            >
                              {" "}
                              View all <BsArrowRight className="text-danger" />{" "}
                            </Link>
                          </div>
                        </Tab>
                      </Tabs>
                    </Card>
                  </Col>
                  <Col
                    md={12}
                    className="dash_tabs_wrap_sort p-0 favourite-tabs"
                  >
                    <div className="dash-tabs Sort_tab_cart rt_crd mr fvt_undrofr_wrp">
                      <Tabs
                        defaultActiveKey="favourited"
                        id="uncontrolled-tab-example"
                        className="mb-3 tbs pblsh_upl_tabs"
                        onSelect={(e) =>
                          navigate(
                            `/content/${params.tab1}/${params.tab2}/${e}`
                          )
                        }
                        activeKey={params?.tab3}
                      >
                        {
                          console.log("favouriteContent", favouriteContent)
                        }
                        <Tab eventKey="favourited" title="Favourited">
                          <div
                            className="DashBoardsort_wrapper d-flex justify-content-start fvt_undr_ofr"
                            style={{ flexWrap: "wrap" }}
                          >
                            {favouriteContent?.filter((el) => ("content_details" in el || "upload_content_details" in el) )?.map((curr, index) => {
                              if(curr?.upload_content_details) {
                                return (
                                  <Link
                                    to={`/content-details/${curr?.upload_content_details?.task_details?._id}?hopper_id=${curr?.upload_content_details?.hopper_details?._id}`}
                                    className="favourited_card_design"
                                    key={curr?._id}
                                  >
                                    <DashBoardSortCard
                                      className="fvrt_itm"
                                      reviewType={contentCamera}
                                      reviewTypetwo={typestar}
                                      imgtab={
                                        curr?.upload_content_details?.type === "image"
                                        ? curr?.upload_content_details?.videothubnail ||
                                        process.env.REACT_APP_UPLOADED_CONTENT +
                                        curr?.upload_content_details?.imageAndVideo
                                        : curr?.upload_content_details?.type === "video"
                                          ? curr?.upload_content_details?.videothubnail ||
                                          process.env.REACT_APP_UPLOADED_CONTENT +
                                          curr?.upload_content_details?.videothubnail
                                          : curr?.upload_content_details?.type === "audio"
                                            ? audioic
                                            : null
                                      }
                                      tabcarddata={
                                        curr?.upload_content_details?.task_details?.heading
                                      }
                                      feedIcon={taskIcon}
                                      feedType={"TASK"}
                                      tabcard3={`${formatAmountInMillion(
                                        curr?.upload_content_details?.type === "image" ? curr?.upload_content_details?.task_details?.hopper_photo_price :
                                        curr?.upload_content_details?.type === "video" ? curr?.upload_content_details?.task_details?.hopper_videos_price : 
                                        curr?.upload_content_details?.type === "audio" ? curr?.upload_content_details?.task_details?.hopper_interview_price : ""
                                      )}`}
                                      contentDetails={curr?.content_id}
                                    />
                                  </Link>
                                )
                              } else {
                                return (
                                  <Link
                                    to={`/Feeddetail/content/${curr?.content_details?._id}`}
                                    className="favourited_card_design"
                                    key={curr?._id}
                                  >
                                    <DashBoardSortCard
                                      className="fvrt_itm"
                                      reviewType={contentCamera}
                                      reviewTypetwo={typestar}
                                      imgtab={
                                        curr?.content_details?.content[0]?.media_type ===
                                        "video"
                                          ? curr?.content_details?.content[0]?.watermark ||
                                            process.env.REACT_APP_CONTENT_MEDIA +
                                              curr?.content_details?.content[0]?.thumbnail
                                          : curr?.content_details?.content[0]?.media_type ===
                                            "image"
                                          ? curr?.content_details?.content[0]?.watermark ||
                                            process.env.REACT_APP_CONTENT_MEDIA +
                                              curr?.content_details?.content[0]?.media
                                          : curr?.content_details?.content[0]?.media_type ===
                                            "audio"
                                          ? audioic
                                          : ""
                                      }
                                      tabcarddata={
                                        curr?.content_details?.description
                                      }
                                      feedIcon={
                                        curr?.content_details?.type === "shared"
                                          ? typeShare
                                          : exclusive
                                      }
                                      feedType={curr?.content_details?.type?.toUpperCase()}
                                      tabcard3={`${formatAmountInMillion(
                                        curr?.content_details?.ask_price
                                      )}`}
                                      contentDetails={curr?.content_details}
                                    />
                                  </Link>
                                )
                              }
                            })}
                          </div>
                          <div className="dashCard-heading d-flex justify-content-end">
                            <Link
                              className="view-all"
                              to={"/Favourited-Content"}
                            >
                              {" "}
                              View all <BsArrowRight className="text-danger" />{" "}
                            </Link>
                          </div>
                        </Tab>
                        <Tab eventKey="underoffer" title="Under offer">
                          <div
                            className="DashBoardsort_wrapper_tab d-flex fvt_undr_ofr"
                            style={{ flexWrap: "wrap" }}
                          >
                            {underOfferContent?.slice(0, 6).map((curr) => {
                              const feedIcon =
                                curr?.type === "shared"
                                  ? typeShare
                                  : exclusive;

                              return (
                                <Link
                                  to={`/Feeddetail/content/${curr._id}`}
                                  className="favourited_card_design"
                                  key={curr?._id}
                                >
                                  <DashBoardSortCard
                                    reviewType={
                                      curr?.content[0]?.media_type === "image"
                                        ? contentCamera
                                        : contentVideo
                                    }
                                    reviewTypetwo={
                                      curr.favourite_status === "true"
                                        ? typestar
                                        : favic
                                    }
                                    imgtab={
                                      curr?.content[0]?.media_type === "video"
                                        ? process.env
                                          .REACT_APP_CONTENT_MEDIA +
                                        curr?.content[0]?.thumbnail
                                        : curr?.content[0]?.media_type ===
                                          "audio"
                                          ? audioicsm
                                          : process.env
                                            .REACT_APP_CONTENT_MEDIA +
                                          curr?.content[0]?.media
                                    }
                                    tabcarddata={curr?.description}
                                    feedIcon={feedIcon}
                                    feedType={
                                      curr?.type === "shared"
                                        ? "Shared"
                                        : "Exclusive"
                                    }
                                    tabcard3={`${formatAmountInMillion(
                                      +(curr?.offered_price.length > 0
                                        ? curr?.offered_price[
                                          curr?.offered_price.length - 1
                                        ]?.initial_offer_price ||
                                        curr?.offered_price[
                                          curr?.offered_price.length - 1
                                        ]?.finaloffer_price
                                        : curr?.Vat[0]
                                          .purchased_mediahouse_id ==
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          )?._id
                                          ? curr?.Vat[0].amount
                                          : 0)
                                    )}`}
                                    contentDetails={curr}
                                  />
                                </Link>
                              );
                            })}
                          </div>
                          <div className="dashCard-heading d-flex justify-content-end">
                            <Link
                              className="view-all"
                              to={"/Content-Under-Offer"}
                            >
                              {" "}
                              View all <BsArrowRight className="text-danger" />
                            </Link>
                          </div>
                        </Tab>
                        <Tab eventKey="discount" title="Special offers">
                          <div
                            className="DashBoardsort_wrapper d-flex justify-content-start fvt_undr_ofr"
                            style={{ flexWrap: "wrap" }}
                          >
                            {discount?.map((curr, index) => {
                              return (
                                <Link
                                  className="favourited_card_design special_card_design"
                                  to={`/Feeddetail/content/${curr?._id}`}
                                  key={curr?._id}
                                >
                                  <DashBoardSortCard
                                    className="fvrt_itm"
                                    reviewType={
                                      curr?.content[0]?.media_type === "image"
                                        ? contentCamera
                                        : contentVideo
                                    }
                                    reviewTypetwo={
                                      curr.favourite_status === "true"
                                        ? typestar
                                        : favic
                                    }
                                    imgtab={
                                      curr?.content[0] &&
                                        curr?.content[0]?.media_type === "video"
                                        ? process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content[0]?.thumbnail
                                        : curr?.content[0]?.media_type ===
                                          "audio"
                                          ? audioicsm
                                          : curr?.content[0]?.watermark
                                    }
                                    tabcarddata={curr?.description}
                                    feedIcon={
                                      curr?.type === "shared"
                                        ? typeShare
                                        : exclusive
                                    }
                                    feedType={curr?.type?.toUpperCase()}
                                    tabcard3={`${formatAmountInMillion(
                                      curr?.ask_price
                                    )}`}
                                    before_discount_value={
                                      curr?.before_discount_value
                                    }
                                    contentDetails={curr}
                                  />
                                </Link>
                              );
                            })}
                          </div>
                          <div className="dashCard-heading d-flex justify-content-end">
                            <Link
                              className="view-all"
                              to={"/Uploaded-Content/Special"}
                            >
                              {" "}
                              View all <BsArrowRight className="text-danger" />{" "}
                            </Link>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="mt-4">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default ContentPage;
