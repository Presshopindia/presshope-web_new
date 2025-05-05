import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import imgs from "../assets/images/imgn6.jpg";
import img2 from "../assets/images/img2.webp";
import avatar from "../assets/images/avatar.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import ContentFeedCard from "../component/card/ContentFeedCard";
import exclusive from "../assets/images/exclusive.png";
import { Button, Card, CardContent, Typography } from "@mui/material";
import {
  BsArrowRight,
  BsArrowLeft,
  BsMic,
  BsChevronDown,
} from "react-icons/bs";
import feedcontimg from "../assets/images/imgn6.jpg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import authorimg from "../assets/images/profile.webp";
import { MdOutlineWatchLater, MdAdd } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import favouritedic from "../assets/images/favouritestar.svg";

import audioic from "../assets/images/audimg.svg";
import Tabs from "react-bootstrap/Tabs";
import { IoCallOutline } from "react-icons/io5";
import imgprofile from "../assets/images/profile.webp";
import { AiOutlinePlus } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import inpimg from "../assets/images/profile.webp";
import contentCamera from "../assets/images/contentCamera.svg";
import contentVideo from "../assets/images/contentVideo.svg";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { SlLocationPin } from "react-icons/sl";
import Header from "../component/Header";
import DbFooter from "../component/DbFooter";
import { Get, Patch, Post } from "../services/user.services";
import moment from "moment/moment";
import { toast } from "react-toastify";
import shared from "../assets/images/share.png";
import Loader from "../component/Loader";
import RelatedMoreContentSort from "../component/Sortfilters/Dashboard/RelatedMoreContentSort";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import favic from "../assets/images/star.svg";
import cameraic from "../assets/images/camera.svg";
import interviewic from "../assets/images/interview.svg";
import videoic from "../assets/images/video.svg";
import { Pagination } from "swiper";
import pdfic from "../assets/images/pdfic.svg";
import docsic from "../assets/images/docsic.svg";
import ChatCard from "../component/ChatCard";
import logoic from "../assets/images/logowht.svg";
import raishandsic from "../assets/images/raising-hands.svg";

const ContentunderofferdetailNew = () => {
  // const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const param = useParams();
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [fav, setFav] = useState();
  const [hopper, setHopper] = useState();
  const [hopperid, setHopperid] = useState();
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState()
  const [content, setCont] = useState([]);
  const [morecontent, moreContentset] = useState([]);
  const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const [userList, setUserList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [contentId, setContentId] = useState(null);
  const [show, setShow] = useState({
    content: false,
    task: false,
    presshop: false,
    internal: false,
  });

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // const handleCloseRecentActivity = (values) => {
  //   setOpenRecentActivity(values);
  // };

  // const [recentActivityValues, setRecentActivityValues] = useState({
  //   field: "",
  //   value: "",
  // });
  // const handleRecentActivityValue = (value) => {
  //   console.log("handleFavouriteComponentValues", value);
  //   setRecentActivityValues({ field: value.field, value: value.values });
  // };


  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }


  const Payment = async () => {
    setLoading(true);
    try {
      if (param.type === "content") {
        const obj = {
          paid_status: "paid",
          amount: data.ask_price,
          hopper_id: data.category_id._id,
          id: data._id,
        };
        const resp = await Patch(`mediaHouse/content/payment`, obj);
        if (resp) {
          // toast.success("Payment Successful")
          ContentByID();
          setLoading(false);
        }
      } else if (param.type === "favourite") {
        const obj = {
          paid_status: "paid",
          amount: fav.content_id.ask_price,
          hopper_id: fav.content_id.category_id._id,
          id: fav.content_id._id,
        };
        const resp = await Patch(`mediaHouse/content/payment`, obj);
        if (resp) {
          FavouriteByID();
          setLoading(false);
        }
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  const ContentByID = async () => {
    setLoading(true);

    try {

      const res = await Get(`mediaHouse/getProfile`);
      // console.log(res, `<----user details`)
      setUser(res.data.profile)

      const resp = await Get(`mediahouse/getallofferContent?_id=${param.id}`)
      if (resp) {
        setContentId(resp?.data?.response?._id);
        setData(resp.data.response);
        setHopper(resp.data.response?.hopper_id);
        setHopperid(resp.data.response?.hopper_id?._id);
      }

      const FavouriteByID = async () => {
        setLoading(true);

        try {
          const resp = await Post(`mediaHouse/favourites`, { id: param.id });
          setFav(resp.data.response.response[0]);
          if (resp) {
            // console.log(resp, `<----what the thing is here `)
            setLoading(false);
          }
        } catch (error) {
          // console.log(error);
          setLoading(false);
        }
      };

      const resp1 = await Post(`mediaHouse/MoreContent`, {
        hopper_id: resp.data.response?.hopper_id,
      });
      moreContentset(resp1.data.content);

      const resp2 = await Post(`mediaHouse/relatedContent`, { tag_id: [resp.data.response?.tag_ids[0]], hopper_id: resp.data.response?._id });
      setCont(resp2.data.content);
      localStorage.setItem('tag_id', resp.data.content.tag_ids[0], 'hopper_id', resp.data.content?.hopper_id?._id)


      setHopperid(resp.data.content?.hopper_id?._id);
      localStorage.setItem("hopperid", resp.data.content?.hopper_id?._id);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {

    ContentByID();


  }, []);

  const Favourite = async () => {
    try {
      const obj = {
        favourite_status: data?.favourite_status === "false" ? "true" : "false",
        content_id: data._id
      }
      const resp = await Patch(`mediaHouse/add/to/favourites`, obj)
      if (resp) {
        ContentByID()
      }
    }
    catch (error) {
    }
  }

  const Audio = data?.content?.filter((item) => item.media_type === "audio")
  const Video = data?.content?.filter((item) => item.media_type === "video")
  const images = data?.content?.filter((item) => item.media_type === "image")
  const Pdf = data?.content?.filter((item) => item.media_type === "pdf")
  const Doc = data?.content?.filter((item) => item.media_type === "doc")


  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });

  const goBack = () => {
    window.history.back();
  };

  // create room
  const CreateRoom = async (content_id, hopper_id) => {
    alert(content_id, `<---id's`)
    const obj = {
      receiver_id: hopper_id,
      room_type: "MediahousetoAdmin",
      type: "external_content",
      content_id: content_id,
    };
    const resp = await Post(`mediaHouse/createRoom`, obj);
    if (resp) {
      setRoom_Details(resp.data.details);
      // JoinRoom(resp.data.details.room_id)
      // getMessages(resp.data.details.room_id)
    }
  };

  // recent activity
  const recentActivity = async () => {
    try {
      if (contentId) {
        const response = await Post('mediaHouse/recentactivityformediahouse', {
          content_id: contentId,
        });

      }
    } catch (err) {
      console.error(err); // Use "err" instead of "er"
    }
  };

  useEffect(() => {
    recentActivity();
  }, [contentId]);

  // admin list

  const GetUserList = async () => {
    const resp = await Get(`mediaHouse/getdesignatedUSer?allow_to_chat_externally=true`);
    setUserList(resp.data.response);
    const resp1 = await Get(`mediaHouse/adminlist`);
    setAdminList(resp1.data.data);
  };


  useEffect(() => {
    GetUserList()
  }, [])


  // store the id 

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  }




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
                    <Link onClick={goBack} className="back_link">
                      <BsArrowLeft className="text-pink" /> Back{" "}
                    </Link>
                    {/* <BsArrowLeft className="text-pink" /> Back{" "} */}

                  </div>
                  <Row className="">
                    <Col md={8}>
                      <Card className="feeddetail-card left-card">
                        <CardContent className="card-content position-relative">
                          <div className="post_icns_cstm_wrp">
                            {Audio && Audio.length > 0 &&
                              <div className="post_itm_icns dtl_icns">
                                {Audio && Audio.length > 0 &&
                                  <span className="count">{Audio && Audio.length > 0 && Audio.length}</span>
                                }

                                {Audio && Audio.length > 0 &&
                                  <img
                                    className="feedMediaType iconBg"
                                    src={interviewic} alt="" />}
                              </div>}

                            {Video && Video.length > 0 &&
                              <div className="post_itm_icns dtl_icns">
                                {Video && Video.length > 0 &&
                                  <span className="count">{Video && Video.length > 0 && Video.length}</span>
                                }
                                {Video && Video.length > 0 &&
                                  <img
                                    className="feedMediaType iconBg"
                                    src={videoic} alt="" />}
                              </div>}

                            {images && images.length > 0 &&
                              <div className="post_itm_icns dtl_icns">
                                {images && images.length > 0 &&
                                  <span className="count">{images && images.length > 0 && images.length}</span>
                                }

                                {images && images.length > 0 &&
                                  <img
                                    className="feedMediaType iconBg"
                                    src={cameraic} alt="" />}
                              </div>
                            }
                            {Pdf && Pdf.length > 0 &&
                              <div className="post_itm_icns dtl_icns">
                                {Pdf && Pdf.length > 0 &&
                                  <span className="count">{Pdf && Pdf.length > 0 && Pdf.length}</span>
                                }

                                {Pdf && Pdf.length > 0 &&
                                  <img
                                    className="feedMediaType iconBg"
                                    src={pdfic} alt="" />}
                              </div>}

                            {Doc && Doc.length > 0 &&
                              <div className="post_itm_icns dtl_icns">
                                {Doc && Doc.length > 0 &&
                                  <span className="count">{Doc && Doc.length > 0 && Doc.length}</span>
                                }

                                {Doc && Doc.length > 0 &&
                                  <img
                                    className="feedMediaType iconBg"
                                    src={docsic} alt="" />}
                              </div>
                            }

                          </div>
                          {/* {console.log(data?.favourite_status, `<----whar is the status`)} */}
                          <div className="post_itm_icns right dtl_icns" onClick={Favourite}>
                            <img
                              className="feedMediaType iconBg"
                              src={data?.favourite_status === "true" ? favouritedic : favic}
                              alt=""
                            />
                          </div>

                          {/* <img src={data ? (data.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].thumbnail : (data?.paid_status === "paid" ? process.env.REACT_APP_CONTENT_MEDIA + data.content[0].media : data.content[0].watermark)) : (fav?.content_id.content[0].media_type === "video" ? process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].thumbnail : process.env.REACT_APP_CONTENT_MEDIA + fav?.content_id.content[0].media)} alt="" /> */}
                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // navigation
                            // navigation={true}
                            // slidesPerGroupSkip={1}
                            // focusableElements="pagination"
                            // nested={true}
                            pagination={{ clickable: true }}
                            // pagination={true}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            nested={true}
                            // pagination={{ clickable: true }}
                            // {/* >>>>>>> 271978bf7664b09c85e56bd352f5f369057e0d98 */}
                            // onSlideChange={() => console.log("slide change")}
                            // onSwiper={(swiper) => console.log(swiper)}
                          >
                            {
                              data && data.content?.map((curr) => {
                                return (
                                  curr?.media_type === "image" ?
                                    <SwiperSlide>
                                      <img src={curr?.watermark || process.env.REACT_APP_CONTENT_MEDIA + curr?.media} />
                                    </SwiperSlide>
                                    : curr?.media_type === "audio" ?
                                      <SwiperSlide>
                                        <img src={audioic} className="slider-img" />
                                        <audio controls src={process.env.REACT_APP_CONTENT_MEDIA + curr?.media} type="audio/mpeg" className="slider-audio" />
                                      </SwiperSlide>
                                      : curr?.media_type === "video" ?
                                        <SwiperSlide>
                                          <video controls className="slider-vddo"
                                            src={curr?.media}
                                          />
                                        </SwiperSlide>
                                        : null
                                )
                              })
                            }
                            {/* )
                            })} */}
                          </Swiper>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {data ? data?.heading : fav?.content_id?.heading}
                            </h1>
                            <p className="feed_descrptn">
                              {data
                                ? data?.description
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
                              <Typography className="txt_bld">
                                {" "}
                                Content info
                              </Typography>
                              {data?.favourite_status === "true" ?
                                <div className="favourite"   >
                                  <AiFillStar />
                                  <span>Favourited</span>
                                </div>
                                :
                                <div className="favourite" onClick={Favourite}>
                                  <AiOutlineStar />
                                  <span>Favourite</span>
                                </div>
                              }

                              {/* {data?.content_id?.favourite_status === "false" && (

                               
                              )} */}

                            </div>
                          </div>
                          {/* <hr /> */}
                          <div className="content">
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hopper</span>
                                <div className="item-in-right">
                                  <img src={process.env.REACT_APP_AVATAR_IMAGE + data?.hopper_id?.avatar_id?.avatar} alt="" />
                                  <span className="hpr_nme">
                                    {data?.hopper_id?.user_name}
                                  </span>
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
                                        ? data?.location
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
                                      ? moment(data?.timestamp).format(
                                        "h:mm A, DD MMM YYYY"
                                      )
                                      : moment(
                                        fav?.content_id?.timestamp
                                      ).format("h:mm A, DD MMM YYYY")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content tags_wrp">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Hashtags</span>
                                <div>
                                  <div className="item-in-right hashtag-wrap">
                                    {data
                                      ? data &&
                                      data?.tag_ids?.slice(0, 2)?.map((tag) => {
                                        return (
                                          <span className="mr">
                                            #{tag.name}
                                          </span>
                                        );
                                      })
                                      : fav &&
                                      fav?.content_id?.tag_ids?.slice(0, 2)?.map((tag) => {
                                        return (
                                          <span className="mr">
                                            #{tag.name}
                                          </span>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">Category</span>
                                <div className="">
                                  <span className="txt_catg_licn">
                                    {capitalizeFirstLetter(
                                      data
                                        ? data?.category_id?.name
                                        : fav?.content_id?.category_id?.name
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="sub-content">
                              <div className="item d-flex justify-content-between align-items-center">
                                <span className="fnt-bold">License</span>
                                <div className="">
                                  <img
                                    src={
                                      data?.type === "exclusive"
                                        ? exclusive
                                        : shared
                                    }
                                    className="exclusive-img"
                                    alt=""
                                  />
                                  <span className="txt_catg_licn">
                                    {data
                                      ? capitalizeFirstLetter(data?.type)
                                      : capitalizeFirstLetter(
                                        fav?.content_id?.type
                                      )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="foot cont-info-actions d-flex justify-content-between align-items-center">

                              <Button variant="secondary" onClick={() => Navigate('test')}>Offer</Button>

                              {(data
                                ? data?.paid_status !== "paid"
                                : fav?.content_id?.paid_status !== "paid") && (
                                  <Link>
                                    {" "}
                                    <Button variant="primary" onClick={Payment}>
                                      £
                                      {formatAmountInMillion(data ? data?.ask_price : fav?.content_id?.ask_price)}
                                    </Button>
                                  </Link>
                                )}
                              {(data
                                ? data?.paid_status === "paid"
                                : fav?.content_id?.paid_status === "paid") && (
                                  <Link>
                                    {" "}
                                    <Button variant="primary">Paid</Button>
                                  </Link>
                                )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={12} className="feed_dtl_chat_wrap">
                      <div className="chat-tabs-wrap">
                        <Tabs
                          defaultActiveKey="internal"
                          id="chat-tabs" onClick={() => Navigate(event)}
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
                                  <div className="feed_dtl_msgs">
                                    <div className="externalText">
                                      <h6>Welcome RItesh. Please select participants from the list, and add them to your internal chat.
                                      </h6>
                                      <h6>Once added, you can start chatting with your team members. Use the text box below to type or send voice notes. Good luck <img src={raishandsic} className="raiseHandImg" /></h6>
                                    </div>
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
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
                                      </div>
                                      {/* <div className="msg-line">
                                        <span>New Messages</span>
                                      </div> */}
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
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inpt typeMsg_inp mt-2">
                                    <img src={inpimg} alt="" />
                                    <InputGroup className="">
                                      <Form.Control
                                        placeholder="Type here..."
                                        aria-describedby="basic-addon1"
                                      />
                                    </InputGroup>
                                    <div className="chatIn-options">
                                      <MdAdd />
                                      {/* <VscDeviceCameraVideo /> */}
                                      {/* <IoCallOutline /> */}
                                      <BsMic />
                                      <span className="chatIn-send">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card" >
                                    <Link to="/manage-users" >
                                      <div className="tab_in_card-heading d-flex justify-content-between align-items-center" >
                                        <h4>Participants</h4>
                                        <div className="icon text-white ">
                                          <AiOutlinePlus />
                                        </div>
                                      </div>
                                    </Link>

                                    <div className="scrollHtPnts">
                                      {userList &&
                                        userList.map((curr) => {
                                          return (
                                            <div className="tab_in_card_items">
                                              <div className="checkWrap"><input type="checkbox" /></div>
                                              <div className="img" onClick={() => {
                                                setSenderId(curr._id);
                                                setShow({
                                                  content: false,
                                                  task: false,
                                                  presshop: false,
                                                  internal: true,
                                                });
                                              }}>
                                                <img src={
                                                  process.env.REACT_APP_EMPLOYEE_IMAGE + curr?.profile_image} alt="user" />
                                                <span> {" "}
                                                  {curr.user_first_name +
                                                    " " +
                                                    curr.user_last_name}</span>
                                              </div>
                                              {/* <div className="dots">
                                                <Link className="view_chat">View</Link>
                                              </div> */}
                                            </div>
                                          );
                                        })}
                                    </div>

                                    {/* <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div> */}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                          <Tab eventKey="external" title="Hopper Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="feed_dtl_msgs">
                                    <div className="externalText">
                                      <h6>Welcome Ritesh. Please click the 'Offer' button to make an offer, or simply click 'Buy' to purchase the content
                                      </h6>
                                    </div>
                                    {/* <div className="crd position-relative">
                                      <div className="img">
                                        <img src={logoic} alt="user" />
                                      </div>
                                      <div className="postedcmnt_info">
                                        <h5>
                                          Gengxin John{" "}
                                          <span className="text-secondary time">
                                            1:54PM
                                          </span>
                                        </h5>
                                        <Typography className="comment_text">
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
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
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
                                      </div>
                                    </div> */}
                                  </div>
                                  {/* <div className="inpt typeMsg_inp mt-2">
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
                                      <span className='chatIn-send'>
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div> */}
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
                                      <div className="checkWrap"><input type="checkbox" /></div>
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="checkWrap"><input type="checkbox" /></div>
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                    </div>
                                    <div className="tab_in_card_items">
                                      <div className="checkWrap"><input type="checkbox" /></div>
                                      <div className="img">
                                        <img src={imgprofile} alt="user" />
                                        <span>John Gengxin</span>
                                      </div>
                                    </div>
                                    {/* <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div> */}
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="presshopchat" title="PressHop Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="feed_dtl_msgs">
                                    <div className="externalText">
                                      <h6>Welcome Ritesh. Please use the text box below to chat with our team members.
                                      </h6>
                                    </div>
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
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
                                      </div>
                                      {/* <div className="msg-line">
                                        <span>New Messages</span>
                                      </div> */}
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
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Repudiandae expedita dicta a, culpa
                                          labore vitae? Doloribus earum,
                                          exercitationem culpa, maiores dolores
                                          ipsam iure inventore suscipit
                                          accusantium dicta alias omnis at.
                                        </Typography>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inpt typeMsg_inp mt-2">
                                    <img src={inpimg} alt="" />
                                    <InputGroup className="">
                                      <Form.Control
                                        placeholder="Type here..."
                                        aria-describedby="basic-addon1"
                                      />
                                    </InputGroup>
                                    <div className="chatIn-options">
                                      <MdAdd />
                                      {/* <VscDeviceCameraVideo /> */}
                                      {/* <IoCallOutline /> */}
                                      <BsMic />
                                      <span className="chatIn-send">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                </Col>
                                {/* <Col md={9}>
                                  <div className="feed_dtl_msgs">
                                    {show.presshop && <ChatCard senderId={senderId} />}
                                    {show.internal && <Chatinternal senderId={senderId} />}
                                  </div>
                                </Col> */}
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants</h4>
                                      <Link to="/manage-users" >

                                        <div className="icon text-white">
                                          <AiOutlinePlus />
                                        </div>
                                      </Link>
                                    </div>

                                    {adminList &&
                                      adminList.map((curr) => {
                                        // console.log(curr, `<-------waht is this =-=======`)
                                        return (

                                          <div className="tab_in_card_items" onClick={() => {
                                            setSenderId(curr._id); setShow({
                                              content: false,
                                              task: false,
                                              presshop: true,
                                            });
                                          }}>
                                            <div className="checkWrap"><input type="checkbox" /></div>
                                            <div className="img">
                                              <img src={process.env.REACT_APP_ADMIN_IMAGE + curr?.profile_image} alt="user" />
                                              <span>{curr?.name}</span>
                                            </div>
                                          </div>
                                        );
                                      })}


                                    {/* <div className="text-end">
                                      <Link className="view_Allchat">
                                        View all{" "}
                                        <BsArrowRight className="text-pink" />
                                      </Link>
                                    </div> */}
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
                      {/* <Form.Group className="globalSort me-4">
                        <Form.Select>
                          <option>Sort</option>
                          <option>Latest</option>
                          <option>Relevance</option>
                        </Form.Select>
                      </Form.Group>
                      <Link to="/related-content">View all <BsArrowRight className='text-pink' /></Link>
                      </Form.Group> */}
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
                    {content &&
                      content.slice(0, 4).map((curr) => {
                        const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                        const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                        const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                        const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                        const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")
                        const imageCount = Image.length;
                        const videoCount = Video.length;
                        const audioCount = Audio.length;
                        const pdfCount = Pdf.length;
                        const docCount = Doc.length;

                        return (
                          <Col md={3}>
                            <ContentFeedCard
                              lnkto={`/Feeddetail/content/${curr._id}`}
                              feedImg={
                                curr?.content[0]?.media_type === "video" ?
                                  curr?.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                  : curr.content[0].media_type === "image" ?
                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                    : curr.content[0].media_type === "audio" ?
                                      audioic
                                      : ''}
                              // feedType={contentVideo}
                              feedTag={"Most Viewed"}
                              user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr.hopper_id?.avatar_id?.avatar}
                              author_Name={curr.hopper_id?.user_name}
                              // type_img={exclusive}
                              // type_tag={curr.status}
                              feedHead={curr.heading}
                              feedTime={moment(curr?.updatedAt).format("DD MMM, YYYY")}
                              feedLocation={curr.location}
                              contentPrice={formatAmountInMillion(curr.ask_price || 0)}
                              feedTypeImg1={imageCount > 0 ? cameraic : null}
                              postcount={imageCount > 0 ? imageCount : null}
                              feedTypeImg2={videoCount > 0 ? videoic : null}
                              postcount2={videoCount > 0 ? videoCount : null}
                              feedTypeImg3={audioCount > 0 ? interviewic : null}
                              postcount3={audioCount > 0 ? audioCount : null}
                              feedTypeImg4={pdfCount > 0 ? pdfic : null}
                              postcount4={pdfCount > 0 ? pdfCount : null}
                              feedTypeImg5={docCount > 0 ? docsic : null}
                              postcount5={docCount > 0 ? docCount : null}
                              fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                              type_img={curr?.type === "exclusive" ? exclusive : shared}
                              type_tag={curr?.type}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                </div>

                <div className="feedsContainer">
                  <div className="feedContent_header">
                    <h1>
                      More content from {hopper?.user_name}

                    </h1>
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
                      <Link to={`/more-content/${hopper?._id}`} className="next_link">
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {morecontent &&
                      morecontent.slice(0, 4).map((curr) => {
                        const Audio = curr?.content?.filter((curr) => curr?.media_type === "audio")
                        const Video = curr?.content?.filter((curr) => curr?.media_type === "video")
                        const Image = curr?.content?.filter((curr) => curr?.media_type === "image")
                        const Pdf = curr?.content?.filter((curr) => curr?.media_type === "pdf")
                        const Doc = curr?.content?.filter((curr) => curr?.media_type === "doc")

                        const imageCount = Image.length;
                        const videoCount = Video.length;
                        const audioCount = Audio.length;
                        const pdfCount = Pdf.length;
                        const docCount = Doc.length;
                        return (
                          <Col md={3}>
                            <ContentFeedCard
                              lnkto={`/Feeddetail/content/${curr._id}`}
                              feedImg={
                                curr.content[0].media_type === "video" ?
                                  curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].thumbnail
                                  : curr.content[0].media_type === "image" ?
                                    curr.content[0].watermark || process.env.REACT_APP_CONTENT_MEDIA + curr.content[0].media
                                    : curr.content[0].media_type === "audio" ?
                                      audioic
                                      : ''}
                              // feedType={contentVideo}
                              feedTag={"Most Viewed"}
                              user_avatar={process.env.REACT_APP_AVATAR_IMAGE + curr.hopper_id?.avatar_id?.avatar}
                              author_Name={curr.hopper_id?.user_name}
                              // type_img={exclusive}
                              // type_tag={curr.status}
                              feedHead={curr.heading}
                              feedTime={moment(curr?.updatedAt).format("DD MMM, YYYY")}
                              feedLocation={curr.location}
                              contentPrice={formatAmountInMillion(curr.ask_price || 0)}
                              feedTypeImg1={imageCount > 0 ? cameraic : null}
                              postcount={imageCount > 0 ? imageCount : null}
                              feedTypeImg2={videoCount > 0 ? videoic : null}
                              postcount2={videoCount > 0 ? videoCount : null}
                              feedTypeImg3={audioCount > 0 ? interviewic : null}
                              postcount3={audioCount > 0 ? audioCount : null}
                              feedTypeImg4={pdfCount > 0 ? docsic : null}
                              postcount4={pdfCount > 0 ? pdfCount : null}
                              feedTypeImg5={docCount > 0 ? docsic : null}
                              postcount5={docCount > 0 ? docCount : null}
                              fvticns={curr?.favourite_status === "true" ? favouritedic : favic}
                              type_img={curr?.type === "exclusive" ? exclusive : shared}
                              type_tag={curr?.type}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-0">
            <TopSearchesTipsCard />
          </div>

        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default ContentunderofferdetailNew;
