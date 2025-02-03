import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// import HeaderN from "../component/HeaderN"
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Overlay from "react-bootstrap/Overlay";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Tooltip from "react-bootstrap/Tooltip";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  BsArrowLeft,
  BsArrowRight,
  BsChevronDown,
  BsMic,
  BsPause,
  BsPlay,
} from "react-icons/bs";
import { MdAdd, MdOutlineWatchLater } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { ReactMic } from "react-mic-recorder";
import { Rating } from "react-simple-star-rating";
import io from "socket.io-client";
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import usric from "../assets/images/menu-icons/user.svg";
import tickic from "../assets/images/chat-icons/tick.svg";
import audioic from "../assets/images/audimg.svg";
import photoic from "../assets/images/camera.svg";
import NoProfile from "../assets/images/blank-profile-picture.png";
import cameraic from "../assets/images/camera.svg";
// import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import presshopchatic from "../assets/images/chat_logo.png";
import contentVideo from "../assets/images/contentVideo.svg";
import docsic from "../assets/images/docsic.svg";
import exclusive from "../assets/images/exclusive.png";
import favouritedic from "../assets/images/favouritestar.svg";
import interviewic from "../assets/images/interview.svg";
import pdfic from "../assets/images/pdfic.svg";
import authorimg from "../assets/images/profile.webp";
import shared from "../assets/images/share.png";
import favic from "../assets/images/star.svg";
import videoic from "../assets/images/video.svg";
import ChatCard from "../component/ChatCard";
import DbFooter from "../component/DbFooter";
import Header from "../component/Header";
import RecentActivityDF from "../component/Sortfilters/Dashboard/RecentActivity";
import { UserDetails } from "../component/Utils";
import ContentFeedCard from "../component/card/ContentFeedCard";
import TopSearchesTipsCard from "../component/card/TopSearchesTipsCard";
import { Get, Patch, Post } from "../services/user.services";

import socketInternal from "../InternalSocket";
import Loader from "../component/Loader";
import { useDarkMode } from "../context/DarkModeContext";
import {
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
const socket = io.connect("https://uat.presshop.live:3005");

const UploadedContentDetails = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const { profileData, setCartCount } = useDarkMode();

  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const username = profileData?.full_name;

  const [selectedIds, setSelectedIds] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room_details, setRoom_Details] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [fav, setFav] = useState();
  const [hopper, setHopper] = useState();
  const [hopperid, setHopperid] = useState();
  const [userList, setUserList] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [review, setReview] = useState("");
  const [relatedContent, setRelatedContent] = useState([]);
  const [moreContent, setMoreContent] = useState([]);
  const [openRecentActivity, setOpenRecentActivity] = useState(false);
  const [chatContentIds, setChatContentIds] = useState({
    room_id: "",
    sender_id: "",
  });
  const [contentId, setContentId] = useState(null);
  const [showChat, setShowChat] = useState({
    content: false,
    task: false,
    presshop: false,
    internal: false,
  });
  const [room_idForContent, setRoom_idForContent] = useState("");
  const [roomDetails, setRoomDetails] = useState();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(false);
  const [bigData, setBigData] = useState("");
  const handleShow = (curr) => {
    setBigData(curr?.message), setShow1(true);
  };
  const handleClosePreview = () =>
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  const [preview, setPreview] = useState({
    type: "",
    path: "",
    modalOpen: false,
  });
  const [admins, setAdmins] = useState([]);
  const [tabSelect, setTabSelect] = useState("internal");

  const User = UserDetails;

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [param]);

  const [searchParams] = useSearchParams();

  // Extract the 'task_content_id' parameter
  const taskContentId = searchParams.get("task_content_id");
  const taskContentType = searchParams.get("task_content_type");

  // External Chat
  // useEffect(() => {
  //   socket.emit('room join', { room_id: room_idForContent });
  //   socket?.on("getAdmins", (data) => {
  //     setAdmins(data)
  //   })
  //   socket.on("initialoffer", (data) => {
  //     // console.log("initialoffer1231231231", data)
  //     const newMessage = data;
  //     // setMessages((prevMessages) => [...prevMessages, newMessage,]);
  //   });
  //   return () => {
  //     socket.emit('room leave', { room_id: room_idForContent });
  //     socket.off("initialoffer");
  //   };
  // }, [socket, room_idForContent]);

  const CreateRoom = async (id, idnew) => {
    try {
      const obj = {
        receiver_id: id,
        room_type: "MediahousetoAdmin",
        type: "external_content",
        content_id: param?.type === "favourite" ? idnew : param.id,
      };
      const resp = await Post(`mediaHouse/createRoom`, obj);
      if (resp && resp.data && resp.data.details) {
        setRoom_Details(resp.data.details);
        // setRoomDetails(resp.data.details);
        setRoom_idForContent(resp.data.details.room_id);
        const resp1 = await Post(`mediaHouse/getAllchat`, {
          room_id: resp.data.details.room_id,
          room_type: "individual",
        });
        if (resp1 && resp1.data && resp1.data.response) {
          // setMessages(resp1.data.response);
        }
      } else {
        console.error("Incomplete response data:", resp);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  async function getCountOfBasketItems() {
    try {
      const res = await Get(`mediaHouse/getBasketDataCount`);

      console.log("count", res?.data?.data);
      setCartCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }
  // Add to basket-
  const AddToBasket = async (element, type) => {
    try {
      console.log("dataType", element._id);
      // return
      let obj = {};

      if (type == "task") {
        obj = {
          type: "uploaded_content",
          uploaded_content: element?._id,
          post_id: element?._id || element?.task_id?._id,
          name: "hello",
          content: element?.task_id?.content?.map((el) => {
            return {
              media_type: el?.media_type,
              media: el?.media,
              watermark: el?.watermark,
              content_id: el?._id,
            };
          }),
        };
      } else {
        obj = {
          type: element?.type == "task" ? "task" : "content",
          post_id: element._id,
          content: element?.content?.map((el) => {
            return {
              media_type: el?.media_type,
              media: el?.media,
              watermark: el?.watermark,
              content_id: el?._id,
            };
          }),
        };
      }
      const res = await Post(`mediaHouse/addToBasket`, { order: [obj] });
      if (res) {
        //  ContentByID();
        setData({
          ...data,
          basket_status: data?.basket_status == "true" ? "false" : "true",
        });

        getCountOfBasketItems();
      }
    } catch (error) {}
  };

  // const AddToBasket = async () => {
  //   console.log("props ----->", props);
  //   try {
  //     let obj = {};

  //     // if (props?.type == "task") {
  //     //   obj = {
  //     //     type: "uploaded_content",
  //     //     uploaded_content: props.content_id,
  //     //   };
  //     // } else {
  //     //   obj = {
  //     //     type: props?.type == "task" ? "task" : "content",
  //     //     post_id: props.content_id,
  //     //     content: props?.allContent?.map((el) => {
  //     //       return {
  //     //         media_type: el?.media_type,
  //     //         media: el?.media,
  //     //         watermark: el?.watermark,
  //     //         content_id: el?._id,
  //     //       };
  //     //     }),
  //     //   };
  //     // }
  //     // const res = await Post(`mediaHouse/addToBasket`, { order: [obj] });
  //     // if (res) {
  //     //   getCountOfBasketItems();
  //     //   props.basket();
  //     // }
  //   } catch (error) {
  //     console.log("errorMessage", error);
  //   }
  // };

  let TaskFavourite = async () => {
    try {
      let obj = {};

      if (props?.type == "task") {
        obj = {
          type: "uploaded_content",
          uploaded_content: props.content_id,
        };
      } else {
        obj = {
          favourite_status: props.bool_fav === "true" ? "true" : "false",
          content_id: props.content_id,
        };
      }

      const resp = await Patch(`mediaHouse/add/to/favourites`, obj);
    } catch (error) {
      console.log("addfav", error);
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
    };
    socket.emit("rating", obj);
    socket.on("rating", (obj) => {});
    getMessages(JSON.parse(localStorage.getItem("external_chat_room_detail")));
  };

  useEffect(() => {
    socket.emit("getallchat", { room_id: roomDetails?.room_id });
  }, [socket]);

  const hopperFinalOffer = messages?.find(
    (item) => item.message_type === "Mediahouse_final_offer"
  );

  const hopperFinalOfferPrice = hopperFinalOffer
    ? hopperFinalOffer.finaloffer_price
    : "";

  const MediahouseFinal = messages?.find(
    (item) => item.message_type === "Mediahouse_final_counter"
  );

  const MediahouseFinalCounter = MediahouseFinal ? true : false;

  const MediahouseInitial = messages?.find(
    (item) => item.message_type === "Mediahouse_initial_offer"
  );

  const MediahouseInitialOffer = MediahouseInitial ? true : false;

  const Paymentt = messages?.find(
    (item) => item.message_type === "PaymentIntent"
  );

  const PaymentIntent = Paymentt ? Paymentt.paid_status : "";

  const [taskDetails, setTaskDetails] = useState();
  const handleCloseRecentActivity = (values) => {
    setOpenRecentActivity(values);
  };

  const [taskExpireDiff, setTaskExpireDiff] = useState(null);
  const ContentByID = async () => {
    setLoading(true);
    try {
      const resp = await Get(
        `mediaHouse/getuploadedContentbyHoppers?_id=${param.id}&contentId=${taskContentId}`
      );
      setData(resp.data.data[0]);

      // const getHoppers = await Get(`mediaHouse/findacceptedtasks?task_id=${Livetask?.data?.tasks?.find?.((el) => el?._id == resp.data.data[0]?.task_id?._id)?._id}&receiver_id=${User && User._id || User.id}&type=task_content`);
      setRoomDetails(resp.data.data[0]);

      // const liveTasks = await Get(`mediaHouse/live/expired/tasks?status=live&id=${Livetask?.data?.tasks?.find?.((el) => el?._id == resp.data.data[0]?.task_id?._id)?._id}`)
      setTaskDetails(resp.data.data[0]?.task_id);

      // Task should active 1 hour after deadline-
      const nowDate = moment();
      const deadlineDate = moment(resp.data.data[0]?.task_id?.deadline_date);
      const newDateDiff = nowDate.diff(deadlineDate, "hours");

      setTaskExpireDiff(newDateDiff);

      localStorage.setItem(
        "external_chat_room_detail",
        JSON.stringify(resp.data.data[0])
      );
      getMessages(resp.data.data[0]);

      setChatContentIds((pre) => ({
        ...pre,
        room_id: resp.data.data[0]?.roomsdetails?.room_id,
      }));
      setChatContentIds((pre) => ({ ...pre, sender_id: profileData?._id }));
      localStorage.setItem("internal", resp?.data?.data?.[0]?.task_id?._id);
      setHopper(resp.data.data[0]?.hopper_id);
      setHopperid(resp.data.data[0]?.hopper_id?._id);
      const resp1 = await Post(`mediaHouse/MoreContentforTask`, {
        hopper_id: resp.data.data[0]?.hopper_id?._id,
        task_id: resp.data.data[0]?.task_id?._id,
      });
      setMoreContent(resp1.data.content);
      const resp2 = await Post(`mediaHouse/relatedContentforTask`, {
        hopper_id: resp.data.data[0]?.hopper_id?._id,
        task_id: resp.data.data[0]?.task_id?._id,
      });
      setRelatedContent(resp2.data.content);
      // localStorage.setItem('tag_id', resp.data.content.tag_ids[0]?._id, 'hopper_id', resp.data.data[0]?.hopper_id?._id)
      setHopperid(resp.data.data[0]?.hopper_id?._id);
      localStorage.setItem("hopperid", resp.data.data[0]?.hopper_id?._id);
      if (resp) {
        setLoading(false);
      }
      CreateRoom(
        resp.data.data[0]?.hopper_id?._id,
        resp.data.data[0].task_id?._id
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const Favourite = async () => {
    try {
      let obj = {
        type: "uploaded_content",
        uploaded_content: data ? data._id : fav?.content_id?._id,
      };

      setData((prev) => {
        const updatedData = { ...prev };
        updatedData.favourite_status =
          updatedData.favourite_status === "true" ? "false" : "true";
        return updatedData;
      });
      await Patch(`mediaHouse/add/to/favourites`, obj);
    } catch (error) {
      // Handle error here
    }
  };

  console.log("all imp datat --->", data);

  const Payment = async (
    amount,
    image_id,
    reconsider = false,
    reconsider_amount = 0,
    room_id
  ) => {
    try {
      // setLoading(true);
      console.log("hello chala mere api ---> --->111");
      const obj1 = {
        customer_id: UserDetails.stripe_customer_id,
        type: "content",
        amount,
        image_id,
        reconsider,
        reconsider_amount,
        room_id: room_id?.room_id,
        offer: true,
        is_charity: data?.is_charity,
        description: data?.heading,
      };
      console.log("hello chala mere api ---> --->121");

      const obj2 = {
        type: "content",
        product_id: image_id,
        amount_paid: amount,
        commission: 0,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);
      console.log("hello chala mere api ---> --->131", resp1);

      obj1.application_fee = resp1?.data?.data;
      // obj1.stripe_account_id = resp1?.data?.stripe_account_id;
      obj1.stripe_account_id = data?.is_charity
        ? data?.stripe_account_id
        : resp1?.data?.stripe_account_id;

      const resp2 = await Post("mediahouse/createPayment", obj1);
      window.open(resp2.data.url, "_blank");
      if (resp2) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // successToasterFun(error?.response?.data?.errors?.msg);
    }
  };

  useEffect(() => {
    ContentByID();
    GetUserList();
  }, [param?.id, taskContentId]);

  const Audio = data
    ? data.task_id.content.filter((item) => item.media_type === "audio")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "audio");
  const Video = data
    ? data.task_id.content.filter((item) => item.media_type === "video")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "video");
  const images = data
    ? data.task_id.content.filter((item) => item.media_type === "image")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "image");
  const Pdf = data
    ? data.task_id.content.filter((item) => item.media_type === "pdf")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "pdf");
  const Doc = data
    ? data.task_id.content.filter((item) => item.media_type === "doc")
    : fav?.content_id?.content?.filter((item) => item?.media_type === "doc");

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }
  const [recentActivityValues, setRecentActivityValues] = useState({
    field: "",
    value: "",
  });

  const handleRecentActivityValue = (value) => {
    setRecentActivityValues({ field: value.field, value: value.values });
  };

  // Related content-
  const [openRelatedMoreContentSort, setOpenRelatedMoreContentSort] =
    useState(false);
  const handleCloseRelatedMoreContentSort = (values) => {
    setOpenRelatedMoreContentSort(values);
  };

  // Related content sort-
  const [RelatedMoreContentSortValues, setRelatedMoreContentSortValues] =
    useState({
      field: "",
      value: "",
    });

  const GetUserList = async () => {
    const resp = await Post(`mediaHouse/getMediahouseUser`);
    if (resp) {
      setUserList(resp.data.response.filter((el) => el?.role == "Adduser"));
    }
    const resp1 = await Get(`mediaHouse/adminlist`);
    const newData = resp1?.data?.data?.map((el) => {
      return {
        ...el,
        checked: false,
      };
    });
    setAdminList(newData);
  };

  const handleChecked = (el) => {
    setAdminList((prev) => {
      const changedData = prev.map((item) => ({
        ...item,
        checked: item == el ? !item.checked : false,
      }));
      return changedData;
    });
  };

  // internal chat start
  const [mediaFile, setMediaFile] = useState({ path: "", type: "" });
  const [message, setMessage] = useState([]);
  const [msg1, setMsg1] = useState("");

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    setIsRecording(false);
    try {
      const formData = new FormData();
      formData.append("path", "profileImg");
      formData.append("media", recordedBlob?.blob);
      const filePath = await Post("mediaHouse/uploadUserMedia", formData);
      if (filePath) {
        setMediaFile((prev) => ({
          ...prev,
          path: filePath?.data?.path,
          type: "audio",
        }));
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  useEffect(() => {
    ChatList();
  }, [chatContentIds, socketInternal]);

  // useEffect(() => {
  //   const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
  //   if (messageContainer) {
  //     messageContainer.scrollTop = messageContainer.scrollHeight;
  //   }

  //   socketInternal.emit('room join', { room_id: chatContentIds?.room_id });
  //   socketInternal.on("internal group chat", (data) => {
  //     const newMessage = data;
  //     setMessage((prevMessages) => [...prevMessages, newMessage,]);

  //     if (newMessage) {
  //       messageContainer.scrollTop = messageContainer.scrollHeight;
  //     }
  //   });
  //   return () => {
  //     socketInternal.emit('room leave', { room_id: chatContentIds?.room_id });
  //     socketInternal.off("internal group chat");
  //   };
  // }, [socketInternal, chatContentIds?.room_id]);

  useEffect(() => {
    // Internal Chat and External Chat-
    if (tabSelect == "internal") {
      const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
      socket.emit("room join", { room_id: chatContentIds?.room_id });
      socket.on("internal group chat", (data) => {
        const newMessage = data;
        if (!newMessage?.createdAt) {
          setMessage((prevMessages) => [...prevMessages, newMessage]);
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        if (newMessage) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
      return () => {
        socket.emit("room leave", { room_id: chatContentIds?.room_id });
        socket.off("internal group chat");
      };
    } else if (tabSelect == "external") {
      socket.emit("room join", { room_id: room_idForContent });
      socket?.on("getAdmins", (data) => {
        setAdmins(data);
      });
      socket.on("initialoffer", (data) => {
        const newMessage = data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      return () => {
        socket.emit("room leave", { room_id: room_idForContent });
        socket.off("initialoffer");
      };
    }
  }, [tabSelect]);

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const AddParticipents = async () => {
    try {
      let obj = {
        type: "add",
        users: selectedIds,
        content_id: param.id,
        room_id: chatContentIds ? chatContentIds?.room_id : "",
      };

      const resp = await Post("mediaHouse/internalGroupChatMH", obj);
      if (resp) {
        setSelectedIds([]);
        GetUserList();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: resp?.data?.data?.data?.room_id,
        }));
        // toast.success('Group chat initiated');
        socketInternal.emit("room join", {
          room_id: resp?.data?.data?.data?.room_id,
        });
      }
    } catch (error) {
      // console.log(error, `<<<<<socket error`);
      // Handle errors
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("video/")) {
      setMediaFile((pre) => ({ ...pre, type: "video" }));
      setPreview((pre) => ({ ...pre, type: "video" }));
    } else if (file.type.startsWith("image/")) {
      setMediaFile((pre) => ({ ...pre, type: "image" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    } else if (file.type.startsWith("audio/")) {
      setMediaFile((pre) => ({ ...pre, type: "audio" }));
      setPreview((pre) => ({ ...pre, type: "image" }));
    }
    const Formdata = new FormData();
    Formdata.append("path", "profileImg");
    Formdata.append("media", file);
    const filePath = await Post("mediaHouse/uploadUserMedia", Formdata);
    if (filePath) {
      setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, path: filePath?.data?.path }));
      setPreview((pre) => ({ ...pre, modalOpen: true }));
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    let messages = {
      sender_id: chatContentIds?.sender_id,
      room_id: chatContentIds?.room_id,
      message: mediaFile?.path ? mediaFile?.path : msg1,
      type: mediaFile?.type ? mediaFile?.type : "text",
      user_info: {
        profile_image: profileData?.hasOwnProperty("admin_detail")
          ? profileData?.admin_detail?.admin_profile
          : profileData?.profile_image,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
      },
    };

    socketInternal.emit("internal group chat", messages);
    setMsg1("");
    setMediaFile({
      path: "",
      type: "",
    });
    setPreview((pre) => ({ ...pre, modalOpen: false }));
  };

  const ChatList = async () => {
    try {
      const resp = await Get(
        `mediaHouse/openChatsMH?room_id=${chatContentIds?.room_id}`
      );
      if (resp) {
        localStorage.setItem("contentId", JSON.stringify(param.id));
        localStorage.setItem("type", "task");
        localStorage.setItem(
          "roomId",
          JSON.stringify(chatContentIds?.room_id) || ""
        );
        localStorage.removeItem("receiverId");
        localStorage.setItem("tabName", JSON.stringify("internal"));
        const newData = resp?.data?.response?.data?.filter((el) => el?.type);
        setMessage(newData);
      }
    } catch (error) {
      // Handle errors
    }
  };

  // internal chat end

  // Detail of current User
  const user = profileData;
  const fullName = user?.first_name + " " + user?.last_name;

  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch((error) => {
        // Handle play error, if any
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
    }
  };

  // External chat-------------------------------------------------------------

  const JoinRoom = () => {
    socket.emit("room join", { room_id: roomDetails?.roomsdetails?.room_id });
  };

  useEffect(() => {
    JoinRoom();
  }, [roomDetails?.roomsdetails?.room_id]);

  const getMessages = async (room) => {
    const resp1 = await Post(`mediaHouse/getAllchat`, {
      room_id: room?.roomsdetails?.room_id,
      room_type: "individual",
    });
    if (resp1) {
      setMessages(resp1?.data?.response);
    }
  };

  // useEffect(() => {
  //   getMessages(JSON.parse(localStorage.getItem("external_chat_room_detail")))
  // })

  const stripePayment = async (curr) => {
    console.log("all paid data ---->money", UserDetails);
    console.log("all paid data ---->money cuuuuuuu", curr);
    let totalAmount = 0;
    selectedItems.forEach((ele) => {
      totalAmount += Number(ele.amount);
    });
    let obj = {
      items: selectedItems,
      image_id: curr?.image_id,
      customer_id: UserDetails?.stripe_customer_id,
      stripe_account_id: curr?.sender_id?.stripe_account_id || "no data",
      amount: totalAmount || curr?.media?.amount,
      type: "task_content",
      task_id: taskDetails?._id,
    };
    const resp = await Post("mediahouse/createPayment", obj);
    window.open(resp.data.url, "_blank");
    if (resp) {
    }
  };

  const requestMoreContent = (curr) => {
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
        getMessages(
          JSON.parse(localStorage.getItem("external_chat_room_detail"))
        );
      });
    } catch (error) {}
  };

  const DownloadContent = async (id) => {
    const url =
      "https://uat.presshop.live:5019/mediahouse/image_pathdownload?image_id=67906d80203ec0bc89189923&type=uploaded_content";

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "download.zip"; // Optional: Set a default name for the downloaded file
    document.body.appendChild(anchor);

    // Trigger the download
    anchor.click();

    // Remove the anchor element
    document.body.removeChild(anchor);

    return;

    const resp = await Get(
      "mediahouse/image_pathdownload?image_id=67906d80203ec0bc89189923&type=uploaded_content"
    );

    if (resp?.data?.message) {
      const filename = resp?.data?.message.slice(85);
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

  // Catch Rating value
  const [rating, setRating] = useState();
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleFavourite = (i, type) => {
    if (type == "more") {
      setMoreContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] =
          allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent;
      });
    } else if (type == "related") {
      setRelatedContent((prev) => {
        const allContent = [...prev];
        allContent[i]["favourite_status"] =
          allContent[i]["favourite_status"] === "true" ? "false" : "true";
        return allContent;
      });
    }
  };
  const handleBasket = (i, type) => {
    if (type == "more") {
      setMoreContent((prev) => {
        const allContent = [...prev];
        allContent[i]["basket_status"] =
          allContent[i]["basket_status"] === "true" ? "false" : "true";
        return allContent;
      });
    } else if (type == "related") {
      setRelatedContent((prev) => {
        const allContent = [...prev];
        allContent[i]["basket_status"] =
          allContent[i]["basket_status"] === "true" ? "false" : "true";
        return allContent;
      });
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

  console.log("all task item data-->", data);
  console.log("message ---->messages", messages);
  console.log("all items that are checked --->", selectedItems);

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
                          <div className="post_icns_cstm_wrp">
                            {Audio && Audio.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Audio && Audio.length > 0 && (
                                  <span className="count">
                                    {Audio && Audio.length > 0 && Audio.length}
                                  </span>
                                )}

                                {Audio && Audio.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={interviewic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {Video && Video.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Video && Video.length > 0 && (
                                  <span className="count">
                                    {Video && Video.length > 0 && Video.length}
                                  </span>
                                )}
                                {Video && Video.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={videoic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {images && images.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {images && images.length > 0 && (
                                  <span className="count">
                                    {images &&
                                      images.length > 0 &&
                                      images.length}
                                  </span>
                                )}

                                {images && images.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={cameraic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                            {Pdf && Pdf.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Pdf && Pdf.length > 0 && (
                                  <span className="count">
                                    {Pdf && Pdf.length > 0 && Pdf.length}
                                  </span>
                                )}

                                {Pdf && Pdf.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={pdfic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}

                            {Doc && Doc.length > 0 && (
                              <div className="post_itm_icns dtl_icns">
                                {Doc && Doc.length > 0 && (
                                  <span className="count">
                                    {Doc && Doc.length > 0 && Doc.length}
                                  </span>
                                )}

                                {Doc && Doc.length > 0 && (
                                  <img
                                    className="feedMediaType iconBg"
                                    src={docsic}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          <div
                            className="post_itm_icns right dtl_icns"
                            onClick={() => {
                              Favourite();
                            }}
                          >
                            <img
                              className="feedMediaType iconBg"
                              src={
                                data?.favourite_status === "true"
                                  ? favouritedic
                                  : favic
                              }
                              alt=""
                            />
                          </div>

                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            pagination={{ clickable: true }}
                          >
                            {data
                              ? data?.task_id?.content?.map((curr) => {
                                  return (
                                    <SwiperSlide key={curr._id}>
                                      {curr?.media_type === "image" ? (
                                        <img
                                          src={curr?.watermark || curr?.media}
                                          alt={`Image ${curr._id}`}
                                        />
                                      ) : curr?.media_type === "audio" ? (
                                        <div>
                                          <img
                                            src={audioic}
                                            alt={`Audio ${curr._id}`}
                                            className="slider-img"
                                            onClick={toggleAudio}
                                          />
                                          <audio
                                            controls
                                            src={
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              curr?.media
                                            }
                                            type="audio/mpeg"
                                            className="slider-audio"
                                            ref={audioRef}
                                          />
                                        </div>
                                      ) : curr?.media_type === "video" ? (
                                        <video
                                          controls
                                          className="slider-vddo"
                                          // src={
                                          //   process.env
                                          //     .REACT_APP_UPLOADED_CONTENT +
                                          //   curr?.media
                                          // }
                                          src={curr?.watermark}
                                        />
                                      ) : (
                                        <embed
                                          src="https://uat-presshope.s3.eu-west-2.amazonaws.com/public/contentData/169383718859210044629829-1025-123123122222121_seller_invoice.pdf"
                                          type="application/pdf"
                                          width="100%"
                                          height="500"
                                        />
                                      )}
                                    </SwiperSlide>
                                  );
                                })
                              : fav?.content_id?.content?.map((curr) => {
                                  return (
                                    <SwiperSlide key={curr._id}>
                                      {curr?.media_type === "image" ? (
                                        <img
                                          src={
                                            curr?.watermark ||
                                            process.env
                                              .REACT_APP_CONTENT_MEDIA +
                                              curr?.media
                                          }
                                          alt={`Image ${curr._id}`}
                                        />
                                      ) : curr?.media_type === "audio" ? (
                                        <div>
                                          <img
                                            src={audioic}
                                            alt={`Audio ${curr._id}`}
                                            className="slider-img"
                                            onClick={toggleAudio}
                                          />
                                          <audio
                                            controls
                                            src={
                                              process.env
                                                .REACT_APP_CONTENT_MEDIA +
                                              curr?.media
                                            }
                                            type="audio/mpeg"
                                            className="slider-audio"
                                            ref={audioRef}
                                          />
                                        </div>
                                      ) : curr?.media_type === "video" ? (
                                        <video
                                          controls
                                          className="slider-vddo"
                                          src={curr?.media}
                                        />
                                      ) : null}
                                    </SwiperSlide>
                                  );
                                })}

                            {/* )
                            })} */}
                          </Swiper>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {data
                                ? data?.task_id?.heading
                                : fav?.content_id?.heading}
                            </h1>

                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={
                                data
                                  ? data?.task_id?.task_description
                                  : fav?.content_id?.description
                              }
                            ></textarea>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="feeddetail-card h-100 content-info">
                        <CardContent className="card-content feedDetailInfo">
                          <div className="sub-content">
                            <div className="heading w-100 d-flex align-items-center justify-content-between">
                              <Typography className="txt_bld">
                                {" "}
                                Content info
                              </Typography>
                              {data?.favourite_status === "true" && (
                                <div className="favourite">
                                  <AiFillStar />
                                  <span>Favourited</span>
                                </div>
                              )}
                              {data?.favourite_status === "false" && (
                                <div className="favourite">
                                  <AiOutlineStar />
                                  <span>Favourite</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="right-content-wrap">
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

                                    <span className="hpr_nme">
                                      {data
                                        ? data?.hopper_id?.user_name
                                        : fav?.content_id?.hopper_id?.user_name}
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
                                      <div>{data?.task_id?.location}</div>
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
                                      {moment(data?.task_id?.createdAt).format(
                                        "h:mm A, DD MMM YYYY"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="sub-content">
                                <div className="item d-flex justify-content-between align-items-center">
                                  <span className="fnt-bold">Category</span>
                                  <div className="">
                                    <img
                                      src={data?.category_details[0]?.icon}
                                      className="exclusive-img"
                                      alt=""
                                    />
                                    <span className="txt_catg_licn">
                                      {capitalizeFirstLetter(
                                        data?.category_details[0]?.name
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="footer-content">
                              <div className="price-offered-wrap">
                                <h4 className="offered-price">Price offered</h4>
                                <div
                                  className="button-group d-flex justify-content-between
                          "
                                >
                                  <div className="btn-1">
                                    <p>Photo</p>
                                    <button className="btn-price">
                                      £ {data?.task_id?.hopper_photo_price || 0}
                                    </button>
                                  </div>
                                  <div className="btn-1">
                                    <p>Interview</p>
                                    <button className="btn-price">
                                      £{" "}
                                      {data?.task_id?.hopper_interview_price ||
                                        0}
                                    </button>
                                  </div>
                                  <div className="btn-1">
                                    <p>Video</p>
                                    <button className="btn-price">
                                      £{" "}
                                      {data?.task_id?.hopper_videos_price || 0}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="add-to-basket-btn">
                                {/* <button className="black-btn"  onClick={AddToBasket}>Add to Basket</button> */}
                                <button
                                  onClick={() => AddToBasket(data, "task")}
                                  className="red-btn"
                                >
                                  Add to Basket
                                </button>
                                <button
                                  className="red-btn"
                                  onClick={() => {
                                    navigate(
                                      `/task-invoice/${data?._id}?taskContentId=${taskContentId}`
                                    );
                                    console.log(
                                      "button -------> ----> -----> onClick"
                                    );
                                    const contentCost =
                                      data?.type == "image"
                                        ? data?.task_id?.hopper_photo_price
                                        : data?.type == "video"
                                        ? data?.task_id?.hopper_videos_price
                                        : data?.type == "audio"
                                        ? data?.task_id?.hopper_interview_price
                                        : "";
                                    // Payment(
                                    //   +data?.task_id?.hopper_photo_price,
                                    //   +contentCost,
                                    //   data?._id,
                                    //   false,
                                    //   0
                                    // );
                                  }}
                                >
                                  £{" "}
                                  {data?.type == "image"
                                    ? data?.task_id?.hopper_photo_price
                                    : data?.type == "video"
                                    ? data?.task_id?.hopper_videos_price
                                    : data?.type == "audio"
                                    ? data?.task_id?.hopper_interview_price
                                    : ""}
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Col>
                    <Col md={12} className="feed_dtl_chat_wrap">
                      <div className="chat-tabs-wrap">
                        <Tabs
                          defaultActiveKey={tabSelect}
                          activeKey={
                            tabSelect ||
                            JSON.parse(localStorage.getItem("tabName"))
                          }
                          id="chat-tabs"
                          className="mb-3 tbs"
                          onSelect={(tabName) => {
                            localStorage.setItem(
                              "tabName",
                              JSON.stringify(tabName)
                            );
                            setTabSelect(tabName);
                          }}
                        >
                          <Tab
                            eventKey="internal"
                            title="Internal Chat"
                            defaultActiveKey="internal"
                            className=" show"
                          >
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div
                                    className="feed_dtl_msgs pp"
                                    id="message-container-1"
                                  >
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select participants from the
                                        list, and add them to your internal
                                        chat.
                                      </h6>
                                      <h6 className="txt_light">
                                        Once added, you can start chatting with
                                        your team members. Use the text box
                                        below to type or send voice notes. Good
                                        luck
                                      </h6>
                                    </div>

                                    {message?.map((curr) => (
                                      <div className="baat_cheet">
                                        {curr?.type === "add" ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              You added {curr?.addedMsg}
                                            </span>
                                          </p>
                                        ) : (
                                          <div className="crd" key={curr.id}>
                                            <div className="img">
                                              <img
                                                src={
                                                  curr.user_info
                                                    ? curr?.user_info
                                                        ?.profile_image
                                                    : curr?.sender_id
                                                        ?.profile_image
                                                }
                                                alt="user"
                                              />
                                            </div>
                                            <div className="postedcmnt_info">
                                              <h5>
                                                {`${
                                                  curr.user_info
                                                    ? curr?.user_info
                                                        ?.first_name
                                                    : curr?.sender_id
                                                        ?.first_name
                                                } 
                                                ${
                                                  curr.user_info
                                                    ? curr?.user_info?.last_name
                                                    : curr?.sender_id?.last_name
                                                }`}
                                                <span className="text-secondary time">
                                                  {moment(
                                                    curr?.createdAt
                                                  ).format(`DD MMM YYYY`)}{" "}
                                                  -{" "}
                                                  {moment(
                                                    curr.createdAt
                                                  ).format(`hh:mm A`)}
                                                </span>
                                              </h5>
                                              <Typography className="comment_text">
                                                {curr.type === "text" &&
                                                  curr.message}
                                              </Typography>

                                              <div
                                                onClick={() => handleShow(curr)}
                                                className="exp"
                                              >
                                                {curr.type === "image" && (
                                                  <img
                                                    src={curr.message}
                                                    className="msgContent"
                                                    alt="content"
                                                  />
                                                )}
                                              </div>

                                              <div>
                                                {curr.type === "video" && (
                                                  <video
                                                    src={curr.message}
                                                    className="msgContent"
                                                    controls
                                                    alt="video content"
                                                    controlsList="nodownload"
                                                  ></video>
                                                )}
                                              </div>

                                              <div>
                                                {curr.type === "audio" && (
                                                  <audio
                                                    src={curr.message}
                                                    controls
                                                    alt="audio content"
                                                    controlsList="nodownload"
                                                  ></audio>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  <Form onSubmit={handleButtonClick}>
                                    <div className="inpt typeMsg_inp mt-2">
                                      <img
                                        src={
                                          profileData?.hasOwnProperty(
                                            "admin_detail"
                                          )
                                            ? profileData?.admin_detail
                                                ?.admin_profile
                                            : profileData?.profile_image
                                        }
                                        alt=""
                                      />
                                      <InputGroup className="">
                                        <Form.Control
                                          placeholder="Type here..."
                                          aria-describedby="basic-addon1"
                                          value={msg1}
                                          onChange={(e) => {
                                            setMsg1(e.target.value);
                                          }}
                                        />
                                      </InputGroup>
                                      <div className="chatIn-options">
                                        <div className="uplod-mda">
                                          <input
                                            type="file"
                                            id="cht_add_img"
                                            className="cht_file_inp"
                                            onChange={handleChange}
                                          />
                                          <label
                                            htmlFor="cht_add_img"
                                            className="cht_fl_inp_lbl"
                                          >
                                            <MdAdd className="d_flex file_add_icn" />
                                          </label>
                                        </div>
                                        <Button
                                          ref={target}
                                          onClick={() => setShow(!show)}
                                        >
                                          <BsMic className="chatMicIcn" />
                                        </Button>
                                        <span
                                          className="chatIn-send"
                                          onClick={handleButtonClick}
                                        >
                                          <BsArrowRight />
                                        </span>
                                      </div>
                                      <div>
                                        <Overlay
                                          target={target.current}
                                          show={show}
                                          placement="top"
                                          className=""
                                        >
                                          <Tooltip id="overlay-example">
                                            <div className="recordingPopup">
                                              <h5>Record Audio</h5>
                                              <div className="d-flex mt-3 justify-content-evenly">
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={onStartRecording}
                                                  disabled={isRecording}
                                                >
                                                  {" "}
                                                  <BsPlay
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Start
                                                </Button>
                                                <Button
                                                  className="rec_aud_btn"
                                                  onClick={onStopRecording}
                                                  disabled={!isRecording}
                                                >
                                                  {" "}
                                                  <BsPause
                                                    fontSize={"20px"}
                                                  />{" "}
                                                  Stop
                                                </Button>
                                              </div>
                                              <div>
                                                <ReactMic
                                                  record={isRecording}
                                                  className="sound-wave w-100 my-2"
                                                  onStop={onStopRecording}
                                                />
                                              </div>
                                              <div className="text-end">
                                                <button
                                                  className="sendrecBtn"
                                                  onClick={(e) => {
                                                    handleButtonClick(e);
                                                    setShow(!show);
                                                  }}
                                                >
                                                  Send
                                                </button>
                                              </div>
                                            </div>
                                          </Tooltip>
                                        </Overlay>
                                      </div>
                                    </div>
                                  </Form>
                                </Col>

                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <Link>
                                      <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                        <h4>Participants</h4>
                                      </div>
                                    </Link>

                                    <div className="scrollHtPnts">
                                      {userList &&
                                        userList.map((curr) => {
                                          return (
                                            <div className="tab_in_card_items">
                                              <div className="checkWrap">
                                                <FormControlLabel
                                                  className={`me-0 ${
                                                    !selectedIds.includes(
                                                      curr._id
                                                    ) && "afterCheck"
                                                  }`}
                                                  checked={
                                                    selectedIds.includes(
                                                      curr._id
                                                    ) ||
                                                    message?.some(
                                                      (item) =>
                                                        `${curr?.first_name} ${curr?.last_name}` ==
                                                        item?.addedMsg
                                                    )
                                                  }
                                                  onChange={() =>
                                                    handleCheckboxChange(
                                                      curr._id
                                                    )
                                                  }
                                                  control={
                                                    <Checkbox defaultChecked />
                                                  }
                                                  disabled={message?.some(
                                                    (item) =>
                                                      `${curr?.first_name} ${curr?.last_name}` ==
                                                      item?.addedMsg
                                                  )}
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
                                                <img src={usric} alt="user" />
                                                <span>
                                                  {" "}
                                                  {curr?.first_name +
                                                    " " +
                                                    curr?.last_name}
                                                </span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>

                                    <button
                                      className="addPrtBtn btn w-100"
                                      onClick={AddParticipents}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="external" title="Hopper Chat">
                            <a href="lorem"></a>
                            <div className="tab-data active">
                              <Row>
                                <Col md={12}>
                                  <div className="feed_dtl_msgs extrnl dd chatmain">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>
                                    </div>
                                    <div className="chat_msgs_scrl chatting">
                                      {roomDetails && (
                                        <div className="chatting_itm sngl_cht d-flex align-items-start">
                                          <img
                                            src={presshopchatic}
                                            alt="User"
                                            className="usr_img"
                                          />
                                          <div className="cht_txt">
                                            <div className="d-flex align-items-center">
                                              <p className="usr_name mb-0">
                                                Presshop
                                              </p>
                                              <p className="cht_time mb-0">
                                                {moment(
                                                  roomDetails?.createdAt
                                                ).format("h:mm A, D MMM YYYY")}
                                              </p>
                                            </div>
                                            <p className="mb-0 msg">
                                              This task has been accepted by{" "}
                                              {
                                                roomDetails?.hopper_id
                                                  ?.user_name
                                              }
                                            </p>
                                            <div className="ofr_crd position-relative">
                                              <img
                                                src={tickic}
                                                alt="Accepted"
                                                className="acpte"
                                              />
                                              <p className="tsk_stts">
                                                Task Accepted
                                              </p>
                                              <p className="tsk_descr">
                                                {taskDetails?.task_description}
                                              </p>
                                              <div className="btm_btns d-flex justify-content-between">
                                                <div className="sngl_btn">
                                                  <p className="prc">
                                                    {taskDetails?.need_photos ===
                                                    true
                                                      ? "£" +
                                                        formatAmountInMillion(
                                                          Number(
                                                            taskDetails?.hopper_photo_price.toFixed(
                                                              2
                                                            )
                                                          )
                                                        )
                                                      : "--"}
                                                  </p>
                                                  <p className="offrd_txt">
                                                    Offered
                                                  </p>
                                                  <div className="cont_tp">
                                                    Picture
                                                  </div>
                                                </div>
                                                <div className="sngl_btn">
                                                  <p className="prc">
                                                    {taskDetails?.need_interview ===
                                                    true
                                                      ? "£" +
                                                        formatAmountInMillion(
                                                          Number(
                                                            taskDetails?.hopper_interview_price
                                                          )
                                                        )
                                                      : "--"}
                                                  </p>

                                                  <p className="offrd_txt">
                                                    Offered
                                                  </p>
                                                  <div className="cont_tp">
                                                    Interview
                                                  </div>
                                                </div>
                                                <div className="sngl_btn">
                                                  <p className="prc">
                                                    {taskDetails?.need_videos ===
                                                    true
                                                      ? "£" +
                                                        formatAmountInMillion(
                                                          taskDetails?.hopper_videos_price
                                                        )
                                                      : "--"}
                                                  </p>
                                                  <p className="offrd_txt">
                                                    Offered
                                                  </p>
                                                  <div className="cont_tp">
                                                    Video
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {messages &&
                                        messages?.map((curr, index) => {
                                          const Ratingg =
                                            messages &&
                                            messages.find(
                                              (item) =>
                                                item?.message_type ===
                                                "rating_mediaHouse"
                                            );
                                          const Ratings = Ratingg
                                            ? Ratingg?.rating
                                            : "";
                                          return (
                                            <>
                                              {curr.message_type ===
                                                "media" && (
                                                <div className="chatting_itm sngl_cht d-flex align-items-start">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_AVATAR_IMAGE +
                                                      roomDetails
                                                        ?.avatar_detals[0]
                                                        ?.avatar
                                                    }
                                                    alt="User"
                                                    className="usr_img"
                                                  />
                                                  <div className="cht_txt">
                                                    <div className="d-flex align-items-center">
                                                      <p className="usr_name mb-0">
                                                        {
                                                          curr?.sender_id
                                                            ?.user_name
                                                        }
                                                      </p>
                                                      <p className="cht_time mb-0">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                    <p className="mb-0 msg">
                                                      Has uploaded 1{" "}
                                                      {curr?.media?.mime ==
                                                      "video"
                                                        ? "Video"
                                                        : curr?.media?.mime ==
                                                          "image"
                                                        ? "Image"
                                                        : "Audio"}
                                                    </p>
                                                    {/* <div className="content_uplded position-relative vido_cnt">
                                                    
                                                      {curr?.media?.mime ===
                                                      "image" ? (
                                                        <img
                                                          src={
                                                            process.env
                                                              .REACT_APP_UPLOADED_CONTENT +
                                                            curr?.media?.name
                                                          }
                                                          className="usr_upld_cont"
                                                          alt="Content Image"
                                                        />
                                                      ) : curr?.media?.mime ===
                                                        "video" ? (
                                                        <video
                                                          controls
                                                          className="slider-vddo"
                                                          src={
                                                            process.env
                                                              .REACT_APP_UPLOADED_CONTENT +
                                                            curr?.media?.name
                                                          }
                                                        />
                                                      ) : (
                                                        <div>
                                                          <img
                                                            src={audioic}
                                                            alt={`Audio ${curr._id}`}
                                                            className="slider-img"
                                                            onClick={
                                                              toggleAudio
                                                            }
                                                          />
                                                          <audio
                                                            controls
                                                            src={
                                                              process.env
                                                                .REACT_APP_UPLOADED_CONTENT +
                                                              curr?.media?.name
                                                            }
                                                            type="audio/mpeg"
                                                            className="slider-audio"
                                                            ref={audioRef}
                                                          />
                                                        </div>
                                                      )}
                                                    </div> */}
                                                    {/* <div className="content_uplded position-relative vido_cnt">
                                                      {curr?.media?.map(
                                                        (item, index) => (
                                                          <>
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
                                                                    className="media-checkbox"
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      handleSelectionChange(
                                                                        item,
                                                                        e.target
                                                                          .checked
                                                                      );
                                                                      console.log(
                                                                        `Checkbox for media ${
                                                                          item?._id ||
                                                                          index
                                                                        } is ${
                                                                          e
                                                                            .target
                                                                            .checked
                                                                        }`
                                                                      );
                                                                    }}
                                                                  />
                                                         
                                                                </label>

                                                                {item?.mime ===
                                                                "image" ? (
                                                                  <img
                                                                 
                                                                    src={`${item?.thumbnail_url}`}
                                                                    className="usr_upld_cont"
                                                                    alt={`Content Image ${
                                                                      index + 1
                                                                    }`}
                                                                  />
                                                                ) : item?.mime ===
                                                                  "video" ? (
                                                                  <video
                                                                    controls
                                                                    className="slider-vddo"
                                                                    
                                                                    src={`${item?.thumbnail_url}`}
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
                                                                      src={`${item?.thumbnail_url}`}
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
                                                              ""
                                                            )}
                                                          </>
                                                        )
                                                      )}
                                                    </div> */}
                                                    <div className="content_uplded position-relative vido_cnt">
                                                      {curr?.media?.map(
                                                        (item, index) => (
                                                          <>
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
                                                                    className="media-checkbox"
                                                                    onChange={(
                                                                      e
                                                                    ) => {
                                                                      // Handle checkbox state change here
                                                                      handleSelectionChange(
                                                                        item,
                                                                        e.target
                                                                          .checked
                                                                      );
                                                                      console.log(
                                                                        `Checkbox for media ${
                                                                          item?._id ||
                                                                          index
                                                                        } is ${
                                                                          e
                                                                            .target
                                                                            .checked
                                                                        }`
                                                                      );
                                                                    }}
                                                                  />
                                                                  {/* <span>
                                                                Select
                                                              </span> */}
                                                                </label>

                                                                {item?.mime ===
                                                                "image" ? (
                                                                  <img
                                                                    // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                    src={`${item?.thumbnail_url}`}
                                                                    className="usr_upld_cont"
                                                                    alt={`Content Image ${
                                                                      index + 1
                                                                    }`}
                                                                  />
                                                                ) : item?.mime ===
                                                                  "video" ? (
                                                                  <video
                                                                    controls
                                                                    className="slider-vddo"
                                                                    // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                    src={`${item?.thumbnail_url}`}
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
                                                                      // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                      src={`${item?.thumbnail_url}`}
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
                                                                    // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                    src={`${item?.thumbnail_url}`}
                                                                    className="usr_upld_cont"
                                                                    alt={`Content Image ${
                                                                      index + 1
                                                                    }`}
                                                                  />
                                                                ) : item?.mime ===
                                                                  "video" ? (
                                                                  <video
                                                                    controls
                                                                    className="slider-vddo"
                                                                    // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                    src={`${item?.thumbnail_url}`}
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
                                                                      // src={`${process.env.REACT_APP_UPLOADED_CONTENT}${item?.thumbnail_url}`}
                                                                      src={`${item?.thumbnail_url}`}
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

                                                                <div className="usr_upld_opts">
                                                                  <button
                                                                    className="theme_btn"
                                                                    onClick={() =>
                                                                      DownloadContent(
                                                                        item?.image_id
                                                                      )
                                                                    }
                                                                  >
                                                                    Download
                                                                  </button>
                                                                </div>
                                                              </>
                                                            )}
                                                          </>
                                                        )
                                                      )}
                                                    </div>

                                                    <div className="usr_upld_opts">
                                                      {curr?.paid_status !==
                                                      true ? (
                                                        <div className="d-flex">
                                                          <button
                                                            className="theme_btn me-2"
                                                            onClick={() => {
                                                              if (
                                                                taskExpireDiff >=
                                                                1
                                                              ) {
                                                                successToasterFun(
                                                                  "This task has been expired"
                                                                );
                                                              } else {
                                                                stripePayment(
                                                                  curr
                                                                );
                                                              }
                                                            }}
                                                          >
                                                            Buy
                                                          </button>

                                                          <button
                                                            className="theme_btn"
                                                            onClick={() => {
                                                              if (
                                                                taskExpireDiff >=
                                                                1
                                                              ) {
                                                                successToasterFun(
                                                                  "This task has been expired"
                                                                );
                                                              } else {
                                                                stripePayment(
                                                                  curr
                                                                );
                                                              }
                                                            }}
                                                          >
                                                            Add to basket
                                                          </button>
                                                        </div>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {curr?.paid_status !==
                                                        true &&
                                                        curr?.request_sent ===
                                                          null && (
                                                          <span>or</span>
                                                        )}
                                                      {curr?.request_sent ===
                                                        null && (
                                                        // taskExpireDiff >= 1 &&
                                                        <button
                                                          className="secondary_btn"
                                                          onClick={() => {
                                                            if (
                                                              taskExpireDiff >=
                                                              1
                                                            ) {
                                                              successToasterFun(
                                                                "This task has been expired"
                                                              );
                                                            } else {
                                                              requestMoreContent(
                                                                curr
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          Request more content
                                                        </button>
                                                      )}
                                                    </div>
                                                    <p className="buy_btn_txt mb-0">
                                                      This content has been
                                                      directly uploaded by the
                                                      Hopper on our platform. We
                                                      have not reviewed the
                                                      content for authenticity &
                                                      privacy, and are not
                                                      responsible. Please review
                                                      the content properly
                                                      before purchasing it.
                                                      Please{" "}
                                                      <a className="link">
                                                        contact us{" "}
                                                      </a>
                                                      should you wish to discuss
                                                      this content.
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
                                                      <p className="usr_name mb-0">
                                                        Presshop
                                                      </p>
                                                      <p className="cht_time mb-0">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                    <p className="mb-0 msg auto_press_msg">
                                                      Congrats, you’ve
                                                      successfully purchased 1{" "}
                                                      {curr?.thumbnail_url
                                                        ? "video"
                                                        : "photo"}{" "}
                                                      for £{curr?.amount} from{" "}
                                                      {
                                                        curr?.sender_id
                                                          ?.user_name
                                                      }
                                                      . Please download the
                                                      water-mark free, and high
                                                      definition content, by
                                                      clicking below
                                                    </p>
                                                    <div className="usr_upld_opts">
                                                      <button
                                                        className="theme_btn"
                                                        onClick={() =>
                                                          DownloadContent(
                                                            curr?.image_id
                                                          )
                                                        }
                                                      >
                                                        Download
                                                      </button>
                                                    </div>
                                                    <p className="buy_btn_txt mb-0">
                                                      Please refer to our{" "}
                                                      <a className="link">
                                                        licensing terms of usage
                                                      </a>
                                                      , and{" "}
                                                      <a className="link">
                                                        terms and conditions
                                                      </a>
                                                      . If you have any
                                                      questions, please{" "}
                                                      <a className="link">
                                                        chat
                                                      </a>{" "}
                                                      or{" "}
                                                      <a className="link">
                                                        contact
                                                      </a>{" "}
                                                      our helpful teams who are
                                                      available 24x7 to assist
                                                      you. Thank you.
                                                    </p>
                                                  </div>
                                                </div>
                                              )}
                                              {curr.message_type ===
                                                "request_more_content" && (
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
                                                      <p className="usr_name mb-0">
                                                        {curr?.receiver_id
                                                          ?.first_name +
                                                          " " +
                                                          curr?.receiver_id
                                                            ?.last_name}
                                                      </p>
                                                      <p className="cht_time mb-0">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                    <p className="mb-0 msg auto_press_msg">
                                                      Has requested for more
                                                      content from abhishek{" "}
                                                      {
                                                        curr?.sender_id
                                                          ?.user_name
                                                      }
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
                                                      <p className="usr_name mb-0">
                                                        Presshop
                                                      </p>
                                                      <p className="cht_time mb-0">
                                                        {moment(
                                                          curr?.createdAt
                                                        ).format(
                                                          "h:mm A, D MMM YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                    <p className="mb-0 msg auto_press_msg">
                                                      Rate your experience with{" "}
                                                      {
                                                        curr?.sender_id
                                                          ?.user_name
                                                      }
                                                    </p>
                                                    <div className="usr_upld_opts">
                                                      <Rating
                                                        onClick={handleRating}
                                                        disabled={
                                                          !Number(Ratings)
                                                        }
                                                        initialValue={
                                                          Ratings
                                                            ? Number(Ratings)
                                                            : 0
                                                        }
                                                        value={rating}
                                                      />
                                                      <Form.Group
                                                        className="mb-3"
                                                        controlId="exampleForm.ControlTextarea1"
                                                      >
                                                        <Form.Control
                                                          placeholder="Write your review"
                                                          disabled={curr.review}
                                                          value={
                                                            curr.review
                                                              ? curr.review
                                                              : review
                                                          }
                                                          onChange={(e) => {
                                                            setReview(
                                                              e.target.value
                                                            );
                                                          }}
                                                          as="textarea"
                                                          rows={3}
                                                        ></Form.Control>
                                                      </Form.Group>
                                                      {!curr.rating && (
                                                        <button
                                                          className="theme_btn"
                                                          onClick={() =>
                                                            RatingNReview(curr)
                                                          }
                                                        >
                                                          Submit
                                                        </button>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {curr.message_type ===
                                                "reject_mediaHouse_offer" &&
                                                !curr.paid_status && (
                                                  <div className="chatting_itm auto_msg rating sngl_cht d-flex align-items-start">
                                                    <img
                                                      src={presshopchatic}
                                                      alt="User"
                                                      className="usr_img"
                                                    />
                                                    <div className="cht_txt">
                                                      <div className="d-flex align-items-center">
                                                        <p className="usr_name mb-0">
                                                          Presshop
                                                        </p>
                                                        <p className="cht_time mb-0">
                                                          {moment(
                                                            curr?.createdAt
                                                          ).format(
                                                            "h:mm A, D MMM YYYY"
                                                          )}
                                                        </p>
                                                      </div>
                                                      <p className="mb-0 msg auto_press_msg">
                                                        Rate your experience
                                                        with Pseudonymous
                                                      </p>
                                                      <div className="usr_upld_opts">
                                                        <Rating
                                                          onClick={handleRating}
                                                          value={rating}
                                                          disabled={
                                                            !Number(Ratings)
                                                          }
                                                          initialValue={
                                                            Ratings
                                                              ? Number(Ratings)
                                                              : 0
                                                          }
                                                        />
                                                        <Form.Group
                                                          className="mb-3"
                                                          controlId="exampleForm.ControlTextarea1"
                                                        >
                                                          <Form.Control
                                                            placeholder="Write your review"
                                                            disabled={
                                                              curr.review
                                                            }
                                                            value={
                                                              curr.review
                                                                ? curr.review
                                                                : review
                                                            }
                                                            onChange={(e) => {
                                                              setReview(
                                                                e.target.value
                                                              );
                                                            }}
                                                            as="textarea"
                                                            rows={3}
                                                          ></Form.Control>
                                                        </Form.Group>
                                                        <button
                                                          className="theme_btn"
                                                          onClick={() =>
                                                            RatingNReview(
                                                              curr.image_id
                                                            )
                                                          }
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
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="presshop" title="Presshop Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={9}>
                                  <div className="feed_dtl_msgs presshopChatDetail dp">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}
                                        <span className="txt_bld">
                                          {fullName}
                                        </span>
                                      </h6>
                                      <h6 className="txt_light">
                                        Please select the Presshop team member
                                        you wish to speak to from the
                                        participants box on the right.{" "}
                                      </h6>
                                      <h6 className="txt_light">
                                        Once selected, please use the text box
                                        below to start chatting.{" "}
                                      </h6>
                                    </div>
                                    {showChat.presshop ? (
                                      <ChatCard
                                        senderId={senderId && senderId}
                                      />
                                    ) : (
                                      <ChatCard />
                                    )}
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="tab_in_card-heading d-flex justify-content-between align-items-center">
                                      <h4>Participants hello</h4>
                                    </div>

                                    <div className="scrollHtPnts presshopChat">
                                      {adminList &&
                                        adminList
                                          .filter((obj1) =>
                                            admins.some(
                                              (obj2) =>
                                                obj1._id == obj2.userId?.id
                                            )
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  localStorage.removeItem(
                                                    "roomId"
                                                  );
                                                  if (
                                                    admins?.some(
                                                      (el) =>
                                                        el?.userId?.id ===
                                                        curr._id
                                                    )
                                                  ) {
                                                    setSenderId(curr._id);
                                                    setShowChat({
                                                      content: false,
                                                      task: false,
                                                      presshop: true,
                                                    });
                                                  }
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span
                                                    className={
                                                      admins?.some(
                                                        (el) =>
                                                          el?.userId?.id ===
                                                          curr._id
                                                      )
                                                        ? "activeUsr"
                                                        : "InactiveUsr"
                                                    }
                                                  >
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                      {admins.length === 0 &&
                                        adminList
                                          .filter(
                                            (obj1) => obj1.role === "admin"
                                          )
                                          .map((curr) => {
                                            return (
                                              <div
                                                className="tab_in_card_items"
                                                onClick={() => {
                                                  localStorage.setItem(
                                                    "receiverId",
                                                    JSON.stringify(curr._id)
                                                  ) || "";
                                                  localStorage.removeItem(
                                                    "contentId"
                                                  );
                                                  localStorage.removeItem(
                                                    "roomId"
                                                  );
                                                  setSenderId(curr._id);
                                                  setShowChat({
                                                    content: false,
                                                    task: false,
                                                    presshop: true,
                                                  });
                                                }}
                                              >
                                                <div className="checkWrap">
                                                  <FormControlLabel
                                                    className="afterCheck"
                                                    control={<Checkbox />}
                                                    checked={curr.checked}
                                                    onChange={() =>
                                                      handleChecked(curr)
                                                    }
                                                  />
                                                </div>
                                                <div className="img">
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_ADMIN_IMAGE +
                                                      curr?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                  <span className={"activeUsr"}>
                                                    {curr?.name}
                                                  </span>
                                                </div>
                                              </div>
                                            );
                                          })}
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
                      <Link
                        to={`/related-content-task/:tag_id/${data?.hopper_id?._id}/${data?.category_details[0]?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {relatedContent?.map((item, index) => {
                      return (
                        <Col md={3}>
                          {/* <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.imageAndVideo
                                : item?.type === "video"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.videothubnail
                                : item?.type === "audio"
                                ? audioic
                                : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.type === "image"
                                ? cameraic
                                : item?.type === "audio"
                                ? interviewic
                                : item?.type === "video"
                                ? videoic
                                : null
                            }
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              item?.avatar_detals[0]?.avatar
                            }
                            author_Name={item?.hopper_id?.user_name}
                            lnkto={`/content-details/${item._id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item._id}`}
                            fvticns={
                              item.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_tag={item?.category_details[0]?.name}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item.task_id.task_description}
                            feedTime={moment(item.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item.task_id.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.photo_price
                                : item?.type === "audio"
                                ? item?.task_id?.interview_price || 0
                                : item?.type === "video"
                                ? item?.task_id?.videos_price || 0
                                : null
                            )}`}
                            favourite={() => handleFavourite(index, "related")}
                            bool_fav={
                              item.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            content_id={item._id}
                           
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?._id}
                          /> */}
                          <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item?.imageAndVideo
                                : item?.type === "video"
                                ? item?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item?.videothubnail
                                : item?.type === "audio"
                                ? audioic
                                : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.type === "image"
                                ? cameraic
                                : item?.type === "audio"
                                ? interviewic
                                : item?.type === "video"
                                ? videoic
                                : null
                            }
                            user_avatar={
                              item?.avatar_details?.[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.avatar_details?.[0]?.avatar
                                : item?.avatar_detals?.[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.avatar_detals?.[0]?.avatar
                                : ""
                            }
                            author_Name={item?.hopper_id?.user_name}
                            // lnkto={`/content-details/${item?._id}`}
                            lnkto={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            fvticns={
                              item?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_tag={item?.category_details[0]?.name}
                            basket={() => handleBasket(index, "related")}
                            basketValue={item?.basket_status}
                            allContent={item?.task_id?.content}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item?.task_id?.task_description}
                            feedTime={moment(item?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item?.task_id?.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.hopper_photo_price || 0
                                : item?.type === "audio"
                                ? item?.task_id?.hopper_interview_price || 0
                                : item?.type === "video"
                                ? item?.task_id?.hopper_videos_price || 0
                                : null
                            )}`}
                            favourite={() => handleFavourite(index, "related")}
                            bool_fav={
                              item?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            // content_id={item?.content_id}
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?._id}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className="feedsContainer mb-0">
                  <div className="feedContent_header">
                    <h1>More content from {data?.hopper_id?.user_name}</h1>
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
                      <Link
                        to={`/more-content-task/${data?.hopper_id?._id}/${data?.task_id?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {moreContent.slice(0, 4)?.map((item, index) => {
                      if (index == 0) {
                        console.log(
                          "all more content check 12334____-___------>",
                          item
                        );
                      }
                      return (
                        <Col md={3}>
                          {/* <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.imageAndVideo
                                : item?.type === "video"
                                ? item.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item.videothubnail
                                : item?.type === "audio"
                                ? audioic
                                : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.type === "image"
                                ? cameraic
                                : item?.type === "audio"
                                ? interviewic
                                : item?.type === "video"
                                ? videoic
                                : null
                            }
                            user_avatar={
                              process.env.REACT_APP_AVATAR_IMAGE +
                              item?.avatar_detals[0]?.avatar
                            }
                            author_Name={item?.hopper_id?.user_name}
                            basket={() => handleBasket(index, "more")}
                            basketValue={item?.basket_status}
                            lnkto={`/content-details/${item?._id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?._id}`}
                            fvticns={
                              item.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            allContent={item?.task_id?.content}
                            type_tag={item?.category_details[0]?.name}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item.task_id.task_description}
                            feedTime={moment(item.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item.task_id.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.photo_price
                                : item?.type === "audio"
                                ? item?.task_id?.interview_price || 0
                                : item?.type === "video"
                                ? item?.task_id?.videos_price || 0
                                : null
                            )}`}
                            favourite={() => handleFavourite(index, "more")}
                            bool_fav={
                              item.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                      
                            content_id={item?._id}
                            taskc_ontent_id={item?._id || item?.task_id?._id}
                            taskContentId={item?._id}
                          /> */}
                          <ContentFeedCard
                            feedImg={
                              item?.type === "image"
                                ? item?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item?.imageAndVideo
                                : item?.type === "video"
                                ? item?.videothubnail ||
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                    item?.videothubnail
                                : item?.type === "audio"
                                ? audioic
                                : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.type === "image"
                                ? cameraic
                                : item?.type === "audio"
                                ? interviewic
                                : item?.type === "video"
                                ? videoic
                                : null
                            }
                            user_avatar={
                              item?.avatar_details?.[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.avatar_details?.[0]?.avatar
                                : item?.avatar_detals?.[0]?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.avatar_detals?.[0]?.avatar
                                : ""
                            }
                            author_Name={item?.hopper_id?.user_name}
                            // lnkto={`/content-details/${item?._id}`}
                            lnkto={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?._id}?task_content_id=${item?.content_id}`}
                            fvticns={
                              item?.favourite_status === "true"
                                ? favouritedic
                                : favic
                            }
                            type_tag={item?.category_details[0]?.name}
                            basket={() => handleBasket(index, "more")}
                            basketValue={item?.basket_status}
                            allContent={item?.task_id?.content}
                            type_img={item?.category_details[0]?.icon}
                            feedHead={item?.task_id?.task_description}
                            feedTime={moment(item?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item?.task_id?.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.type === "image"
                                ? item?.task_id?.hopper_photo_price || 0
                                : item?.type === "audio"
                                ? item?.task_id?.hopper_interview_price || 0
                                : item?.type === "video"
                                ? item?.task_id?.hopper_videos_price || 0
                                : null
                            )}`}
                            favourite={() => handleFavourite(index, "more")}
                            bool_fav={
                              item?.favourite_status === "true"
                                ? "false"
                                : "true"
                            }
                            // content_id={item?.content_id}
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?._id}
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
      <Modal
        show={show1}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              <img className="mdlPrevImg" src={bigData} />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={handleClose}>
              Close
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={preview?.modalOpen}
        onHide={handleClosePreview}
        aria-labelledby="contained-modal-title-hcenter profile_mdl"
        className="modal_wrapper"
        dialogClassName="my-modal adm_reg_mdl mdl_dsn"
      >
        <Modal.Header className="modal-header profile_mdl_hdr_wrap" closeButton>
          <Modal.Title className="modal-title profile_modal_ttl">
            <p className="mb-0">Image Preview</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid modal-body border-0">
          <Container>
            <div>
              {preview?.type === "image" ? (
                <img className="mdlPrevImg" src={preview?.path} />
              ) : preview?.type === "video" ? (
                <video
                  src={preview?.path}
                  className="msgContent"
                  controls
                ></video>
              ) : (
                ""
              )}
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-4">
          <Button
            className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
            variant="primary"
            type="submit"
          >
            <div className="link_white" onClick={handleButtonClick}>
              Send
            </div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadedContentDetails;
