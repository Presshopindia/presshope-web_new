import { Card } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";

import { RxCross1 } from "react-icons/rx";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import contactic from "../assets/images/chat-icons/contactus.svg";
import externalchatic from "../assets/images/chat-icons/externalchat.svg";
import internalchatic from "../assets/images/chat-icons/internalchat.svg";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import cameraic from "../assets/images/camera.svg";
import interviewic from "../assets/images/interview.svg";
import ChatCard from "../component/ChatCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";

import { GoogleMap, Marker } from "@react-google-maps/api";
import moment from "moment/moment";
import ChatCardSocket from "../component/ChatCardSocket";
import Chatbroadcasttask from "../component/Chatbroadcasttask";
import { Get, Post } from "../services/user.services";
import ContentDtlChat from "./ContentDtlChat";

import lastmsgImage from "../assets/images/image-svgrepo-com.svg";
import GroupContentDtlChat from "./GroupContentDtlChat";

import { useDarkMode } from "../context/DarkModeContext";
import Loader from "../component/Loader";
import socketServer from "../socket.config";
import presshopLogo from "../assets/images/chat_logo.png";


const Chat = () => {
  const [liveTasks, setLiveTasks] = useState();
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [userList, setUserList] = useState([]);
  // const [senderId, setSenderId] = useState(
  //   (localStorage.getItem("receiverId") &&
  //     JSON.parse(localStorage.getItem("receiverId"))) ||
  //     "64bfa693bc47606588a6c807"
  // );
  const [senderId, setSenderId] = useState();
  // (localStorage.getItem("receiverId") &&
  //   JSON.parse(localStorage.getItem("receiverId"))) ||
  //   "64bfa693bc47606588a6c807"
  const [fav, setFav] = useState(false);
  const [PublishedData, setPublishedData] = useState([]);
  const [hopperList, setHopperList] = useState([]);
  const [contentList, setContentlist] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [groupIds, setGroupIds] = useState({
    contentId:
      localStorage.getItem("tabName") &&
        JSON.parse(localStorage.getItem("tabName")) == "internal"
        ? JSON.parse(localStorage.getItem("contentId"))
        : JSON.parse(localStorage.getItem("tabName")) == "external"
          ? localStorage.getItem("hopperid")
          : "",
    type: localStorage.getItem("type") == "task" ? "task" : "content",
    room_id: localStorage.getItem("roomId") || "",
    taskId: "",
    _id: "",
  });

  const [show, setShow] = useState({
    content:
      localStorage.getItem("tabName") &&
        JSON.parse(localStorage.getItem("tabName")) == "external" &&
        localStorage.getItem("type") == "content"
        ? true
        : false,
    task:
      localStorage.getItem("tabName") &&
        JSON.parse(localStorage.getItem("tabName")) == "external" &&
        localStorage.getItem("type") == "task"
        ? true
        : false,
    presshop:
      !localStorage.getItem("tabName") ||
        JSON.parse(localStorage.getItem("tabName")) == "presshop"
        ? true
        : false,
    internal:
      localStorage.getItem("tabName") &&
        JSON.parse(localStorage.getItem("tabName")) == "internal"
        ? true
        : false,
  });

  const { profileData } = useDarkMode();
  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const GetAdminList = async () => {
    const resp = await Get(`mediaHouse/adminlist`);
    setAdminList(resp.data.data);
  };

  useEffect(() => {
    socketServer?.on("getAdmins", (data) => {
      setAdmins(data);
    });
  }, [socketServer]);

  const GetUserList = async () => {
    const resp = await Get(
      `mediaHouse/getdesignatedUSer?allow_to_chat_externally=true`
    );
    setUserList(resp?.data?.response);
  };

  const [group, setGroup] = useState([]);

  const getGroups = async () => {
    try {
      const resp = await Post(`mediaHouse/internalGroupChatMH`, {
        type: "is_group_exists",
      });
      if (resp) {
        let updatedResp = resp?.data?.data;
        if (profileData?.role !== "MediaHouse") {
          updatedResp = updatedResp?.filter((el) =>
            el?.user_details?.map((e) => e?._id)?.includes(profileData?._id)
          );
        }
        setGroup(updatedResp);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getGroups();
  }, [profileData]);

  const LiveTasks = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediaHouse/live/expired/tasks?status=live`);
      setLiveTasks(resp.data.tasks);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFavourite = () => {
    setFav(!fav);
    PublishContent();
  };

  const PublishContent = async () => {
    setLoading(true);

    try {
      const resp = await Post("mediaHouse/view/published/content");
      setPublishedData(resp.data.content);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const HopperList = async () => {
    setLoading(true);

    try {
      const resp = await Get(`mediahouse/getallhopperlist`);
      // localStorage.setItem("hopperList", JSON.stringify(resp?.data?.response))
      setHopperList(resp.data.response);
      if (resp) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const ContentList = async (hopper_id) => {
    // setLoading(true);

    try {
      const resp = await Get(
        `mediahouse/getallpublishedcontent?hopper_id=${hopper_id}`
      );
      setContentlist(resp.data.response);
      if (resp) {
        setLoading(false);
        if(resp.data.response?.[0]?._id) {
          localStorage.setItem("contentId", JSON.stringify(resp.data.response?.[0]?._id))
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUnseenMsg = async (payload) => {
    setLoading(true);

    try {
      const resp = await Post(`mediahouse/updateseenforInternalchat`, {
        room_id: payload?.room_id,
      });
      if (resp) {
        setLoading(false);
        getGroups();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    PublishContent();
  }, [fav]);

  useEffect(() => {
    LiveTasks();
    GetAdminList();
    GetUserList();
    HopperList();

    if (localStorage.getItem("hopperid")) {
      ContentList(localStorage.getItem("hopperid"));
      GetUserList();
      // localStorage.removeItem('hopperid')
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="chat_wrap page-wrap">
        {localStorage.getItem("backBtnVisibility") && (
          <Link onClick={() => history.back()} className="back_link mb-3">
            <BsArrowLeft className="text-pink" />
            Back
          </Link>
        )}
        <Container fluid className="p-0">
          <div className="d-flex cht_cards_wrap">
            <Card className="cht_lft_card">
              <Accordion
                defaultActiveKey={JSON.parse(localStorage.getItem("tabName")) || "presshop"}
                onSelect={(e) => {
                  localStorage.setItem("tabName", JSON.stringify(e));
                }}
                className="cht_accrdn"
              >
                <Accordion.Item className="cht_accdn_item" eventKey="external">
                  <Accordion.Header>
                    <img src={externalchatic} alt="external chat" /> Hopper Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="external_tbs">
                      <Tabs
                        defaultActiveKey="content"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="content" title="Content">
                          <div className="chat_list">
                            {hopperList?.map((curr) => {
                              return (
                                <div
                                  className={`chat_usr_itm d-flex align-items-center clickable relative ${groupIds?.contentId === curr._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    ContentList(curr._id);
                                    setShow({
                                      content: true,
                                      task: false,
                                      presshop: false,
                                    });
                                    setGroupIds({
                                      ...groupIds,
                                      contentId: curr._id,
                                    });
                                    localStorage.setItem("hopperid", curr?._id)
                                  }}
                                >
                                  <div className="cht_inn w-100 d-flex align-items-center">
                                    <div className="usr_img_wrp position-relative">
                                      <a>
                                        {" "}
                                        <img
                                          src={
                                            process.env.REACT_APP_AVATAR_IMAGE +
                                            curr.hopper_id?.avatar_id?.avatar
                                          }
                                          alt="user image"
                                        />
                                      </a>
                                    </div>
                                    <div className="cht_dtl d-flex justify-content-between w-100">
                                      <div className="cht_txt d-flex flex-column">
                                        <p className="usr_nme mb-0">
                                          <a> {curr?.hopper_id?.user_name}</a>
                                        </p>
                                        <p className="msg_dlt mb-0">
                                          <a> Please send more pics for...</a>
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="cht_time d-flex flex-column align-items-end">
                                      {" "}
                                      {curr?.hopper_id?.updatedAt
                                        ? moment(
                                          curr?.hopper_id?.updatedAt
                                        ).format("h:mm A, D MMM YYYY")
                                        : ""}
                                    </span>
                                  </div>
                                  {
                                    (show.content && curr?._id === groupIds?.contentId) && (
                                      <RxCross1 className="close-chat" onClick={(e) => {
                                        e.stopPropagation();
                                        setShow({ ...show, content: false })
                                      }} />
                                    )
                                  }
                                </div>
                              );
                            })}
                          </div>
                        </Tab>

                        <Tab eventKey="task" title="Task">
                          <div className="chat_list">
                            {liveTasks?.filter((el) => el?.content?.length > 0)?.map((curr) => {
                              return (
                                <div
                                  className={`chat_usr_itm d-flex align-items-center relative clickable ${show.task && taskId === curr._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setTaskId(curr._id);
                                    setShow({
                                      content: false,
                                      task: true,
                                      presshop: false,
                                    });
                                  }}
                                >
                                  <div className="cht_inn w-100 d-flex align-items-center">
                                    <div className="mapInput">
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
                                          height: "40px",
                                          width: "40px",
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
                                            lat: curr?.address_location
                                              ?.coordinates[0],
                                            lng: curr?.address_location
                                              ?.coordinates[1],
                                          }}
                                        />
                                      </GoogleMap>
                                    </div>
                                    <div className="cht_dtl d-flex justify-content-between w-100">
                                      <div className="cht_txt d-flex flex-column">
                                        <p className="usr_nme mb-0">
                                          <a> {curr.task_description}</a>
                                        </p>
                                        <p className="msg_dlt mb-0">
                                          <a> {curr.location}</a>
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="cht_time d-flex flex-column align-items-end">
                                        {" "}
                                        {curr?.updatedAt
                                          ? moment(
                                            curr?.updatedAt
                                          ).format("h:mm A, D MMM YYYY")
                                          : ""}
                                      </span>
                                    </div>
                                    {
                                      (show.task && curr?._id === taskId) && (
                                        <RxCross1 className="close-chat" onClick={(e) => {
                                          e.stopPropagation();
                                          setShow({ ...show, task: false })
                                        }} />
                                      )
                                    }
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="cht_accdn_item" eventKey="internal">
                  <Accordion.Header>
                    <img src={internalchatic} alt="Internal chat" />
                    Internal Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="chat_list">
                      {group
                        ?.sort(
                          (a, b) =>
                            new Date(b?.latest_messege[0]?.createdAt || 0) -
                            new Date(a?.latest_messege[0]?.createdAt || 0)
                        )
                        ?.map((curr, index) => {
                          return (
                            <div
                              className={`relative chat_usr_itm d-flex align-items-center ${groupIds?.contentId === curr?.content_id && (groupIds?.room_id === curr?.room_id ? "active" : "")}`}
                              style={{ cursor: "pointer" }}
                              key={index}
                              onClick={() => {
                                setShow({
                                  content: false,
                                  task: false,
                                  presshop: false,
                                  internal: true,
                                });
                                setGroupIds((pre) => ({
                                  ...pre,
                                  contentId: curr?.content_id,
                                  room_id: curr?.room_id,
                                  taskId: "",
                                  _id: index,
                                  type: curr?.room_type,
                                }));
                                localStorage.setItem("type", curr?.room_type);
                                handleUnseenMsg(curr);
                              }}
                            >
                              <div className="cht_inn w-100 d-flex align-items-center">
                                <div className="usr_img_wrp position-relative">
                                  <a>
                                    {" "}
                                    <img
                                      src={curr?.profile_image}
                                      alt="user image"
                                    />{" "}
                                  </a>
                                  {/* <div className="status">
                                    <span className="active"></span>
                                  </div> */}
                                </div>
                                <div className="cht_dtl d-flex justify-content-between w-100">
                                  <div className="cht_txt d-flex flex-column auto-width">
                                    <p className="usr_nme mb-0">
                                      <a>
                                        {" "}
                                        {curr?.first_name +
                                          " " +
                                          curr?.last_name}
                                      </a>
                                    </p>
                                    <p className="msg_dlt mb-0">
                                      <a>
                                        {curr?.latest_messege[0]?.type ===
                                          "text" ? (
                                          curr?.latest_messege[0]?.message
                                        ) : curr?.latest_messege[0]?.type ===
                                          "image" ? (
                                          <img
                                            className="lastmsgcamera"
                                            src={cameraic}
                                            alt="last msg"
                                          />
                                        ) : (
                                          <img
                                            className="lastmsgcamera"
                                            src={interviewic}
                                            alt="last msg"
                                          />
                                        )}
                                      </a>
                                    </p>
                                  </div>
                                  <div className="cht_time d-flex flex-column align-items-end">
                                    {curr?.datofUnreadmessege != 0 &&
                                      index != 0 && (
                                        <span className="msg_count">
                                          {curr?.datofUnreadmessege}
                                        </span>
                                      )}
                                    <span className="msg_time">
                                      {moment(
                                        curr?.latest_messege[0]?.createdAt
                                      ).format("h:mm A, D MMM YYYY z")}
                                    </span>
                                  </div>
                                  {
                                    (show.internal && curr?.content_id === groupIds?.contentId) && (
                                      <RxCross1 className="close-chat" onClick={(e) => {
                                        e.stopPropagation();
                                        setShow({ ...show, internal: false })
                                      }} />
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item className="cht_accdn_item" eventKey="presshop">
                  <Accordion.Header>
                    <img src={contactic} alt="presshop chat" /> PressHop Chat
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="chat_list">
                      <div
                        className={`chat_usr_itm d-flex align-items-center clickable relative ${show.presshop
                          ? "active activeChat"
                          : ""
                          }`}
                        onClick={() => {
                          setShow({
                            content: false,
                            task: false,
                            presshop: true,
                          });
                        }}
                      >
                        <div className="cht_inn w-100 d-flex align-items-center">
                          <div className="usr_img_wrp position-relative">
                            <img
                              src={presshopLogo}
                              alt="Emily"
                            />
                            <div className="status">
                              <span className="active"></span>
                            </div>
                          </div>
                          <div className="cht_dtl d-flex justify-content-between w-100">
                            <div className="cht_txt d-flex flex-column">
                              <p className="usr_nme mb-0">
                                <a>Emily</a>
                              </p>
                            </div>
                            {
                              show.presshop && (
                                <RxCross1 className="close-chat" onClick={(e) => {
                                  e.stopPropagation();
                                  setShow({ ...show, presshop: false })
                                }} />
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>

            <div className="d-flex flex-column w_70">
              {show.task && (
                <div className="tsk_wdth cht_tasks">
                  <div className="mb-0">
                    <Chatbroadcasttask id={taskId} />
                  </div>
                </div>
              )}
              <div className="cht_tsk_cht d-flex flex-column">
                {show.presshop && <ChatCard senderId={senderId} />}
                {show.internal && <GroupContentDtlChat params={groupIds} />}
                {show.task && <ChatCardSocket id={taskId} />}
                {show.content && (
                  <ContentDtlChat contents={contentList} users={userList} />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <TopSearchesTipsCard />
          </div>
        </Container>
      </div>
      <DbFooter />
    </>
  );
};

export default memo(Chat);
