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
import audioic from "../assets/images/audimg.svg";
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
import photoic from "../assets/images/camera.svg";
import contimg from "../assets/images/img10.jpg";
import contimg1 from "../assets/images/vthumbnail.png";
import videoic from "../assets/images/video.svg";

// rating start
import { Rating } from "react-simple-star-rating";
import { UserDetails } from "./Utils";
import { addVat, contentUploadedMsgInTaskChat, formatAmountInMillion } from "./commonFunction";
import socketServer from "../socket.config";

function ChatCardSocket(props) {
  const User = UserDetails;
  const [taskExpireDiff, setTaskExpireDiff] = useState(null);
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
    socketServer.emit("room join", { room_id: roomDetails?.roomsdetails?.room_id });
  };

  useEffect(() => {
    JoinRoom();
  }, [roomDetails?.roomsdetails?.room_id]);

  useEffect(() => {
    getMessages();
  });

  const getMessages = async () => {
    if (!roomDetails?.roomsdetails?.room_id) {
      return;
    }
    const resp = await Post(`mediaHouse/getAllchat`, {
      room_id: roomDetails?.roomsdetails?.room_id,
    });
    setMessages(resp.data.response);
  };

  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        // Handle play error, if any
      });
    } else {
      audio.pause();
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (item, isChecked) => {
    setSelectedItems((prev) => {
      if (isChecked) {
        // Add the item if it is checked
        return [...prev, item];
      } else {
        // Remove the item if it is unchecked
        return prev.filter((selectedItem) => selectedItem._id !== item._id);
      }
    });
  };

  console.log("roomDetails", roomDetails)
  const stripePayment = async (curr) => {
    setLoading(true);
    let totalAmount = 0;
    selectedItems.forEach((ele) => {
      totalAmount += Number(ele.amount);
    });
    let obj = {
      items: selectedItems,
      customer_id: User?.stripe_customer_id,
      stripe_account_id: curr?.sender_id?.stripe_account_id || "no data",
      amount: totalAmount || curr?.media?.amount,
      type: "task_content",
      task_id: taskDetails?._id,
      description: taskDetails?.heading,
      room_id: roomDetails?.roomsdetails?.room_id,
      chat_id: curr?._id,
      hopper_id: roomDetails?.hopper_id?._id
    };
    try {
      const resp = await Post("mediahouse/createPayment", obj);
      setLoading(false);
      window.open(resp.data.url, "_blank");
    }
    catch (error) {
      setLoading(false);
    }
  };


  const DownloadContent = async (id) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=task`,
      "_blank"
    );
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

      socketServer.emit("offer message", obj);
      socketServer.on("offer message", (obj) => {
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
        `mediaHouse/findacceptedtasks?task_id=${props.id && props.id
        }&receiver_id=${User && User._id}&type=task_content`
      );
      if (resp) {
        setHoppers(resp.data.response);
      } else {
      }
    } catch (error) { }
  };

  const TaskDetails = async () => {
    // setLoading(true)
    try {
      const resp = await Get(
        `mediaHouse/live/expired/tasks?status=live&id=${props.id && props.id}`
      );
      setTaskDetails(resp.data.tasks);
      setTaskId(resp?.data?.tasks?._id);
      const deadlineDate = moment(resp?.data?.data?.[0]?.task_id?.deadline_date);
      const newDateDiff = nowDate.diff(deadlineDate, "hours");
      setTaskExpireDiff(newDateDiff);
    } catch (error) {
      //   setLoading(false)
    }
  };

  const [features, setFeatures] = useState([]);
  const handleFeatures = (val) => {
    if (features.includes(val)) {
      const data = features.filter((el) => el != val);
      setFeatures(data);
    } else {
      setFeatures([...features, val]);
    }
  };

  // const RatingNReview = (curr) => {
  //   const obj = {
  //     room_id: curr?.room_id,
  //     sender_type: "Mediahouse",
  //     receiver_id: curr?.receiver_id?._id,
  //     sender_id: curr?.sender_id?._id,
  //     rating: rating,
  //     review: review,
  //     chat_id:
  //       messages &&
  //       messages.find((obj) => obj.message_type === "rating_mediaHouse")?._id,
  //     type: "task_content",
  //     image_id: curr?.image_id,
  //     message_type: "rating_mediaHouse",
  //   };
  //   console.log(obj);

  //   return;

  //   socketServer.emit("rating", obj);
  //   socketServer.on("rating", (obj) => { });
  //   getMessages(roomDetails?.roomsdetails?._id);
  // };

  const RatingNReview = (curr) => {
    if (!roomDetails?.roomsdetails?._id) {
      alert("Room id is important")
    }
    const obj = {
      room_id: curr?.room_id,
      sender_type: "Mediahouse",
      receiver_id: curr?.receiver_id?._id,
      sender_id: curr?.sender_id?._id,
      rating: rating,
      review: review,
      type: "task_content",
      image_id: curr?._id,
      features: features,
      message_type: "rating_by_mediahouse",
      paid_status: curr?.paid_status,
    };
    socketServer.emit("rating", obj);
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
                      <h5 className="usr_name mb-0">PressHop</h5>
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
                              ? "£" + formatAmountInMillion(
                                 taskDetails.photo_price
                               )
                              : "--"}
                          </p>
                          <p className="offrd_txt">Offered</p>
                          <div className="cont_tp">Picture</div>
                        </div>
                        <div className="sngl_btn">
                          <p className="prc">
                            {taskDetails.need_interview === true
                              ? "£" + formatAmountInMillion(
                                taskDetails.interview_price 
                              )
                              : "--"}
                          </p>
                          <p className="offrd_txt">Offered</p>
                          <div className="cont_tp">Interview</div>
                        </div>
                        <div className="sngl_btn">
                          <p className="prc">
                            {taskDetails.need_videos === true
                              ? "£" + formatAmountInMillion(
                                taskDetails.videos_price
                              )
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
              {messages?.map((curr, index) => {
                const Ratingg = messages?.find((item) => item?.message_type === "rating_mediaHouse");
                const Ratings = Ratingg ? Ratingg?.rating : "";
                return (
                  <>
                    {curr.message_type === "media" && (
                      <div className="chatting_itm sngl_cht d-flex align-items-start">
                        <img
                          src={process.env.REACT_APP_AVATAR_IMAGE + roomDetails?.avatar_detals[0]?.avatar}
                          alt="User"
                          className="usr_img"
                        />
                        <div className="cht_txt">
                          <div className="d-flex align-items-center">
                            <p className="usr_name mb-0">
                              {curr?.sender_id?.user_name}
                            </p>
                            <p className="cht_time mb-0">
                              {moment(curr?.createdAt).format("h:mm A, D MMM YYYY")}
                            </p>
                          </div>
                          <p className="mb-0 msg">
                            {contentUploadedMsgInTaskChat(curr?.media)}
                          </p>
                          <div className="content_uplded position-relative vido_cnt">
                            {curr?.media?.map(
                              (item, index) => (
                                <div className="mb-13">
                                  {!item.paid_status ? (
                                    <div
                                      key={
                                        item?._id ||
                                        index
                                      }
                                      className="media-item"
                                    >
                                      <label className="checkbox-label">
                                        <input
                                          type="checkbox"
                                          className="media-checkbox z-1000"
                                          onChange={(e) => handleSelectionChange(item, e.target.checked)}
                                        />
                                      </label>

                                      {item?.mime ===
                                        "image" ? (
                                        <img
                                          src={`${item?.thumbnail_url}`}
                                          className="usr_upld_cont"
                                          alt={`Content Image ${index + 1}`}
                                        />
                                      ) : item?.mime ===
                                        "video" ? (
                                        <video
                                          controls
                                          className="slider-vddo"
                                          src={`${process.env.REACT_APP_UPLOADED_CONTENT + item?.name}`}
                                        />
                                      ) : item?.mime ===
                                        "audio" ||
                                        item?.mime ==
                                        "" ? (
                                        <div>
                                          <img
                                            src={
                                              audioic
                                            }
                                            alt={`Audio ${item?._id}`}
                                            className="slider-img"
                                            onClick={
                                              toggleAudio
                                            }
                                          />
                                          <audio
                                            controls
                                            src={`${process.env.REACT_APP_CONTENT_MEDIA + item?.name}`}
                                            type="audio/mpeg"
                                            className="slider-audio"
                                            ref={
                                              audioRef
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <p>
                                          Unsupported
                                          media type
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      {item?.mime ===
                                        "image" ? (
                                        <img
                                          src={`${item?.thumbnail_url}`}
                                          className="usr_upld_cont"
                                          alt={`Content Image ${index + 1
                                            }`}
                                        />
                                      ) : item?.mime ===
                                        "video" ? (
                                        <video
                                          controls
                                          className="slider-vddo"
                                          src={`${process.env.REACT_APP_UPLOADED_CONTENT + item?.name}`}
                                        />
                                      ) : item?.mime ===
                                        "audio" ||
                                        item?.mime ==
                                        "" ? (
                                        <div>
                                          <img
                                            src={
                                              audioic
                                            }
                                            alt={`Audio ${item?._id}`}
                                            className="slider-img"
                                            onClick={
                                              toggleAudio
                                            }
                                          />
                                          <audio
                                            controls
                                            src={`${process.env.REACT_APP_CONTENT_MEDIA + item?.name}`}
                                            type="audio/mpeg"
                                            className="slider-audio"
                                            ref={
                                              audioRef
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <p>
                                          Unsupported media type
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                              )
                            )}
                          </div>

                          <div className="usr_upld_opts">
                            <div className="d-flex gap_20">
                              <button
                                className={curr?.media?.filter((el) => el.paid_status)?.length > 0 ? "light-gray-bg txt_bld" : "theme_btn"}
                                onClick={() => {
                                  if (taskExpireDiff >= 1) {
                                    successToasterFun("This task has been expired");
                                  } else {
                                    if (curr?.media?.filter((el) => el.paid_status)?.length > 0) {
                                      return;
                                    } else {
                                      stripePayment(curr);
                                    }
                                  }
                                }}
                              >
                                Add to basket
                              </button>
                              <button
                                className={curr?.media?.filter((el) => el.paid_status)?.length > 0 ? "light-gray-bg txt_bld" : "theme_btn"}
                                onClick={() => {
                                  if (taskExpireDiff >= 1) {
                                    successToasterFun("This task has been expired");
                                  } else {
                                    if (curr?.media?.filter((el) => el.paid_status)?.length > 0) {
                                      return;
                                    } else {
                                      stripePayment(curr);
                                    }
                                  }
                                }}
                              >
                                Buy
                              </button>
                            </div>
                            <span className="txt_mdm">or</span>
                            <button
                              className={curr?.request_sent ? "light-gray-bg txt_bld" : "secondary_btn"}
                              onClick={() => {
                                if (taskExpireDiff >= 1) {
                                  successToasterFun("This task has been expired");
                                } else {
                                  if (curr?.request_sent) {
                                    return;
                                  } else {
                                    requestMoreContent(curr);
                                  }
                                }
                              }}
                            >
                              Request more content
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {curr?.message_type === "PaymentIntent" && (
                      <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start">
                        <img
                          src={presshopchatic}
                          alt="User"
                          className="usr_img"
                        />
                        <div className="cht_txt">
                          <div className="d-flex align-items-center">
                            <p className="usr_name mb-0">
                              PressHop
                            </p>
                            <p className="cht_time mb-0">
                              {moment(curr?.createdAt).format("h:mm A, D MMM YYYY")}
                            </p>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Congrats, you’ve purchased the content for £{formatAmountInMillion(+(curr?.amount_paid))}.{" "}
                            Please download the water-mark free, and high definition content, by clicking below.
                          </p>
                          <div className="usr_upld_opts">
                            <button
                              className="theme_btn"
                              onClick={() => DownloadContent(curr?.content?.join(","))}
                            >
                              Download
                            </button>
                          </div>
                          <p className="buy_btn_txt mb-0">
                            Please refer to our{" "}
                            <Link className="link" to={"/privacy-policy"}>licensing terms of usage</Link>, and{" "}
                            <Link className="link" to={"/post-login-tandc"}>terms and conditions</Link>. If you have any questions, please{" "}
                            <Link className="link" to={"/chat"}>chat</Link>{" "}or{" "}
                            <Link className="link" to={"/contact-us-post"}>contact</Link>{" "}our helpful teams who are available 24x7 to assist you. Thank you.
                          </p>
                        </div>
                      </div>
                    )}

                    {curr.message_type === "request_more_content" && (
                      <div className="chatting_itm auto_msg sngl_cht d-flex align-items-start">
                        <img
                          src={
                            curr?.receiver_id
                              ?.profile_image
                          }
                          alt="User"
                          className="usr_img"
                        />
                        <div className="cht_txt">
                          <div className="d-flex align-items-center">
                            <p className="usr_name mb-0">{curr?.receiver_id?.first_name + " " + curr?.receiver_id?.last_name}</p>
                            <p className="cht_time mb-0">{moment(curr?.createdAt).format("h:mm A, D MMM YYYY")}</p>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Has requested for more content from {" "}
                            {curr?.sender_id?.user_name}
                          </p>
                        </div>
                      </div>
                    )}

                    {curr?.message_type === "PaymentIntent" && (
                      <div className="crd chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info rating-update">
                          <div className="d-flex align-items-center">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(
                                  curr?.createdAt
                                ).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Please rate your experience
                            with PressHop
                          </p>
                          <div className="usr_reviews">
                            <Rating
                              onClick={handleRating}
                              value={rating}
                              disabled={messages?.find((el) => el.message_type == "rating_by_mediahouse")?.rating}
                            />
                            <p className="mb-0 msg auto_press_msg">
                              Please select the key
                              features you liked about
                              our platform
                            </p>
                            <ul>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Experience"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Experience"
                                    ) ||
                                    features.includes(
                                      "Experience"
                                    )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Experience
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Easy to use"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Easy to use"
                                    ) ||
                                    features.includes(
                                      "Easy to use"
                                    )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Easy to use
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Connectivity with Hoppers"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Connectivity with Hoppers"
                                    ) ||
                                    features.includes(
                                      "Connectivity with Hoppers"
                                    )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Connectivity with
                                Hoppers
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Pricing"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Pricing"
                                    ) ||
                                    features.includes(
                                      "Pricing"
                                    )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Pricing
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Secure payment"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Secure payment"
                                    ) ||
                                    features.includes(
                                      "Secure payment"
                                    )
                                    ? "selected clickable"
                                    : "clickable"
                                }
                              >
                                Secure payment
                              </li>
                              <li
                                onClick={() =>
                                  handleFeatures(
                                    "Support"
                                  )
                                }
                                className={
                                  messages
                                    ?.find(
                                      (el) =>
                                        el?.message_type ==
                                        "rating_by_mediahouse"
                                    )
                                    ?.features?.includes(
                                      "Support"
                                    ) ||
                                    features.includes(
                                      "Support"
                                    )
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
                                    setReview(
                                      e.target.value
                                    )
                                  }
                                  value={
                                    messages?.find(
                                      (el) =>
                                        el.message_type ==
                                        "rating_by_mediahouse"
                                    )?.review || review
                                  }
                                ></Form.Control>
                              </Form.Group>
                            </div>

                            <button
                              className="theme_btn"
                              onClick={() =>
                                RatingNReview(curr)
                              }
                              disabled={
                                messages?.filter(
                                  (el) =>
                                    el.message_type ==
                                    "rating_by_mediahouse"
                                )?.length != 0
                              }
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {curr?.message_type == "rating_by_mediahouse" && (
                      <div className="crd chatting_itm auto_msg sngl_cht d-flex align-items-start heart-icon">
                        <div className="img">
                          <img
                            src={presshopchatic}
                            alt="User"
                            className="usr_img"
                          />
                        </div>
                        <div className="cht_txt postedcmnt_info">
                          <div className="d-flex align-items-center">
                            <h5 className="usr_name mb-0">
                              PressHop
                              <span className="text-secondary time">
                                {moment(
                                  curr?.createdAt
                                ).format(
                                  "h:mm A, D MMM YYYY"
                                )}
                              </span>
                            </h5>
                          </div>
                          <p className="mb-0 msg auto_press_msg">
                            Thank you for your valuable
                            feedback. Your views matter a
                            lot to us. Thank you very much
                            for your business{" "}
                            <img src={heart} />
                          </p>
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
              {hoppers?.map((curr) => {
                  return (
                    <div
                      className={`chatting_itm chat-hopper-listing d-flex align-items-center justify-content-space-between clickable ${curr?._id === roomDetails?._id ? "light-gray-bg" : "bg-light-gray"}`}
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
                          <h5 className="usr_name mb-0">
                            {curr.hopper_id.user_name}
                          </h5>
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
