import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import {
  Avatar,
  Button,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
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
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineStar } from "react-icons/ai";
import { capitalizeFirstLetter } from "../component/Utils";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Chatinternal from "../component/Chatinternal";
import NoProfile from "../assets/images/blank-profile-picture.png";
import usric from "../assets/images/menu-icons/user.svg";
import audioic from "../assets/images/audimg.svg";
import { toast } from "react-toastify";
import socketServer from "../socket.config";

const GroupContentDtlChat = (props) => {
  const [data, setData] = useState();
  // setShow
  const [show, setShow] = useState({});
  const [senderId, setSenderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [detailContent, setDetailContent] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState([]);
  const [removeUserId, setRemoveUserId] = useState(null);
  const [addchatuser, setaddChatuser] = useState(null);
  // setRemoveUserId
  const getUserProfile = async () => {
    try {
      const res = await Get("mediaHouse/getProfile");
      if (res) {
        // console.log(res, '<<< Why the profile is here');
        setUserProfile(res?.data?.profile?._id);
      }
    } catch (error) { }
  };

  const GetUserList = async () => {
    const resp = await Post(`mediaHouse/getMediahouseUser`);
    if (resp) {
      setUserList(resp?.data?.response);
    }
  };

  const getDetailContent = async () => {
    try {
      let resp;
      if (props?.params?.type === "task") {
        resp = await Get(
          `mediaHouse/getuploadedContentbyHoppers?task_id=${props?.params?.contentId}`
        );
        setDetailContent(resp?.data?.uploadedContent);
      } else {
        resp = await Get(
          `mediaHouse/openContentMH?content_id=${props?.params?.contentId}`
        );
        setDetailContent(resp?.data?.response[0]);
      }
    } catch (error) {
      console.log(error)
    }
  };

  console.log("detailContent", detailContent, props?.params);

  const ChatList = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openChatsMH?room_id=${props?.params?.room_id}`
      );
      if (resp) {
        setMessage(resp?.data?.response?.data);
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    getDetailContent();
    getUserProfile();
    GetUserList();
    ChatList();
  }, [props?.params?.contentId, props?.params?.type, props?.params?.room_id]);

  //   Participants-
  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const AddParticipents = async () => {
    try {
      if (
        !localStorage.getItem("roomId") &&
        !localStorage.getItem("contentId")
      ) {
        return;
      }
      let obj = {
        type: "add",
        users: selectedIds,
        // content_id: localStorage.getItem("contentId")?.replace(/^"+|"+$/g, ""), // Remove extra quotes
        // room_id: localStorage.getItem("roomId")?.replace(/^"+|"+$/g, ""),
        content_id: props?.params?.contentId,
        room_id: props?.params?.room_id,
      };
      const resp = await Post("mediaHouse/internalGroupChatMH", obj);
      if (resp) {
        if (!socketServer || !socketServer.connected) {
          return;
        }
        socketServer.emit("room join", {
          room_id: localStorage.getItem("roomId")?.replace(/^"+|"+$/g, ""),
        });
        setaddChatuser(selectedIds);
        setSelectedIds([]);
        GetUserList();
        ChatList();
        getDetailContent();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: JSON.parse(localStorage.getItem("roomId")),
        }));
        ChatList();
        // toast.success('Group chat initiated');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // Handle errors
    }
  };

  const audioRef = useRef(null);
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  };

  const handleRemovechatuser = async (id) => {
    try {
      if (
        !localStorage.getItem("roomId") &&
        !localStorage.getItem("contentId")
      ) {
        return;
      }
      let obj = {
        type: "remove",
        users: [id],
        // content_id: localStorage.getItem("contentId")?.replace(/^"+|"+$/g, ""), // Remove extra quotes
        // room_id: localStorage.getItem("roomId")?.replace(/^"+|"+$/g, ""),
        content_id: props?.params?.contentId,
        room_id: props?.params?.room_id,
      };
      const resp = await Post("mediaHouse/deleteinternalGroupChatMH", obj);
      // window.location.reload();
      if (resp) {
        ChatList();
        getDetailContent();

        setSelectedIds([]);
        GetUserList();
        // setChatContentIds((pre) => ({
        //   ...pre,
        //   room_id: JSON.parse(localStorage.getItem("roomId")),
        // }));
        // toast.success('Group chat initiated');
        socketServer.emit("leave room", {
          room_id: JSON.parse(localStorage.getItem("roomId")),
        });
      }
    } catch (err) {
      console.log("all errorr", err);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="trackingList_wrap cht_tsk_trck feed-detail mb-0 internalChatCont">
        <div className="feedsMain_wrap">
          <div className="feedsContainer mb-0">
            <div className="cht_tsk_rw d-flex">
              <div className="ps-0 pe-01 chat_loc_wp">
                <Card className="feeddetail-card left-card h-100 ">
                  <CardContent className="card-content ">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                    >
                      {props?.params?.type == "content"
                        ? detailContent?.content?.map((item) => {
                          return (
                            <SwiperSlide>
                              {item.media_type === "audio" ? (
                                <div>
                                  <img
                                    src={audioic}
                                    alt={`Audio ${item._id}`}
                                    className="slider-img"
                                    onClick={toggleAudio}
                                  />
                                  <audio
                                    controls
                                    src={process.env.REACT_APP_CONTENT_MEDIA + item?.media}
                                    type="audio/mpeg"
                                    className="slider-audio"
                                    ref={audioRef}
                                  />
                                </div>
                              ) : item.media_type === "video" ? (
                                <video
                                  controls
                                  className="slider-vddo"
                                  src={process.env.REACT_APP_CONTENT_MEDIA + item?.media}
                                />
                              ) : item.media_type === "image" ? (
                                <img
                                  src={process.env.REACT_APP_CONTENT_MEDIA + item?.media}
                                  alt={null}
                                />
                              ) : item.media_type === "pdf" ? (
                                <embed
                                  src={process.env.REACT_APP_CONTENT_MEDIA + item?.media}
                                  type="application/pdf"
                                  width="100%"
                                  height="500"
                                />
                              ) : null}
                            </SwiperSlide>
                          );
                        })
                        : props?.params?.type === "task" && Array.isArray(detailContent) ? detailContent?.map((item) => {
                          return (
                            <SwiperSlide key={item?._id}>
                              {item?.content?.[0]?.type === "audio" ? (
                                <div>
                                  <img
                                    src={audioic}
                                    alt={`Audio ${item?.content?.[0]?._id}`}
                                    className="slider-img"
                                    onClick={toggleAudio}
                                  />
                                  <audio
                                    controls
                                    src={item?.content?.[0]?.videothubnail}
                                    type="audio/mpeg"
                                    className="slider-audio"
                                    ref={audioRef}
                                  />
                                </div>
                              ) : item?.content?.[0]?.type === "video" ? (
                                <video
                                  controls
                                  className="slider-vddo"
                                  src={item?.content?.[0]?.videothubnail}
                                />
                              ) : item?.content?.[0]?.type === "image" ? (
                                <img
                                  src={item?.content?.[0]?.videothubnail}
                                  alt={null}
                                />
                              ) : null}
                            </SwiperSlide>
                          );
                        }) : null}
                    </Swiper>

                    <div className="feedTitle_content">
                      <h1 className="feedTitle">
                        {props?.params?.type == "content"
                          ? detailContent?.heading
                          : detailContent?.[0]?.content?.[0]?.task_id?.heading}
                      </h1>
                      <p className="feed_descrptn">
                        {props?.params?.type == "content"
                          ? detailContent?.description
                          : detailContent?.[0]?.content?.[0]?.task_id?.task_description}
                      </p>
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
                                props?.params?.type === "content"
                                  ? process.env.REACT_APP_AVATAR_IMAGE +
                                  detailContent?.hopper_details?.[0]
                                    ?.avatar_details[0]?.avatar
                                  : process.env.REACT_APP_AVATAR_IMAGE +
                                  detailContent?.[0]?.content?.[0]?.avatar_details?.avatar
                              }
                              alt=""
                            />
                            <span>
                              {props?.params?.type === "content"
                                ? detailContent?.hopper_details?.[0]?.user_name
                                : detailContent?.[0]?.content?.[0]?.uploaded_by?.user_name}
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
                                {props?.params?.type === "content"
                                  ? detailContent?.location
                                  : detailContent?.[0]?.content?.[0]?.task_id?.location}
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
                              {props?.params?.type === "content"
                                ? moment(
                                  detailContent?.published_time_date
                                ).format("h:mm A, D MMM YYYY")
                                : moment(
                                  detailContent?.[0]?.content?.[0]?.task_id?.createdAt
                                ).format("h:mm A, D MMM YYYY")}
                            </span>
                          </div>
                        </div>
                      </div>
                      {props?.params?.type === "content" && (
                        <div className="sub-content tags_wrp">
                          <div className="item d-flex justify-content-between align-items-center">
                            <span className="fnt-bold">Hashtags</span>
                            <div>
                              <div className="item-in-right hashtag-wrap">
                                {detailContent &&
                                  detailContent?.tag_ids?.map((tag) => {
                                    return (
                                      <span className="mr">#{tag.name}</span>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="sub-content">
                        <div className="item d-flex justify-content-between align-items-center">
                          <span className="fnt-bold">Category</span>
                          <div className="">
                            <img
                              src={
                                props?.params?.type === "content"
                                  ? detailContent?.category_id?.[0]?.icon
                                  : detailContent?.[0]?.content?.[0]?.category_details?.icon
                              }
                              className="exclusive-img"
                              alt=""
                            />
                            <span>
                              {capitalizeFirstLetter(
                                props?.params?.type === "content"
                                  ? detailContent?.category_id?.[0]?.name
                                  : detailContent?.[0]?.content?.[0]?.category_details?.name
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {props?.params?.type === "content" && (
                        <div className="sub-content">
                          <div className="item d-flex justify-content-between align-items-center">
                            <span className="fnt-bold">License</span>
                            <div className="">
                              <img
                                src={
                                  detailContent?.type === "exclusive"
                                    ? exclusive
                                    : shared
                                }
                                className="exclusive-img"
                                alt=""
                              />
                              <span>
                                {capitalizeFirstLetter(detailContent?.type)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {props?.params?.type === "content" ?
                        detailContent?.ask_price && (
                          <div
                            className="foot"
                            style={{
                              marginTop: "2rem",
                              width: "100%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button variant="primary" style={{ width: "100%" }}>
                              £
                              {detailContent?.ask_price?.toLocaleString(
                                "en-US",
                                { maximumFractionDigits: 2 }
                              )}
                            </Button>
                          </div>
                        ) : (
                          <div className="button-group d-flex justify-content-between chat-content-price">
                            <div className="btn-1">
                              <p>Photo</p>
                              <button className="btn-price">
                                £ {detailContent?.[0]?.content?.[0]?.task_id?.hopper_photo_price || 0}
                              </button>
                            </div>
                            <div className="btn-1">
                              <p>Interview</p>
                              <button className="btn-price">
                                £{" "}
                                {detailContent?.[0]?.content?.[0]?.task_id?.hopper_interview_price ||
                                  0}
                              </button>
                            </div>
                            <div className="btn-1">
                              <p>Video</p>
                              <button className="btn-price">
                                £{" "}
                                {detailContent?.[0]?.content?.[0]?.task_id?.hopper_videos_price || 0}
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="d-flex gap_20 mt_20 justify-content-start">
              <Chatinternal
                room_id={props?.params?.room_id}
                user_id={userProfile}
                remove_user_id={removeUserId || ""}
                add_chat_user={addchatuser || ""}
              />
              <Card className="chatmain participants">
                <CardContent className="chatting">
                  <div className="chatting_header d-flex align-items-start justify-content-start mb-3">
                    <p className="mb-0 pb-2">Participants</p>
                  </div>
                  <div className="chat_content_list chatParticipantList">
                    <div className="scrollHtPnts chatCustomParticipant">
                      {userList?.map((curr) => {
                        return (
                          <div className="tab_in_card_items">
                            <div className="checkWrap">
                              <FormControlLabel
                                className={`me-0 ${!selectedIds.includes(curr._id) &&
                                  "afterCheck"
                                  }`}
                                checked={
                                  selectedIds.includes(curr._id) ||
                                  message?.some(
                                    (item) =>
                                      `${curr?.first_name} ${curr?.last_name}` ==
                                      item?.addedMsg && item.type == "add"
                                  )
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleCheckboxChange(curr._id); // Call add function when checked
                                  } else {
                                    handleRemovechatuser(curr?._id);
                                    setRemoveUserId(curr?._id);
                                  }
                                  // handleCheckboxChange(curr._id)
                                }}
                                control={<Checkbox defaultChecked />}
                              // disabled={message?.some(
                              //   (item) =>
                              //     `${curr?.first_name} ${curr?.last_name}` ==
                              //     item?.addedMsg
                              // )}
                              />
                            </div>
                            <div
                              className="img"
                              onClick={() => {
                                setSenderId(curr._id);
                                setShow({
                                  content: false,
                                  task: false,
                                  presshop: false,
                                  internal: true,
                                });
                              }}
                            >
                              <img
                                src={curr?.profile_image || usric}
                                alt="user"
                              />
                              <span>
                                {" "}
                                {curr.first_name + " " + curr?.last_name}
                              </span>
                              <span>
                                {message?.some(
                                  (item) =>
                                    `${curr?.first_name} ${curr?.last_name}` ===
                                    item?.addedMsg && item.type == "add"
                                  // ) && (
                                  //   <button
                                  //     // className="remove-btn"
                                  //     onClick={() => {
                                  //       handleRemovechatuser(curr._id);
                                  //       setRemoveUserId(curr?._id);
                                  //     }}
                                  //   >
                                  //     Remove
                                  //   </button>
                                  // )}
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    className="addPrtBtn btn w-100"
                    onClick={() => {
                      AddParticipents();
                    }}
                  >
                    Add
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupContentDtlChat;
