import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import DashBoardCardList from "../component/card/DashBoardCardList";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import {
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
} from "react-icons/bs";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Form, Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import moment from "moment/moment";
import DbFooter from "../component/DbFooter";
import { MdOutlineWatchLater } from "react-icons/md";
import { Get, Patch, Post } from "../services/user.services";
import userimg1 from "../assets/images/userimages/usr1.png";
import docsic from "../assets/images/docsic.svg";
import audioic from "../assets/images/audimg.svg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from "../component/Loader";
import { Rating } from "react-simple-star-rating";
import reviewicn from "../assets/images/review-txt-icn.png";
import ContainerSorting from "../component/Sortfilters/containerSorting";
import { hasDecimal, successToasterFun } from "../component/commonFunction";
import star from "../assets/images/star.png";
import emptystar from "../assets/images/emptystar.svg";
// import StarBorderIcon from '@mui/icons-material/StarBorder';
import FillStar from "../assets/images/half_filled_star.png";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TestiImg from "../assets/images/testi-1.png";
import TestiImg1 from "../assets/images/testi-2.png";
import DailyTimes from "../assets/images/daily-times.png";
import Sun from "../assets/images/sun.png";
import BBC from "../assets/images/bbc.png";
import TestiImg2 from "../assets/images/testi-3.png";
import Recuirters from "../assets/images/Avatar11.png";
import SwiperCore, { Autoplay, Pagination } from "swiper";

const RatingReview = () => {
  const [loading, setLoading] = useState(false);
  const [receivedRating, setReceivedRating] = useState([]);
  const [sendedRating, setSendedRating] = useState([]);
  const [hopperList, setHopperList] = useState([]);
  const [data, setData] = useState([]);
  const [receivedCount, setReceivedCount] = useState();
  const [sendCount, setSendCount] = useState();
  const [averageRating, setAverageRating] = useState();
  const [averagePercentage, setAveragePercentage] = useState();
  const [ratingWithPercentageReceived, setRatingWithPercentageReceived] =
    useState();
  const [ratingWithPercentageSend, setRatingWithPercentageSend] = useState();
  const [task, setTask] = useState([]);

  // Payload for review with rating-
  const [payload, setPayload] = useState({
    hopper_id: "",
    rating: 0,
    type: [],
    review: "",
    sender_type: "",
    content_id: "",
    content_type: "",
  });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [rate, setRate] = useState({
    received: "",
    given: "",
  });

  // Sorting-
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [sortContainer, setSortContainer] = useState({
    type: `${query.get("type")}` || "",
    value: `${query.get("sort")}` || "",
    change: false,
  });

  const [containerSort, setContainerSort] = useState({
    typeOfContainer: "",
    valueOfContainer: "",
  });
  const [containerSort1, setContainerSort1] = useState({
    typeOfContainer: "",
    valueOfContainer: "",
  });

  // Handle change-
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  // Handle click-
  const handleClick = (type, value) => {
    // Check if the value already exists in the array

    if (type !== "type") {
      // If exists, remove it
      setPayload({
        ...payload,
        [type]: value,
      });
    } else if (payload[type].includes(value)) {
      // If exists, remove it
      setPayload({
        ...payload,
        [type]: payload[type].filter((item) => item !== value),
      });
    } else {
      // If not exists, add it
      setPayload({ ...payload, [type]: [...payload[type], value] });
    }
  };

  // Handle submit-
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await Patch("mediahouse/ratingforunratedcontent", {
        ...payload,
        type: payload.type.join(", "),
      });
      receivedRatingFromHopper();
      if (result.status === 200) {
        setPayload({
          hopper_id: "",
          rating: 0,
          type: [],
          review: "",
          sender_type: "",
          content_id: "",
          content_type: "",
        });
        successToasterFun("Thank you for submitting your review.");
        sendRatingFromHopper();
        setTask([]);
        setSelectedHopper(null);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const receivedRatingFromHopper = async () => {
    setLoading(true);
    try {
      const res = await Get(
        `mediahouse/allratedcontent?${containerSort1?.typeOfContainer}=${containerSort1?.valueOfContainer}&type=${containerSort1?.typeOfContainer}`
      );
      if (res) {
        setReceivedRating(res?.data?.allsendrating?.data);
        // setReceivedRating(res?.data?.allrecievedrating?.data);
        // setRatingWithPercentageReceived(res?.data?.allrecievedrating);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const sendRatingFromHopper = async () => {
    setLoading(true);
    try {
      const res = await Get(
        `mediahouse/allratedcontent?${containerSort1?.typeOfContainer}=${containerSort1?.valueOfContainer}&type=${containerSort1?.typeOfContainer}`
      );
      if (res) {
        setReceivedRating(res?.data?.allsendrating?.data);
        setRatingWithPercentageReceived(res?.data?.allsendrating);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendRatingFromHopper();
    receivedRatingFromHopper();
    HopperList();
    averageOfRating();
    ContentOnline();
  }, []);

  useEffect(() => {
    if (containerSort1?.typeOfContainer == "send") {
      receivedRatingFromHopper();
    }
  }, [containerSort1?.typeOfContainer, containerSort1?.valueOfContainer]);

  const receivedRatingFromHopper1 = async () => {
    setLoading(true);
    try {
      let res;
      if (
        sortContainer.type &&
        sortContainer.value &&
        sortContainer.type != "current"
      ) {
        res = await Get(
          `mediahouse/allratedcontent?type=${sortContainer.type}&${sortContainer.value}=${sortContainer.value}`
        );
        setSortContainer({ ...sortContainer, type: "" });
      } else if (
        !sortContainer.type &&
        !sortContainer.value &&
        sortContainer.type != "current"
      ) {
        res = await Get(`mediahouse/allratedcontent`);
      }
      if (res) {
        setReceivedCount(res?.data?.review_given_count);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    receivedRatingFromHopper1();
  }, [sortContainer.change]);

  // Content purchased online-
  const [contentPurchaseOnline, setContentPurchasedOnline] = useState(null);
  const ContentOnline = async () => {
    setLoading(true);
    try {
      let res;
      if (
        sortContainer.type &&
        sortContainer.value &&
        sortContainer.type != "current"
      ) {
        res = await Get(
          `mediahouse/contentonlineCard?type=${sortContainer.value}`
        );
        setSortContainer({ ...sortContainer, type: "" });
      } else if (
        !sortContainer.type &&
        !sortContainer.value &&
        sortContainer.type != "current"
      ) {
        res = await Get(`mediahouse/contentonlineCard`);
      }
      if (res) {
        setContentPurchasedOnline(res?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentOnline();
  }, [sortContainer.change]);

  const averageOfRating = async () => {
    setLoading(true);
    try {
      let res;
      if (sortContainer.type == "current") {
        res = await Get(
          `mediahouse/avgRating?${sortContainer.value}=${sortContainer.value}`
        );
      } else {
        res = await Get(`mediahouse/avgRating`);
      }
      if (res) {
        setAverageRating(res?.data?.data[0]);
        setAveragePercentage(res?.data);
        setSortContainer({ ...sortContainer, type: "" });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sortContainer.type === "current") {
      averageOfRating();
    }
  }, [sortContainer.change]);

  const HopperList = async () => {
    setLoading(true);
    try {
      const res = await Get(`mediahouse/listofHopperwithoutrating`);
      if (res) {
        setHopperList(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const ContentDetails = async (hopper_id) => {
    // console.log("hopper_id", hopper_id)
    setLoading(true);
    try {
      const obj = {};
      const res = await Get(
        `mediahouse/contentwithouthrating?hopper_id=${hopper_id}`
      );
      if (res.data) {
        setTask(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [selectedHopper, setSelectedHopper] = useState(null);
  const handleHopperSelect = (hopper) => {
    setSelectedHopper(hopper);
  };

  const [selectedCard, setSelectedCard] = useState(null);

  // Testimonial-
  const [testimonial, setTestimonial] = useState({
    rate: 0,
    features: [],
    description: "",
    data: [],
  });

  const handleFeatures = (val) => {
    if (testimonial?.features.includes(val)) {
      const data = testimonial?.features.filter((el) => el != val);
      setTestimonial({ ...testimonial, features: data });
    } else {
      setTestimonial({
        ...testimonial,
        features: [...testimonial.features, val],
      });
    }
  };

  const AddTestimonial = async () => {
    if (testimonial.rate == 0) {
      return;
    }
    try {
      setLoading(true);
      await Post("mediahouse/addTestimonial", testimonial);
      successToasterFun("Thank you for submitting your review.");
      setLoading(false);
      setTestimonial({
        ...testimonial,
        rate: 0,
        features: [],
        description: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTestimonial = async () => {
    try {
      setLoading(true);
      const result = await Get("mediahouse/getTestimonial");
      setTestimonial({ ...testimonial, data: result?.data?.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  console.log(testimonial);

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap rtng_page updated-rating-pge">
        <div className="">
          <Link onClick={() => history.back()} className="back_link mb-3">
            <BsArrowLeft className="text-pink" />
            Back
          </Link>
        </div>
        <Container fluid>
          <Row>
            <Col md={8} className="rating-dash">
              <Row className="dashboardStat_cards crd_edit_wrap">
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <div
                            className="edit_card_sel"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                            <div className="fltrs_prnt">
                              <Button
                                className="sort_btn"
                                onClick={() =>
                                  setSortContainer({
                                    ...sortContainer,
                                    type: "send",
                                  })
                                }
                              >
                                Sort
                                <BsChevronDown />
                              </Button>
                              {sortContainer.type == "send" ? (
                                <ContainerSorting
                                  width={true}
                                  setSortContainer={setSortContainer}
                                  sortContainer={sortContainer}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {receivedCount || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Total reviews received
                      </Typography>
                      <div className="content_stat">
                        {ratingWithPercentageReceived?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp />{" "}
                            {ratingWithPercentageReceived?.percentage?.toFixed(
                              2
                            )}{" "}
                            %
                          </span>
                        ) : ratingWithPercentageReceived?.type ===
                          "decrease" ? (
                          <span className="stat_down">
                            <BsArrowDown />{" "}
                            {ratingWithPercentageReceived?.percentage?.toFixed(
                              2
                            )}{" "}
                            %
                          </span>
                        ) : (
                          <span>{"No change "}</span>
                        )}
                        <span>vs yesterday</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {/* <img
                          className="card-img"
                          src={
                            process.env.REACT_APP_AVATAR_IMAGE +
                            curr?.from?.avatar_id?.avatar
                          }
                          alt="1"
                        /> */}
                        {receivedRating &&
                          receivedRating?.slice(0, 3)?.map((curr) => {
                            return (
                              <div>
                                {curr?.content_id?.content[0]?.media_type ===
                                "image" ? (
                                  <img
                                    className="card-img"
                                    src={
                                      curr?.content_id?.content[0]?.watermark
                                    }
                                    alt="content"
                                  />
                                ) : curr?.content_id?.content[0]?.media_type ===
                                  "video" ? (
                                  <img
                                    className="card-img"
                                    src={
                                      curr?.content_id?.content[0]?.watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content_id?.content[0]?.thumbnail
                                    }
                                    alt="content"
                                  />
                                ) : curr?.content_id?.content[0]?.media_type ===
                                  "audio" ? (
                                  <img
                                    className="card-img"
                                    src={audioic}
                                    alt="content"
                                  />
                                ) :curr?.from?.admin_detail?.admin_profile ? (
                                  <img
                                    className="card-img"
                                    src={
                                      curr?.from?.admin_detail?.admin_profile
                                    }
                                    alt="profile"
                                  />
                                ): (
                                  <img
                                    className="card-img"
                                    src={
                                      curr?.content_id?.content[0]?.watermark
                                    }
                                    alt="content"
                                  />
                                )}
                              </div>
                            );
                          })}
                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>
                <Col
                  md={4}
                  className="p-0 mb-0 clickable"
                  onClick={() =>
                    navigate("/dashboard-tables/content_purchased_online")
                  }
                >
                  <Card className="dash-top-cards crd_edit ">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
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
                            <div
                              className="fltrs_prnt"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                className="sort_btn"
                                onClick={() =>
                                  setSortContainer({
                                    ...sortContainer,
                                    type: "online",
                                  })
                                }
                              >
                                Sort
                                <BsChevronDown />
                              </Button>
                              {sortContainer.type == "online" ? (
                                <ContainerSorting
                                  width={true}
                                  setSortContainer={setSortContainer}
                                  sortContainer={sortContainer}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {contentPurchaseOnline?.count || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Content purchased online
                      </Typography>
                      <div className="content_stat">
                        {/* {ratingWithPercentageReceived?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp /> {(ratingWithPercentageSend?.percentage)?.toFixed(2)}{" "}
                            %
                          </span>
                        ) : ratingWithPercentageReceived?.type === "decrease" ? (
                          <span className="stat_down">
                            <BsArrowDown />{" "}
                            {(ratingWithPercentageSend?.percentage)?.toFixed(2)} %
                          </span>
                        ) : <span>{"No change "}</span>} */}
                        <span></span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {contentPurchaseOnline?.data?.map((curr) => {
                          return (
                            <img
                              className="card-img"
                              src={curr?.content_id?.content?.[0]?.watermark}
                              alt="1"
                            />
                          );
                        })}

                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>
                {/* <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <div className="edit_card_sel" onClick={(e) => e.stopPropagation()}>
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
                            <div className="fltrs_prnt">
                              <Button className="sort_btn" onClick={() => setSortContainer({ ...sortContainer, type: "current" })}>Sort<BsChevronDown /></Button>
                              {
                                sortContainer.type == "current" ? <ContainerSorting width={true} setSortContainer={setSortContainer} sortContainer={sortContainer} /> : null
                              }
                            </div>
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {(averageRating?.avgRating &&
                            Number(averageRating?.avgRating)?.toFixed(1)) || 0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Current rating
                      </Typography>
                      <div className="content_stat">
                        {averagePercentage?.type === "increase" ? (
                          <span className="stat_up">
                            <BsArrowUp />
                            {(averagePercentage?.percentage)?.toFixed(2)} %
                          </span>
                        ) : averagePercentage?.type === "decrease" ? (
                          <span className="stat_down">
                            <BsArrowDown />
                            {(averagePercentage?.percentage)?.toFixed(2)} %
                          </span>
                        ) : <span>{"No change "}</span>}
                        <span>vs last month</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {sendedRating &&
                          sendedRating.slice(0, 3).map((curr) => {
                            return (
                              <img
                                className="card-img"
                                src={
                                  curr?.to?.avatar_id?.avatar &&
                                  process.env.REACT_APP_AVATAR_IMAGE +
                                  curr?.to?.avatar_id?.avatar
                                }
                                alt="1"
                              />
                            );
                          })}

                        <span>
                          <BsArrowRight />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col> */}
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <div
                            className="edit_card_sel"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                            <div className="fltrs_prnt">
                              <Button
                                className="sort_btn"
                                onClick={() =>
                                  setSortContainer({
                                    ...sortContainer,
                                    type: "current",
                                  })
                                }
                              >
                                Sort
                                <BsChevronDown />
                              </Button>
                              {sortContainer.type == "current" ? (
                                <ContainerSorting
                                  width={true}
                                  setSortContainer={setSortContainer}
                                  sortContainer={sortContainer}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {(averageRating?.avgRating &&
                            Number(averageRating?.avgRating)?.toFixed(1)) ||
                            0}
                        </Typography>
                      </div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        className="cardContent_head"
                      >
                        Current rating
                      </Typography>
                      <div className="content_stat">
                        <span className="stat_up">
                          <BsArrowUp />
                          {averagePercentage?.percentage?.toFixed(2)} %
                        </span>
                        <span>increased</span>
                      </div>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="star-rating d-flex">
                        {averageRating?.avgRating > 0 && (
                          <>
                            {Array.from(
                              { length: Math.floor(averageRating?.avgRating) },
                              (_, i) => (
                                <img src={star} alt={i} key={i} />
                              )
                            )}
                            {hasDecimal(averageRating?.avgRating) ? (
                              <img src={FillStar} alt="half_star" />
                            ) : null}
                          </>
                        )}
                      </div>
                    </CardActions>
                  </Card>
                </Col>
              </Row>
              <Row className="me-1">
                <Col md={12} className="dash-tabs-wrap rtng_wrp_n pe-0">
                  <div className="dash-tabs pmnts_wrap">
                    <div className="card-heading no_border sub_heading">
                      Rate and review PressHop
                    </div>
                    <div className="rate_inner">
                      <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start pb-4">
                        <div className="cht_txt postedcmnt_info rating-update">
                          <p className="mb-0 msg auto_press_msg">
                            Please rate your experience with PressHop
                          </p>
                          <div className="usr_reviews">
                            <Rating
                              onClick={(val) =>
                                setTestimonial({ ...testimonial, rate: val })
                              }
                              initialValue={testimonial.rate}
                              allowFraction={true}
                            />

                            <p className="mb-0 msg auto_press_msg">
                              Please select the key features you liked about our
                              platform
                            </p>
                            <ul className="flex-wrap">
                              <li
                                onClick={() => handleFeatures("Experience")}
                                className={
                                  testimonial?.features.includes("Experience")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Experience
                              </li>
                              <li
                                onClick={() => handleFeatures("Easy to use")}
                                className={
                                  testimonial?.features.includes("Easy to use")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Easy to use
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures("Connectivity with Hoppers")
                                }
                                className={
                                  testimonial?.features.includes(
                                    "Connectivity with Hoppers"
                                  )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Connectivity with Hoppers
                              </li>
                              <li
                                onClick={() => handleFeatures("Pricing")}
                                className={
                                  testimonial?.features.includes("Pricing")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Pricing
                              </li>
                              <li
                                onClick={() => handleFeatures("Secure payment")}
                                className={
                                  testimonial?.features.includes(
                                    "Secure payment"
                                  )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Secure payment
                              </li>
                              <li
                                onClick={() => handleFeatures("Support")}
                                className={
                                  testimonial?.features.includes("Support")
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Support
                              </li>
                            </ul>
                            <div className="position-relative">
                              <div className="right_text_svg">
                                <svg
                                  width="22"
                                  height="21"
                                  viewBox="0 0 22 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_5392_68582)">
                                    <path
                                      d="M13.5472 5.87891H3.86719V6.71891H13.5472V5.87891Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M13.5472 8.40039H3.86719V9.24039H13.5472V8.40039Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M11.3472 10.9199H3.86719V11.7599H11.3472V10.9199Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M9.14719 13.4395H3.86719V14.2795H9.14719V13.4395Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M9.14719 15.9609H3.86719V16.8009H9.14719V15.9609Z"
                                      fill="#9DA3A3"
                                    />
                                    <path
                                      d="M17.0677 7.80604V3.60604L13.7298 0.419922H0.347656V20.5799H17.0677V13.1938L21.6498 8.81992L18.8277 6.12604L17.0677 7.80604ZM16.6277 9.4138L18.2055 10.9199L12.9255 15.9599H11.3477V14.4538L16.6277 9.4138ZM13.9877 1.8538L15.5655 3.35992H13.9877V1.8538ZM16.1877 19.7399H1.22766V1.25992H13.1077V4.19992H16.1877V8.64604L10.4677 14.106V16.7999H13.2898L16.1877 14.0338V19.7399ZM18.8277 10.326L17.2498 8.81992L18.8277 7.3138L20.4055 8.81992L18.8277 10.326Z"
                                      fill="#9DA3A3"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_5392_68582">
                                      <rect
                                        width="22"
                                        height="21"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Control
                                  placeholder="We hope you're enjoying your experience with PressHop. Please share your feedback with us. Your insights will help us enhance both your experience, and the quality of our service. Thank you"
                                  as="textarea"
                                  rows={3}
                                  onChange={(e) =>
                                    setTestimonial({
                                      ...testimonial,
                                      description: e.target.value,
                                    })
                                  }
                                  value={testimonial.description}
                                ></Form.Control>
                              </Form.Group>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                className="theme_btn"
                                onClick={() => AddTestimonial()}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="pt-3 testimonial-container">
                  <Col
                    md={12}
                    className="dash-tabs-wrap rtng_wrp_n pe-0 testimonial-section"
                  >
                    <div className="dash-tabs pmnts_wrap">
                      <div className="card-heading no_border sub_heading pb-0">
                        Testimonials
                      </div>
                      <p>
                        See what our satisfied customers have to say about
                        PressHop
                      </p>
                      <div className="mt-4 mb-4">
                        <Swiper
                          spaceBetween={50}
                          slidesPerView={3}
                          pagination={{ clickable: true }}
                          autoplay={{
                            delay: 3000, // 3 seconds delay between slides
                            disableOnInteraction: false, // Autoplay will not be disabled after user interactions (e.g., swiping)
                          }}
                        >
                          {testimonial?.data?.map((el, i) => (
                            <SwiperSlide key={i}>
                              <div class="rting-container">
                                <div className="position-relative">
                                  <div className="testi-img">
                                    <img
                                      src={
                                        el?.user_id?.admin_detail
                                          ?.admin_profile || TestiImg
                                      }
                                    />
                                  </div>
                                  <div className="testi-content d-flex gap-2">
                                    <div className="testi-logo">
                                      <img src={el?.user_id?.profile_image} />
                                    </div>
                                    <div className="cont-wrap">
                                      <h4>{el?.user_id?.company_name}</h4>
                                      <p>
                                        {el?.user_id?.full_name ||
                                          el?.user_id?.admin_detail?.full_name}
                                      </p>
                                      <div className="testi-star-rating d-flex gap-2">
                                        {el?.rate > 0 && (
                                          <>
                                            {Array.from(
                                              { length: Math.floor(el?.rate) },
                                              (_, i) => (
                                                <img
                                                  src={star}
                                                  alt={i}
                                                  key={i}
                                                />
                                              )
                                            )}
                                            {hasDecimal(el?.rate) ? (
                                              <img
                                                src={FillStar}
                                                alt="half_star"
                                              />
                                            ) : null}
                                          </>
                                        )}
                                        {/* <img src={star} alt="star" />
                                        <img src={star} alt="star" />
                                        <img src={star} alt="star" />
                                        <img src={FillStar} alt="half_star" /> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="overlay-bottom-slide">
                                  <div className="withText-testi">
                                    <span>PressHop Customer Review</span>
                                    <h3>
                                      “
                                      {el?.features?.length > 1
                                        ? `Impressed by the level of ${el?.features
                                            ?.slice(0, -1)
                                            ?.join(", ")
                                            ?.toLowerCase()} and ${el.features
                                            .slice(-1)
                                            .join("")
                                            ?.toLowerCase()} of content`
                                        : `Impressed by the level of ${el.features
                                            .slice(-1)
                                            .join("")
                                            ?.toLowerCase()} of content`}
                                    </h3>
                                    <p>{el?.description}“</p>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>

            <Col md={4} className="pe-0 rating-box">
              <div className="right-cards">
                <Row className="crd_edit_wrap rtng_lists">
                  <Col
                    md={12}
                    className="list-card-wrap broadcasted_uploads tsk_list_wrp pt-0 pe-0"
                  >
                    <Card className="listing mb-0 me-0 p-3 custm-list pe-0">
                      <CardContent className="dash-c-body rev">
                        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap me-3">
                          <Typography
                            variant="body2"
                            className="review-txt card-head-txt mb-0"
                          >
                            Ratings & reviews received
                          </Typography>
                          <div class="fltrs_prnt">
                            <button
                              type="button"
                              class="sort_btn btn btn-primary"
                              onClick={() => setShow(!show)}
                            >
                              Sort
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                ></path>
                              </svg>
                            </button>
                            {show && (
                              <div className="filterRatings">
                                <ul>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "5",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "4",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() =>
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "3",
                                        }))
                                      }
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "2",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "1",
                                        }));
                                        setShow(!show);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="scrolling">
                          {receivedRating?.map((curr, indx) => {
                            const vatProduct = curr?.content_id?.Vat?.find(
                              (el) =>
                                el.purchased_mediahouse_id ===
                                JSON.parse(localStorage.getItem("user"))?._id
                            );
                            if (indx == 108) {
                              console.log("hopperImagevalue", curr);
                            }
                            let hopperImage = "";
                            let ides = [];
                            if (curr.sender_type == "hopper") {
                              if (!curr.from) {
                                ides.push(curr._id);
                                console.log("allids", curr._id);
                              }
                              if (!curr?.from?.avatar_id?.avatar) {
                                ides.push(curr._id);
                                console.log("allidshasnoimage", curr._id);
                              }

                              hopperImage = `${process.env.REACT_APP_AVATAR_IMAGE}${curr?.from?.avatar_id?.avatar}`;
                              console.log("hopperImage", hopperImage);
                              console.log("hopperImage", indx);
                            }

                            if (curr.sender_type == "Mediahouse") {
                              if (!curr?.from?.admin_detail?.admin_profile) {
                                console.log(
                                  "allidshasnoprofileimage",
                                  curr._id
                                );
                                console.log("allidshasnoprofileimage", indx);
                              }

                              hopperImage = `${process.env.REACT_APP_AVATAR_IMAGE}${curr?.from?.avatar_id?.avatar}`;
                              console.log("hopperImage", hopperImage);
                              console.log("hopperImage", indx);
                            }

                            return (
                              <Card className="list-card rcnt_act_card review-crd">
                                <CardContent className="dash-c-body">
                                  <div className="list-in d-flex align-items-start gap-2">
                                    <div className="rateReview_content list-crd rating-pic">
                                      {/* {curr?.content_id?.content[0]
                                        ?.media_type === "image" ? (
                                        <img
                                          className="list-card-img"
                                          src={
                                            curr?.content_id?.content[0]
                                              ?.watermark
                                          }
                                          alt="content"
                                        />
                                      ) : curr?.content_id?.content[0]
                                        ?.media_type === "video" ? (
                                        <img
                                          className="list-card-img"
                                          src={
                                            curr?.content_id?.content[0]
                                              ?.watermark ||
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.content_id?.content[0]
                                              ?.thumbnail
                                          }
                                          alt="content"
                                        />
                                      ) : curr?.content_id?.content[0]
                                        ?.media_type === "audio" ? (
                                        <img
                                          className="list-card-img"
                                          src={audioic}
                                          alt="content"
                                        />
                                      ) : (
                                        <img
                                          className="list-card-img"
                                          src={
                                            curr?.content_id?.content[0]
                                              ?.watermark
                                          }
                                          alt="content"
                                        />
                                      )} */}
                                      {/* <button className="rating-btn">
                                        Paid <br />
                                        <strong>
                                          £{vatProduct?.amount || 0}
                                        </strong>{" "}
                                        (inc VAT)
                                      </button> */}
                                      <img
                                        className="list-card-img"
                                        src={
                                          curr.sender_type == "hopper"
                                            ? hopperImage
                                            : curr?.from?.admin_detail
                                                ?.admin_profile
                                        }
                                        alt="content"
                                      />
                                      <div className="rating-text">
                                        <p className="nme m-0">
                                          <b>
                                            {`${curr?.from?.first_name} ${curr?.from?.last_name}`}{" "}
                                          </b>
                                          {}
                                        </p>
                                        <p className="nme">London</p>
                                      </div>
                                      <span>
                                        <svg
                                          width="12"
                                          height="13"
                                          viewBox="0 0 12 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g opacity="0.8">
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M0.625 6.34375C0.625 3.37875 3.035 0.96875 6 0.96875C8.965 0.96875 11.375 3.37875 11.375 6.34375C11.375 9.30875 8.965 11.7188 6 11.7188C3.035 11.7188 0.625 9.30875 0.625 6.34375ZM1.375 6.34375C1.375 8.89375 3.45 10.9688 6 10.9688C8.55 10.9688 10.625 8.89375 10.625 6.34375C10.625 3.79375 8.55 1.71875 6 1.71875C3.45 1.71875 1.375 3.79375 1.375 6.34375Z"
                                              fill="black"
                                            />
                                            <path
                                              d="M7.66531 8.25461L6.11531 7.32961C5.73031 7.09961 5.44531 6.59461 5.44531 6.14961V4.09961C5.44531 3.89461 5.61531 3.72461 5.82031 3.72461C6.02531 3.72461 6.19531 3.89461 6.19531 4.09961V6.14961C6.19531 6.32961 6.34531 6.59461 6.50031 6.68461L8.05031 7.60961C8.23031 7.71461 8.28531 7.94461 8.18031 8.12461C8.10531 8.24461 7.98031 8.30961 7.85531 8.30961C7.79031 8.30961 7.72531 8.29461 7.66531 8.25461Z"
                                              fill="black"
                                            />
                                          </g>
                                        </svg>
                                        {moment(curr?.createdAt)?.format(
                                          "hh:mm a"
                                        )}
                                      </span>
                                      <span>
                                        <svg
                                          width="11"
                                          height="12"
                                          viewBox="0 0 11 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M2.44434 5.29297H3.66656V6.39297H2.44434V5.29297ZM2.44434 7.49297H3.66656V8.59297H2.44434V7.49297ZM4.88878 5.29297H6.111V6.39297H4.88878V5.29297ZM4.88878 7.49297H6.111V8.59297H4.88878V7.49297ZM7.33322 5.29297H8.55545V6.39297H7.33322V5.29297ZM7.33322 7.49297H8.55545V8.59297H7.33322V7.49297Z"
                                            fill="black"
                                          />
                                          <path
                                            d="M8.30556 1.44375V1.69375H8.55556H9.77778C10.3392 1.69375 10.75 2.0993 10.75 2.54375V10.2438C10.75 10.6882 10.3392 11.0938 9.77778 11.0938H1.22222C0.66081 11.0938 0.25 10.6882 0.25 10.2438V2.54375C0.25 2.0993 0.66081 1.69375 1.22222 1.69375H2.44444H2.69444V1.44375V0.59375H3.41667V1.44375V1.69375H3.66667H7.33333H7.58333V1.44375V0.59375H8.30556V1.44375ZM10.0278 3.64373L10.0278 3.39375H9.77778H1.22222H0.972222V3.64375V10.2438V10.4938H1.22222H9.77839H10.0284L10.0284 10.2437L10.0278 3.64373Z"
                                            stroke="black"
                                            stroke-width="0.5"
                                          />
                                        </svg>
                                        {moment(curr?.createdAt)?.format(
                                          "DD MMM YYYY"
                                        )}
                                      </span>
                                    </div>
                                    <div className="right-wrap rating-update ">
                                      <div className="list-in-txt mt-1 w-100 p-0">
                                        <div className="d-flex justify-content-between align-items-start gap-2">
                                          <div className="recuiter-img d-flex gap-2">
                                            <div className="recuirters-img">
                                              <img
                                                // src={curr?.from?.profile_image || hopperImage}
                                                src={
                                                  curr.sender_type == "hopper"
                                                    ? hopperImage
                                                    : curr?.from?.profile_image
                                                }
                                                alt="recuriters"
                                                width="32"
                                                height="32"
                                              />
                                            </div>
                                            <div className="recuter-cnt">
                                              <h2>
                                                {curr?.from?.company_name}
                                              </h2>
                                              <span>
                                                Customer Since{" "}
                                                {moment(
                                                  curr?.from?.createdAt
                                                ).format("MMM YYYY")}
                                              </span>
                                            </div>
                                          </div>
                                          {/* <span className="exclusive-txt">
                                            {vatProduct?.purchased_content_type ==
                                            "exclusive" ? (
                                              <svg
                                                width="20"
                                                height="14"
                                                viewBox="0 0 20 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M1.396 2.17292V9.79203C1.396 11.6511 3.17356 13.1686 5.35132 13.1686H14.658C17.0591 13.1686 18.6133 11.8418 18.6133 9.79203V2.17292C18.6133 1.98224 18.5854 1.87101 18.5574 1.80745C18.483 1.83923 18.3713 1.90279 18.2131 2.03786L15.8027 4.09557C15.1884 4.61993 14.1089 4.61993 13.5039 4.09557L10.1629 1.24337C10.0698 1.16392 9.92088 1.16392 9.83712 1.24337L6.50534 4.08763C5.8911 4.61199 4.81153 4.61199 4.2066 4.08763L1.79618 2.02991C1.63797 1.89485 1.51698 1.83129 1.45184 1.79951C1.42392 1.86307 1.396 1.98224 1.396 2.17292Z"
                                                  stroke="black"
                                                  stroke-width="1.4"
                                                />
                                              </svg>
                                            ) : (
                                              <svg
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14.696 8.76839C14.5125 7.04066 13.5798 5.47348 12.1426 4.47965C11.8827 4.29618 11.8215 3.94451 11.9973 3.68459C12.1808 3.42467 12.5401 3.36351 12.7924 3.53934C14.5048 4.72429 15.6057 6.58962 15.8274 8.64607C15.858 8.95951 15.6363 9.24237 15.3152 9.28059C15.3076 9.28059 15.2846 9.28059 15.2693 9.28059C14.9788 9.28059 14.7342 9.05889 14.696 8.76839Z"
                                                  fill="black"
                                                />
                                                <path
                                                  d="M2.11259 9.3195C1.79916 9.28128 1.56981 8.99842 1.60039 8.68499C1.8068 6.62853 2.90001 4.77084 4.58951 3.5706C4.84944 3.38713 5.20874 3.44829 5.39222 3.70821C5.57569 3.96814 5.51454 4.32744 5.25461 4.51092C3.83268 5.51239 2.9153 7.07957 2.73947 8.8073C2.71653 9.09781 2.46426 9.3195 2.17375 9.3195C2.15082 9.3195 2.13553 9.3195 2.11259 9.3195Z"
                                                  fill="black"
                                                />
                                                <path
                                                  d="M5.50673 15.8101C5.22387 15.6649 5.1092 15.3208 5.25445 15.038C5.3997 14.7551 5.74372 14.6404 6.02658 14.7857C7.67785 15.619 9.66551 15.6343 11.3321 14.8316C11.6149 14.694 11.9589 14.8163 12.0966 15.0991C12.2342 15.382 12.1118 15.726 11.829 15.8636C10.8505 16.3376 9.81076 16.5746 8.72519 16.5746C7.59376 16.5746 6.51584 16.3147 5.50673 15.8101Z"
                                                  fill="black"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M6.02637 3.04237C6.02637 1.55163 7.23425 0.34375 8.72499 0.34375C10.2157 0.34375 11.4236 1.55163 11.4236 3.04237C11.4236 4.53311 10.2081 5.74099 8.72499 5.74099C7.23425 5.74099 6.02637 4.53311 6.02637 3.04237ZM7.17309 3.05001C7.17309 3.90623 7.86877 4.60191 8.72499 4.60191C9.58121 4.60191 10.2769 3.90623 10.2769 3.05001C10.2769 2.19379 9.57356 1.49812 8.72499 1.49812C7.86877 1.49812 7.17309 2.19379 7.17309 3.05001Z"
                                                  fill="black"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M0.5 12.392C0.5 10.9089 1.70788 9.69336 3.19862 9.69336C4.68936 9.69336 5.89724 10.9012 5.89724 12.392C5.89724 13.8751 4.68936 15.0906 3.19862 15.0906C1.70788 15.0906 0.5 13.8827 0.5 12.392ZM1.64672 12.392C1.64672 13.2482 2.3424 13.9439 3.19862 13.9439C4.05484 13.9439 4.75052 13.2482 4.75052 12.392C4.75052 11.5358 4.05484 10.8401 3.19862 10.8401C2.3424 10.8401 1.64672 11.5358 1.64672 12.392Z"
                                                  fill="black"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M11.4629 12.392C11.4629 10.9089 12.6708 9.69336 14.1615 9.69336C15.6522 9.69336 16.8601 10.9012 16.8601 12.392C16.8525 13.8751 15.6446 15.0906 14.1615 15.0906C12.6708 15.0906 11.4629 13.8827 11.4629 12.392ZM12.6096 12.392C12.6096 13.2482 13.3053 13.9439 14.1615 13.9439C15.0177 13.9439 15.7134 13.2482 15.7134 12.392C15.7058 11.5358 15.0177 10.8401 14.1615 10.8401C13.3053 10.8401 12.6096 11.5358 12.6096 12.392Z"
                                                  fill="black"
                                                />
                                              </svg>
                                            )}
                                            {vatProduct?.purchased_content_type ==
                                            "shared"
                                              ? "SHARED"
                                              : "EXCLUSIVE"}
                                          </span> */}
                                          <div className="rtng_dn d-flex justify-content-between align-items-center">
                                            <div className="rtng_strs_wrp d-flex align-items-center">
                                              <p className="mb-0 rtng_txt me-1">
                                                {curr?.hasOwnProperty("rating")
                                                  ? curr?.rating
                                                  : 0}
                                              </p>
                                              {/* {curr?.hasOwnProperty("rating")
                                                ? [
                                                    ...Array(
                                                      Math.floor(+curr?.rating)
                                                    ),
                                                  ].map((_, index) => (
                                                    <AiFillStar
                                                      key={index}
                                                      className={
                                                        index < curr?.rating
                                                          ? "filled-star"
                                                          : "empty-star"
                                                      }
                                                    />
                                                  ))
                                                : 0} */}
                                              <div className="star-rating d-flex justify-content-center align-items-center">
                                                {curr?.rating > 0 && (
                                                  <>
                                                    {Array.from(
                                                      {
                                                        length: Math.floor(
                                                          curr?.rating
                                                        ),
                                                      },
                                                      (_, i) => (
                                                        <img
                                                          src={star}
                                                          alt={i}
                                                          key={i}
                                                        />
                                                      )
                                                    )}
                                                    {hasDecimal(
                                                      curr?.rating
                                                    ) ? (
                                                      <img
                                                        src={FillStar}
                                                        alt="half_star"
                                                      />
                                                    ) : null}

                                                    {Array.from(
                                                      {
                                                        length: Math.floor(
                                                          5 - curr?.rating
                                                        ),
                                                      },
                                                      (_, i) => (
                                                        // <img
                                                        //   src={emptystar}
                                                        //   alt={i}
                                                        //   key={i}
                                                        // />
                                                        // <i class="bi bi-star"></i>
                                                        <i className="bi bi-star small-icon light-icon"></i>
                                                      )
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rting-tabs">
                                        <ul class="flex-wrap">
                                          {curr?.features?.map((el) => (
                                            <li class="clickable" key={el}>
                                              {el}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div class="position-relative rating-textbox">
                                        {/* <div class="right_text_svg">
                                          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_5392_68861)">
                                              <path d="M8.62094 4.26367H2.46094V4.82367H8.62094V4.26367Z" fill="black" />
                                              <path d="M8.62094 5.94336H2.46094V6.50336H8.62094V5.94336Z" fill="black" />
                                              <path d="M7.22094 7.62305H2.46094V8.18305H7.22094V7.62305Z" fill="black" />
                                              <path d="M5.82094 9.30273H2.46094V9.86273H5.82094V9.30273Z" fill="black" />
                                              <path d="M5.82094 10.9824H2.46094V11.5424H5.82094V10.9824Z" fill="black" />
                                              <path d="M10.8617 5.54713V2.74713L8.7376 0.623047H0.22168V14.063H10.8617V9.13897L13.7776 6.22305L11.9817 4.42713L10.8617 5.54713ZM10.5817 6.61897L11.5858 7.62305L8.22576 10.983H7.22168V9.97897L10.5817 6.61897ZM8.90168 1.57897L9.90576 2.58305H8.90168V1.57897ZM10.3017 13.503H0.78168V1.18305H8.34168V3.14305H10.3017V6.10713L6.66168 9.74713V11.543H8.4576L10.3017 9.69897V13.503ZM11.9817 7.22713L10.9776 6.22305L11.9817 5.21897L12.9858 6.22305L11.9817 7.22713Z" fill="black" />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_5392_68861">
                                                <rect width="14" height="14" fill="white" transform="translate(0 0.34375)" />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </div> */}
                                        <div class="mb-3">
                                          <span style={{ fontSize: "13px" }}>
                                            {curr?.review}
                                          </span>
                                          {/* <textarea
                                            value={curr?.review}
                                            rows="3"
                                            id="exampleForm.ControlTextarea1"
                                            class="form-control"
                                          ></textarea> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                  {/* <Col
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
                            Ratings & reviews given
                          </Typography>
                          <div class="fltrs_prnt">
                            <button
                              type="button"
                              class="sort_btn btn btn-primary"
                              onClick={() => setShow1(!show1)}
                            >
                              Sort
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                ></path>
                              </svg>
                            </button>
                            {show1 && (
                              <div className="filterRatings">
                                <ul>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "5",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "4",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "3",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "2",
                                        }));
                                        setShow1(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                  <li>
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      onClick={() => {
                                        setContainerSort1((pre) => ({
                                          ...pre,
                                          typeOfContainer: "send",
                                          valueOfContainer: "1",
                                        }));
                                        setShow(!show1);
                                      }}
                                    >
                                      <AiFillStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                      <AiOutlineStar />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="scrolling">
                          {sendedRating &&
                            sendedRating?.map((curr) => {
                              return (
                                <Card className="list-card rcnt_act_card">
                                  <CardContent className="dash-c-body">
                                    <div className="list-in d-flex align-items-start">
                                      <div className="rateReview_content">
                                        <img
                                          className="list-card-img"
                                          src={curr?.from?.profile_image}
                                          alt="content"
                                        />
                                      </div>
                                      <div className="list-in-txt mt-1 w-100">
                                        <Typography
                                          variant="body2"
                                          className="list-car-txt mb-2"
                                        >
                                          {curr?.review}
                                          <br />
                                        </Typography>
                                        <div className="rtng_dn d-flex justify-content-between align-items-center">
                                          <Typography
                                            sx={{ fontSize: 12 }}
                                            color="#9DA3A3"
                                            gutterBottom
                                            className="crd_time d-flex align-items-center mb-0 txt_mdm"
                                          >
                                            <MdOutlineWatchLater color="#000" />
                                            {moment(curr?.updatedAt).format(
                                              `hh:mm A, DD MMM YYYY `
                                            )}
                                          </Typography>
                                          <div className="rtng_strs_wrp d-flex align-items-center">
                                            <p className="mb-0 rtng_txt me-1">
                                              {curr?.rating}
                                            </p>
                                            {[...Array(+(curr?.rating) || 0)]?.map(
                                              (_, index) => (
                                                <AiFillStar
                                                  key={index}
                                                  className={
                                                    index < curr?.rating
                                                      ? "filled-star"
                                                      : "empty-star"
                                                  }
                                                />
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  </Col> */}
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

export default RatingReview;
