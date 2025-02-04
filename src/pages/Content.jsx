import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'
import { Link, useNavigate, useParams } from "react-router-dom";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import exclusive from "../assets/images/exclusive.png";
import typeShare from "../assets/images/share.png";
import typeCam from "../assets/images/typeCam.svg";
import typeVideo from "../assets/images/typeVideo.svg";
import Header from "../component/Header";
import DashBoardSortCard from "../component/card/DashBoardSortCard";
import DashBoardTabCards from "../component/card/DashBoardTabCards";
// import audioic from "../assets/images/audio-icon.svg";
import typeInterviewwt from "../assets/images/typeinterview-wt.svg";

import {
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import {
  BsArrowDown,
  BsArrowRight,
  BsArrowUp,
  BsChevronDown,
} from "react-icons/bs";
import favouritedic from "../assets/images/favouritestar.svg";
import favic from "../assets/images/star.svg";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
//new//

import typestar from "../assets/images/sortIcons/star.svg";
// import imgSortTab1 from "../assets/images/ImgSortTab1.svg";
import DbFooter from "../component/DbFooter";

// import DbFooter from '../component/DbFooter';
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import audioic from "../assets/images/audimg.svg";
import audioicsm from "../assets/images/audimgsmall.svg";
import typeInterview from "../assets/images/interview.svg";
import sharedic from "../assets/images/shared.svg";
import Loader from "../component/Loader";
import NewContentPurchasedOnline from "../component/Sortfilters/Content/NewContentPurchasedOnlne";
import NewFavourite from "../component/Sortfilters/Content/NewFavourite";
import NewFundsInvested from "../component/Sortfilters/Content/NewFundsInvested";
import { Get, Post } from "../services/user.services";
import AddBroadcastTask from "./AddBroadcastTask";
import { formatAmountInMillion } from "../component/commonFunction";
import PostIconsWrapper from "../component/PostIconComponents/PostIconsWrapper";
//const socket = io.connect("https://betazone.promaticstechnologies.com:3005");

const ContentPage = () => {
  const [show, setShow] = useState(false);

  const [fav_content, setFav_Content] = useState([]);
  console.log("🚀 ~ ContentPage ~ fav_content:", fav_content)
  const [pub_content, setPub_Content] = useState([]);
  console.log("🚀 ~ ContentPage ~ pub_content:", pub_content)
  const [pur_content, setPur_content] = useState([]);
  const [Upload_content, setUpload_content] = useState([]);
  console.log("🚀 ~ ContentPage ~ Upload_content:", Upload_content)
  const [content_count, setContent_count] = useState();
  const [type, setType] = useState("exclusive");
  const [loading, setLoading] = useState(false);
  const [underOfferContent, setUnderOfferContent] = useState([]);
  const [content_sourced, setContent_Sourced] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  // state for filteration related to - daily latest relevence
  const [dlrFilter, setDLRFilter] = useState({ name: "", value: "" });

  const dlrFilterHndleChange = (e) => {
    const { name, value } = e.target;
    setDLRFilter({ ...dlrFilter, name, value });
  };

  // Content Purchased-
  const [openContentPuchased, setOpenContentPuchased] = useState(false);
  const [contentPurchaseState, setContentPurchaseState] = useState("");
  const handleCloseContentPurchased = (values) => {
    setOpenContentPuchased(values);
  };

  // open and close sort component-
  const [openSortComponent, setOpenSortComponent] = useState(false);
  const handleCloseSortComponent = (values) => {
    setOpenSortComponent(values);
  };

  const [favTimeValues, setFavTimeValues] = useState();

  // Content Sourced -
  const [openContentSourced, setOpenContentSourced] = useState(false);
  const handleCloseContentSourced = (values) => {
    setOpenContentSourced(values);
  };

  // Fav compoenent-
  const [favouriteComponentState, setFavouriteComponentState] = useState("");
  const [openFavComponent, setOpenFavComponent] = useState(false);
  const handleCloseFavComponent = (values) => {
    setOpenFavComponent(values);
  };
  const [fundsInvtestedState, setfundsInvtestedState] = useState("");

  const Navigate = (type) => {
    navigate(`/content-tables/${type}`);
  };

  const [discount, setDiscount] = useState([]);
  console.log("🚀 ~ ContentPage ~ discount:", discount)
  const getUnderOffer = async () => {
    try {
      const obj = {
        limit: 6,
        offset: 0,
      };
      const res = await Post(`mediahouse/dashboard/Count`, obj);
      setUnderOfferContent(res?.data?.content_under_offer.newdata);

      const res1 = await Post("mediaHouse/view/published/content", {
        isDiscount: true,
        limit: 6,
      });
      setDiscount(res1.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const [ userId, setUserId ] = useState(null);
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
  const ContentSourced = async () => {
    const resp = await Get(`mediahouse/getlistoduploadedcontent`);
    setContent_Sourced(resp.data.response);
  };

  useEffect(() => {
    getUnderOffer();
    ContentSourced();
    window.scrollTo(0, 0);
  }, []);

  const handleShow = () => {
    return setShow(!show);
  };

  const PublishedContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/view/published/content");

      console.log("myres", resp);
      setPub_Content(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  const PurchasedContent = async () => {
    const payload = {
      limit: 2,
      type: params?.tab1,
    };

    setLoading(true);

    try {
      setType(type);
      const resp = await Post(`mediaHouse/purchasedContentTypeWise`, payload);
      setPur_content(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  const FavouriteContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/favourites", {
        [favTimeValues]: favTimeValues,
      });
      // console.log(resp, "<-------resp")
      setFav_Content(resp.data.response.response);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  const UploadedContent = async () => {
    setLoading(true);

    try {
      const resp = await Get("mediaHouse/getuploadedContentbyHoppers");
      setUpload_content(resp.data.data);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  // =============>
  // Sorting-
  const [sortingField, setSortingField] = useState("");
  const [sortingValue, setSortingValue] = useState("");
  const [sortingType, setSortingType] = useState("");

  // content purchased online-
  const newContentPurchasedValueHandler = (value) => {
    setSortingField(value.field);
    setSortingValue(value.values);
    setSortingType(value.type);
  };

  // fav sort handler-
  const favTimeValuesHandler = (value) => {
    setSortingField(value.field);
    setSortingValue(value.values);
    setSortingType(value.type);
  };
  // funds sort handler-
  const fundsInvestedHandler = (value) => {
    setSortingField(value.field);
    setSortingValue(value.values);
    setSortingType(value.type);
  };

  const ContentCount = async () => {
    setLoading(true);

    try {
      const resp = await Get(
        `mediaHouse/Content/Count?${sortingField && sortingField}=${
          sortingValue && sortingValue
        }`
      );
      if (resp) {
        setContent_count(resp.data);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error)
      setLoading(false);
    }
  };

  useEffect(() => {
    // socket.disconnect()
    FavouriteContent();
    PublishedContent();
    UploadedContent();
    PurchasedContent();
    ContentCount();

    // getUnderOffer()
  }, [sortingValue, sortingType, params?.tab1]);

  const [favContent, setFavContent] = useState(null);
  const FavContent = async () => {
    try {
      let resp;
      if (favouriteComponentState) {
        resp = await Post("mediaHouse/favourites", {
          [favouriteComponentState]: favouriteComponentState,
        });
      } else {
        resp = await Post("mediaHouse/favourites");
      }
      setFavContent(resp?.data?.response?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FavContent();
  }, [favouriteComponentState]);

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
  console.log("content_countttt", content_count);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap">
        <Container fluid>
          <Row>
            <Col md={8}>
              <Row className="dashboardStat_cards crd_edit_wrap">
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit p-cursor">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel widthRed">
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
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenContentPuchased(true);
                              }}
                            >
                              Sort
                              <BsChevronDown />
                            </button>
                            {openContentPuchased && (
                              <NewContentPurchasedOnline
                                setActive={setContentPurchaseState}
                                active={contentPurchaseState}
                                closeContPurchased={handleCloseContentPurchased}
                                contentPurchasedSortFilterValues={
                                  newContentPurchasedValueHandler
                                }
                              />
                            )}
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {content_count?.content_online?.count || 0}
                        </Typography>
                      </div>
                      <Link to="/dashboard-tables/content_purchased_online">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Content purchased online
                        </Typography>
                        {/* <div className="content_stat">
                          <span className={content_count?.content_online?.type === "increase" ? 'stat_up' : 'stat_down'}>{content_count?.content_online?.type === "increase" ? <BsArrowUp /> : <BsArrowDown />} {content_count?.content_online?.percent ? Math.round(content_count?.content_online?.percent) : 0}%</span>
                          <span>vs yesterday</span>
                        </div> */}
                      </Link>
                    </CardContent>

                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {content_count?.content_online?.task &&
                          content_count?.content_online?.task
                            .slice(0, 3)
                            .map((curr) => {
                              const Content =
                                curr?.content_id && curr.content_id.content[0]
                                  ? curr.content_id.content[0].media_type ===
                                    "video"
                                    ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content_id.content[0].thumbnail
                                    : curr.content_id.content[0].media_type ===
                                      "audio"
                                    ? audioicsm
                                    : process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content_id.content[0].media
                                  : null;
                              return <img src={Content} className="card-img" />;
                            })}
                        <span>
                          <BsArrowRight
                            onClick={() =>
                              navigate(
                                "/dashboard-tables/content_purchased_online"
                              )
                            }
                          />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>

                <Col md={4} className="p-0 mb-0">
                  <Card
                    className="dash-top-cards crd_edit p-cursor"
                    onClick={() =>
                      navigate("/content-tables/content_sourced_from_task")
                    }
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
                          {content_count?.sourced_content_from_tasks?.count ||
                            0}
                        </Typography>
                      </div>
                      <Link to="/content-tables/content_sourced_from_task">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Content purchased from tasks
                        </Typography>
                        {/* <div className="content_stat">
                          {
                            content_count?.sourced_content_from_tasks?.type === "increase" ?
                              <span className='stat_up'><BsArrowUp /> {content_count?.sourced_content_from_tasks?.percentage}%</span> :
                              <span className='stat_down'><BsArrowDown /> {content_count?.sourced_content_from_tasks?.percentage}%</span>
                          }
                          <span>vs last month</span>
                        </div> */}
                      </Link>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <div className="card-imgs-wrap">
                        {content_count?.sourced_content_from_tasks?.task &&
                          content_count?.sourced_content_from_tasks?.task
                            .slice(0, 3)
                            .map((curr) => {
                              const Content =
                                curr.type == "image"
                                  ? curr?.videothubnail ||
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.imageAndVideo
                                  : curr.type == "video"
                                  ? curr?.videothubnail ||
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.imageAndVideo
                                  : audioic;
                              return <img src={Content} className="card-img" />;
                            })}
                        <span>
                          <BsArrowRight
                            onClick={() =>
                              Navigate("content_sourced_from_task")
                            }
                          />
                        </span>
                      </div>
                    </CardActions>
                  </Card>
                </Col>

                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit p-cursor">
                    <CardContent className="dash-c-body">
                      <div className="cardCustomHead">
                        <div className="edit_card_sel">
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenFavComponent(true);
                              }}
                            >
                              Sort <BsChevronDown />
                            </button>
                            {openFavComponent && (
                              <NewFavourite
                                setActive={setFavouriteComponentState}
                                active={favouriteComponentState}
                                favouriteSortValues={favTimeValuesHandler}
                                closeFav={handleCloseFavComponent}
                              />
                            )}
                          </div>
                        </div>

                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          {favContent?.length || 0}
                        </Typography>
                      </div>

                      <Link to="/Favourited-Content">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Favourited content
                        </Typography>
                        {/* <div className="content_stat">
                          <span className={content_count?.favourite_Content?.type === "increase" ? 'stat_up' : 'stat_down'}>{content_count?.favourite_Content?.type === "increase" ? <BsArrowUp /> : <BsArrowDown />} {content_count?.favourite_Content?.percent ? Math.round(content_count?.favourite_Content?.percent) : 0}%</span>
                          <span>vs last quarter</span>
                        </div> */}
                      </Link>
                    </CardContent>

                    <CardActions className="dash-c-foot">
                      <Link to="/Favourited-Content">
                        <div className="card-imgs-wrap">
                          {favContent &&
                            favContent?.slice(0, 3).map((curr) => {
                              const Content = curr.content_id.content[0]
                                ? curr.content_id.content[0].media_type ===
                                  "video"
                                  ? curr.content_id.content[0].watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content_id.content[0].thumbnail
                                  : curr.content_id.content[0].media_type ===
                                    "audio"
                                  ? audioic
                                  : curr.content_id.content[0].media_type ===
                                    "pdf"
                                  ? docsic
                                  : curr.content_id.content[0].watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content_id.content[0].media
                                : null;
                              return <img src={Content} className="card-img" />;
                            })}
                          <span>
                            <Link to="/Favourited-Content">
                              <BsArrowRight />
                            </Link>
                          </span>
                        </div>
                      </Link>
                    </CardActions>
                  </Card>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit p-cursor">
                    <Link to="/content-tables/fund_invested_today">
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
                            £
                            {formatAmountInMillion(
                              content_count?.today_fund_invested?.count || 0
                            )}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Funds invested today (inc VAT)
                        </Typography>
                        {/* <div className="content_stat">
                          <span className={content_count?.today_fund_invested?.type === "increase" ? 'stat_up' : 'stat_down'}>{content_count?.today_fund_invested?.type === "increase" ? <BsArrowUp /> : <BsArrowDown />} {content_count?.today_fund_invested?.percent ? Math.round(content_count?.today_fund_invested?.percent) : 0}%</span>
                          <span>vs yesterday</span>
                        </div> */}
                      </CardContent>
                      <CardActions className="dash-c-foot">
                        <Link to="/content-tables/fund_invested_today">
                          <div className="card-imgs-wrap">
                            {content_count?.today_fund_invested?.task
                              ?.slice(0, 3)
                              ?.map((curr) => {
                                const Content = curr.content[0]
                                  ? curr.content[0].media_type === "video"
                                    ? curr.content[0].watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                        curr.content[0].thumbnail
                                    : curr.content[0].media_type === "audio"
                                    ? audioic
                                    : curr.content[0].media_type === "pdf"
                                    ? docsic
                                    : curr.content[0].watermark ||
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                        curr.content[0].media
                                  : null;
                                return (
                                  <img src={Content} className="card-img" />
                                );
                              })}
                            <span>
                              <Link to="/content-tables/fund_invested_today">
                                <BsArrowRight />
                              </Link>
                            </span>
                          </div>
                        </Link>
                      </CardActions>
                    </Link>
                  </Card>
                </Col>
                <Col md={4} className="p-0 mb-0">
                  <Card className="dash-top-cards crd_edit p-cursor">
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
                          <div className="fltrs_prnt">
                            <button
                              className="sortTrigger"
                              onClick={() => {
                                setOpenSortComponent(true);
                              }}
                            >
                              Sort <BsChevronDown />
                            </button>
                            {openSortComponent && (
                              <NewFundsInvested
                                active={fundsInvtestedState}
                                setActive={setfundsInvtestedState}
                                fundsValues={fundsInvestedHandler}
                                closeSortComponent={handleCloseSortComponent}
                              />
                            )}
                          </div>
                        </div>
                        <Typography
                          variant="body2"
                          className="card-head-txt mb-2"
                        >
                          £
                          {formatAmountInMillion(
                            content_count?.total_fund_invested?.count || 0
                          )}
                        </Typography>
                      </div>
                      <Link to="/content-tables/total_fund_invested">
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Total funds invested (inc VAT){" "}
                        </Typography>
                      </Link>
                    </CardContent>
                    <CardActions className="dash-c-foot">
                      <Link to="/content-tables/total_fund_invested">
                        <div className="card-imgs-wrap">
                          {content_count?.total_fund_invested?.total_for_content
                            ?.sort(
                              (a, b) =>
                                new Date(b.updatedAt) - new Date(a.updatedAt)
                            )
                            ?.slice(0, 3)
                            ?.map((curr) => {
                              const Content = curr.content[0]
                                ? curr.content[0].media_type === "video"
                                  ? curr.content[0].watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content[0].thumbnail
                                  : curr.content[0].media_type === "audio"
                                  ? audioic
                                  : curr.content[0].media_type === "pdf"
                                  ? docsic
                                  : curr.content[0].watermark ||
                                    process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content[0].media
                                : null;
                              return <img src={Content} className="card-img" />;
                            })}
                          <span>
                            <Link to="/content-tables/total_fund_invested">
                              <BsArrowRight />
                            </Link>
                          </span>
                        </div>
                      </Link>
                    </CardActions>
                    {console.log(
                      "content_count?.total_fund_invested",
                      content_count?.total_fund_invested
                    )}
                  </Card>
                </Col>
                <Col md={4} className="mb-0 p-0">
                  <Card className="dash-top-cards crd_edit p-cursor">
                    <Link to="/Content-Under-Offer">
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
                            {content_count?.content_under_offer?.count || 0}
                          </Typography>
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                          className="cardContent_head"
                        >
                          Content under offer
                        </Typography>
                        {/* <div className="content_stat">
                          <span className='stat_up'><BsArrowUp /> 8%</span>
                          <span>vs yesterday</span>
                        </div> */}
                      </CardContent>

                      <CardActions className="dash-c-foot">
                        <div className="card-imgs-wrap">
                          {content_count?.content_under_offer?.task &&
                            content_count?.content_under_offer?.task
                              .slice(0, 3)
                              .map((curr) => {
                                const Content =
                                  curr.content[0]?.media_type == "image"
                                    ? process.env.REACT_APP_CONTENT_MEDIA +
                                      curr.content[0]?.media
                                    : audioicsm;
                                return (
                                  <img src={Content} className="card-img" />
                                );
                              })}
                          <span>
                            <BsArrowRight
                            // onClick={() => Navigate("/Content-Under-Offer")}
                            />
                          </span>
                        </div>
                      </CardActions>
                    </Link>
                  </Card>
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
                        {pur_content?.slice(0, 2)?.map((item, index) => {
                              return (
                                <Link
                                  to={`/purchased-content-detail/${item?.transaction_id}`}
                                  key={item._id}
                                >
                                  <DashBoardTabCards
                                    imgcount={item.image_count}
                                    // hopper_id
                                    tabcard5={item?.hopper_id?.user_name}
                                    imgtab1={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      item?.hopper_id?.avatar_id?.avatar
                                    }
                                    imgtab={
                                      item?.content[0]?.media_type === "video"
                                        ? item?.content[0]?.watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA +
                                            item?.content[0]?.thumbnail
                                        : item?.content[0]?.media_type ===
                                          "audio"
                                        ? audioic
                                        : item?.content[0]?.watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA +
                                            item?.content[0]?.media
                                    }
                                    tabcarddata={item?.heading}
                                    tabcard2={moment(item?.createdAt).format(
                                      "hh:mm A, DD MMM YYYY"
                                    )}
                                    feedIcon={
                                      item.content[0].media_type === "image"
                                        ? typeCam
                                        : item.content[0].media_type === "video"
                                        ? typeVideo
                                        : typeInterview
                                    }
                                    feedType={
                                      item?.content[0]?.media_type === "image"
                                        ? "Photo"
                                        : item?.content[0]?.media_type ===
                                          "video"
                                        ? "Video"
                                        : "Audio"
                                    }
                                    tabcard3={`£${
                                      formatAmountInMillion(
                                        +item?.Vat?.find(
                                          (el) =>
                                            el?.purchased_mediahouse_id == userId
                                        )?.amount
                                      ) || 0
                                    }`}
                                  />
                                </Link>
                              );
                            })}
                      </Tab>
                      {
                        console.log("userId", userId)
                      }
                      <Tab eventKey="shared" title="Shared">
                        {pur_content
                            ?.slice(0, 2)
                            .map((item, index) => {
                              return (
                                <Link
                                  to={`/purchased-content-detail/${item?.transaction_id}`}
                                >
                                  <DashBoardTabCards
                                    imgcount={item.image_count}
                                    imgtab={
                                      item?.content[0]?.media_type === "video"
                                        ? item?.content[0]?.watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA +
                                            item?.content[0]?.thumbnail
                                        : item?.content[0]?.media_type ===
                                          "audio"
                                        ? audioic
                                        : item?.content[0]?.watermark ||
                                          process.env.REACT_APP_CONTENT_MEDIA +
                                            item?.content[0]?.media
                                    }
                                    tabcarddata={item.description}
                                    tabcard2={moment(item.createdAt).format(
                                      "hh:mm A, DD MMM YYYY"
                                    )}
                                    tabcard3={`£${
                                      formatAmountInMillion(
                                        +item?.Vat?.find(
                                          (el) =>
                                            el?.purchased_mediahouse_id == userId
                                        )?.amount
                                      ) || 0
                                    }`}
                                    feedIcon={
                                      item.content[0].media_type === "image"
                                        ? typeCam
                                        : item.content[0].media_type === "video"
                                        ? typeVideo
                                        : typeInterview
                                    }
                                    feedType={
                                      item?.content[0]?.media_type === "image"
                                        ? "Photo"
                                        : item?.content[0]?.media_type ===
                                          "video"
                                        ? "Video"
                                        : "Audio"
                                    }
                                    tabcard5={item?.hopper_id?.user_name}
                                    imgtab1={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      item?.hopper_id?.avatar_id?.avatar
                                    }
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
                    {content_count?.sourced_content_from_tasks?.task &&
                      content_count?.sourced_content_from_tasks?.task
                        .slice(0, 2)
                        .map((curr) => {
                          return (
                            <Link to={`/sourced-content-detail/${curr._id}`}>
                              <DashBoardTabCards
                                imgcount={curr?.task_id?.content.length}
                                imgtab={
                                  curr.type === "video"
                                    ? process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr.videothubnail
                                    : process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr.imageAndVideo
                                }
                                tabcarddata={curr.task_id.heading}
                                tabcard2={moment(curr.createdAt).format(
                                  "hh:mm a, DD MMM YYYY"
                                )}
                                tabcard3={`£${formatAmountInMillion(
                                  +curr.amount_paid
                                )}`}
                                feedIcon={
                                  curr.type === "image"
                                    ? typeCam
                                    : curr.type === "video"
                                    ? typeVideo
                                    : typeInterview
                                }
                                feedType={
                                  curr.type === "image"
                                    ? "Photo"
                                    : curr.type === "Video"
                                    ? "Video"
                                    : "Interview"
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
                                  className="card-img"
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
                          <Typography className="mb-0 text-center txt_bold">
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
                          {pub_content &&
                            pub_content.map((curr, index) => {
                              console.log(
                                "all content view --->",
                                curr.content[0]
                              );
                              if (index > pub_content.length - 3) {
                                return (
                                  <CardContent key={index} className="dash-c-body rev new_tbs_card">
                                    <Link
                                      to={`/Feeddetail/content/${curr._id}`}
                                    >
                                      <div className="">
                                        <Card className="list-card mb-3">
                                          <CardContent className="dash-c-body">
                                            <div className="list-in d-flex align-items-start">
                                              <div className="rateReview_content">
                                                <div className="commonContentIconsWrap crd_in_icons d-flex justify-content-between">
                                                  {/* <span className="rateView-type dflt cmr">
                                                    <span className="volCount">
                                                      1
                                                    </span>
                                                    <img
                                                      className=""
                                                      src={
                                                        curr.content[0]
                                                          .media_type ===
                                                        "audio"
                                                          ? typeInterviewwt
                                                          : contentCamera
                                                      }
                                                    />
                                                  </span> */}
                                                  
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
                                                          ? favouritedic
                                                          : favic
                                                      }
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
                          {Upload_content &&
                            Upload_content?.slice(0, 2)?.map((item, index) => {
                              console.log(
                                "alll task image not showing ---->",
                                item?.task_id?.content[0]
                              );
                              return (
                                <CardContent className="dash-c-body rev new_tbs_card">
                                  <Link to={`/content-details/${item._id}`}>
                                    <div className="">
                                      <Card className="list-card mb-3">
                                        <CardContent className="dash-c-body">
                                          <div className="list-in d-flex align-items-center">
                                            <div className="rateReview_content">
                                              <div className="commonContentIconsWrap crd_in_icons d-flex justify-content-between">
                                                <span className="rateView-type dflt cmr">
                                                  <span className="volCount">
                                                    1
                                                  </span>
                                                  <img
                                                    className=""
                                                    src={
                                                      item?.task_id?.content[0]
                                                        ?.media_type == "image"
                                                        ? contentCamera
                                                        : item?.task_id
                                                            ?.content[0]
                                                            ?.media_type ==
                                                          "video"
                                                        ? contentVideo
                                                        : null
                                                    }
                                                  />
                                                </span>
                                                {/* <PostIconsWrapper 
                                                    images={item?.image_count}
                                                    video={item?.video_count}
                                                    audio={item?.audio_count}
                                                  /> */}
                                                <span className="rateView-type dflt">
                                                  <img
                                                    className=""
                                                    src={
                                                      item.favourite_status ===
                                                      "true"
                                                        ? favouritedic
                                                        : favic
                                                    }
                                                  />
                                                </span>
                                              </div>
                                              <img
                                                className="list-card-img"
                                                src={
                                                  item?.task_id?.content[0]
                                                    ?.media_type == "image"
                                                    ? item?.task_id?.content[0]
                                                        ?.watermark
                                                    : item?.task_id?.content[0]
                                                        ?.media_type == "video"
                                                    ? item?.task_id?.content[0]?.thumbnail.startsWith(
                                                        "https"
                                                      )
                                                      ? item?.task_id
                                                          ?.content[0]
                                                          ?.thumbnail
                                                      : process.env
                                                          .REACT_APP_CONTENT_MEDIA +
                                                        item?.task_id
                                                          ?.content[0]
                                                          ?.thumbnail
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
                                                {item.task_id.task_description}
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
                                                  {moment(
                                                    item.task_id.createdAt
                                                  ).format(
                                                    " hh:mm A, DD MMM YYYY"
                                                  )}
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
                              to={"/Uploaded-Content/uploaded"}
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
                        <Tab eventKey="favourited" title="Favourited">
                          <div
                            className="DashBoardsort_wrapper d-flex justify-content-start fvt_undr_ofr"
                            style={{ flexWrap: "wrap" }}
                          >
                            {fav_content &&
                              fav_content?.slice(0, 6)?.map((curr, index) => {
                                return (
                                  <Link
                                    to={`/Feeddetail/content/${curr?.content_id?._id}`}
                                    className="favourited_card_design"
                                  >
                                    <DashBoardSortCard
                                      className="fvrt_itm"
                                      reviewType={contentCamera}
                                      reviewTypetwo={typestar}
                                      imgtab={
                                        curr?.content_id?.content[0] &&
                                        curr?.content_id?.content[0]
                                          ?.media_type === "video"
                                          ? process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                            curr?.content_id?.content[0]
                                              ?.thumbnail
                                          : curr?.content_id?.content[0]
                                              ?.media_type === "audio"
                                          ? audioicsm
                                          : curr?.content_id?.content[0]
                                              ?.watermark
                                      }
                                      tabcarddata={
                                        curr?.content_id?.description
                                      }
                                      feedIcon={
                                        curr?.content_id?.type === "shared"
                                          ? typeShare
                                          : exclusive
                                      }
                                      feedType={curr?.content_id?.type?.toUpperCase()}
                                      tabcard3={`${formatAmountInMillion(
                                        curr?.content_id?.ask_price
                                      )}`}
                                      contentDetails ={curr?.content_id}
                                    />
                                  </Link>
                                );
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
                            className="DashBoardsort_wrapper_tab d-flex justify-content-between fvt_undr_ofr"
                            style={{ flexWrap: "wrap" }}
                          >
                            {underOfferContent &&
                              underOfferContent.slice(0, 6).map((curr) => {
                                const feedIcon =
                                  curr?.type === "shared"
                                    ? typeShare
                                    : exclusive;
                                const content =
                                  curr?.content[0].media_type === "image" ? (
                                    <img
                                      src={
                                        process.env.REACT_APP_CONTENT_MEDIA +
                                        curr?.content[0].media
                                      }
                                    />
                                  ) : (
                                    ""
                                  );

                                return (
                                  <Link
                                    to={`/Feeddetail/content/${curr._id}`}
                                    className="favourited_card_design"
                                  >
                                    <DashBoardSortCard
                                      reviewType={
                                        curr?.content[0]?.media_type === "image"
                                          ? contentCamera
                                          : contentVideo
                                      }
                                      reviewTypetwo={
                                        curr.favourite_status === "true"
                                          ? favouritedic
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
                                      contentDetails ={curr}
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
                                        ? favouritedic
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
                                    contentDetails ={curr}
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
