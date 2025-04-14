import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img4.png";
import list from "../assets/images/list.svg";
import locationn from "../assets/images/location.svg";
import { Form, Row, Col } from "react-bootstrap";
import { Avatar, Button, Typography, Card, CardContent } from "@mui/material";
import { BiPlay, BiTimeFive, BiSupport } from "react-icons/bi";
import {
  MdMyLocation,
  MdDateRange,
  MdOutlineWatchLater,
  MdAdd,
} from "react-icons/md";
import { BsPeople, BsArrowRight } from "react-icons/bs";
import exclusive from "../assets/images/exclusive.png";
import { Get, Post } from "../services/user.services";
import moment from "moment/moment";
import shared from "../assets/images/share.png";
import Timer from "../component/Timer";
import Loader from "../component/Loader";
import bullseye from "../assets/images/bullseye.svg";
import calendaric from "../assets/images/calendarnic.svg";
import timeic from "../assets/images/watch.svg";
import docsic from "../assets/images/docsic.svg";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineStar } from "react-icons/ai";
import crime from "../assets/images/sortIcons/crime.svg";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import cameraic from "../assets/images/camera.svg";
import videoic from "../assets/images/video.svg";
import usric from "../assets/images/menu-icons/user.svg";
import ContentChatSocket from "../component/ContentChatSocket";
import { capitalizeFirstLetter } from "../component/Utils";
import audioic from "../assets/images/audimg.svg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import socketServer from "../socket.config";

const ContentDtlChat = (props) => {
  console.log("props", props);
  const [data, setData] = useState();
  const [room_details, setRoom_Details] = useState();
  const [loading, setLoading] = useState(false);
  const [offer_change, setOffer_change] = useState(false);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState([]);
  const [id, setId] = useState(
    JSON.parse(localStorage.getItem("contentId")) || null
  );

  const ContentByID = async (content_id) => {
    setLoading(true);
    const obj = { id: content_id };
    try {
      const resp = await Post(`mediaHouse/view/published/content`, obj);
      if (resp) {
        setData(resp.data.content);
        setLoading(false);
        setContent(resp.data.content.content);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContentByID(
      JSON.parse(localStorage.getItem("contentId")) || props?.contents?.[0]?._id
    );
    CreateRoom(
      props?.contents?.[0]?.hopper_id,
      JSON.parse(localStorage.getItem("contentId")) || props?.contents?.[0]?._id
    );
    setOffer_change(!offer_change);
  }, [props.contents]);

  const CreateRoom = async (hopper_id, content_id) => {
    const obj = {
      receiver_id: hopper_id,
      room_type: "MediahousetoAdmin",
      type: "external_content",
      content_id: content_id,
    };
    if (!hopper_id) {
      return;
    }
    const resp = await Post(`mediaHouse/createRoom`, obj);
    if (resp) {
      setRoom_Details(resp.data.details);
      getMessages(resp?.data?.details?.room_id);
    }
  };

  const getMessages = async (room_id = localStorage.getItem("roomId2")) => {
    if(!room_id) {
      return;
    }
    const resp = await Post(`mediaHouse/getAllchat`, { room_id });
    if (resp) {
      console.log("This message", resp.data.response);
      setMessages(resp.data.response);
    }
  };

  const Start_Offer = () => {
    try {
      let obj = {
        room_id: room_details.room_id,
        content_id: room_details.content_id,
        sender_type: "Mediahouse",
        sender_id: room_details.sender_id,
        message_type: "offer_started",
        receiver_id: room_details.receiver_id,
        initial_offer_price: "",
        finaloffer_price: "",
      };
      socketServer.emit("initialoffer", obj);
      socketServer.on("initialoffer", (obj) => {
        getMessages(room_details?.room_id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const JoinRoom = (room_id) => {
    socketServer.emit("room join", { room_id: room_id });
    socketServer.on("room join", (obj) => {
      // console.log("room join:", obj);
    });
    getMessages(room_id);
  };

  useMemo(() => {
    JoinRoom(room_details?.room_id);
  }, [room_details?.room_id]);

  const NewExternalChatFun = async (
    type,
    offer_amount,
    initial_offer_price = 0,
    room_details
  ) => {
    const obj = {
      image_id: room_details.content_id,
      offer_amount: offer_amount,
      room_id: room_details.room_id,
      sender_id: room_details.sender_id,
      receiver_id: room_details.receiver_id,
      type: type,
      initial_offer_price,
    };
    try {
      await Post("mediahouse/newChatFlow", obj);
      getMessages(room_details.room_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("focus", () => {
      getMessages(room_details?.room_id || localStorage.getItem("roomId2"));
      ContentByID(JSON.parse(localStorage.getItem("contentId")));
    });
    return () =>
      window.removeEventListener("focus", () => {
        getMessages(room_details?.room_id || localStorage.getItem("roomId2"));
        ContentByID(JSON.parse(localStorage.getItem("contentId")));
      });
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="trackingList_wrap cht_tsk_trck feed-detail mb-0">
        <div className="feedsMain_wrap">
          <div className="feedsContainer mb-0">
            <div className="cht_tsk_rw d-flex">
              <div className="ps-0 pe-01 chat_loc_wp">
                <Card className="feeddetail-card left-card h-100">
                  <CardContent className="card-content">
                    {data?.content?.length === 1 &&
                      data?.content[0]?.media_type === "audio" && (
                        <div className="content_audio_img cont_swipe_aud">
                          <AudioPlayer
                            src={
                              process.env.REACT_APP_CONTENT_MEDIA +
                              data?.content[0]?.media
                            }
                          />
                        </div>
                      )}
                    {data?.content?.length === 1 &&
                      data?.content[0]?.media_type === "video" && (
                        <img
                          src={
                            process.env.REACT_APP_CONTENT_MEDIA +
                            data?.content[0]?.media
                          }
                          alt={null}
                        />
                      )}
                    {data?.content?.length === 1 &&
                      data?.content[0]?.media_type === "image" && (
                        <img
                          src={
                            data.paid_status === "paid"
                              ? process.env.REACT_APP_CONTENT_MEDIA +
                                data?.content[0]?.media
                              : data?.content[0]?.media
                          }
                          alt={null}
                        />
                      )}
                    {data?.content?.length > 1 && (
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                      >
                        {data &&
                          data.content.map((item) => {
                            return (
                              <SwiperSlide>
                                {item.media_type === "audio" ? (
                                  <div className="content_audio_img cont_swipe_aud">
                                    <AudioPlayer
                                      src={
                                        process.env.REACT_APP_CONTENT_MEDIA +
                                        item.media
                                      }
                                    />
                                  </div>
                                ) : item.media_type === "video" ? (
                                  <img
                                    src={
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      item.media
                                    }
                                    alt={null}
                                  />
                                ) : item?.media_type === "pdf" ? (
                                  <embed
                                    src={`${
                                      process.env.REACT_APP_CONTENT_MEDIA +
                                      item?.media
                                    }`}
                                    type="application/pdf"
                                    width="100%"
                                    height="500"
                                  />
                                ) : (
                                  <img
                                    src={process.env.REACT_APP_CONTENT_MEDIA +
                                      item.media
                                    }
                                    alt={null}
                                  />
                                )}
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    )}
                    <div className="feedTitle_content">
                      <h1 className="feedTitle">{data?.heading}</h1>
                      <p className="feed_descrptn">{data?.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="cht_tsk_wp">
                <Card className="feeddetail-card h-100 content-info">
                  <CardContent className="card-content">
                    <div className="sub-content">
                      <div className="heading w-100 d-flex align-items-center justify-content-between">
                        <Typography> Content info</Typography>
                        {data?.favourite_status && (
                          <div className="favourite">
                            <AiOutlineStar />
                            <span>Favourite</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="content">
                      <div className="sub-content">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Hopper</span>
                          <div className="item-in-right">
                            <img
                              src={
                                !data
                                  ? usric
                                  : process.env.REACT_APP_AVATAR_IMAGE +
                                    data?.hopper_id?.avatar_id?.avatar
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
                              <SlLocationPin /> <div>{data?.location}</div>
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
                              {/* {moment(data?.timestamp).format(
                                "h:mm A, DD MMM YYYY"
                              )} */}
                              {moment(data?.timestamp).format(
                                "h:mm A, D MMM YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sub-content tags_wrp">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Hashtags</span>
                          <div>
                            <div className="item-in-right hashtag-wrap">
                              {data &&
                                data?.tag_ids?.map((tag) => {
                                  return (
                                    <span className="mr">#{tag.name}</span>
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
                            <img
                              src={data?.category_id?.icon}
                              className="exclusive-img"
                              alt={data?.category_id?.name}
                            />
                            <span>
                              {data &&
                                capitalizeFirstLetter(data?.category_id?.name)}
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
                                data?.type === "exclusive" ? exclusive : shared
                              }
                              className="exclusive-img"
                              alt=""
                            />
                            <span>
                              {data && capitalizeFirstLetter(data?.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {data && (
                        <div className="foot cont-info-actions d-flex gap-5 justify-content-between align-items-center">
                          {messages && messages.length === 0 ? (
                            <Button
                              variant="secondary"
                              onClick={() => {
                                if (
                                  messages[0]?.message_type !== "offer_started"
                                ) {
                                  Start_Offer();
                                }
                              }}
                              disabled={loading}
                            >
                              Offer
                            </Button>
                          ) : messages?.length === 1 ? (
                            <Button disabled={true} className="greyBtn">
                              Offer
                            </Button>
                          ) : (
                            <Button
                              className="offeredPrice_btn bigBtn"
                              disabled={true}
                            >
                              £
                              {Number(
                                messages?.find(
                                  (el) =>
                                    el.message_type ===
                                      "accept_mediaHouse_offer" ||
                                    el.message_type ===
                                      "decline_mediaHouse_offer"
                                )?.amount
                              )?.toLocaleString("en-US", {
                                maximumFractionDigits: 2,
                              })}
                            </Button>
                          )}

                          {(data
                            ? !data?.purchased_mediahouse?.find(
                                (el) =>
                                  el ==
                                  JSON.parse(localStorage.getItem("user"))?._id
                              )
                            : !fav?.content_id?.purchased_mediahouse?.find(
                                (el) =>
                                  el ==
                                  JSON.parse(localStorage.getItem("user"))?._id
                              )) && (
                            <Link to={`/auto-invoice/${data._id}`}>
                              {" "}
                              <Button variant="primary">
                                £
                                {data
                                  ? data?.ask_price?.toLocaleString("en-US", {
                                      maximumFractionDigits: 2,
                                    }) || 0
                                  : fav?.content_id?.ask_price?.toLocaleString(
                                      "en-US",
                                      { maximumFractionDigits: 2 }
                                    ) || 0}
                              </Button>
                            </Link>
                          )}
                          {(data
                            ? data?.purchased_mediahouse?.find(
                                (el) =>
                                  el ===
                                  JSON.parse(localStorage.getItem("user"))?._id
                              )
                            : fav?.content_id?.purchased_mediahouse?.find(
                                (el) =>
                                  el ===
                                  JSON.parse(localStorage.getItem(user))?._id
                              )) && (
                            <Link className="w-100">
                              {" "}
                              <Button className="greyBtn">Paid</Button>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="d-flex gap_20 mt_20 justify-content-start">
              <ContentChatSocket
                getMessages={getMessages}
                messages={messages}
                room_details={room_details}
                offer_change={offer_change}
                count={data?.content?.length}
                data={data}
                NewExternalChatFun={NewExternalChatFun}
              />
              <Card className="chatmain participants">
                <CardContent className="chatting">
                  <div className="chatting_header d-flex align-items-start justify-content-start">
                    <p className="mb-0">Content</p>
                  </div>
                  <div className="chat_content_list" style={{maxHeight: "423px"}}>
                    {props.contents &&
                      props.contents.map((curr) => {
                        return (
                          <Card
                            className="list-card rcnt_act_card mb-3 active"
                            style={{
                              backgroundColor:
                                curr?._id == id ? "#DBDCDC" : "#fff",
                            }}
                            onClick={() => {
                              ContentByID(curr._id);
                              CreateRoom(curr.hopper_id, curr._id);
                              setOffer_change(!offer_change);
                              setId(curr?._id);
                            }}
                          >
                            <CardContent className="dash-c-body p-0 clickable active">
                              <div className="list-in d-flex align-items-start">
                                <div className="rateReview_content me-2">
                                  <span className="content-size">
                                    {
                                      curr?.content?.length || 0
                                    }
                                  </span>
                                  <img
                                    className="list-card-img"
                                    src={
                                      curr?.content[0]?.media_type === "video"
                                        ? process.env.REACT_APP_THUMBNAIL +
                                          curr?.content[0]?.media
                                        : curr?.content[0]?.media_type ===
                                          "audio"
                                        ? audioic
                                        : curr?.content[0]?.media_type === "pdf"
                                        ? docsic
                                        : process.env
                                        .REACT_APP_CONTENT_MEDIA + curr?.content?.[0]?.media
                                    }
                                    alt="1"
                                  />
                                </div>
                                <div className="list-in-txt">
                                  <Typography
                                    variant="body2"
                                    className="list-car-txt mb-2"
                                  >
                                    {curr.heading}
                                    <br />
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 12 }}
                                    color="#9DA3A3"
                                    gutterBottom
                                    className="crd_time d-flex align-items-center mb-0 txt_mdm"
                                  >
                                    <MdOutlineWatchLater color="#000" />
                                    {moment(curr?.createdAt).format(
                                      "h:mm A, DD MMM YYYY"
                                    )}
                                  </Typography>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentDtlChat;
