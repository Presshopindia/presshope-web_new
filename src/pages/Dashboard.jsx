import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import DashBoardCardList from "../component/card/DashBoardCardList";
import DashBoardTabCards from "../component/card/DashBoardTabCards";
import DashBoardPayment from "../component/card/DashBoardPayment";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import docsic from "../assets/images/docsic.svg";
import typeCam from "../assets/images/typeCam.svg";
import typeVideo from "../assets/images/typeVideo.svg";
import typeInterview from "../assets/images/interview.svg";
import typeInterviewwt from "../assets/images/typeinterview-wt.svg";
import star from "../assets/images/star.png";
import FillStar from "../assets/images/half_filled_star.png";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { BsArrowRight, BsChevronDown } from "react-icons/bs";
import {
  Button,
  Tab,
  Tabs,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import AddBroadcastTask from "./AddBroadcastTask";
import { Get, Post } from "../services/user.services";
import Loader from "../component/Loader";
import moment from "moment";
import audioic from "../assets/images/audimg.svg";
import audioicsm from "../assets/images/audimgsmall.svg";

// sorts
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import { useDarkMode } from "../context/DarkModeContext";
import {
  capitalizeWord,
  formatAmountInMillion,
  getDeepModifiedContent,
  getDeepModifiedTaskContent,
  getModifiedContent,
  hasDecimal,
  getFavContent
} from "../component/commonFunction";
import { DashboardCardInfo } from "../component/DashboardCardInfo";
import RecentActivityCard from "../component/card/RecentActivityCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [receivedCount, setReceivedCount] = useState();
  const [rat_count, setRatCount] = useState();
  const [recentUploaded, setRecentUploaded] = useState();
  const [pub_content, setPub_Content] = useState([]);
  const [current_chat, setCurrent_chat] = useState([]);
  const [current_chat_detais, setCurrent_chatdata] = useState([]);
  const [pending_payment, setPending_payment] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // Dark Mode-
  const { profileData } = useDarkMode();

  const [trading, setTrading] = useState([]);

  const [contentUnderOfferSort, setContentUnderOfferSort] = useState("");
  const [recentActivityState, setRecentActivityState] = useState("");

  const Trendingseraches = async () => {
    // setLoading(true)
    try {
      const resp = await Get(`mediahouse/trending_search`);
      setTrading(resp?.data?.response);
    } catch (error) {
      // setLoading(false)
    }
  };
  const handleShow = () => {
    setShow(!show);
  };

  // Recent Activity-
  const [openRecentActivity, setOpenRecentActivity] = useState(false);

  const handleCloseRecentActivity = (values) => {
    setOpenRecentActivity(values);
  };

  const [recentActivityValues, setRecentActivityValues] = useState({
    field: "yearly",
    value: "yearly",
  });
  const handleRecentActivityValue = (value) => {
    // console.log("handleFavouriteComponentValues", value)
    setRecentActivityValues({ field: value.field, value: value.values });
  };

  const ChatCount = async () => {
    setLoading(true);
    try {
      const resp = await Get(`mediaHouse/currentchat`);
      setCurrent_chat(resp.data);
      setCurrent_chatdata(resp.data.chat);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const RatingNReview_Count = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/avgRating`);
      setRatCount(resp.data.data[0]);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const RecentActivity = async (data) => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediahouse/recentactivity?${recentActivityValues.field && recentActivityValues.field
        }=${recentActivityValues.value && recentActivityValues.value}`
      );
      const sortedData = resp?.data?.data
        ?.filter((el) => el.content_id != null)
        ?.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt));
      setRecentUploaded(sortedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const PublishedContent = async () => {
    setLoading(true);

    try {
      let payload = {};
      if (params?.type === "discount") {
        payload = { isDiscount: true, limit: 2 }
      }
      else {
        payload = { type: [params?.type], limit: 2 }
      }

      const resp = await Post("mediaHouse/view/published/content", payload)
      setPub_Content(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const PendingPayments = async (type) => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/paymenttobemade`);
      setPending_payment(resp.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const receivedRatingFromHopper = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/allratedcontent`);
      setReceivedCount(res?.data?.review_given_count);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    RecentActivity();
  }, [recentActivityValues]);

  useEffect(() => {
    PublishedContent();
  }, [params?.type]);

  useEffect(() => {
    PendingPayments();
    ChatCount();
    Trendingseraches();
    receivedRatingFromHopper();
    RatingNReview_Count();
  }, []);


  // New work -
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardSort, setDashboardSort] = useState({ type: "" });
  const [dashboardPayload, setDashboardPayload] = useState({
    requestedItems: ["content_purchased_online", "total_fund_invested", "content_under_offer", "favourite", "broadcasted_task", "chat_count"],
    requestedFilter: {
      favourite: "",
      broadcasted_task: "",
      content_under_offer: "",
      total_fund_invested: "",
      content_purchased_online: ""
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

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap dashb_page">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="dashboardStat_cards crd_edit_wrap dsh_n_crds">
                {/* Current Chat */}
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <Link
                      to="/chat"
                      onClick={localStorage.setItem(
                        "backBtnVisibility",
                        JSON.stringify("backBtn")
                      )}
                    >
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
                            {current_chat?.data || 0}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Current chats
                        </Typography>
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {current_chat_detais.slice(0, 3)?.map((curr) => {
                            let avtartimage = process.env.REACT_APP_AVATAR_IMAGE + curr?.sender_id?.avatar_id?.avatar;

                            const Content = profileData?.hasOwnProperty(
                              "admin_detail"
                            )
                              ? profileData?.admin_detail?.admin_profile
                              : profileData?.profile_image;
                            return (
                              <img
                                src={avtartimage ?? Content}
                                className="card-img"
                              />
                            );
                          })}
                          <span>
                            {" "}
                            <Link to="/chat">
                              {" "}
                              <BsArrowRight />{" "}
                            </Link>
                          </span>
                        </div>
                      </CardActions>
                    </Link>
                  </Card>
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
                {/* Broadcast Tasks */}
                <Col md={4} className="p-0">
                  <DashboardCardInfo
                    path="/dashboard-tables/broadcasted_task"
                    title="Broadcasted tasks"
                    type="broadcasted_task"
                    total={dashboardData?.task?.broadcastedTask?.totalCount}
                    data={getDeepModifiedTaskContent(dashboardData?.task?.broadcastedTask?.data)}
                    dashboardSort={dashboardSort}
                    setDashboardSort={setDashboardSort}
                    sort={dashboardPayload?.requestedFilter?.broadcasted_task}
                    setSort={(value) => setDashboardPayload({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, broadcasted_task: value } })}
                    setSortState={handleApplySorting}
                    handleSortClick={(value) => setDashboardSort({ ...dashboardSort, type: value })}
                    handleClearSort={() => handleClearSort({ ...dashboardPayload, requestedFilter: { ...dashboardPayload.requestedFilter, broadcasted_task: "" } })}
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
              </Row>
              <Row>
                <Col md={12} className="mb-4 dash-tabs-wrap">
                  <div className="dash-tabs excl_shrd_tbs">
                    <Link
                      className="view-all-link"
                      to="/published-content"
                      onClick={localStorage.setItem(
                        "backBtnVisibility",
                        JSON.stringify("backBtn")
                      )}
                    >
                      {" "}
                      View feed <BsArrowRight className="text-danger" />{" "}
                    </Link>
                    <Tabs
                      defaultActiveKey="exclusive"
                      id="uncontrolled-tab-example"
                      className="p-0 tbs"
                      // onSelect={PublishedContent}
                      onSelect={(eventKey) => {
                        navigate(`/dashboard/${eventKey}`);
                      }}
                      activeKey={params?.type}
                    >
                      <Tab eventKey="exclusive" title="Exclusive">
                        {pub_content?.map((curr, index) => {
                          return (
                            <Link to={`/Feeddetail/content/${curr._id}`} key={curr?._id}>
                              <DashBoardTabCards
                                imgcount={curr.image_count}
                                imgtab={
                                  curr?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media
                                    : curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content[0]?.media
                                      : curr.content[0]?.media_type === "audio" ? audioicsm
                                        : curr?.content[0]?.media_type === "doc" ? pdfic
                                          : ""
                                }
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                tabcarddata={curr.heading}
                                tabcard4={moment(curr?.createdAt).format(
                                  "hh:mm A, DD MMM YYYY"
                                )}
                                image_type={curr?.content[0]?.media_type}
                                // tabcard2={"2h:32m"}
                                feedIcon={
                                  curr?.content[0]?.media_type === "image"
                                    ? typeCam
                                    : curr?.content[0]?.media_type === "video"
                                      ? typeVideo
                                      : typeInterview
                                }
                                feedType={
                                  curr?.content[0]?.media_type === "image"
                                    ? "Photo"
                                    : curr?.content[0]?.media_type === "video"
                                      ? "Video"
                                      : "Audio"
                                }
                                tabcard3={
                                  " Buy £" +
                                  formatAmountInMillion(curr?.ask_price || 0)
                                }
                                tabcard5={curr?.hopper_id?.user_name}
                                imgtab1={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.hopper_id?.avatar_id?.avatar
                                }
                              />
                            </Link>
                          );
                        })}
                      </Tab>

                      <Tab eventKey="shared" title="Shared">
                        {pub_content?.slice(0, 2).map((curr, index) => {
                          return (
                            <Link to={`/Feeddetail/content/${curr._id}`} key={curr?._id}>
                              <DashBoardTabCards
                                imgcount={curr.image_count}
                                imgtab={
                                  curr?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media
                                    : curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content[0]?.media
                                      : curr.content[0]?.media_type === "audio" ? audioicsm
                                        : curr?.content[0]?.media_type === "doc" ? pdfic
                                          : ""
                                }
                                feedIcon={
                                  curr?.content[0]?.media_type === "image"
                                    ? typeCam
                                    : typeVideo
                                }
                                tabcarddata={curr.heading}
                                tabcard4={moment(curr?.createdAt)?.format(
                                  `hh:mm A, DD MMM YYYY`
                                )}
                                image_type={curr?.content[0]?.media_type}
                                // tabcard2={"2h:32m"}
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                feedType={
                                  curr?.content[0]?.media_type === "image"
                                    ? "Photo"
                                    : curr?.content[0]?.media_type === "video"
                                      ? "Video"
                                      : "Audio"
                                }
                                tabcard3={
                                  " Buy £" +
                                  formatAmountInMillion(curr?.ask_price || 0)
                                }
                                tabcard5={curr?.hopper_id?.user_name}
                                imgtab1={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.hopper_id?.avatar_id?.avatar
                                }
                              />
                            </Link>
                          );
                        })}
                      </Tab>

                      <Tab eventKey="discount" title="Special offers">
                        {pub_content?.map((curr, index) => {
                          return (
                            <Link to={`/Feeddetail/content/${curr._id}`} key={curr?._id}>
                              <DashBoardTabCards
                                imgcount={curr.image_count}
                                imgtab={
                                  curr?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media
                                    : curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content[0]?.media
                                      : curr.content[0]?.media_type === "audio" ? audioicsm
                                        : curr?.content[0]?.media_type === "doc" ? pdfic
                                          : ""
                                }
                                feedIcon={
                                  curr?.content[0]?.media_type === "image"
                                    ? typeCam
                                    : typeVideo
                                }
                                tabcarddata={curr.heading}
                                tabcard4={moment(curr?.createdAt)?.format(
                                  `hh:mm A, DD MMM YYYY`
                                )}
                                image_type={curr?.content[0]?.media_type}
                                // tabcard2={"2h:32m"}
                                lnkto={`/Feeddetail/content/${curr._id}`}
                                feedType={
                                  curr?.content[0]?.media_type === "image"
                                    ? "Photo"
                                    : curr?.content[0]?.media_type === "video"
                                      ? "Video"
                                      : "Audio"
                                }
                                tabcard3={
                                  " Buy £" +
                                  formatAmountInMillion(curr?.ask_price || 0)
                                }
                                tabcard5={curr?.hopper_id?.user_name}
                                imgtab1={
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.hopper_id?.avatar_id?.avatar
                                }
                                before_discount_value={
                                  curr?.before_discount_value || null
                                }
                              />
                            </Link>
                          );
                        })}
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
                <Col md={12} className="dash-tabs-wrap dash_pay">
                  <div className="dash-tabs pmnts_wrap">
                    <div className="card-heading sub_heading">
                      Payments to be Made
                    </div>
                    <Link
                      to="/accounts"
                      className="view-all-link"
                      onClick={localStorage.setItem(
                        "backBtnVisibility",
                        JSON.stringify("backBtn")
                      )}
                    >
                      View accounts
                      <BsArrowRight className="text-danger" />{" "}
                    </Link>
                    {pending_payment &&
                      pending_payment?.data?.slice(0, 2)?.map((curr) => {
                        return (
                          <Link to={`/auto-invoice/${curr?.id}`} key={curr?._id}>
                            <DashBoardPayment
                              imgtab={
                                curr?.content[0]?.media_type === "image" ? process.env.REACT_APP_CONTENT_MEDIA + curr?.content[0]?.media
                                  : curr?.content[0]?.media_type === "video" ? process.env.REACT_APP_THUMBNAIL + curr?.content[0]?.media
                                    : curr.content[0]?.media_type === "audio" ? audioicsm
                                      : curr?.content[0]?.media_type === "doc" ? pdfic
                                        : ""
                              }
                              imgtab1={
                                process.env.REACT_APP_AVATAR_IMAGE +
                                curr?.hopper_id?.avatar_id?.avatar
                              }
                              tabcarddata={curr?.heading}
                              tabcard3={curr?.hopper_id?.user_name}
                              paying={formatAmountInMillion(
                                pending_payment?.chatdata?.find(
                                  (el) => el?.image_id == curr?._id
                                )?.amount || 0
                              )}
                              tabcard2={moment(curr?.createdAt)?.format(
                                `hh:mm A, DD MMM YYYY`
                              )}
                              imageCount={curr?.image_count}
                              videoCount={curr?.video_count}
                              audioCount={curr?.audio_count}
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
                <Row>
                  <Col md={8} className="p-0">
                    <Card className="dash-top-cards ">
                      <Link to="/rating-and-review">
                        <CardContent className="dash-c-body rev rating_tp_crd">
                          <div className="tp_txt d-flex justify-content-between align-items-center">
                            <Typography
                              variant="body2"
                              className="review-txt card-head-txt mb-0"
                            >
                              Ratings & reviews
                              <br />
                            </Typography>
                            <div className="card-imgs-wrap">
                              <span
                                onClick={() => navigate("/rating-and-review")}
                              >
                                <BsArrowRight />
                              </span>
                            </div>
                          </div>
                          <div className="review-in d-flex">
                            <Typography
                              className="rating-txt mb-0"
                              gutterBottom
                            >
                              {rat_count?.avgRating !== undefined
                                ? Number.isInteger(rat_count.avgRating)
                                  ? rat_count?.avgRating?.toFixed(1)
                                  : rat_count.avgRating.toFixed(1)
                                : "0"}
                            </Typography>
                            <div className="ic-txt-wrap">
                              {/* <div className="star-icons d-flex">
                                <Rating
                                  initialValue={rat_count?.avgRating}
                                  readonly
                                  allowFraction={true}
                                />
                              </div> */}
                              <div className="star-rate d-flex gap-2">
                                {rat_count?.avgRating > 0 && (
                                  <>
                                    {Array.from(
                                      {
                                        length: Math.floor(
                                          rat_count?.avgRating
                                        ),
                                      },
                                      (_, i) => (
                                        <img src={star} alt={i} key={i} />
                                      )
                                    )}
                                    {hasDecimal(rat_count?.avgRating) ? (
                                      <img src={FillStar} alt="half_star" />
                                    ) : null}
                                  </>
                                )}
                              </div>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                                className="rating-count mb-0"
                              >
                                {receivedCount || 0} Reviews
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </Col>
                  <Col md={4} n className="p-0">
                    <Card className="dash-top-cards rt_crd p-0 add-br d-flex align-items-center justify-content-center">
                      <CardContent className="dash-c-body rev">
                        <div className="broadcast">
                          <Typography className="mb-3 text-center d-flex justify-content-center">
                            <span className="clickable" onClick={handleShow}>
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
                  <Col md={12} className="pe-0 list-card-wrap pt-0">
                    <Card className="dash-top-cards listing rt_crd rcnt_actvt mb-0 h-100">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
                          <Typography
                            variant="body2"
                            className="review-txt card-head-txt mb-0"
                          >
                            Recent activity
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
                            {openRecentActivity && (
                              <RecentActivityDF
                                active={recentActivityState}
                                setActive={setRecentActivityState}
                                handleCloseRecentActivity={() =>
                                  setOpenRecentActivity(false)
                                }
                                closeRecentActivity={handleCloseRecentActivity}
                                recentActivityValues={handleRecentActivityValue}
                              />
                            )}
                          </div>
                        </div>
                        <div className="scrolling">
                          {recentUploaded?.map((curr) => {
                            return (
                              <Link
                                to={`/Feeddetail/content/${curr?.content_id?._id}`}
                                key={curr._id}
                              >
                                <RecentActivityCard
                                  contentId={
                                    curr.hasOwnProperty("content_id")
                                      ? curr?.content_id?._id
                                      : curr?.task_id?._id
                                  }
                                  listcard1={
                                    curr.hasOwnProperty("content_id")
                                      ? curr?.content_id?.heading
                                      : curr?.task_id?.heading
                                  }
                                  listcard2={moment(
                                    curr?.content_id?.createdAt
                                  ).format("hh:mm A, DD MMM YYYY")}
                                  reviewType={
                                    curr.content_id?.content[0]
                                      ?.media_type === "audio"
                                      ? typeInterviewwt
                                      : curr.content_id?.content[0]
                                        ?.media_type === "image"
                                        ? contentCamera
                                        : contentVideo
                                  }
                                  imgtype={
                                    curr?.content_details?.content[0]
                                      ?.media_type
                                  }
                                  imgl={
                                    curr.hasOwnProperty("content_id")
                                      ? curr?.content_id?.content[0]
                                        ?.media_type === "video"
                                        ? process.env
                                          .REACT_APP_THUMBNAIL +
                                        curr?.content_id?.content[0]
                                          ?.media
                                        : curr?.content_id?.content[0]
                                          ?.media_type === "audio"
                                          ? audioicsm
                                          : curr?.content_id?.content[0]
                                            ?.media_type === "pdf"
                                            ? docsic
                                            : curr?.content_id?.content[0]
                                              ?.watermark ||
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.content_id?.content[0]
                                              ?.media
                                      : curr?.task_id?.content[0]?.media
                                  }
                                  imageCount={
                                    curr?.content_id?.content?.length || 0
                                  }
                                  colorWhite={false}
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="mt-4">
            <div className="topSearches_tipsCard">
              <Row>
                <Col lg={12} className="">
                  <Card className="dash-top-cards listing trending-search mt-0 mr-0 p-0">
                    <CardContent className="dash-c-body rev">
                      <div className="mb-3">
                        <h2 className="dashCard-heading p-0 mb-4">
                          Trending searches
                        </h2>
                        <div className="trendSearch_wrap mt-3">
                          {trading
                            ?.filter((el) => el._id !== "")
                            ?.slice(0, 7)
                            ?.map((curr) => (
                              <span key={curr._id}>
                                <Link to={`/content-search/${curr._id}`}>
                                  {capitalizeWord(curr?._id)}
                                </Link>
                              </span>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default Dashboard;
