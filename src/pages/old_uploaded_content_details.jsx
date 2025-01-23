import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import { Button, Card, CardContent, Typography } from "@mui/material";
import moment from "moment/moment";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsMic,
} from "react-icons/bs";
import { MdAdd, MdOutlineWatchLater } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import audioic from "../assets/images/audimg.svg";
import cameraic from "../assets/images/camera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import exclusive from "../assets/images/exclusive.png";
import favic from "../assets/images/favouritestar.svg";
import imgs from "../assets/images/imgn6.jpg";
import interviewic from "../assets/images/interview.svg";
import { default as imgprofile, default as inpimg } from "../assets/images/profile.webp";
import videoic from "../assets/images/video.svg";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import Loader from "../component/Loader";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import ContentFeedCard from "../component/card/ContentFeedCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Post } from "../services/user.services";

const UploadedContentDetails = () => {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [fav, setFav] = useState();

  const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const handleCloseRecentActivity = (values) => {
    setOpenRecentActivity(values);
  };

  const [recentActivityValues, setRecentActivityValues] = useState({
    field: "",
    value: "",
  });
  const handleRecentActivityValue = (value) => {
    // console.log("handleFavouriteComponentValues", value);
    setRecentActivityValues({ field: value.field, value: value.values });
  };

  const [taskId, setTaskId] = useState(null);
  const ContentByID = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/getuploadedContentbyHoppers?_id=${param.id}`);
      setData(resp.data.data[0]);
      setTaskId(resp?.data?.data?.[0]?.task_id?._id)
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };


  // recent activity
  const recentActivity = async () => {
    try {
      if (taskId) {
        const response = await Post('mediaHouse/recentactivityformediahouse', {
          task_id: taskId,
        });
      }
    } catch (err) {
      console.error(err); 
    }
  };

  useEffect(() => {
    recentActivity();
  }, [taskId]);

  // const FavouriteByID = async () => {

  //     setLoading(true)

  //     try {
  //         const resp = await Get(`mediaHouse/favourites?id=${param.id}`)
  //         setFav(resp.data.response.response[0])
  //         if (resp) {
  //             setLoading(false)
  //         }
  //     }
  //     catch (error) {
  //         console.log(error)
  //         setLoading(false)
  //     }
  // }

  // const Payment = async () => {

  //     setLoading(true)

  //     try {
  //         if (param.type === "content") {
  //             const obj = {
  //                 paid_status: "paid",
  //                 amount: data.ask_price,
  //                 hopper_id: data.category_id._id,
  //                 id: data._id
  //             }
  //             const resp = await Patch(`mediaHouse/content/payment`, obj)
  //             if (resp) {
  //                 // toast.success("Payment Successful")
  //                 ContentByID()
  //                 setLoading(false)
  //             }
  //         }
  //         else if (param.type === "favourite") {
  //             const obj = {
  //                 paid_status: "paid",
  //                 amount: fav.content_id.ask_price,
  //                 hopper_id: fav.content_id.category_id._id,
  //                 id: fav.content_id._id
  //             }
  //             const resp = await Patch(`mediaHouse/content/payment`, obj)
  //             if (resp) {
  //                 // toast.success("Payment Successful")
  //                 FavouriteByID()
  //                 setLoading(false)
  //             }
  //         }
  //     }
  //     catch (error) {
  //         console.log(error)
  //         setLoading(false)
  //     }
  // }

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  useEffect(() => {
    ContentByID();

    // if (param.type === "favourite") {
    //     FavouriteByID()
    // }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="page-wrap feed-detail">
        <Container fluid>
          <Row>
            <Col md={12}>
              <div className="feedsMain_wrap">
                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <Link onClick={() => window.history.back()}>
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                  </div>
                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="post_itm_icns dtl_icns">

                            <img
                              className="feedMediaType iconBg"
                              postcount={1}
                              src={cameraic}
                              alt=""
                            />
                          </div>

                          <div className="post_itm_icns right dtl_icns">
                            <img
                              className="feedMediaType iconBg"
                              src={favic}
                              alt=""
                            />
                          </div>

                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation
                            pagination={true} modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            <SwiperSlide>
                              <img
                                src={
                                  data?.type === "image"
                                    ? process.env.REACT_APP_UPLOADED_CONTENT +
                                    data?.imageAndVideo
                                    : process.env.REACT_APP_UPLOADED_CONTENT +
                                    data?.videothubnail
                                }
                                alt=""
                              />
                            </SwiperSlide>
                          </Swiper>

                          {/* <img
                            src={
                              data?.type === "image"
                                ? process.env.REACT_APP_UPLOADED_CONTENT +
                                  data?.imageAndVideo
                                : process.env.REACT_APP_UPLOADED_CONTENT +
                                  data?.videothubnail
                            }
                            alt=""
                          /> */}
                          <div className="feedTitle_content">
                            <h1 className="feedTitle">Task Details</h1>
                            <p className="feed_descrptn">
                              {data
                                ? data?.task_id?.task_description
                                : fav?.content_id?.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info">
                        <CardContent className="card-content">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography> Content info</Typography>
                              {/* <div className="favourite">
                                                                <AiOutlineStar />
                                                                <span>Favourite</span>
                                                            </div> */}
                            </div>
                          </div>
                          {/* <hr /> */}
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img
                                    src={
                                      process.env.REACT_APP_AVATAR_IMAGE +
                                      data?.avatar_detals[0]?.avatar
                                    }
                                    alt=""
                                  />
                                  <span>{data?.hopper_id?.user_name}</span>
                                </div>
                              </div>
                            </div>

                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Location</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <SlLocationPin />{" "}
                                    <div>
                                      {data
                                        ? data?.task_id?.location
                                        : fav?.content_id?.location}
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">TimeStamp</span>
                                <div className="item-in-right loc">
                                  <span>
                                    <MdOutlineWatchLater />
                                    {data
                                      ? moment(data?.createdAt).format(
                                        "h:mm A, DD MMMM YYYY"
                                      )
                                      : moment(
                                        fav?.content_id?.timestamp
                                      ).format("h:mm A, DD MMMM YYYY")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <div className="sub-content tags_wrp">
                                                            <div className="item d-flex justify-content-between align-items-center">
                                                                <span className="fnt-bold">Hashtags</span>
                                                                <div>
                                                                    <div className="item-in-right hashtag-wrap">
                                                                        {data ? data && data?.tag_ids.map((tag) => {
                                                                            return (
                                                                                <span className="mr">#{tag.name}</span>
                                                                            )
                                                                        })
                                                                            :
                                                                            fav && fav?.content_id?.tag_ids.map((tag) => {
                                                                                return (
                                                                                    <span className="mr">#{tag.name}</span>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>
                                <div className="">
                                  <span>
                                    {data
                                      ? isNaN(data?.category_details?.name)
                                      : fav?.content_id?.category_id?.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <div className="sub-content">
                                                            <div className="item d-flex justify-content-between align-items-center">
                                                                <span className="fnt-bold">License</span>
                                                                <div className="">
                                                                    <img src={data?.type === "exclusive" ? exclusive : shared} className="exclusive-img" alt="" />
                                                                    <span>{data ? capitalizeFirstLetter(data?.type) : capitalizeFirstLetter(fav?.content_id?.type)}</span>
                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div className="foot cont-info-actions d-flex justify-content-between align-items-center">
                              <Link>
                                <Button variant="secondary">Offer</Button>
                              </Link>
                              <Link>
                                {" "}
                                <Button variant="primary">
                                  £
                                  {data?.type === "image"
                                    ? data?.task_id.photo_price
                                    : data?.task_id.videos_price}
                                </Button>
                              </Link>
                              {/* {(data ? data?.paid_status === "paid" : fav?.content_id?.paid_status === "paid") && <Link> <Button variant='primary'>Paid</Button></Link>} */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={12}>
                      <div className="chat-tabs-wrap">
                        <Tabs
                          defaultActiveKey="internal"
                          id="chat-tabs"
                          className="mb-3 tbs"
                        >
                          <Tab
                            eventKey="internal"
                            title="Internal Chat"
                            defaultActiveKey="internal"
                            className=" show">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="crd position-relative">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                    <div className="msg-line">
                                      <span>New Messages</span>
                                    </div>
                                  </div>
                                  <div className="crd">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="inpt typeMsg_inp mt-4">
                                    <img src={inpimg} alt="" />
                                    <InputGroup className="mb-3">
                                      <Form.Control
                                        placeholder="Type here..."
                                        aria-describedby="basic-addon1"
                                      />
                                    </InputGroup>
                                    <div className="chatIn-options">
                                      <MdAdd />
                                      <BsMic />
                                      <span className="chatIn-send">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                      <div className="icon text-white">
                                        <AiOutlinePlus />
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                          <Tab eventKey="external" title="External Chat">
                            <div className="tab-data">
                              <Row>
                                <Col md={9}>
                                  <div className="crd position-relative">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                    <div className="msg-line">
                                      <span>New Messages</span>
                                    </div>
                                  </div>
                                  <div className="crd">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                      <div className="icon">
                                        <AiOutlinePlus className="text-white" />
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                          <Tab eventKey="presshopchat" title="Presshop Chat">
                            <div className="tab-data">
                              <Row>
                                <Col md={9}>
                                  <div className="crd position-relative">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                    <div className="msg-line">
                                      <span>New Messages</span>
                                    </div>
                                  </div>
                                  <div className="crd">
                                    <div className="img">
                                      <img src={imgprofile} alt="user" />
                                    </div>
                                    <div className="postedcmnt_info">
                                      <h5>
                                        John Gengxin{" "}
                                        <span className="text-secondary time">
                                          1:54PM
                                        </span>
                                      </h5>
                                      <Typography className="comment_text">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae expedita
                                        dicta a, culpa labore vitae? Doloribus
                                        earum, exercitationem culpa, maiores
                                        dolores ipsam iure inventore suscipit
                                        accusantium dicta alias omnis at.
                                      </Typography>
                                    </div>
                                  </div>
                                  <div className="inpt typeMsg_inp mt-4">
                                    <img src={inpimg} alt="" />
                                    <InputGroup className="mb-3">
                                      <Form.Control
                                        placeholder="Type here..."
                                        aria-describedby="basic-addon1"
                                      />
                                    </InputGroup>
                                    <div className="chatIn-options">
                                      <MdAdd />
                                      <BsMic />
                                      <span className="chatIn-send">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                      <div className="icon text-white">
                                        <AiOutlinePlus />
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                      <div className="dots">
                                        <Link className="view_chat">View</Link>
                                      </div>
                                    </div>
                                    <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>Related content</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
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
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                          />
                        )}
                      </div>
                      <Link to="/related-content" className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"lorem ipsum"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£500"}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>More content from Pseudynoumos</h1>
                    <div className="d-flex align-items-center">
                      <div className="fltrs_prnt me-3 ht_sort">
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
                            closeRecentActivity={handleCloseRecentActivity}
                            recentActivityValues={handleRecentActivityValue}
                          />
                        )}
                      </div>
                      <Link to="/more-content/hopper_id" className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={videoic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>

                    <Col md={3}>
                      <ContentFeedCard
                        lnkto={""}
                        feedImg={audioic}
                        feedType={contentVideo}
                        feedTag={"Most Viewed"}
                        userAvatar={imgs}
                        authorName={"Pseudonymous"}
                        type_img={exclusive}
                        type_tag={"Exclusive"}
                        feedHead={"Heading"}
                        fvticns={favic}
                        feedTypeImg={cameraic}
                        postcount={2}
                        feedTypeImg2={interviewic}
                        postcount2={3}
                        feedTime={"12:36 PM, 10 Oct 2022"}
                        feedLocation={"Grenfell Tower, London"}
                        contentPrice={"£328"}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <TopSearchesTipsCard />
          </Row>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default UploadedContentDetails;
