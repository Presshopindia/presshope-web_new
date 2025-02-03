import * as React from "react";
import {
  CardActions,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
// import usr1 from '../assets/images/usrimg11.svg';
import { BsArrowRight, BsMic } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdAdd } from "react-icons/md";
import { InputGroup } from "react-bootstrap";
import inpimg from "../assets/images/profile.webp";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import presshopchatic from "../assets/images/chat_logo.png";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Loader from "./Loader";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import { getFirestore } from "firebase/firestore";
import { getDatabase, set, onValue } from "firebase/database";
import tickic from "../assets/images/chat-icons/tick.svg";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import io from "socket.io-client";
import photoic from "../assets/images/camera.svg";
import contimg from "../assets/images/img10.jpg";
import contimg1 from "../assets/images/vthumbnail.png";
import videoic from "../assets/images/video.svg";

// rating start
import { Rating } from "react-simple-star-rating";
import { UserDetails } from "./Utils";
import { addVat } from "./commonFunction";

const socket = io.connect("https://uat.presshop.live:3005");

function ChatCardSocket(props) {
  const User = UserDetails;
  const [roomId, setRoomId] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(null);
  const [taskDetails, setTaskDetails] = useState();
  const [roomDetails, setRoomDetails] = useState();
  const [taskId, setTaskId] = useState();
  const [mediaMessage, setMediaMessage] = useState({
    // room_type: "",
    room_id: "",
    message: "",
    primary_room_id: "",
    sender_id: "",
    message_type: "",
    attachment_name: "",
    attachment_size: "",
    attachment: "",
    receiver_id: "",
  });
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  const Profile = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const resp = await Get(`mediaHouse/getProfile`);
      setProfileImage(resp.data.profile.admin_detail.admin_profile);
      setName(resp.data.profile.full_name);
    } catch (error) {
      setLoading(false);
    }
  };

  const JoinRoom = () => {
    socket.emit("room join", { room_id: roomDetails?.roomsdetails?.room_id });
  };

  useEffect(() => {
    JoinRoom();
  }, [roomDetails?.roomsdetails?.room_id]);

  useEffect(() => {
    getMessages();
  });

  const getMessages = async () => {
    const resp = await Post(`mediaHouse/getAllchat`, {
      room_id: roomDetails?.roomsdetails?.room_id,
    });
    setMessages(resp.data.response);
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("media", event.target.files[0]);
    formdata.append("path", "chatMedia");
    const resp = await Post(`mediaHouse/uploadUserMedia`, formdata);
    if (resp) {
      setMediaMessage({
        room_id: roomDetails.roomsdetails.room_id,
        message: msg,
        primary_room_id: roomDetails.roomsdetails._id,
        sender_id: roomDetails.roomsdetails.receiver_id,
        message_type: "media",
        attachment_name: event.target.files[0].name,
        attachment_size: event.target.files[0].size,
        attachment: resp.data.path,
        receiver_id: roomDetails.roomsdetails.sender_id,
      });
    }
  };

  const SendMedia = () => {
    socket.emit("media message", mediaMessage);
    socket.on("media message", (obj) => {});

    setMediaMessage({
      room_type: "",
      room_id: "",
      message: "",
      primary_room_id: "",
      sender_id: "",
      message_type: "",
      attachment_name: "",
      attachment_size: "",
      attachment: "",
      receiver_id: "",
    });
    setMsg("");
    getMessages();
  };

  const staticPayment = async (data) => {
    const obj = {
      image_id: data.image_id,
      sender_id: data.sender_id._id,
      receiver_id: data.receiver_id._id,
      room_id: data.room_id,
      sender_type: "mediahouse",
      amount: data.media.amount,
      message_type: "buy",
    };
    const resp = await Post("mediahouse/buyuploadedcontent", obj);
    if (resp) {
      getMessages();
    }
  };

  const stripePayment = async (curr) => {
    setLoading(true);

    let obj = {
      image_id: curr?.image_id,
      customer_id: UserDetails.stripe_customer_id,
      amount: curr?.media?.amount,
      type: "task_content",
      task_id: taskId,
      description: curr?.content?.heading || curr?.content?.description,
    };
    const resp = await Post("mediahouse/createPayment", obj);

    let obj1 = {
      room_id: curr?.room_id,
      sender_id: curr?.sender_id?._id,
      receiver_id: curr?.receiver_id?._id,
      sender_type: "mediahouse",
      message_type: "buy",
      amount: curr?.media?.amount,
    };

    socket.emit("offer message", obj1);
    setLoading(false);
    window.open(resp.data.url, "_blank");
    if (resp) {
    }
  };

  const DownloadContent = async (id) => {
    const resp = await Get(`mediahouse/image_pathdownload?image_id=${id}`);
    if (resp) {
      const filename = resp.data.message.slice(85);
      fetch(resp.data.message)
        .then((response) => response.blob())
        .then((blob) => {
          const downloadElement = document.createElement("a");
          const url = URL.createObjectURL(blob);
          downloadElement.href = url;
          downloadElement.download = filename;
          downloadElement.click();
          URL.revokeObjectURL(url);
        });
    }
  };

  const requestMoreContent = (curr) => {
    setLoading(true);

    try {
      let obj = {
        room_id: curr?.room_id,
        sender_id: curr?.sender_id?._id,
        receiver_id: curr?.receiver_id?._id,
        sender_type: "mediahouse",
        message_type: "request_more_content",
      };

      socket.emit("offer message", obj);
      socket.on("offer message", (obj) => {
        getMessages();
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [hoppers, setHoppers] = useState([]);
  const GetHoppers = async () => {
    setHoppers([]);
    try {
      const resp = await Get(
        `mediaHouse/findacceptedtasks?task_id=${
          props.id && props.id
        }&receiver_id=${User && User._id}&type=task_content`
      );
      if (resp) {
        setHoppers(resp.data.response);
      } else {
      }
    } catch (error) {}
  };

  const TaskDetails = async () => {
    // setLoading(true)
    try {
      const resp = await Get(
        `mediaHouse/live/expired/tasks?status=live&id=${props.id && props.id}`
      );
      setTaskDetails(resp.data.tasks);
      setTaskId(resp?.data?.tasks?._id);
    } catch (error) {
      //   setLoading(false)
    }
  };

  const RatingNReview = (curr) => {
    const obj = {
      room_id: curr?.room_id,
      sender_type: "Mediahouse",
      receiver_id: curr?.receiver_id?._id,
      sender_id: curr?.sender_id?._id,
      rating: rating,
      review: review,
      chat_id:
        messages &&
        messages.find((obj) => obj.message_type === "rating_mediaHouse")?._id,
      type: "task_content",
      image_id: curr?.image_id,
      message_type: "rating_mediaHouse",
    };
    console.log(obj);

    return;

    socket.emit("rating", obj);
    socket.on("rating", (obj) => {});
    getMessages(roomDetails?.roomsdetails?._id);
  };

  useEffect(() => {
    TaskDetails();
  }, [props.id]);

  useEffect(() => {
    GetHoppers();
  }, [props.id]);

  useEffect(() => {
    Profile();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="d-flex gap_20">
        <Card className="chatmain cht_ht">
          <CardContent className="chatting">
            <div className="chatting_header">
              <p className="mb-0">Manage Task</p>
            </div>
            <div className="chat_msgs_scrl">
              {roomDetails && (
                <div className="chatting_itm sngl_cht d-flex align-items-start">
                  <img src={presshopchatic} alt="User" className="usr_img" />
                  <div className="cht_txt">
                    <div className="d-flex align-items-center">
                      <p className="usr_name mb-0">Presshop</p>
                      <p className="cht_time mb-0">
                        {moment(roomDetails?.createdAt).format(
                          "h:mm A, D MMM YYYY"
                        )}
                      </p>
                    </div>
                    <p className="mb-0 msg">
                      This task has been accepted by{" "}
                      {roomDetails?.hopper_id?.user_name}
                    </p>
                    <div className="ofr_crd position-relative">
                      <img src={tickic} alt="Accepted" className="acpte" />
                      <p className="tsk_stts">Task Accepted</p>
                      <p className="tsk_descr">
                        {taskDetails.task_description}
                      </p>
                      <div className="btm_btns d-flex justify-content-between">
                        <div className="sngl_btn">
                          <p className="prc">
                            {taskDetails.need_photos === true
                              ? "£" + taskDetails.photo_price
                              : "--"}
                          </p>
                          <p className="offrd_txt">Offered</p>
                          <div className="cont_tp">Picture</div>
                        </div>
                        <div className="sngl_btn">
                          <p className="prc">
                            {taskDetails.need_interview === true
                              ? "£" + taskDetails.interview_price
                              : "--"}
                          </p>
                          <p className="offrd_txt">Offered</p>
                          <div className="cont_tp">Interview</div>
                        </div>
                        <div className="sngl_btn">
                          <p className="prc">
                            {taskDetails.need_videos === true
                              ? "£" + taskDetails.videos_price
                              : "--"}
                          </p>
                          <p className="offrd_txt">Offered</p>
                          <div className="cont_tp">Video</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {messages &&
                messages.map((curr, index) => {
                  const Ratingg =
                    messages &&
                    messages.find(
                      (item) => item?.message_type === "rating_mediaHouse"
                    );
                  const Ratings = Ratingg ? Ratingg?.rating : "";
                  return (
                    <>
                      {curr.message_type === "media" && (
                        <div className="chatting_itm sngl_cht d-flex align-items-start">
                          <img
                            src={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              roomDetails?.avatar_detals[0]?.avatar
                            }
                            alt="User"
                            className="usr_img"
                          />
                          <div className="cht_txt">
                            <div className="d-flex align-items-center">
                              <p className="usr_name mb-0">
                                {curr?.sender_id?.user_name}
                              </p>
                              <p className="cht_time mb-0">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </p>
                            </div>
                            <p className="mb-0 msg">
                              Has uploaded 1{" "}
                              {curr?.media?.thumbnail_url ? "Video" : "Image"}
                            </p>
                            <div className="content_uplded position-relative">
                              <span className="cont_tp">
                                <img src={photoic} alt="Content type" />
                              </span>
                              {curr?.media?.thumbnail_url ? (
                                <img
                                  src={
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                    curr?.media?.thumbnail_url
                                  }
                                  className="usr_upld_cont"
                                  alt="Content Image"
                                />
                              ) : (
                                <img
                                  src={
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                    curr?.media?.name
                                  }
                                  className="usr_upld_cont"
                                  alt="Content Image"
                                />
                              )}
                            </div>
                            <div className="usr_upld_opts">
                              {curr?.paid_status !== true ? (
                                <button
                                  className="theme_btn"
                                  onClick={() => {
                                    stripePayment(curr);
                                  }}
                                >
                                  Buy
                                </button>
                              ) : (
                                ""
                              )}
                              {curr?.paid_status !== true &&
                                curr?.request_sent === null && <span>or</span>}
                              {curr?.request_sent === null && (
                                <button
                                  className="secondary_btn"
                                  onClick={() => requestMoreContent(curr)}
                                >
                                  Request more content
                                </button>
                              )}
                            </div>
                            <p className="buy_btn_txt mb-0">
                              This content has been directly uploaded by the
                              Hopper on our platform. We have not reviewed the
                              content for authenticity & privacy, and are not
                              responsible. Please review the content properly
                              before purchasing it. Please{" "}
                              <a className="link">contact us </a>
                              should you wish to discuss this content.
                            </p>
                          </div>
                        </div>
                      )}

                      {curr?.paid_status === true && (
                        <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                          <div className="cht_txt">
                            <div className="d-flex align-items-center">
                              <p className="usr_name mb-0">Presshop</p>
                              <p className="cht_time mb-0">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </p>
                            </div>
                            <p className="mb-0 msg auto_press_msg">
                              Congrats, you’ve successfully purchased 1{" "}
                              {curr?.thumbnail_url ? "video" : "photo"} for £
                              {curr?.thumbnail_url
                                ? addVat(taskDetails.videos_price)
                                : addVat(taskDetails.photo_price)}{" "}
                              from {curr?.sender_id?.user_name}. Please download
                              the water-mark free, and high definition content,
                              by clicking below
                            </p>
                            <div className="usr_upld_opts">
                              <button
                                className="theme_btn"
                                onClick={() => DownloadContent(curr?.image_id)}
                              >
                                Download
                              </button>
                            </div>
                            <p className="buy_btn_txt mb-0">
                              Please refer to our{" "}
                              <a className="link">licensing terms of usage</a>,
                              and <a className="link">terms and conditions</a>.
                              If you have any questions, please{" "}
                              <a className="link">chat</a> or{" "}
                              <a className="link">contact</a> our helpful teams
                              who are available 24x7 to assist you. Thank you.
                            </p>
                          </div>
                        </div>
                      )}
                      {curr.message_type === "request_more_content" && (
                        <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start">
                          <img
                            src={curr?.receiver_id?.profile_image}
                            alt="User"
                            className="usr_img"
                          />
                          <div className="cht_txt">
                            <div className="d-flex align-items-center">
                              <p className="usr_name mb-0">
                                {curr?.receiver_id?.first_name +
                                  " " +
                                  curr?.receiver_id?.last_name}
                                {/* <img src={presshopchatic} alt="Presshop logo" className='ms-1' /> */}
                              </p>
                              <p className="cht_time mb-0">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </p>
                            </div>
                            <p className="mb-0 msg auto_press_msg">
                              Has requested for more content from{" "}
                              {curr?.sender_id?.user_name}
                            </p>
                          </div>
                        </div>
                      )}

                      {curr.paid_status && (
                        <div className="chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                          <div className="cht_txt">
                            <div className="d-flex align-items-center">
                              <p className="usr_name mb-0">Presshop</p>
                              <p className="cht_time mb-0">
                                {moment(curr?.createdAt).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </p>
                            </div>
                            <p className="mb-0 msg auto_press_msg">
                              Rate your experience with{" "}
                              {curr?.sender_id?.user_name}
                            </p>
                            <div className="usr_upld_opts">
                              <Rating
                                onClick={handleRating}
                                disabled={!Number(Ratings)}
                                initialValue={Ratings ? Number(Ratings) : 0}
                                value={rating}
                              />
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Control
                                  placeholder="Write your review"
                                  disabled={curr.review}
                                  value={curr.review ? curr.review : review}
                                  onChange={(e) => {
                                    setReview(e.target.value);
                                  }}
                                  as="textarea"
                                  rows={3}
                                ></Form.Control>
                              </Form.Group>
                              {!curr.rating && (
                                <button
                                  className="theme_btn"
                                  onClick={() => RatingNReview(curr)}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {curr.message_type === "reject_mediaHouse_offer" &&
                        !curr.paid_status && (
                          <div className="chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                            <img
                              src={presshopchatic}
                              alt="User"
                              className="usr_img"
                            />
                            <div className="cht_txt">
                              <div className="d-flex align-items-center">
                                <p className="usr_name mb-0">Presshop</p>
                                <p className="cht_time mb-0">
                                  {moment(curr?.createdAt).format(
                                    "h:mm A, D MMM YYYY"
                                  )}
                                </p>
                              </div>
                              <p className="mb-0 msg auto_press_msg">
                                Rate your experience with Pseudonymous
                              </p>
                              <div className="usr_upld_opts">
                                <Rating
                                  onClick={handleRating}
                                  value={rating}
                                  disabled={!Number(Ratings)}
                                  initialValue={Ratings ? Number(Ratings) : 0}
                                />
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Control
                                    placeholder="Write your review"
                                    disabled={curr.review}
                                    value={curr.review ? curr.review : review}
                                    onChange={(e) => {
                                      setReview(e.target.value);
                                    }}
                                    as="textarea"
                                    rows={3}
                                  ></Form.Control>
                                </Form.Group>
                                <button
                                  className="theme_btn"
                                  onClick={() => RatingNReview(curr.image_id)}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                    </>
                  );
                })}
            </div>
          </CardContent>
        </Card>
        <Card className="chatmain participants">
          <CardContent className="chatting">
            <div className="chatting_header d-flex align-items-start justify-content-between">
              <p className="mb-0">Hoppers</p>
            </div>
            <div className="chat_content_list">
              {hoppers &&
                hoppers.map((curr) => {
                  return (
                    <div
                      className="chatting_itm d-flex align-items-center justify-content-space-between"
                      onClick={() => setRoomDetails(curr)}
                    >
                      <img
                        src={
                          process.env.REACT_APP_AVATAR_IMAGE +
                          curr.avatar_detals[0].avatar
                        }
                        alt="User"
                        className="usr_img"
                      />
                      <div className="cht_txt w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="usr_name mb-0">
                            {curr.hopper_id.user_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default React.memo(ChatCardSocket);
