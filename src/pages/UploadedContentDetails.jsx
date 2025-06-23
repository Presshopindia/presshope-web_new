import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
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
import { SlMagnifierAdd } from "react-icons/sl";
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
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import tickic from "../assets/images/chat-icons/tick.svg";
import audioic from "../assets/images/audimg.svg";
import heart from "../assets/images/heart.svg";
import cameraic from "../assets/images/camera.svg";
import presshopchatic from "../assets/images/chat_logo.png";
import favouritedic from "../assets/images/favouritestar.svg";
import interviewic from "../assets/images/interview.svg";
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
import ViewUploadedContent from "../component/ViewUploadedContent";

import Loader from "../component/Loader";
import { useDarkMode } from "../context/DarkModeContext";
import {
  contentUploadedMsgInTaskChat,
  formatAmountInMillion,
  successToasterFun,
} from "../component/commonFunction";
import socketServer from "../socket.config";
import { toast } from "react-toastify";

const UploadedContentDetails = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const { profileData, setCartCount, onlineUsers } = useDarkMode();

  const userImage = profileData?.hasOwnProperty("admin_detail")
    ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image;

  const username = profileData?.full_name;

  const [taskContentIndex, setTaskContentIndex] = useState(0);
  const [imageSize, setImageSize] = useState({ height: 0, width: 0 });
  const [showContent, setShowContent] = useState({});
  const [openContent, setOpenContent] = useState(false);
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
  const [relatedContent, setRelatedContent] = useState(null);
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
  const taskHopperId = searchParams.get("hopper_id");

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
      setCartCount(res?.data?.data || 0);
    } catch (error) {
      console.log("basketcountError", error);
    }
  }

  // Add to basket-
  const AddToBasket = async (element) => {
    try {
      setLoading(true);
      let object = {
        content_id: selectedItems,
        type: "task",
        hopper_id: taskHopperId,
        task_id: param.id,
        stripe_account_id: data?.[0]?.hopper_id?.stripe_account_id,
        offer: false,
        application_fee: 15,
        hopper_charge_ac_category: 5,
        room_id: "",
        chat_id: element._id
      };
      const res = await Post(`mediaHouse/addToBasket`, object);
      if (res) {
        getCountOfBasketItems();
        setLoading(false);
        setSelectedItems([]);
        successToasterFun("Content added to Basket");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const RatingNReview = (curr) => {
    if (!roomDetails.room_id) {
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
    socketServer.on("rating", (data) => {
      getMessages();
    });
  };

  useEffect(() => {
    socketServer.emit("getallchat", { room_id: roomDetails?.room_id });
  }, [socketServer]);

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
        `mediaHouse/getuploadedContentbyHoppers?_id=${param.id}&hopper_id=${taskHopperId}`
      );
      setData(resp.data.data);
      setShowContent(resp?.data?.data?.[0]);

      if (resp?.data?.data?.[0]?.type == "image") {
        const img = new Image();
        img.src = resp?.data?.data?.[0]?.videothubnail;
        img.onload = function () {
          setImageSize({ height: img.height, width: img.width });
        };
      }

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
        room_id: resp?.data?.room_id?.room_id,
        sender_id: User && (User?._id || User?.id)
      }));

      localStorage.setItem("internal", resp?.data?.data?.[0]?.task_id?._id);
      setHopper(resp.data.data[0]?.hopper_id);
      setHopperid(resp.data.data[0]?.hopper_id?._id);
      const resp1 = await Post(`mediaHouse/MoreContentforTask`, {
        hopper_id: resp.data.data[0]?.hopper_id?._id,
        task_id: resp.data.data[0]?.task_id?._id,
      });
      setMoreContent(resp1.data.content);
      const resp2 = await Get(`mediaHouse/getuploadedContentbyHoppers?limit=${4}&offet=${0}&task_id=${resp.data.data[0]?.task_id?._id}`);
      setRelatedContent(resp2?.data);
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

  useEffect(() => {
    window.addEventListener("focus", () => {
      ContentByID();
    });
    return () =>
      window.removeEventListener("focus", () => {
        ContentByID();
      });
  }, []);

  const Favourite = async (favData) => {
    try {
      let obj = {
        uploaded_content: [favData?._id],
        favourite_status: favData?.favourited === "true" ? "false" : "true"
      };
      setData((prev) => {
        const updatedData = [...prev];
        updatedData[taskContentIndex].favourited = updatedData[taskContentIndex].favourited === "true" ? "false" : "true";
        return updatedData;
      });
      await Patch(`mediaHouse/add/to/favourites`, obj);
    } catch (error) {
      // Handle error here
    }
  };

  const Payment = async (
    amount,
    image_id,
    reconsider = false,
    reconsider_amount = 0,
    room_id
  ) => {
    try {
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

      const obj2 = {
        type: "content",
        product_id: image_id,
        amount_paid: amount,
        commission: 0,
      };
      const resp1 = await Post("mediahouse/applicationfee", obj2);

      obj1.application_fee = resp1?.data?.data;
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
    }
  };

  useEffect(() => {
    ContentByID();
    GetUserList();
  }, [param?.id, taskHopperId]);

  // Handle push notification event
  const handlePushNotification = (event) => {
    if (event && event.data) {
      ContentByID();
      console.log("ContentByID");
    }
  };

  // Set up push notification listener
  useEffect(() => {
    // Check if the browser supports service workers and push notifications
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // Add event listener for push notifications
      navigator.serviceWorker.addEventListener('message', handlePushNotification);

      // Clean up the event listener when component unmounts
      return () => {
        navigator.serviceWorker.removeEventListener('message', handlePushNotification);
      };
    }
  }, []);

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

  console.log("selectedImtems", selectedItems)


  const Audio = data?.filter((item) => item.type === "audio")
  const Video = data?.filter((item) => item.type === "video")
  const images = data?.filter((item) => item.type === "image")

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
      setUserList(resp.data.response);
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
  }, [chatContentIds, socketServer]);

  // useEffect(() => {
  //   const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
  //   if (messageContainer) {
  //     messageContainer.scrollTop = messageContainer.scrollHeight;
  //   }

  //   socketServer.emit('room join', { room_id: chatContentIds?.room_id });
  //   socketServer.on("internal group chat", (data) => {
  //     const newMessage = data;
  //     setMessage((prevMessages) => [...prevMessages, newMessage,]);

  //     if (newMessage) {
  //       messageContainer.scrollTop = messageContainer.scrollHeight;
  //     }
  //   });
  //   return () => {
  //     socketServer.emit('room leave', { room_id: chatContentIds?.room_id });
  //     socketServer.off("internal group chat");
  //   };
  // }, [socketServer, chatContentIds?.room_id]);

  useEffect(() => {
    // Internal Chat and External Chat-
    if (tabSelect == "internal") {
      const messageContainer = document.getElementById("message-container-1"); // Replace "message-container" with the actual ID or class of your message container element
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
      socketServer.emit("room join", { room_id: chatContentIds?.room_id });
      socketServer.on("internal group chat", (data) => {
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
        socketServer.emit("room leave", { room_id: chatContentIds?.room_id });
        socketServer.off("internal group chat");
      };
    } else if (tabSelect == "external") {
      socketServer.emit("room join", { room_id: room_idForContent });
      socketServer?.on("getAdmins", (data) => {
        setAdmins(data);
      });
      socketServer.on("initialoffer", (data) => {
        const newMessage = data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      return () => {
        socketServer.emit("room leave", { room_id: room_idForContent });
        socketServer.off("initialoffer");
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
        sender_id: user._id,
        room_id: chatContentIds ? chatContentIds?.room_id : "",
        room_type: "task",
      };
      // console.log("Obj ----->", obj)
      const resp = await Post("mediaHouse/internalGroupChatMH", obj);
      if (resp) {
        setSelectedIds([]);
        GetUserList();
        setChatContentIds((pre) => ({
          ...pre,
          room_id: resp?.data?.data?.data?.room_id,
        }));
        socketServer.emit("room join", {
          room_id: resp?.data?.data?.data?.room_id,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, `<<<<<socketServer error`);
      // Handle errors
    }
  };

  console.log("chatContentIds", chatContentIds);

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

    socketServer.emit("internal group chat", messages);
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
          "roomId", chatContentIds?.room_id || "");
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
      });
    } else {
      audio.pause();
    }
  };

  // External chat-------------------------------------------------------------

  const JoinRoom = () => {
    socketServer.emit("room join", { room_id: roomDetails?.roomsdetails?.room_id });
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
    setLoading(true);
    let totalAmount = 0;
    selectedItems.forEach((ele) => {
      totalAmount += Number(ele.amount);
    });
    let obj = {
      items: selectedItems,
      customer_id: UserDetails?.stripe_customer_id,
      stripe_account_id: curr?.sender_id?.stripe_account_id || "no data",
      amount: totalAmount || curr?.media?.amount,
      type: "task_content",
      task_id: taskDetails?._id,
      description: taskDetails?.heading,
      room_id: roomDetails?.roomsdetails?.room_id,
      chat_id: curr?._id,
      hopper_id: taskHopperId
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

  const requestMoreContent = (curr) => {
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
        getMessages(
          JSON.parse(localStorage.getItem("external_chat_room_detail"))
        );
      });
    } catch (error) { }
  };

  const DownloadContent = async (id) => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}mediahouse/image_pathdownload?image_id=${id}&type=task`,
      "_blank"
    );
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

  const [features, setFeatures] = useState([]);
  const handleFeatures = (val) => {
    if (features.includes(val)) {
      const data = features.filter((el) => el != val);
      setFeatures(data);
    } else {
      setFeatures([...features, val]);
    }
  };

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
                          </div>
                          <div
                            className="post_itm_icns right dtl_icns"
                            onClick={() => {
                              Favourite(data?.find((el) => el._id === showContent?._id));
                            }}
                          >
                            <img
                              className="feedMediaType iconBg"
                              src={
                                data?.find((el) => el._id === showContent?._id)?.favourited === "true"
                                  ? favouritedic
                                  : favic
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className="post_itm_icns right dtl_icns uploaded-magnifier"
                            onClick={() => {
                              setOpenContent(!openContent);
                            }}
                          >
                            <div className="feedMediaType iconBg">
                              <SlMagnifierAdd />
                            </div>
                          </div>
                          <ViewUploadedContent
                            openContent={openContent}
                            setOpenContent={setOpenContent}
                            showContent={showContent}
                            imageSize={imageSize}
                          />
                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            modules={[Pagination]}
                            slidesPerGroupSkip={1}
                            focusableElements="pagination"
                            pagination={{ clickable: true }}
                            onSlideChange={(e) => {
                              setTaskContentIndex(e.activeIndex)
                              setShowContent(data[e.activeIndex]);
                              if (data[e.activeIndex]?.type == "image") {
                                const img = new Image();
                                img.src = data[e.activeIndex]?.videothubnail;
                                img.onload = function () {
                                  setImageSize({
                                    height: img.height,
                                    width: img.width,
                                  });
                                };
                              }
                            }}
                          >
                            {data
                              ? data?.map((curr) => {
                                return (
                                  <SwiperSlide key={curr._id}>
                                    {curr?.type === "image" ? (
                                      <img
                                        src={curr?.videothubnail}
                                        alt={`Image ${curr._id}`}
                                      />
                                    ) : curr?.type === "audio" ? (
                                      <div>
                                        <img
                                          src={audioic}
                                          alt={`Audio ${curr._id}`}
                                          className="slider-img"
                                          onClick={toggleAudio}
                                        />
                                        <audio
                                          controls
                                          src={process.env.REACT_APP_CONTENT_MEDIA + curr?.imageAndVideo}
                                          type="audio/mpeg"
                                          className="slider-audio"
                                          ref={audioRef}
                                        />
                                      </div>
                                    ) : curr?.type === "video" ? (
                                      <video
                                        controls
                                        className="slider-vddo"
                                        src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo}
                                      />
                                    ) : null}
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
                          </Swiper>

                          <div className="feedTitle_content">
                            <h1 className="feedTitle">
                              {data?.[0]?.task_id?.heading}
                            </h1>

                            <textarea
                              className="form-control custom_textarea"
                              readOnly
                              value={data?.[0]?.task_id?.task_description}
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
                                        data?.[0]?.avatar_detals[0]?.avatar
                                      }
                                      alt=""
                                    />

                                    <span className="hpr_nme">
                                      {data?.[0]?.hopper_id?.user_name}
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
                                      <div>{data?.[0]?.task_id?.location}</div>
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
                                      {moment(data?.[0]?.task_id?.createdAt).format(
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
                                      src={data?.[0]?.category_details[0]?.icon}
                                      className="exclusive-img"
                                      alt=""
                                    />
                                    <span className="txt_catg_licn">
                                      {capitalizeFirstLetter(
                                        data?.[0]?.category_details[0]?.name
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
                                      £ {data?.[0]?.task_id?.hopper_photo_price || 0}
                                    </button>
                                  </div>
                                  <div className="btn-1">
                                    <p>Interview</p>
                                    <button className="btn-price">
                                      £{" "}
                                      {data?.[0]?.task_id?.hopper_interview_price ||
                                        0}
                                    </button>
                                  </div>
                                  <div className="btn-1">
                                    <p>Video</p>
                                    <button className="btn-price">
                                      £{" "}
                                      {data?.[0]?.task_id?.hopper_videos_price || 0}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="add-to-basket-btn">
                                <button
                                  onClick={() => navigate("/basket")}
                                  className="red-btn"
                                >
                                  Go to Basket
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
                                      <div
                                        className="baat_cheet"
                                        // ref={chatBoxRef}
                                        // ref={chatBoxInternalRef}
                                        // chatBoxInternalRef
                                        key={curr?._id}
                                      >
                                        {curr?.type === "add" && curr.user_id !== profileData._id ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              {
                                                user?._id === curr?.sender_id?._id ? `You added ${curr?.addedMsg}` : `You have been added by ${curr?.sender_id?.full_name}`
                                              }
                                            </span>
                                          </p>
                                        ) : curr?.type == "remove" ? (
                                          <p className="usrAddedTxt mb-4">
                                            <span>
                                              {
                                                user?._id === curr?.sender_id?._id ? `You removed ${curr?.addedMsg}` : `You have been removed by ${curr?.sender_id?.full_name}`
                                              }
                                            </span>
                                          </p>
                                        ) : (
                                          curr?.user_info && (
                                            <div className="crd" key={curr.id}>
                                              {curr?.user_info && (
                                                <div className="img">
                                                  <img
                                                    src={
                                                      curr.user_info
                                                        ?.profile_image
                                                    }
                                                    alt="user"
                                                  />
                                                </div>
                                              )}
                                              <div className="postedcmnt_info">
                                                {curr?.user_info && (
                                                  <h5>
                                                    {`${curr?.user_info?.first_name} ${curr?.user_info?.last_name}`}
                                                    <span className="text-secondary time">
                                                      {moment(
                                                        curr?.createdAt || curr?.chatDate
                                                      ).format(
                                                        "hh:mm A, DD MMM YYYY"
                                                      )}
                                                    </span>
                                                  </h5>
                                                )}
                                                <Typography className="comment_text">
                                                  {curr.type === "text" &&
                                                    curr.message}
                                                </Typography>

                                                <div
                                                  onClick={() =>
                                                    handleShow(curr)
                                                  }
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
                                                  {curr.type === "audio" ? (
                                                    <audio
                                                      src={curr.message}
                                                      controls
                                                      alt="audio content"
                                                      controlsList="nodownload"
                                                    ></audio>
                                                  ) : curr.type ===
                                                    "recording" ? (
                                                    <>
                                                      <audio
                                                        src={curr.message}
                                                        controls
                                                        alt="audio content"
                                                        controlsList="nodownload"
                                                      ></audio>
                                                    </>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          )
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
                                              <h5>Record audio</h5>
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
                                      {userList?.map((curr) => {
                                        return (
                                          <div className="tab_in_card_items" key={curr?._id}>
                                            <div className="checkWrap">
                                              <FormControlLabel
                                                className={`me-0 ${!selectedIds.includes(
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
                                                      item?.addedMsg &&
                                                      item?.type == "add"
                                                  )
                                                }
                                                onChange={
                                                  (e) => {
                                                    if (e.target.checked) {
                                                      handleCheckboxChange(
                                                        curr._id
                                                      ); // Call add function when checked
                                                    } else {
                                                      RemoveChatUser(curr?._id);
                                                      // setRemoveUserId(curr?._id);
                                                    }
                                                  }
                                                  // handleCheckboxChange(curr._id)
                                                }
                                                control={
                                                  <Checkbox defaultChecked />
                                                }
                                              // disabled={message?.some(
                                              //   (item) =>
                                              //     `${curr?.first_name} ${curr?.last_name}` ==
                                              //     item?.addedMsg
                                              // )}
                                              />
                                            </div>
                                            <div
                                              className="img position-relative"
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
                                                src={curr?.profile_image}
                                                alt="user"
                                              />
                                              {onlineUsers?.online?.find((el) => el?.userId === curr?._id)?.userId ? <span className="green-dot"></span> : <span className="red-dot"></span>}
                                              <span> {curr?.full_name}</span>
                                            </div>
                                            {message?.some(
                                              (item) =>
                                                `${curr?.first_name} ${curr?.last_name}` ==
                                                item?.addedMsg &&
                                                item?.type == "add"
                                              // ) ? (
                                              //   <button
                                              //     className="bg-secondary text-white rounded"
                                              //     onClick={() => {
                                              //       RemoveChatUser(curr?._id);
                                              //       console.log(
                                              //         "all data should print ---> "
                                              //       );
                                              //     }}
                                              //   >
                                              //     remove
                                              //   </button>
                                              // ) : (
                                            )}
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
                                            <div className="d-flex align-items-center cht_txt postedcmnt_info">
                                              <h5>
                                                PressHop
                                              </h5>
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
                                                    <h5 className="usr_name mb-0 cht_txt postedcmnt_info">
                                                      {curr?.sender_id?.user_name}
                                                    </h5>
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
                                                              {/* <label className="checkbox-label">
                                                                <input
                                                                  type="checkbox"
                                                                  className="media-checkbox z-1000"
                                                                  onChange={(e) => handleSelectionChange(item, e.target.checked)}
                                                                />
                                                              </label> */}
                                                              <FormControlLabel
                                                                className="check_label me-0 media-checkbox z-1000"
                                                                control={<Checkbox />}
                                                                onChange={(e) => handleSelectionChange(item, e.target.checked)}
                                                              />

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
                                                                  src={`${process.env.REACT_APP_UPLOADED_CONTENT + item?.thumbnail_url}`}
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
                                                                    src={`${process.env.REACT_APP_CONTENT_MEDIA + item?.thumbnail_url}`}
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
                                                              AddToBasket(curr);
                                                            }
                                                          }
                                                        }}
                                                        disabled={selectedItems?.length === 0}
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
                                                        disabled={selectedItems?.length === 0}
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
                                                    Congrats, you've purchased the content for £{formatAmountInMillion(+(curr?.amount_paid))}.{" "}
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
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Tab>

                          <Tab eventKey="presshop" title="PressHop Chat">
                            <div className="tab-data active">
                              <Row>
                                <Col md={12}>
                                  <div className="feed_dtl_msgs presshopChatDetail dp">
                                    <div className="externalText">
                                      <h6 className="txt_light">
                                        Welcome{" "}<span className="txt_bld">{fullName}</span>{" to "}<span className="txt_bold">PressHop</span> support
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
                                {/* <Col md={3}>
                                  <div className="tab_in_card">
                                    <div className="scrollHtPnts presshopChat">
                                      <div className="tab_in_card_items">
                                        <div className="img">
                                          <img
                                            src={presshopchatic}
                                            alt="emily"
                                          />
                                          <span className="activeUsr">
                                            Emily
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col> */}
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
                        to={`/hopper-task-content/${data?.[0]?.task_id?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {relatedContent?.uploadedContent?.map((item, index) => {
                      const filteredContent = (mediaType) => {
                        const content = item?.content?.filter((el) => el.type === mediaType);
                        return content;
                      };

                      return (
                        <Col md={3}>
                          <ContentFeedCard
                            feedImg={
                              item?.content[0]?.type === "image"
                                ? item?.content[0]?.videothubnail ||
                                process.env.REACT_APP_UPLOADED_CONTENT +
                                item?.content[0]?.imageAndVideo
                                : item?.content[0]?.type === "video"
                                  ? item?.content[0]?.videothubnail
                                  : item?.content[0]?.type === "audio"
                                    ? audioic
                                    : null
                            }
                            type={"task"}
                            postcount={1}
                            feedTypeImg1={
                              item?.content[0]?.type === "image"
                                ? cameraic
                                : item?.content[0]?.type === "audio"
                                  ? interviewic
                                  : item?.content[0]?.type === "video"
                                    ? videoic
                                    : null
                            }
                            user_avatar={
                              item?.content[0]?.avatar_details?.avatar
                                ? process.env.REACT_APP_AVATAR_IMAGE +
                                item?.content[0]?.avatar_details?.avatar
                                : item?.content[0]?.avatar_detals?.[0]?.avatar
                                  ? process.env.REACT_APP_AVATAR_IMAGE +
                                  item?.content[0]?.avatar_detals?.avatar
                                  : ""
                            }
                            author_Name={item?.uploaded_by?.user_name}
                            lnkto={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                            viewTransaction="View details"
                            viewDetail={`/content-details/${item?.content[0]?.task_id?._id}?hopper_id=${item?.content[0]?.uploaded_by?._id}`}
                            type_tag={item?.content[0]?.category_details?.name}
                            allContent={item?.content[0]?.task_id?.content}
                            type_img={item?.content[0]?.category_details?.icon}
                            feedHead={item?.content[0]?.task_id?.task_description}
                            feedTime={moment(item?.content[0]?.createdAt).format(
                              " hh:mm A, DD MMM YYYY"
                            )}
                            feedLocation={item?.content[0]?.task_id?.location}
                            contentPrice={`${formatAmountInMillion(
                              item?.content[0]?.type === "image"
                                ? item?.content[0]?.task_id?.hopper_photo_price || 0
                                : item?.content[0]?.type === "audio"
                                  ? item?.content[0]?.task_id?.hopper_interview_price || 0
                                  : item?.content[0]?.type === "video"
                                    ? item?.content[0]?.task_id?.hopper_videos_price || 0
                                    : null
                            )}`}
                            content_id={item?._id}
                            task_content_id={item?._id || item?.task_id?._id}
                            taskContentId={item?.content?.map((el) => el._id)}
                            is_sale_status={true}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                <div className="feedsContainer mb-0">
                  <div className="feedContent_header">
                    <h1>More content from {data?.[0]?.hopper_id?.user_name}</h1>
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
                        to={`/more-content-task/${data?.[0]?.hopper_id?._id}/${data?.[0]?.task_id?._id}`}
                        className="next_link"
                      >
                        View all
                        <BsArrowRight className="text-pink" />
                      </Link>
                    </div>
                  </div>
                  <Row className="">
                    {moreContent.slice(0, 4)?.map((item, index) => {
                      return (
                        <Col md={3}>
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
                            type_tag={item?.category_details[0]?.name}
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
                            taskHopperId={item?._id}
                            is_sale_status={true}
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
